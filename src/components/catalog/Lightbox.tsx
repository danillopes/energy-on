"use client";

import { useEffect, useRef } from "react";
import type { ProductImage } from "@/data/catalog";
import { CloseIcon } from "../shared/Icons";
import { SmartImage } from "../shared/SmartImage";

/** Foto em tela cheia, sem cortes. Fecha com Esc, botão ou toque fora da foto. */
export function Lightbox({ image, name, open, onClose }: { image: ProductImage; name: string; open: boolean; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    if (open && !node.open) node.showModal();
    if (!open && node.open) node.close();
  }, [open]);

  return (
    <dialog
      ref={dialog}
      aria-label={`Foto ampliada: ${name}`}
      onClose={(event) => event.target === event.currentTarget && onClose()}
      onClick={(event) => event.target === event.currentTarget && onClose()}
      className="m-0 h-[100dvh] max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-black/90 backdrop:backdrop-blur-sm open:animate-[fade_0.3s_var(--ease-out-soft)]"
    >
      {open && (
        <div className="pointer-events-none relative h-full w-full p-[max(1rem,var(--safe-top))_1rem_max(1rem,var(--safe-bottom))]">
          <div className={image.fit === "contain" ? "relative h-full w-full rounded-xl bg-[#efeeeb]" : "relative h-full w-full"}>
            <SmartImage
              src={image.src}
              alt={image.alt}
              fill
              sizes="100vw"
              quality={75}
              fallbackLabel={name}
              className={image.fit === "contain" ? "object-contain p-[4%] mix-blend-multiply" : "object-contain"}
            />
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={onClose}
        className="fixed top-[max(1rem,var(--safe-top))] right-4 grid h-11 w-11 place-items-center rounded-full bg-ink/80 text-paper backdrop-blur hover:bg-ink"
        aria-label="Fechar foto ampliada"
      >
        <CloseIcon />
      </button>
    </dialog>
  );
}
