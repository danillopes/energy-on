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

/** URL pública e leve da foto (as do Unsplash recebem largura fixa). */
function photoUrl(src: string): string {
  if (src.startsWith("/")) return `${site.url}${src}`;
  if (src.startsWith("https://images.unsplash.com/")) return `${src}?w=1080&auto=format`;
  return src;
}

type ProductRef = { name: string; slug: string; image?: string };

/**
 * Mensagem de orçamento de um produto. Inclui o link da página do produto
 * e, quando houver, a URL pública da foto — o atendente abre o link e
 * identifica o item. (O WhatsApp não anexa a imagem automaticamente.)
 */
export function productQuoteMessage(product: ProductRef): string {
  const link = `${site.url}/produtos/${product.slug}`;
  const lines = [
    `Olá! Tenho interesse no produto ${product.name} da Energy On. Gostaria de saber mais informações e solicitar um orçamento.`,
    `Referência: ${link}`,
  ];
  if (product.image) lines.push(`Foto: ${photoUrl(product.image)}`);
  return lines.join("\n");
}

export function productQuoteLink(product: ProductRef): string {
  return whatsappLink(productQuoteMessage(product));
}
