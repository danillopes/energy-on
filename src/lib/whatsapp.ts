import { site } from "@/config/site";

/** Monta um link oficial wa.me com a mensagem corretamente codificada. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const WHATSAPP_GENERAL_MESSAGE =
  "Olá! Vim pelo site da Energy On e gostaria de falar com um especialista em iluminação.";

export const WHATSAPP_QUOTE_MESSAGE =
  "Olá! Vim pelo site da Energy On e gostaria de solicitar um orçamento.";

type ProductRef = { name: string; slug: string; brand?: string; ref?: string };

/**
 * Mensagem de orçamento de um produto, já pronta no WhatsApp do cliente.
 * Marca e código entram quando o produto tiver esses dados; o link leva o
 * atendente direto à página da peça (com foto), sem anexos.
 *
 * Exemplo:
 *   Olá! Gostaria de fazer um orçamento do produto:
 *
 *   *Pendente Cúpula*
 *   Marca: Nordecor
 *   Código: PD-1234
 *
 *   Vi no site: https://energy-on.vercel.app/produtos/pendente-cupula
 */
export function productQuoteMessage(product: ProductRef): string {
  const lines = ["Olá! Gostaria de fazer um orçamento do produto:", "", `*${product.name}*`];
  if (product.brand) lines.push(`Marca: ${product.brand}`);
  if (product.ref) lines.push(`Código: ${product.ref}`);
  lines.push("", `Vi no site: ${site.url}/produtos/${product.slug}`);
  return lines.join("\n");
}

export function productQuoteLink(product: ProductRef): string {
  return whatsappLink(productQuoteMessage(product));
}
