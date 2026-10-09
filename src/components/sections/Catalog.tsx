"use client";

import { useCallback, useDeferredValue, useEffect, useId, useMemo, useRef, useState } from "react";
import { brands, catalogs, normalizeSearch, searchIndex, type Product } from "@/data/catalog";
import { categories, rooms, styles } from "@/data/taxonomy";
import { cn } from "@/lib/cn";
import { ProductCard } from "../catalog/ProductCard";
import { ProductModal } from "../catalog/ProductModal";
import { CloseIcon, ExternalIcon, FilterIcon, SearchIcon } from "../shared/Icons";
import { CATALOG_FILTER_EVENT, type CatalogFilterRequest } from "./catalog-bus";

/* ---------------- Estado dos filtros ---------------- */

type Facet = "brand" | "category" | "collection" | "style" | "room";
type Filters = Record<Facet, string> & { q: string };

const ALL = "todos";
const EMPTY: Filters = { q: "", brand: ALL, category: ALL, collection: ALL, style: ALL, room: ALL };
const FACETS: Facet[] = ["brand", "category", "collection", "style", "room"];
const PAGE = 12;
const STORAGE_KEY = "eo:catalogo:v2";

/** Parâmetros amigáveis e compartilháveis: /?marca=gmh&colecao=Cosmos&busca=bali */
const PARAMS: Record<keyof Filters, string> = {
  q: "busca",
  brand: "marca",
  category: "categoria",
  collection: "colecao",
  style: "estilo",
  room: "ambiente",
};

type Option = { id: string; label: string };

function facetValue(product: Product, facet: Facet): string[] {
  switch (facet) {
    case "brand":
      return product.brandId ? [product.brandId] : [];
    case "category":
      return [product.category];
    case "collection":
      return product.collection ? [product.collection] : [];
    case "style":
      return product.style ? [product.style] : [];
    case "room":
      return product.rooms;
  }
}

/** Índice de busca calculado uma vez por produto. */
const indexCache = new WeakMap<Product, string>();
const indexOf = (product: Product) => {
  let value = indexCache.get(product);
  if (value === undefined) {
    value = searchIndex(product);
    indexCache.set(product, value);
  }
  return value;
};

function matches(product: Product, f: Filters, tokens: string[], skip?: Facet) {
  for (const facet of FACETS) {
    if (facet === skip || f[facet] === ALL) continue;
    if (!facetValue(product, facet).includes(f[facet])) return false;
  }
  if (!tokens.length) return true;
  const index = indexOf(product);
  return tokens.every((token) => index.includes(token));
}

const tokensOf = (q: string) => normalizeSearch(q).split(" ").filter(Boolean);

/**
 * Cache LRU (12 combinações) dos resultados: voltar a um filtro já visto devolve
 * o MESMO array — os cards memoizados não re-renderizam.
 */
const resultCache = new WeakMap<Product[], Map<string, Product[]>>();
function filterCached(products: Product[], filters: Filters): Product[] {
  let cache = resultCache.get(products);
  if (!cache) {
    cache = new Map();
    resultCache.set(products, cache);
  }
  const key = JSON.stringify(filters);
  const hit = cache.get(key);
  if (hit) {
    cache.delete(key);
    cache.set(key, hit);
    return hit;
  }
  const tokens = tokensOf(filters.q);
  const computed = products.filter((product) => matches(product, filters, tokens));
  cache.set(key, computed);
  if (cache.size > 12) cache.delete(cache.keys().next().value!);
  return computed;
}

/* ---------------- URL e sessão ---------------- */

function sanitize(input: Partial<Record<keyof Filters, unknown>>, valid: Record<Facet, Option[]>): Filters {
  const result = { ...EMPTY };
  for (const facet of FACETS) {
    const value = input[facet];
    if (typeof value === "string" && valid[facet].some((option) => option.id === value)) result[facet] = value;
  }
  if (typeof input.q === "string") result.q = input.q.slice(0, 60);
  return result;
}

function readUrl(valid: Record<Facet, Option[]>): Filters | null {
  const params = new URLSearchParams(window.location.search);
  const keys = Object.keys(PARAMS) as Array<keyof Filters>;
  if (!keys.some((key) => params.has(PARAMS[key]))) return null;
  return sanitize(Object.fromEntries(keys.map((key) => [key, params.get(PARAMS[key])])), valid);
}

function writeUrl(filters: Filters) {
  const url = new URL(window.location.href);
  (Object.keys(PARAMS) as Array<keyof Filters>).forEach((key) => {
    const value = filters[key];
    if (!value || value === ALL) url.searchParams.delete(PARAMS[key]);
    else url.searchParams.set(PARAMS[key], value);
  });
  if (url.href !== window.location.href) window.history.replaceState(window.history.state, "", url);
}

/* ---------------- Componente ---------------- */

export function Catalog({ products }: { products: Product[] }) {
  const [filters, setFilters] = useState<Filters>(EMPTY);
  const [visible, setVisible] = useState(PAGE);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [openVariant, setOpenVariant] = useState<string | undefined>();
  const deferred = useDeferredValue(filters);
  const ready = useRef(false);
  const sentinel = useRef<HTMLDivElement>(null);

  /* Opções de cada filtro, só com o que existe no catálogo. */
  const options = useMemo<Record<Facet, Option[]>>(() => {
    const has = (facet: Facet, id: string) => products.some((p) => facetValue(p, facet).includes(id));
    const collections = [...new Set(products.map((p) => p.collection).filter(Boolean) as string[])];
    return {
      brand: brands.filter((b) => has("brand", b.id)).map((b) => ({ id: b.id, label: b.name })),
      category: categories.filter((c) => has("category", c.id)),
      collection: collections.map((c) => ({ id: c, label: c })),
      style: styles.filter((s) => has("style", s.id)),
      room: rooms.filter((r) => has("room", r.id)),
    };
  }, [products]);

  /* Quantas peças cada opção traria, mantendo os outros filtros. */
  const counts = useMemo(() => {
    const tokens = tokensOf(deferred.q);
    const result = {} as Record<Facet, Record<string, number>>;
    for (const facet of FACETS) {
      result[facet] = {};
      const pool = products.filter((p) => matches(p, deferred, tokens, facet));
      for (const option of options[facet]) {
        result[facet][option.id] = pool.filter((p) => facetValue(p, facet).includes(option.id)).length;
      }
      result[facet][ALL] = pool.length;
    }
    return result;
  }, [products, deferred, options]);

  const results = useMemo(() => filterCached(products, deferred), [products, deferred]);
  const openProduct = useMemo(() => products.find((p) => p.slug === openSlug) ?? null, [products, openSlug]);

  // Restaura: URL (link compartilhado) > sessão (voltou à página) > padrão.
  useEffect(() => {
    let restored = readUrl(options);
    if (!restored) {
      try {
        const raw = window.sessionStorage.getItem(STORAGE_KEY);
        if (raw) restored = sanitize(JSON.parse(raw), options);
      } catch {
        /* armazenamento indisponível */
      }
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- restauração única após a hidratação
    if (restored) setFilters(restored);
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("produto");
    if (slug && products.some((p) => p.slug === slug)) {
      setOpenSlug(slug);
      setOpenVariant(params.get("variante") ?? undefined);
    }
    ready.current = true;
  }, [options, products]);

  useEffect(() => {
    if (!ready.current) return;
    writeUrl(filters);
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
    } catch {
      /* ignora */
    }
  }, [filters]);

  const update = useCallback((patch: Partial<Filters>) => {
    setFilters((prev) => {
      const next = { ...prev, ...patch };
      // Coleção pertence a uma marca: ao trocar de marca, a coleção volta para “todas”.
      if (patch.brand !== undefined && patch.brand !== prev.brand) next.collection = ALL;
      return next;
    });
    setVisible(PAGE);
  }, []);

  // Pedidos vindos de outras seções (“Explorar peças para cozinhas”).
  useEffect(() => {
    const onRequest = (event: Event) => {
      const detail = (event as CustomEvent<CatalogFilterRequest>).detail;
      setFilters({ ...EMPTY, ...sanitize(detail, options) });
      setVisible(PAGE);
    };
    window.addEventListener(CATALOG_FILTER_EVENT, onRequest);
    return () => window.removeEventListener(CATALOG_FILTER_EVENT, onRequest);
  }, [options]);

  /* Modal com histórico: o “voltar” do celular fecha a ficha em vez de sair da página. */
  const openDetails = useCallback((product: Product) => {
    setOpenSlug(product.slug);
    setOpenVariant(undefined);
    const url = new URL(window.location.href);
    url.searchParams.set("produto", product.slug);
    url.searchParams.delete("variante");
    window.history.pushState({ ...window.history.state, eoProduct: product.slug }, "", url);
  }, []);

  const closeDetails = useCallback(() => {
    setOpenSlug(null);
    if (window.history.state?.eoProduct) {
      window.history.back();
    } else {
      const url = new URL(window.location.href);
      url.searchParams.delete("produto");
      url.searchParams.delete("variante");
      window.history.replaceState(window.history.state, "", url);
    }
  }, []);

  const changeVariant = useCallback((id: string) => {
    setOpenVariant(id);
    const url = new URL(window.location.href);
    url.searchParams.set("variante", id);
    window.history.replaceState(window.history.state, "", url);
  }, []);

  useEffect(() => {
    const onPop = () => {
      const params = new URLSearchParams(window.location.search);
      setOpenSlug(params.get("produto"));
      setOpenVariant(params.get("variante") ?? undefined);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Carregamento progressivo: a próxima página entra antes de o visitante chegar ao fim.
  useEffect(() => {
    const node = sentinel.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible((v) => Math.min(v + PAGE, results.length)),
      { rootMargin: "900px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [results.length, visible]);

  const activeCount = (["brand", "collection", "style", "room"] as const).filter((key) => filters[key] !== ALL).length;
  const anyActive = activeCount > 0 || filters.category !== ALL || filters.q !== "";
  const stale = deferred !== filters;
  const shown = results.slice(0, visible);
  const sources = catalogs.filter((c) => c.url);

  return (
    <section id="produtos" aria-labelledby="produtos-title" className="section-y border-t border-smoke bg-ink">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="produtos-title" className="type-h2 lg:col-span-7">
            Catálogo
          </h2>
          <p className="type-lead max-w-[46ch] lg:col-span-5">
            Encontre pela marca, coleção ou código. Gostou de uma peça? Fale com um especialista com o código já
            preenchido.
          </p>
        </div>

        {sources.length > 0 && (
          <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-small text-mist">
            <span>Catálogos originais:</span>
            {sources.map((source) => (
              <a
                key={source.id}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line inline-flex items-center gap-1.5 text-silver hover:text-paper"
              >
                {source.title}
                <ExternalIcon size={14} />
              </a>
            ))}
          </p>
        )}

        {/* Busca + tipo de produto */}
        <div className="sticky top-[calc(var(--header-h)+var(--safe-top))] z-20 -mx-[var(--gutter)] mt-8 border-b border-smoke bg-ink/90 px-[var(--gutter)] py-3 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <SearchBox value={filters.q} onChange={(q) => update({ q })} />
            <button
              type="button"
              className="chip shrink-0 gap-2 lg:hidden"
              aria-haspopup="dialog"
              aria-expanded={sheetOpen}
              onClick={() => setSheetOpen(true)}
            >
              <FilterIcon size={18} />
              Filtros{activeCount > 0 && ` (${activeCount})`}
            </button>
          </div>
          <div role="group" aria-label="Tipo de produto" className="scroll-row -my-1 mt-2 py-1">
            <button type="button" className="chip" aria-pressed={filters.category === ALL} onClick={() => update({ category: ALL })}>
              Todos
            </button>
            {options.category.map((category) => (
              <button
                key={category.id}
                type="button"
                className="chip"
                aria-pressed={filters.category === category.id}
                disabled={!counts.category[category.id] && filters.category !== category.id}
                onClick={() => update({ category: category.id })}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block" aria-label="Filtros">
            <div className="sticky top-[calc(var(--header-h)+var(--safe-top)+8.5rem)] max-h-[calc(100svh-var(--header-h)-10rem)] overflow-y-auto overscroll-contain pr-2">
              <FilterGroups filters={filters} options={options} counts={counts} onChange={update} />
              {anyActive && (
                <button type="button" onClick={() => update(EMPTY)} className="link-line mt-8 text-small text-silver">
                  Limpar filtros
                </button>
              )}
            </div>
          </aside>

          <div className="lg:col-span-9">
            <p aria-live="polite" className="text-small text-mist">
              {results.length === 1 ? "1 peça encontrada" : `${results.length} peças encontradas`}
              {filters.q && ` para “${filters.q}”`}
            </p>

            {results.length === 0 ? (
              <div className="mt-6 flex flex-col items-start gap-5 rounded-2xl border border-dashed border-smoke p-8 sm:p-12">
                <p className="type-h3">Nenhuma peça encontrada.</p>
                <p className="max-w-[52ch] text-silver">
                  Confira o código ou remova um filtro. Se não achar a peça, mande o código para a equipe pelo WhatsApp:
                  temos acesso aos catálogos completos dos fabricantes.
                </p>
                <button type="button" onClick={() => update(EMPTY)} className="btn btn-ghost">
                  Limpar busca e filtros
                </button>
              </div>
            ) : (
              <ul
                className={cn(
                  "mt-6 grid grid-cols-2 gap-x-3 gap-y-6 transition-opacity duration-300 sm:gap-x-5 sm:gap-y-8 xl:grid-cols-3",
                  stale && "opacity-60",
                )}
              >
                {shown.map((product, index) => (
                  <li key={product.id}>
                    <ProductCard product={product} eager={index < 4} onOpen={openDetails} />
                  </li>
                ))}
              </ul>
            )}

            {visible < results.length && (
              <div ref={sentinel} className="mt-12 flex justify-center">
                <button type="button" className="btn btn-ghost" onClick={() => setVisible((v) => v + PAGE)}>
                  Mostrar mais peças ({results.length - visible})
                </button>
              </div>
            )}

            <p className="mt-12 max-w-[60ch] text-micro text-mist">
              Peças com o selo “Ilustrativo” são fotos de referência de estilo, sem fabricante. As demais trazem marca,
              código e ficha técnica conforme o catálogo do fabricante.
            </p>
          </div>
        </div>
      </div>

      <FilterSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        filters={filters}
        options={options}
        counts={counts}
        onChange={update}
        count={results.length}
        anyActive={anyActive}
      />

      <ProductModal product={openProduct} variantId={openVariant} onVariantChange={changeVariant} onClose={closeDetails} />
    </section>
  );
}

/* ---------------- Busca ---------------- */

function SearchBox({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const id = useId();
  return (
    <div className="relative min-w-0 flex-1">
      <label htmlFor={id} className="sr-only">
        Buscar por nome ou código
      </label>
      <SearchIcon size={18} className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-mist" />
      <input
        id={id}
        type="search"
        inputMode="search"
        enterKeyHint="search"
        autoComplete="off"
        spellCheck={false}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Buscar por nome ou código"
        className="h-11 w-full rounded-full border border-smoke bg-graphite/70 pr-11 pl-11 text-[1rem] text-paper placeholder:text-mist focus:border-mist focus:outline-none [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute top-1/2 right-1.5 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-mist hover:bg-white/10 hover:text-paper"
          aria-label="Limpar busca"
        >
          <CloseIcon size={16} />
        </button>
      )}
    </div>
  );
}

/* ---------------- Grupos de filtro ---------------- */

const GROUPS: Array<{ key: Exclude<Facet, "category">; label: string }> = [
  { key: "brand", label: "Fabricante" },
  { key: "collection", label: "Coleção" },
  { key: "style", label: "Estilo" },
  { key: "room", label: "Ambiente" },
];

function FilterGroups({
  filters,
  options,
  counts,
  onChange,
}: {
  filters: Filters;
  options: Record<Facet, Option[]>;
  counts: Record<Facet, Record<string, number>>;
  onChange: (patch: Partial<Filters>) => void;
}) {
  return (
    <div className="flex flex-col gap-8">
      {GROUPS.filter((group) => options[group.key].length > 0).map((group) => (
        <fieldset key={group.key}>
          <legend className="text-small text-mist">{group.label}</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              className="chip"
              aria-pressed={filters[group.key] === ALL}
              onClick={() => onChange({ [group.key]: ALL })}
            >
              Todos
            </button>
            {options[group.key].map((option) => {
              const count = counts[group.key][option.id] ?? 0;
              const selected = filters[group.key] === option.id;
              if (!count && !selected && group.key === "collection") return null;
              return (
                <button
                  key={option.id}
                  type="button"
                  className="chip gap-1.5"
                  aria-pressed={selected}
                  disabled={!count && !selected}
                  onClick={() => onChange({ [group.key]: option.id })}
                >
                  {option.label}
                  <span className="text-micro opacity-60">{count}</span>
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}
    </div>
  );
}

/* ---------------- Painel de filtros (mobile/tablet) ---------------- */

function FilterSheet({
  open,
  onClose,
  filters,
  options,
  counts,
  onChange,
  count,
  anyActive,
}: {
  open: boolean;
  onClose: () => void;
  filters: Filters;
  options: Record<Facet, Option[]>;
  counts: Record<Facet, Record<string, number>>;
  onChange: (patch: Partial<Filters>) => void;
  count: number;
  anyActive: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    if (open && !node.open) node.showModal();
    if (!open && node.open) node.close();
  }, [open]);

  return (
    <dialog
      ref={dialog}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => event.target === dialog.current && onClose()}
      className="fixed inset-x-0 top-auto bottom-0 m-0 max-h-[88svh] w-full max-w-none rounded-t-2xl border-t border-smoke bg-ink p-0 text-paper backdrop:bg-black/70 backdrop:backdrop-blur-sm open:animate-[rise_0.45s_var(--ease-out-soft)] lg:hidden"
    >
      <div className="flex max-h-[88svh] flex-col">
        <div className="flex items-center justify-between border-b border-smoke px-[var(--gutter)] py-4">
          <h3 id={titleId} className="type-h3">
            Filtros
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="grid h-11 w-11 place-items-center rounded-full hover:bg-white/10"
            aria-label="Fechar filtros"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain px-[var(--gutter)] py-6">
          <FilterGroups filters={filters} options={options} counts={counts} onChange={onChange} />
        </div>
        <div className="flex gap-3 border-t border-smoke px-[var(--gutter)] pt-4 pb-[max(1rem,var(--safe-bottom))]">
          <button type="button" className="btn btn-ghost flex-1" disabled={!anyActive} onClick={() => onChange(EMPTY)}>
            Limpar
          </button>
          <button type="button" className="btn btn-solid flex-1" onClick={onClose}>
            Ver {count} {count === 1 ? "peça" : "peças"}
          </button>
        </div>
      </div>
    </dialog>
  );
}
