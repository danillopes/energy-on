import { site } from "@/config/site";
import { brandName, type ResolvedProduct } from "@/data/catalog";

/** Monta um link oficial wa.me com a mensagem corretamente codificada. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const WHATSAPP_GENERAL_MESSAGE =
  "Olá! Vim pelo site da Energy On e gostaria de falar com um especialista em iluminação.";

export const WHATSAPP_QUOTE_MESSAGE =
  "Olá! Vim pelo site da Energy On e gostaria de solicitar um orçamento.";

/** Link da página do produto, já com a variante escolhida. */
export function productUrl(resolved: ResolvedProduct, absolute = true): string {
  const { product, variant } = resolved;
  const many = (product.variants?.length ?? 0) > 1;
  const path = `/produtos/${product.slug}${variant && many ? `?variante=${encodeURIComponent(variant.id)}` : ""}`;
  return absolute ? `${site.url}${path}` : path;
}

/**
 * Mensagem do botão “Consultar especialista”, com os dados exatos do produto
 * (e da variante escolhida). O código vai idêntico ao do fabricante; se ainda
 * não houver código confirmado, a mensagem diz isso em vez de arriscar um.
 *
 *   Olá! Estava navegando pelo catálogo da Energy On e gostaria de saber mais sobre este produto:
 *
 *   Produto: Pendente Cosmos 60
 *   Marca: GMH Trade
 *   Código: P-COSMOS-60-GOLD
 *   Coleção: Cosmos
 *   Cor: Gold
 *
 *   Gostaria de consultar a disponibilidade e o valor deste modelo.
 *
 *   https://energy-on.vercel.app/produtos/gmh-pendente-cosmos?variante=60-gold
 */
export function productInquiryMessage(resolved: ResolvedProduct): string {
  const { product } = resolved;
  const brand = brandName(product);
  const lines = [
    "Olá! Estava navegando pelo catálogo da Energy On e gostaria de saber mais sobre este produto:",
    "",
    `Produto: ${resolved.name}`,
  ];
  if (brand) lines.push(`Marca: ${brand}`);
  if (resolved.sku) lines.push(`Código: ${resolved.sku}`);
  else if (product.status === "demonstrativo") lines.push(`Código: sem código de fabricante (foto ilustrativa do site, ref. ${product.id})`);
  else lines.push(`Código: ainda não confirmado (ref. interna ${product.id})`);
  if (product.collection) lines.push(`Coleção: ${product.collection}`);
  if (resolved.color) lines.push(`Cor: ${resolved.color}`);
  if (resolved.dimensions) lines.push(`Dimensões: ${resolved.dimensions}`);
  lines.push("", "Gostaria de consultar a disponibilidade e o valor deste modelo.", "", productUrl(resolved));
  return lines.join("\n");
}

export function productInquiryLink(resolved: ResolvedProduct): string {
  return whatsappLink(productInquiryMessage(resolved));
}
