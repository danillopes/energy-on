"use client";

import { useCallback, useEffect, useState } from "react";
import type { Product } from "@/data/catalog";
import { ProductDetail } from "./ProductDetail";

/** Página do produto: a variante escolhida fica na URL (?variante=gold) para compartilhar. */
export function ProductPageDetail({ product }: { product: Product }) {
  const [variant, setVariant] = useState<string | undefined>();

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("variante");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- lê a URL só depois da hidratação (página estática)
    if (id && product.variants?.some((v) => v.id === id)) setVariant(id);
  }, [product]);

  const change = useCallback((id: string) => {
    setVariant(id);
    const url = new URL(window.location.href);
    url.searchParams.set("variante", id);
    window.history.replaceState(window.history.state, "", url);
  }, []);

  return <ProductDetail product={product} layout="page" variantId={variant} onVariantChange={change} />;
}
