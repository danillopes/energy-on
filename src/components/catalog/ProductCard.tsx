"use client";

import { memo } from "react";
import { brandName, resolveProduct, type Product } from "@/data/catalog";
import { categories, labelOf } from "@/data/taxonomy";
import { productInquiryLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "../shared/Icons";
import { CodeLine } from "./CodeLine";
import { ProductVisual } from "./ProductVisual";

/**
 * Card do catálogo: a foto é a protagonista; abaixo, marca, nome e código.
 * Tocar na foto ou em “Ver detalhes” abre a ficha completa.
 */
export const ProductCard = memo(function ProductCard({
  product,
  eager,
  onOpen,
}: {
  product: Product;
  eager: boolean;
  onOpen: (product: Product) => void;
}) {
  const resolved = resolveProduct(product);
  const brand = brandName(product);
  const variants = product.variants?.length ?? 0;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-smoke/80 bg-graphite/50 transition-[border-color,background-color] duration-500 hover:border-mist/40 hover:bg-graphite">
      <button
        type="button"
        onClick={() => onOpen(product)}
        className="relative block aspect-[4/5] w-full overflow-hidden"
        aria-label={`Ver detalhes de ${resolved.name}`}
      >
        <ProductVisual
          image={resolved.image}
          name={resolved.name}
          brand={brand}
          sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 50vw"
          eager={eager}
          hoverZoom
        />
        <span className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 sm:top-3 sm:left-3">
          {product.status === "demonstrativo" && (
            <span className="rounded-full bg-ink/75 px-2.5 py-0.5 text-micro text-silver backdrop-blur">Ilustrativo</span>
          )}
          {variants > 1 && (
            <span className="rounded-full bg-ink/75 px-2.5 py-0.5 text-micro text-silver backdrop-blur">
              {variants} opções
            </span>
          )}
        </span>
      </button>

      <div className="flex flex-1 flex-col p-3.5 sm:p-5">
        <p className="truncate text-[0.6875rem] tracking-[0.16em] text-mist uppercase sm:text-micro">
          {brand ?? labelOf(categories, product.category)}
        </p>
        <h3 className="mt-1.5 text-[0.9375rem] leading-snug text-paper sm:text-[1.1875rem] sm:tracking-[-0.005em]">{resolved.name}</h3>
        <CodeLine resolved={resolved} compact className="mt-2 text-micro sm:text-small" />

        <div className="mt-4 flex flex-col gap-2 sm:mt-auto sm:pt-5">
          <button type="button" onClick={() => onOpen(product)} className="btn btn-ghost btn-sm w-full px-3">
            Ver detalhes
          </button>
          <a
            href={productInquiryLink(resolved)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-solid btn-sm w-full px-3"
            aria-label={`Consultar especialista sobre ${resolved.name}`}
          >
            <WhatsAppIcon size={16} />
            <span className="sm:hidden">Consultar</span>
            <span className="hidden sm:inline">Consultar especialista</span>
          </a>
        </div>
      </div>
    </article>
  );
});
