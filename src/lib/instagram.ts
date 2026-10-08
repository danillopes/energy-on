import "server-only";
import { photos } from "@/config/images";

/**
 * Integração com a Instagram Graph API (Meta).
 *
 * Requisitos para ativar:
 *  - conta profissional (Business/Creator) do Instagram vinculada a uma Página do Facebook;
 *  - app na Meta for Developers com a permissão `instagram_basic` (ou Instagram API with Instagram Login);
 *  - token de longa duração (expira em ~60 dias — renove periodicamente);
 *  - variáveis INSTAGRAM_USER_ID e INSTAGRAM_ACCESS_TOKEN no servidor (nunca no navegador).
 *
 * Sem essas variáveis, a função devolve as imagens demonstrativas e `live: false`,
 * e a interface deixa claro que é uma prévia.
 */

export type InstagramPost = {
  id: string;
  image: string;
  alt: string;
  permalink?: string;
};

export type InstagramFeed = { live: boolean; posts: InstagramPost[] };

type GraphMedia = {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
};

const fallback: InstagramFeed = {
  live: false,
  posts: photos.instagram.map((photo, index) => ({
    id: `demo-${index}`,
    image: photo.src,
    alt: photo.alt,
  })),
};

export async function getInstagramFeed(limit = 6): Promise<InstagramFeed> {
  const userId = process.env.INSTAGRAM_USER_ID;
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!userId || !token) return fallback;

  try {
    const fields = "id,caption,media_type,media_url,thumbnail_url,permalink";
    const url = `https://graph.facebook.com/v21.0/${userId}/media?fields=${fields}&limit=${limit}&access_token=${token}`;
    // Revalida a cada hora: respeita os limites de requisição da plataforma.
    const response = await fetch(url, { next: { revalidate: 3600 } });
    if (!response.ok) return fallback;
    const json = (await response.json()) as { data?: GraphMedia[] };
    const posts: InstagramPost[] = [];
    for (const media of json.data ?? []) {
      const image = media.media_type === "VIDEO" ? media.thumbnail_url : media.media_url;
      if (!image) continue;
      posts.push({
        id: media.id,
        image,
        alt: media.caption?.slice(0, 120) || "Publicação da Energy On no Instagram",
        permalink: media.permalink,
      });
    }
    return posts.length ? { live: true, posts } : fallback;
  } catch {
    return fallback;
  }
}
