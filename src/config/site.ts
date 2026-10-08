/**
 * Configuração central da marca Energy On.
 * Tudo que é contato, rede social, endereço ou navegação mora aqui —
 * altere neste arquivo e o site inteiro acompanha.
 */

function resolveSiteUrl(): string {
  const envUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "") ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
    "http://localhost:3000";

  const normalized = envUrl.startsWith("http://") || envUrl.startsWith("https://")
    ? envUrl
    : `https://${envUrl}`;

  return normalized.replace(/\/$/, "");
}

export const site = {
  name: "Energy On",
  legalName: "RM Materiais Elétricos",
  segments: "Iluminação / Automação",
  tagline: "A iluminação transforma espaços. Nós transformamos ambientes.",
  description:
    "Energy On — iluminação decorativa e soluções para ambientes: lustres, pendentes, arandelas, spots, trilhos, fitas LED e projetos para salas, quartos, cozinhas, banheiros e áreas externas.",
  /** URL pública do site com fallback automático para VERCEL_PROJECT_PRODUCTION_URL / VERCEL_URL. */
  url: resolveSiteUrl(),
  locale: "pt_BR",

  /**
   * Logo oficial (extraído da arte da loja, com fundo transparente).
   * - wordmark: versão compacta para o cabeçalho
   * - full: versão completa com “Iluminação / Automação” e “RM Materiais Elétricos”
   * Para trocar por um SVG vetorial, salve em /public/brand e altere os caminhos.
   */
  logo: {
    wordmark: { src: "/brand/energy-on-wordmark.webp", width: 520, height: 153 },
    full: { src: "/brand/energy-on-logo.webp", width: 786, height: 280 },
  },

  contact: {
    /** Somente dígitos, com DDI e DDD — formato exigido pelo wa.me */
    whatsapp: "5551996659170",
    phoneDisplay: "+55 (51) 99665-9170",
    phoneShort: "(51) 99665-9170",
    phoneHref: "tel:+5551996659170",
  },

  /**
   * Preencha quando o perfil oficial for confirmado.
   * Enquanto `handle` estiver vazio, os botões do Instagram ficam ocultos
   * e a seção mostra apenas a prévia demonstrativa.
   */
  instagram: {
    handle: "rmenergyon" as string,
    get url() {
      return this.handle ? `https://www.instagram.com/${this.handle}/` : "";
    },
  },

  /**
   * Endereço da loja. Deixe `street` vazio até ter os dados confirmados —
   * o rodapé mostra um aviso neutro em vez de inventar um endereço.
   */
  address: {
    street: "Av. Beira Rio, 1370" as string,
    district: "" as string,
    city: "Passo de Torres" as string,
    state: "SC" as string,
    postalCode: "" as string,
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Av.+Beira+Rio%2C+1370%2C+Passo+de+Torres+-+SC" as string,
    hours: "" as string,
  },

  /**
   * Passeio virtual 360° da loja — DESATIVADO (seção retirada da página a pedido da loja).
   * Para reativar, volte a incluir <StoreTour /> em src/app/page.tsx. (fotoesfera publicada no Google Maps pela Insight View).
   * - panoId: ID oficial do panorama, copiado da URL do Google Maps (trecho "!1s…").
   * - O embed usa o código de incorporação padrão do Google Maps, sem chave de API.
   * - Opcional: defina NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY para usar a Maps Embed API (ver README).
   */
  tour: {
    panoId: "CIHM0ogKEICAgIC2ubSXMg",
    lat: -29.3270693,
    lng: -49.7267683,
    /** 0 = começa olhando para a fachada da loja. */
    heading: 0,
    pitch: 0,
    /** Abre o mesmo panorama no app/site do Google Maps (tela cheia nativa no iPhone). */
    mapsUrl:
      "https://www.google.com/maps/@-29.3272505,-49.7266739,3a,75y,90t/data=!3m4!1e1!3m2!1sCIHM0ogKEICAgIC2ubSXMg!2e10",
    /** Ficha da loja no Google Maps. */
    placeUrl: "https://maps.google.com/?cid=3867986044701926540",
    preview: { src: "/media/loja-fachada.webp", alt: "Fachada da Energy On Iluminação e Automação, na Av. Beira Rio, em Passo de Torres" },
  },

  nav: [
    { id: "inicio", label: "Início" },
    { id: "ambientes", label: "Ambientes" },
    { id: "produtos", label: "Produtos" },
    { id: "inspiracoes", label: "Inspirações" },
    { id: "sobre", label: "Sobre nós" },
    { id: "contato", label: "Contato" },
  ],
} as const;

export type NavItem = (typeof site.nav)[number];
