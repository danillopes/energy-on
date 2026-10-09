import type { RoomId } from "../taxonomy.ts";
import { getBrand } from "./brands.ts";
import { demoProducts } from "./products-demo.ts";
import { gmhProducts } from "./products-gmh.ts";
import type { Product, ProductSpecs, ResolvedProduct } from "./types.ts";
import { validateCatalog } from "./validate.ts";

export * from "./types.ts";
export { brands, catalogs, getBrand, getCatalogSource } from "./brands.ts";
export { validateCatalog } from "./validate.ts";

/**
 * Ponto único de leitura do catálogo. Para receber um catálogo novo, crie
 * `products-<marca>.ts` e acrescente aqui — a interface não muda.
 * Produtos de fabricante vêm antes dos itens demonstrativos.
 */
export const allProducts: Product[] = [...gmhProducts, ...demoProducts];

const errors = validateCatalog(allProducts).filter((issue) => issue.level === "erro");
if (errors.length) {
  throw new Error(
    `Catálogo inconsistente:\n${errors.map((e) => `  [${e.productId}] ${e.message}`).join("\n")}`,
  );
}

const bySlug = new Map(allProducts.map((product) => [product.slug, product]));

export function getProducts(): Product[] {
  return allProducts;
}

export function getProduct(slug: string): Product | undefined {
  return bySlug.get(slug);
}

export function getProductsByRoom(room: RoomId, limit = 4): Product[] {
  return allProducts.filter((product) => product.image && product.rooms.includes(room)).slice(0, limit);
}

export const SPEC_KEYS: Array<keyof ProductSpecs> = [
  "color", "dimensions", "material", "cord", "power", "lumens", "colorTemperature", "lightSource", "voltage", "dimmable", "ip",
];

/** Aplica a variante escolhida (ou a primeira) sobre os dados do produto. */
export function resolveProduct(product: Product, variantId?: string | null): ResolvedProduct {
  const variant = product.variants?.find((v) => v.id === variantId) ?? product.variants?.[0];
  const specs: ProductSpecs = {};
  for (const key of SPEC_KEYS) {
    const value = variant?.[key] ?? product[key];
    if (value) specs[key] = value;
  }
  return {
    ...specs,
    product,
    variant,
    name: variant?.name ?? product.name,
    sku: variant?.sku ?? product.sku,
    image: variant?.image ?? product.image,
    source: variant?.source ?? product.source,
    status: variant?.status ?? product.status,
  };
}

export const brandName = (product: Product) => getBrand(product.brandId)?.name;

/** Texto sem acentos, minúsculo e sem pontuação — para a busca por nome ou código. */
export function normalizeSearch(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** Tudo o que a busca encontra: nome, marca, coleção e todos os códigos (com e sem hífen). */
export function searchIndex(product: Product): string {
  const skus = [product.sku, ...(product.variants ?? []).map((v) => v.sku)].filter(Boolean) as string[];
  const names = (product.variants ?? []).map((v) => v.name ?? "");
  const text = [product.name, brandName(product), product.collection, ...names, ...skus].join(" ");
  return `${normalizeSearch(text)} ${skus.map((s) => normalizeSearch(s).replace(/ /g, "")).join(" ")}`;
}
