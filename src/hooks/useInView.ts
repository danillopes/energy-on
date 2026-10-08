"use client";

import { useEffect, useRef, useState } from "react";

/** Observa quando um elemento entra na tela (uma vez, por padrão). */
export function useInView<T extends Element>(options: IntersectionObserverInit & { once?: boolean } = {}) {
  const { once = true, root = null, rootMargin = "0px 0px -10% 0px", threshold = 0.15 } = options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { root, rootMargin, threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [once, root, rootMargin, threshold]);

  return [ref, inView] as const;
}
