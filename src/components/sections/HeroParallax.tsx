"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Movimento sutil da fotografia do hero durante a rolagem.
 * Um único listener passivo, limitado a um quadro por vez com requestAnimationFrame,
 * e desligado assim que o hero sai da tela ou com “movimento reduzido”.
 */
export function HeroParallax({ children }: { children: ReactNode }) {
  const layer = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = layer.current;
    if (!node || reduced) return;
    let frame = 0;
    let visible = true;

    const update = () => {
      frame = 0;
      const y = Math.min(window.scrollY, window.innerHeight);
      node.style.transform = `translate3d(0, ${y * 0.22}px, 0) scale(${1.04 + y * 0.00005})`;
    };
    const onScroll = () => {
      if (visible && !frame) frame = requestAnimationFrame(update);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(node.parentElement ?? node);
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return (
    <div ref={layer} className="absolute inset-0 will-change-transform" style={{ transform: "scale(1.04)" }}>
      {children}
    </div>
  );
}
