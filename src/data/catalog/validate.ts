import { getBrand, getCatalogSource } from "./brands.ts";
import type { Product } from "./types.ts";

export type CatalogIssue = {
  level: "erro" | "aviso";
  productId: string;
  message: string;
};

/** Normaliza códigos para comparar duplicados (P-COSMOS-60-GOLD == p cosmos 60 gold). */
const skuKey = (sku: string) => sku.toUpperCase().replace(/[^A-Z0-9]/g, "");

/**
 * Confere a consistência do catálogo. Erros impedem o build (`getProducts`);
 * avisos aparecem no relatório (`npm run catalog:audit`).
 */
export function validateCatalog(products: Product[]): CatalogIssue[] {
  const issues: CatalogIssue[] = [];
  const add = (level: CatalogIssue["level"], productId: string, message: string) =>
    issues.push({ level, productId, message });

  const seen = { id: new Map<string, string>(), slug: new Map<string, string>(), sku: new Map<string, string>(), image: new Map<string, string>() };
  const claim = (kind: keyof typeof seen, key: string, owner: string, label: string, level: CatalogIssue["level"] = "erro") => {
    const previous = seen[kind].get(key);
    if (previous && previous !== owner) add(level, owner, `${label} repetido (também em ${previous}): ${key}`);
    else seen[kind].set(key, owner);
  };

  for (const product of products) {
    const id = product.id;
    if (!/^EO-\d{4}$/.test(id)) add("erro", id, "id interno fora do padrão EO-0000");
    claim("id", id, id, "id interno");
    claim("slug", product.slug, id, "slug");

    if (product.brandId && !getBrand(product.brandId)) add("erro", id, `marca não cadastrada: ${product.brandId}`);
    if (product.source?.catalogId && !getCatalogSource(product.source.catalogId))
      add("erro", id, `catálogo não cadastrado: ${product.source.catalogId}`);

    const isDemo = product.status === "demonstrativo";
    const skus = [product.sku, ...(product.variants ?? []).map((v) => v.sku)].filter(Boolean) as string[];

    if (isDemo) {
      if (product.brandId) add("erro", id, "item demonstrativo não pode ter marca");
      if (skus.length) add("erro", id, "item demonstrativo não pode ter código de fabricante");
    } else {
      if (!product.brandId) add("erro", id, "produto real sem marca");
      if (!product.image) add("aviso", id, "sem foto (aguardando foto oficial)");
      if (!skus.length) add("aviso", id, "pendente de identificação: sem código do fabricante");
      if (!product.source?.catalogId && !product.source?.url) add("aviso", id, "sem catálogo de origem");
    }

    if (product.status === "confirmado") {
      if (!skus.length) add("erro", id, "status confirmado sem código");
      if (product.source?.page == null && !product.source?.url) add("erro", id, "status confirmado sem página/link de referência");
    }
    if (product.status === "informado") add("aviso", id, "código informado pela loja — conferir no catálogo e registrar a página");

    for (const sku of skus) claim("sku", skuKey(sku), id, "código");

    const variantIds = new Set<string>();
    for (const variant of product.variants ?? []) {
      if (variantIds.has(variant.id)) add("erro", id, `variante repetida: ${variant.id}`);
      variantIds.add(variant.id);
      if (!isDemo && !variant.sku) add("aviso", id, `variante ${variant.id} sem código`);
      if (variant.image) claim("image", variant.image.src, id, "foto", "erro");
    }

    if (product.image) claim("image", product.image.src, id, "foto", "erro");
    if (product.image && !product.image.alt.trim()) add("erro", id, "foto sem texto alternativo");
    if (product.image?.showsVariant && !product.variants?.some((v) => v.id === product.image!.showsVariant))
      add("erro", id, `foto aponta para variante inexistente: ${product.image.showsVariant}`);
  }
  return issues;
}
