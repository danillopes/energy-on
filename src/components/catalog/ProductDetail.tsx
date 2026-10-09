"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  getBrand,
  getCatalogSource,
  resolveProduct,
  SPEC_KEYS,
  type Product,
  type ProductImage,
} from "@/data/catalog";
import { categories, labelOf, rooms, styles } from "@/data/taxonomy";
import { cn } from "@/lib/cn";
import { productInquiryLink } from "@/lib/whatsapp";
import { ExpandIcon, ExternalIcon, WhatsAppIcon } from "../shared/Icons";
import { SmartImage } from "../shared/SmartImage";
import { CodeLine } from "./CodeLine";
import { photoNote, SPEC_LABELS, variantLegend } from "./labels";
import { Lightbox } from "./Lightbox";
import { ProductVisual } from "./ProductVisual";

type Props = {
  product: Product;
  layout: "modal" | "page";
  variantId?: string;
  onVariantChange?: (id: string) => void;
  titleId?: string;
};

/**
 * Ficha completa do produto — a mesma no modal do catálogo e na página /produtos/<slug>.
 * Trocar a variante atualiza código, nome, especificações e a mensagem do WhatsApp.
 */
export function ProductDetail({ product, layout, variantId, onVariantChange, titleId }: Props) {
  const [localVariant, setLocalVariant] = useState(variantId);
  const currentVariant = variantId ?? localVariant;
  const resolved = useMemo(() => resolveProduct(product, currentVariant), [product, currentVariant]);
  const brand = getBrand(product.brandId);
  const source = getCatalogSource(resolved.source?.catalogId);
  const note = photoNote(resolved);
  const demo = product.status === "demonstrativo";

  const images: ProductImage[] = useMemo(() => {
    if (product.gallery?.length) return product.gallery.map((g) => ({ src: g.src, alt: g.alt, fit: "cover" as const }));
    return resolved.image ? [resolved.image] : [];
  }, [product.gallery, resolved.image]);
  const [imageIndex, setImageIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const shown = images[imageIndex] ?? images[0] ?? null;

  const chooseVariant = (id: string) => {
    setLocalVariant(id);
    onVariantChange?.(id);
  };

  const specs = [
    { label: "Tipo", value: labelOf(categories, product.category) },
    ...(product.collection ? [{ label: "Coleção", value: product.collection }] : []),
    ...SPEC_KEYS.filter((key) => resolved[key]).map((key) => ({ label: SPEC_LABELS[key], value: resolved[key]! })),
    ...(product.style ? [{ label: "Estilo", value: labelOf(styles, product.style) }] : []),
    ...(product.rooms.length ? [{ label: "Ambientes", value: product.rooms.map((r) => labelOf(rooms, r)).join(", ") }] : []),
  ];

  const Title = layout === "page" ? "h1" : "h2";

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-12">
      {/* Foto */}
      <div className="flex flex-col gap-3">
        <div className="relative mx-auto aspect-square w-full max-w-[36rem] overflow-hidden rounded-xl lg:sticky lg:top-6">
          <ProductVisual
            image={shown}
            name={resolved.name}
            brand={brand?.name}
            sizes="(min-width: 640px) 576px, 100vw"
            eager
          />
          {shown && (
            <button
              type="button"
              onClick={() => setZoom(true)}
              className="absolute right-3 bottom-3 inline-flex h-10 items-center gap-2 rounded-full bg-ink/80 px-3.5 text-micro text-paper backdrop-blur transition-colors hover:bg-ink"
            >
              <ExpandIcon size={16} />
              Ampliar
            </button>
          )}
          {demo && (
            <span className="absolute top-3 left-3 rounded-full bg-ink/75 px-2.5 py-0.5 text-micro text-silver backdrop-blur">
              Ilustrativo
            </span>
          )}
        </div>
        {note && <p className="text-micro text-mist">{note}</p>}

        {images.length > 1 && (
          <div className="scroll-row -mx-1 px-1 py-1">
            {images.map((img, index) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setImageIndex(index)}
                aria-label={`Ver foto ${index + 1} de ${images.length}`}
                aria-pressed={index === imageIndex}
                className={cn(
                  "relative aspect-square w-16 overflow-hidden rounded-md border transition-[opacity,border-color] duration-300",
                  index === imageIndex ? "border-paper" : "border-smoke opacity-60 hover:opacity-100",
                )}
              >
                <SmartImage src={img.src} alt="" fill sizes="96px" quality={60} className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Informações */}
      <div className="flex min-w-0 flex-col">
        <p className="text-micro tracking-[0.16em] text-mist uppercase">
          {brand?.name ?? "Referência ilustrativa"}
          {product.collection && <span className="text-smoke"> · </span>}
          {product.collection && <span>Coleção {product.collection}</span>}
        </p>
        <Title id={titleId} className="type-h2 mt-3 text-[clamp(1.75rem,1.3rem+1.4vw,2.5rem)] text-balance">
          {resolved.name}
        </Title>
        {product.summary && <p className="mt-4 text-silver">{product.summary}</p>}

        <CodeLine resolved={resolved} large className="mt-5 border-y border-smoke py-3" />

        {(product.variants?.length ?? 0) > 1 && (
          <fieldset className="mt-6">
            <legend className="text-small text-mist">
              {variantLegend(product)}: <span className="text-paper">{resolved.variant?.label}</span>
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.variants!.map((variant) => (
                <button
                  key={variant.id}
                  type="button"
                  className="chip"
                  aria-pressed={variant.id === resolved.variant?.id}
                  onClick={() => chooseVariant(variant.id)}
                  title={variant.sku}
                >
                  {variant.label}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        <div className="mt-7 flex flex-wrap gap-3 [&>*]:min-w-[12rem] [&>*]:flex-1">
          <a
            href={productInquiryLink(resolved)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-solid"
          >
            <WhatsAppIcon size={18} />
            Consultar especialista
          </a>
          {layout === "modal" ? (
            <Link
              href={`/produtos/${product.slug}${resolved.variant && (product.variants?.length ?? 0) > 1 ? `?variante=${resolved.variant.id}` : ""}`}
              className="btn btn-ghost"
              prefetch={false}
            >
              Página do produto
            </Link>
          ) : (
            <Link href="/#produtos" className="btn btn-ghost">
              Voltar ao catálogo
            </Link>
          )}
        </div>

        <h3 className="mt-10 text-small text-mist">Especificações</h3>
        <dl className="mt-3 border-t border-smoke">
          {specs.map((item) => (
            <div key={item.label} className="grid grid-cols-[8.5rem_1fr] gap-4 border-b border-smoke py-3 text-small">
              <dt className="text-mist">{item.label}</dt>
              <dd className="text-silver">{item.value}</dd>
            </div>
          ))}
        </dl>
        {!demo && (
          <p className="mt-3 text-micro text-mist">
            Dados do fabricante. Medidas, temperatura de cor, prazo e valor são confirmados no atendimento.
          </p>
        )}

        <h3 className="mt-10 text-small text-mist">Origem</h3>
        {demo ? (
          <p className="mt-3 text-small text-silver">
            Foto de referência usada para ilustrar o estilo, sem fabricante identificado. O especialista indica peças
            equivalentes dos catálogos da loja.
          </p>
        ) : (
          <dl className="mt-3 border-t border-smoke text-small">
            {brand && (
              <div className="grid grid-cols-[8.5rem_1fr] gap-4 border-b border-smoke py-3">
                <dt className="text-mist">Fabricante</dt>
                <dd>
                  {brand.site ? (
                    <a href={brand.site} target="_blank" rel="noopener noreferrer" className="link-line inline-flex items-center gap-1.5 text-silver hover:text-paper">
                      {brand.name}
                      <ExternalIcon size={14} />
                    </a>
                  ) : (
                    <span className="text-silver">{brand.name}</span>
                  )}
                </dd>
              </div>
            )}
            {(source || resolved.source?.url) && (
              <div className="grid grid-cols-[8.5rem_1fr] gap-4 border-b border-smoke py-3">
                <dt className="text-mist">Fonte</dt>
                <dd className="text-silver">
                  {source?.title}
                  {resolved.source?.page != null && `, p. ${resolved.source.page}`}
                  {(resolved.source?.url ?? source?.url) && (
                    <a
                      href={resolved.source?.url ?? source?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-line mt-1 flex w-fit items-center gap-1.5 text-paper"
                    >
                      Ver catálogo original
                      <ExternalIcon size={14} />
                    </a>
                  )}
                </dd>
              </div>
            )}
            {resolved.image?.credit && (
              <div className="grid grid-cols-[8.5rem_1fr] gap-4 border-b border-smoke py-3">
                <dt className="text-mist">Foto</dt>
                <dd className="text-silver">{resolved.image.credit}</dd>
              </div>
            )}
          </dl>
        )}
      </div>

      {shown && <Lightbox image={shown} name={resolved.name} open={zoom} onClose={() => setZoom(false)} />}
    </div>
  );
}
