"use client";

import Link from "next/link";
import { memo, useCallback, useDeferredValue, useEffect, useId, useMemo, useRef, useState } from "react";
import type { Product } from "@/data/products";
import {
  categories,
  finishes,
  labelOf,
  rooms,
  styles,
  type CategoryId,
  type FinishId,
  type RoomId,
  type StyleId,
} from "@/data/taxonomy";
import { cn } from "@/lib/cn";
import { productQuoteLink } from "@/lib/whatsapp";
import { CloseIcon, FilterIcon, WhatsAppIcon } from "../shared/Icons";
import { SmartImage } from "../shared/SmartImage";
import { CATALOG_FILTER_EVENT, type CatalogFilterRequest } from "./catalog-bus";

/* ---------------- Estado dos filtros ---------------- */

type Filters = {
  category: CategoryId | "todos";
  room: RoomId | "todos";
  style: StyleId | "todos";
  finish: FinishId | "todos";
};

const EMPTY: Filters = { category: "todos", room: "todos", style: "todos", finish: "todos" };
const PAGE = 9;
const STORAGE_KEY = "eo:catalogo";

/** Nome dos parâmetros na URL — amigáveis e compartilháveis (?categoria=pendentes&ambiente=cozinha). */
const PARAMS = { category: "categoria", room: "ambiente", style: "estilo", finish: "acabamento" } as const;
const OPTIONS = {
  category: categories,
  room: rooms,
  style: styles,
  finish: finishes,
} as const;

function sanitize(input: Partial<Record<keyof Filters, unknown>>): Filters {
  const result = { ...EMPTY };
  (Object.keys(EMPTY) as Array<keyof Filters>).forEach((key) => {
    const value = input[key];
    if (typeof value === "string" && OPTIONS[key].some((option) => option.id === value)) {
      (result as Record<keyof Filters, string>)[key] = value;
    }
  });
  return result;
}

function readUrl(): Filters | null {
  const params = new URLSearchParams(window.location.search);
  const found = (Object.keys(PARAMS) as Array<keyof Filters>).some((key) => params.has(PARAMS[key]));
  if (!found) return null;
  return sanitize(
    Object.fromEntries((Object.keys(PARAMS) as Array<keyof Filters>).map((key) => [key, params.get(PARAMS[key])])),
  );
}

function writeUrl(filters: Filters) {
  const url = new URL(window.location.href);
  (Object.keys(PARAMS) as Array<keyof Filters>).forEach((key) => {
    if (filters[key] === "todos") url.searchParams.delete(PARAMS[key]);
    else url.searchParams.set(PARAMS[key], filters[key]);
  });
  // replaceState não aciona o roteador: nada é re-renderizado além do catálogo.
  window.history.replaceState(window.history.state, "", url);
}

function matches(product: Product, f: Filters) {
  return (
    (f.category === "todos" || product.category === f.category) &&
    (f.room === "todos" || product.rooms.includes(f.room)) &&
    (f.style === "todos" || product.style === f.style) &&
    (f.finish === "todos" || product.finish === f.finish)
  );
}

/**
 * Cache limitado (LRU, 12 combinações) dos resultados por filtro.
 * Voltar a uma aba/filtro já visitado devolve o MESMO array — os cards
 * memoizados não re-renderizam e as imagens já decodificadas são reaproveitadas.
 */
const resultCache = new WeakMap<Product[], Map<string, Product[]>>();
function filterCached(products: Product[], filters: Filters): Product[] {
  let cache = resultCache.get(products);
  if (!cache) {
    cache = new Map();
    resultCache.set(products, cache);
  }
  const key = `${filters.category}|${filters.room}|${filters.style}|${filters.finish}`;
  const hit = cache.get(key);
  if (hit) {
    cache.delete(key);
    cache.set(key, hit);
    return hit;
  }
  const computed = products.filter((product) => matches(product, filters));
  cache.set(key, computed);
  if (cache.size > 12) cache.delete(cache.keys().next().value!);
  return computed;
}

/* ---------------- Componente ---------------- */

export function Catalog({ products }: { products: Product[] }) {
  const [filters, setFilters] = useState<Filters>(EMPTY);
  const [visible, setVisible] = useState(PAGE);
  const [sheetOpen, setSheetOpen] = useState(false);
  const deferred = useDeferredValue(filters);
  const ready = useRef(false);

  const results = useMemo(() => filterCached(products, deferred), [products, deferred]);

  // Restaura: URL (link compartilhado) > sessão (voltou à página) > padrão.
  useEffect(() => {
    let restored = readUrl();
    if (!restored) {
      try {
        const raw = window.sessionStorage.getItem(STORAGE_KEY);
        if (raw) restored = sanitize(JSON.parse(raw));
      } catch {
        /* armazenamento indisponível */
      }
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- restauração única após a hidratação
    if (restored) setFilters(restored);
    ready.current = true;
  }, []);

  // Persiste a cada mudança (depois da restauração).
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
    setFilters((prev) => ({ ...prev, ...patch }));
    setVisible(PAGE);
  }, []);

  // Pedidos vindos de outras seções (“Explorar peças para cozinhas”).
  useEffect(() => {
    const onRequest = (event: Event) => {
      const detail = (event as CustomEvent<CatalogFilterRequest>).detail;
      setFilters({ ...EMPTY, ...sanitize(detail) });
      setVisible(PAGE);
    };
    window.addEventListener(CATALOG_FILTER_EVENT, onRequest);
    return () => window.removeEventListener(CATALOG_FILTER_EVENT, onRequest);
  }, []);

  const activeCount = (["room", "style", "finish"] as const).filter((key) => filters[key] !== "todos").length;
  const anyActive = activeCount > 0 || filters.category !== "todos";
  const stale = deferred !== filters;
  const shown = results.slice(0, visible);

  return (
    <section id="produtos" aria-labelledby="produtos-title" className="section-y border-t border-smoke bg-ink">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="produtos-title" className="type-h2 lg:col-span-7">
            Catálogo
          </h2>
          <p className="type-lead max-w-[46ch] lg:col-span-5">
            Filtre por ambiente, estilo e acabamento. Gostou de uma peça? Peça o orçamento direto pelo WhatsApp.
          </p>
        </div>

        <p className="mt-6 inline-flex rounded-full border border-smoke px-3 py-1 text-micro text-mist">
          Catálogo demonstrativo: os itens abaixo são exemplos e serão substituídos pelos produtos da loja.
        </p>

        {/* Categorias (tipo de produto) */}
        <div className="sticky top-[calc(var(--header-h)+var(--safe-top))] z-20 -mx-[var(--gutter)] mt-10 border-b border-smoke bg-ink/90 px-[var(--gutter)] py-3 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div role="group" aria-label="Tipo de produto" className="scroll-row -my-1 flex-1 py-1">
              <button
                type="button"
                className="chip"
                aria-pressed={filters.category === "todos"}
                onClick={() => update({ category: "todos" })}
              >
                Todos
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className="chip"
                  aria-pressed={filters.category === category.id}
                  onClick={() => update({ category: category.id })}
                >
                  {category.label}
                </button>
              ))}
            </div>
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
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          {/* Filtros: barra lateral no desktop */}
          <aside className="hidden lg:col-span-3 lg:block" aria-label="Filtros">
            <div className="sticky top-[calc(var(--header-h)+var(--safe-top)+5rem)]">
              <FilterGroups filters={filters} onChange={update} />
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
            </p>

            {results.length === 0 ? (
              <div className="mt-6 flex flex-col items-start gap-5 rounded-sm border border-dashed border-smoke p-8 sm:p-12">
                <p className="type-h3">Nenhuma peça combina com todos esses filtros.</p>
                <p className="max-w-[52ch] text-silver">
                  Remova um dos filtros ou fale com a equipe: muitas peças podem ser encomendadas no acabamento
                  que você procura.
                </p>
                <button type="button" onClick={() => update(EMPTY)} className="btn btn-ghost">
                  Limpar filtros
                </button>
              </div>
            ) : (
              <ul
                className={cn(
                  "mt-6 grid grid-cols-1 gap-x-5 gap-y-12 transition-opacity duration-300 min-[480px]:grid-cols-2 xl:grid-cols-3",
                  stale && "opacity-60",
                )}
              >
                {shown.map((product, index) => (
                  <li key={product.slug}>
                    <ProductCard product={product} eager={index < 3} />
                  </li>
                ))}
              </ul>
            )}

            {visible < results.length && (
              <div className="mt-14 flex justify-center">
                <button type="button" className="btn btn-ghost" onClick={() => setVisible((v) => v + PAGE)}>
                  Mostrar mais peças ({results.length - visible})
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <FilterSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        filters={filters}
        onChange={update}
        count={results.length}
        anyActive={anyActive}
      />
    </section>
  );
}

/* ---------------- Grupos de filtro ---------------- */

const GROUPS = [
  { key: "room", label: "Ambiente", options: rooms },
  { key: "style", label: "Estilo", options: styles },
  { key: "finish", label: "Acabamento", options: finishes },
] as const;

function FilterGroups({ filters, onChange }: { filters: Filters; onChange: (patch: Partial<Filters>) => void }) {
  return (
    <div className="flex flex-col gap-8">
      {GROUPS.map((group) => (
        <fieldset key={group.key}>
          <legend className="text-small text-mist">{group.label}</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              className="chip"
              aria-pressed={filters[group.key] === "todos"}
              onClick={() => onChange({ [group.key]: "todos" })}
            >
              Todos
            </button>
            {group.options.map((option) => (
              <button
                key={option.id}
                type="button"
                className="chip"
                aria-pressed={filters[group.key] === option.id}
                onClick={() => onChange({ [group.key]: option.id })}
              >
                {option.label}
              </button>
            ))}
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
  onChange,
  count,
  anyActive,
}: {
  open: boolean;
  onClose: () => void;
  filters: Filters;
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
          <FilterGroups filters={filters} onChange={onChange} />
        </div>
        <div className="flex gap-3 border-t border-smoke px-[var(--gutter)] pt-4 pb-[max(1rem,var(--safe-bottom))]">
          <button
            type="button"
            className="btn btn-ghost flex-1"
            disabled={!anyActive}
            onClick={() => onChange(EMPTY)}
          >
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

/* ---------------- Card de produto ---------------- */

const ProductCard = memo(function ProductCard({ product, eager }: { product: Product; eager: boolean }) {
  return (
    <article className="group flex h-full flex-col">
      <Link
        href={`/produtos/${product.slug}`}
        className="relative block aspect-[4/5] overflow-hidden rounded-sm bg-graphite"
        aria-label={`Ver detalhes de ${product.name}`}
        prefetch={false}
      >
        <SmartImage
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(min-width: 1280px) 24vw, (min-width: 1024px) 36vw, (min-width: 480px) 48vw, 100vw"
          loading={eager ? "eager" : "lazy"}
          quality={70}
          fallbackLabel={product.name}
          className="object-cover object-center transition-[transform,filter] duration-[900ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.04] group-hover:brightness-110"
        />
        {product.demo && (
          <span className="absolute top-3 left-3 rounded-full bg-ink/75 px-2.5 py-0.5 text-micro text-silver backdrop-blur">
            Exemplo
          </span>
        )}
      </Link>

      <div className="mt-4 flex flex-1 flex-col">
        <h3 className="type-h3">{product.name}</h3>
        <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 text-small">
          <dt className="text-mist">Categoria</dt>
          <dd className="text-silver">{labelOf(categories, product.category)}</dd>
          <dt className="text-mist">Acabamento</dt>
          <dd className="text-silver">{labelOf(finishes, product.finish)}</dd>
        </dl>
        <div className="mt-5 flex flex-wrap gap-2 pt-1 sm:mt-auto">
          <Link href={`/produtos/${product.slug}`} className="btn btn-ghost btn-sm">
            Ver detalhes
          </Link>
          <a
            href={productQuoteLink(product)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-solid btn-sm"
          >
            <WhatsAppIcon size={16} />
            Solicitar orçamento
          </a>
        </div>
      </div>
    </article>
  );
});
