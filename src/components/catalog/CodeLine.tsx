import type { ResolvedProduct } from "@/data/catalog";
import { cn } from "@/lib/cn";
import { CopyCode } from "./CopyCode";

/** “Código: P-COSMOS-60-GOLD [copiar]” — ou o motivo de ainda não haver código. */
export function CodeLine({
  resolved,
  large,
  compact,
  className,
}: {
  resolved: ResolvedProduct;
  large?: boolean;
  /** Card estreito (celular): sem o rótulo e com o código quebrando linha, nunca cortado. */
  compact?: boolean;
  className?: string;
}) {
  const { sku, product } = resolved;
  return (
    <div className={cn("flex min-h-8 items-center gap-x-2", large ? "text-body" : !compact && "text-small", className)}>
      <span className={cn("text-mist", compact && "sr-only sm:not-sr-only")}>Código</span>
      {sku ? (
        <>
          <code
            translate="no"
            className={cn(
              "min-w-0 font-sans font-medium tracking-[0.02em] text-paper tabular-nums [overflow-wrap:anywhere]",
              large && "text-[1.0625rem]",
            )}
          >
            {sku}
          </code>
          <CopyCode code={sku} className="-ml-1" />
        </>
      ) : (
        <span className="text-silver">
          {product.status === "demonstrativo" ? "item ilustrativo, sem código" : "em identificação"}
        </span>
      )}
    </div>
  );
}
