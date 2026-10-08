/**
 * Configuração central da marca Energy On.
 * Tudo que é contato, rede social, endereço ou navegação mora aqui —
 * altere neste arquivo e o site inteiro acompanha.
 */

export const site = {
  name: "Energy On",
  legalName: "RM Materiais Elétricos",
  segments: "Iluminação / Automação",
  tagline: "A iluminação transforma espaços. Nós transformamos ambientes.",
  description:
    "Energy On — iluminação decorativa e soluções para ambientes: lustres, pendentes, arandelas, spots, trilhos, fitas LED e projetos para salas, quartos, cozinhas, banheiros e áreas externas.",
  /** Defina NEXT_PUBLIC_SITE_URL no ambiente de produção (ex.: https://www.energyon.com.br). */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
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
    handle: "" as string, // ex.: "energyon.iluminacao"
    get url() {
      return this.handle ? `https://www.instagram.com/${this.handle}/` : "";
    },
  },

  /**
   * Endereço da loja. Deixe `street` vazio até ter os dados confirmados —
   * o rodapé mostra um aviso neutro em vez de inventar um endereço.
   */
  address: {
    street: "" as string,
    district: "" as string,
    city: "" as string,
    state: "" as string,
    postalCode: "" as string,
    mapsUrl: "" as string,
    hours: "" as string,
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
