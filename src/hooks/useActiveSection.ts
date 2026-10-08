"use client";

import { useEffect, useState } from "react";

/** Retorna o id da seção que ocupa a faixa central da tela. */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting);
        const current = ids.find((id) => visible.get(id));
        if (current) setActive(current);
      },
      // Faixa estreita no meio da tela: só uma seção “acende” por vez.
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
