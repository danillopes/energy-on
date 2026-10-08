import { site } from "@/config/site";

/**
 * URL do visualizador 360° da loja.
 *
 * Padrão (sem chave): o mesmo código que o Google Maps gera em
 * "Compartilhar → Incorporar um mapa" para fotos 360°. Não exige API key.
 *
 * Alternativa: se NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY estiver definida, usa a
 * Maps Embed API (modo streetview). Essa chave é pública por natureza (fica no
 * HTML): restrinja-a no Google Cloud a "Maps Embed API" e ao domínio do site.
 */
export function tourEmbedUrl(): string {
  const { panoId, lat, lng, heading, pitch } = site.tour;
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY;

  if (key) {
    const params = new URLSearchParams({
      key,
      pano: panoId,
      heading: String(heading),
      pitch: String(pitch),
      fov: "90",
      language: "pt-BR",
    });
    return `https://www.google.com/maps/embed/v1/streetview?${params.toString()}`;
  }

  // !6m8!1m7!1s<pano>!2m2!1d<lat>!2d<lng>!3f<heading>!4f<pitch>!5f<zoom>
  return `https://www.google.com/maps/embed?pb=!4v1728400000000!6m8!1m7!1s${panoId}!2m2!1d${lat}!2d${lng}!3f${heading}!4f${pitch}!5f0.78&hl=pt-BR`;
}
