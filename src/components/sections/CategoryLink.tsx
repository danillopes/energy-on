"use client";

import type { ReactNode } from "react";
import type { CategoryId } from "@/data/taxonomy";
import { requestCatalogFilter } from "./catalog-bus";

/** Link de categoria: na mesma página, filtra o catálogo sem recarregar; fora dela, funciona como link normal. */
export function CategoryLink({ id, children, className }: { id: CategoryId; children: ReactNode; className?: string }) {
  return (
    <a
      href={`/?categoria=${id}#produtos`}
      className={className}
      onClick={(event) => {
        if (!document.getElementById("produtos")) return;
        event.preventDefault();
        requestCatalogFilter({ category: id });
      }}
    >
      {children}
    </a>
  );
}
