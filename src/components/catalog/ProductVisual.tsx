import type { ProductImage } from "@/data/catalog";
import { cn } from "@/lib/cn";
import { BulbIcon } from "../shared/Icons";
import { SmartImage } from "../shared/SmartImage";

type Props = {
  image: ProductImage | null;
  name: string;
  brand?: string;
  sizes: string;
  eager?: boolean;
  quality?: number;
  className?: string;
  /** Leve aproximação ao passar o mouse sobre o card (classe `group`). */
  hoverZoom?: boolean;
};

/**
 * Foto do produto ocupando o quadro inteiro.
 * - Foto de produto (fit "contain"): fundo claro neutro, sem cortar a peça.
 * - Foto de ambiente (fit "cover"): preenche o quadro.
 * - Sem foto: quadro elegante com a marca, nunca uma imagem de outro produto.
 */
export function ProductVisual({ image, name, brand, sizes, eager, quality = 75, className, hoverZoom }: Props) {
  if (!image) {
    return (
      <span
        role="img"
        aria-label={`${name} — foto em breve`}
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[radial-gradient(80%_60%_at_50%_35%,#2a2a2a,#171717)] p-6 text-center",
          className,
        )}
      >
        <BulbIcon size={30} className="text-mist" />
        {brand && <span className="text-micro tracking-[0.18em] text-silver uppercase">{brand}</span>}
        <span className="text-micro text-mist">Foto oficial em breve</span>
      </span>
    );
  }

  const contain = image.fit === "contain";
  // Recortes em PNG (fundo transparente) ganham respiro; fotos JPG ocupam a largura toda.
  const cutout = /\.png($|\?)/i.test(image.src);
  return (
    <span className={cn("absolute inset-0", contain ? "bg-[#efeeeb]" : "bg-graphite", className)}>
      <SmartImage
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        quality={quality}
        loading={eager ? "eager" : "lazy"}
        fallbackLabel={name}
        className={cn(
          "transition-[transform,filter] duration-[900ms] ease-[var(--ease-out-soft)]",
          contain ? cn("object-contain mix-blend-multiply", cutout && "p-[7%]") : "object-cover",
          hoverZoom && "group-hover:scale-[1.04]",
        )}
      />
    </span>
  );
}
