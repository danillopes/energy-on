import Image from "next/image";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

/**
 * Logo oficial da Energy On.
 * `compact` = “Energy on” (cabeçalho); `full` = com “Iluminação / Automação” e “RM Materiais Elétricos”.
 */
export function Logo({
  variant = "compact",
  className,
  priority = false,
}: {
  variant?: "compact" | "full";
  className?: string;
  priority?: boolean;
}) {
  const logo = variant === "full" ? site.logo.full : site.logo.wordmark;
  return (
    <Image
      src={logo.src}
      alt={variant === "full" ? `${site.name} — ${site.segments} — ${site.legalName}` : site.name}
      width={logo.width}
      height={logo.height}
      unoptimized
      preload={priority}
      className={cn(variant === "full" ? "h-auto w-56 sm:w-64" : "h-8 w-auto lg:h-9", className)}
    />
  );
}
