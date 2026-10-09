import type { Product, ProductSpecs, ResolvedProduct } from "@/data/catalog";

export const SPEC_LABELS: Record<keyof ProductSpecs, string> = {
  color: "Cor",
  dimensions: "Dimensões",
  material: "Material",
  cord: "Fio",
  power: "Potência",
  lumens: "Fluxo luminoso",
  colorTemperature: "Temperatura de cor",
  lightSource: "Fonte de luz",
  voltage: "Tensão",
  dimmable: "Dimerização",
  ip: "Proteção",
};

/** Nome do seletor de variantes conforme o que muda entre elas. */
export function variantLegend(product: Product): string {
  const variants = product.variants ?? [];
  if (variants.every((v) => v.color)) return "Cor";
  if (variants.every((v) => /^\d+$/.test(v.id))) return "Tamanho";
  return "Opção";
}

/**
 * Aviso quando a foto não é exatamente da variante escolhida — a foto nunca é
 * trocada por outra parecida; o cliente é avisado.
 */
export function photoNote({ product, variant, image }: ResolvedProduct): string | null {
  if (!image || (product.variants?.length ?? 0) < 2 || !variant) return null;
  const differsByColor = product.variants!.some((v) => v.color);
  if (!differsByColor) return null;
  if (image.showsVariant) {
    if (image.showsVariant === variant.id) return null;
    const shown = product.variants!.find((v) => v.id === image.showsVariant);
    return shown ? `A foto mostra o acabamento ${shown.label}.` : null;
  }
  return "A foto mostra um dos acabamentos disponíveis.";
}
