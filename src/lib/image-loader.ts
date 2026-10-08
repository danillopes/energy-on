/**
 * Loader de imagens do next/image.
 * - Imagens do Unsplash (demonstrativas): o CDN entrega no tamanho pedido
 *   e no melhor formato aceito pelo navegador (AVIF/WebP) com `auto=format`.
 * - Imagens locais (/public): servidas como estão — exporte-as já em WebP/AVIF.
 */
type LoaderArgs = { src: string; width: number; quality?: number };

export default function imageLoader({ src, width, quality }: LoaderArgs): string {
  if (src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 70));
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", url.searchParams.get("fit") ?? "max");
    return url.toString();
  }
  // Arquivos locais: a largura vira só uma chave de cache.
  if (src.startsWith("/")) return src.includes("?") ? `${src}&w=${width}` : `${src}?w=${width}`;
  // Outros CDNs (ex.: Instagram) usam URLs assinadas — não podem ser alteradas.
  return src;
}
