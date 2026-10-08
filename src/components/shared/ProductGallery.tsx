"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import type { ProductGalleryItem } from "@/data/products";

type ProductGalleryProps = {
  items?: ProductGalleryItem[];
  defaultImage: string;
  defaultAlt: string;
  productName: string;
};

export function ProductGallery({ items, defaultImage, defaultAlt, productName }: ProductGalleryProps) {
  const images = items && items.length > 0 ? items : [{ src: defaultImage, alt: defaultAlt, title: productName }];
  const [activeIndex, setActiveIndex] = useState(0);
  const current = images[activeIndex] ?? images[0];

  return (
    <div className="flex flex-col gap-4">
      {/* Imagem Principal Centralizada */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-graphite sm:aspect-[16/10] lg:aspect-[5/4]">
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt || productName}
          fill
          priority
          sizes="(min-width: 1024px) 58vw, 100vw"
          quality={80}
          className="object-cover object-center transition-[transform,opacity] duration-500 ease-[var(--ease-out-soft)] hover:scale-[1.03]"
        />

        {images.length > 1 && (
          <div className="absolute top-3 right-3 rounded-full bg-ink/75 px-3 py-1 text-micro text-silver backdrop-blur">
            {activeIndex + 1} / {images.length}
          </div>
        )}

        {current.title && images.length > 1 && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent p-4 sm:p-6">
            <p className="text-small font-medium text-paper">{current.title}</p>
            {current.subtitle && <p className="mt-0.5 text-micro text-mist">{current.subtitle}</p>}
          </div>
        )}
      </div>

      {/* Miniaturas de repertório (se houver mais de uma foto) */}
      {images.length > 1 && (
        <div className="scroll-row -mx-1 flex gap-2.5 px-1 py-1 sm:grid sm:grid-cols-6 sm:overflow-visible">
          {images.map((item, index) => {
            const isSelected = index === activeIndex;
            return (
              <button
                key={item.src}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Ver imagem ${index + 1}: ${item.title ?? item.alt}`}
                aria-pressed={isSelected}
                className={cn(
                  "relative aspect-square w-16 shrink-0 overflow-hidden rounded-sm border transition-all duration-300 sm:w-auto",
                  isSelected
                    ? "border-brand ring-2 ring-brand/40"
                    : "border-smoke opacity-70 hover:border-mist hover:opacity-100",
                )}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="96px"
                  quality={60}
                  className="object-cover object-center"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
