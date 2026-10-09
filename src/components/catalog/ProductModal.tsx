"use client";

import { useEffect, useId, useRef } from "react";
import type { Product } from "@/data/catalog";
import { CloseIcon } from "../shared/Icons";
import { ProductDetail } from "./ProductDetail";

/** Janela com a ficha do produto. No celular abre como uma folha de baixo para cima. */
export function ProductModal({
  product,
  variantId,
  onVariantChange,
  onClose,
}: {
  product: Product | null;
  variantId?: string;
  onVariantChange: (id: string) => void;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    if (product && !node.open) node.showModal();
    if (!product && node.open) node.close();
    if (product) node.querySelector<HTMLElement>("[data-scroll]")?.scrollTo({ top: 0 });
  }, [product]);

  return (
    <dialog
      ref={dialog}
      aria-labelledby={titleId}
      // Só o fechamento DESTA janela (o da foto ampliada também chega aqui pela árvore do React).
      onClose={(event) => event.target === event.currentTarget && onClose()}
      onClick={(event) => event.target === dialog.current && onClose()}
      className="fixed inset-x-0 top-auto bottom-0 m-0 max-h-[94svh] w-full max-w-none overflow-hidden rounded-t-2xl border-t border-smoke bg-ink p-0 text-paper backdrop:bg-black/75 backdrop:backdrop-blur-sm open:animate-[rise_0.5s_var(--ease-out-soft)] md:inset-0 md:m-auto md:h-fit md:max-h-[min(90svh,58rem)] md:w-[min(100%-3rem,72rem)] md:rounded-2xl md:border"
    >
      <div data-scroll className="max-h-[94svh] overflow-x-hidden overflow-y-auto overscroll-contain md:max-h-[min(90svh,58rem)]">
        <div className="sticky top-0 z-10 flex justify-end bg-gradient-to-b from-ink via-ink/80 to-transparent px-3 pt-3 md:px-4 md:pt-4">
          <button
            type="button"
            onClick={onClose}
            className="grid h-11 w-11 place-items-center rounded-full bg-graphite text-paper transition-colors hover:bg-smoke"
            aria-label="Fechar"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="px-[var(--gutter)] pb-[max(2rem,var(--safe-bottom))] md:px-10 md:pb-10">
          {product && (
            <ProductDetail
              key={product.id}
              product={product}
              layout="modal"
              variantId={variantId}
              onVariantChange={onVariantChange}
              titleId={titleId}
            />
          )}
        </div>
      </div>
    </dialog>
  );
}
