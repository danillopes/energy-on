"use client";

import type { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/cn";

/**
 * Moldura de foto que “acende” quando entra na tela.
 * Só anima transform e filter — sem layout shift. Respeita movimento reduzido via CSS.
 */
export function LightUp({ children, className }: { children: ReactNode; className?: string }) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  return (
    <div ref={ref} data-inview={inView} className={cn("light-up", className)}>
      <div className="light-up__media absolute inset-0">{children}</div>
    </div>
  );
}
