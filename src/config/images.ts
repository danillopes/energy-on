/**
 * Biblioteca de imagens do site.
 *
 * As fotos abaixo são DEMONSTRATIVAS (Unsplash, licença de uso livre) e servem
 * apenas para compor o layout. Substitua pelas fotos próprias da Energy On:
 *   1. salve os arquivos em /public/media (ex.: /media/hero.avif);
 *   2. troque o `src` correspondente aqui por "/media/hero.avif";
 *   3. ajuste o `alt` para descrever a foto real.
 * Nenhum componente precisa ser alterado.
 */

export type Photo = {
  src: string;
  alt: string;
  /** Proporção original aproximada (largura / altura) — evita layout shift. */
  ratio?: number;
  demo?: boolean;
};

const u = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const photos = {
  hero: {
    src: u("1770816307454-892c27fc625e"),
    alt: "Sala de jantar à noite com pendentes pretos alinhados sobre a mesa, projetando luz âmbar na parede",
    ratio: 1.5,
    demo: true,
  },
  about: {
    src: u("1581784878214-8d5596b98a01"),
    alt: "Pendentes esféricos de vidro diante de uma parede revestida em madeira escura, com nicho iluminado",
    ratio: 0.8,
    demo: true,
  },
  rooms: {
    sala: {
      src: u("1773098587088-f0a3aaab48a8"),
      alt: "Sala de estar aconchegante com sofá, poltronas e luz quente difusa ao entardecer",
      demo: true,
    },
    quarto: {
      src: u("1616594039964-ae9021a400a0"),
      alt: "Quarto moderno com cama clara, abajures nas mesas de cabeceira e lustre dourado de hastes",
      demo: true,
    },
    cozinha: {
      src: u("1730991568658-ad8638395a9e"),
      alt: "Cozinha ampla com ilha central iluminada por um lustre suspenso",
      demo: true,
    },
    banheiro: {
      src: u("1742134131017-44d377a611b1"),
      alt: "Banheiro contemporâneo com iluminação suave valorizando bancada e revestimentos",
      demo: true,
    },
    externa: {
      src: u("1782914562530-62a07748d4e6"),
      alt: "Escada externa moderna marcada por pontos de luz discretos à noite",
      demo: true,
    },
  },
  instagram: [
    { src: u("1663811397057-8bd306b4dcad"), alt: "Quarto à meia-luz com abajur aceso e vista para as montanhas", demo: true },
    { src: u("1770682527373-bfc83796e7fd"), alt: "Teto com claraboias e linhas de luz geométricas", demo: true },
    { src: u("1746076782647-c29780073cc9"), alt: "Canto de leitura iluminado por luminária de piso em ambiente escuro", demo: true },
    { src: u("1609280069678-ab9ef26a0b05"), alt: "Cozinha clara com pendentes sobre a bancada e a mesa", demo: true },
    { src: u("1648415198825-7c805bfa043e"), alt: "Quarto à meia-luz com abajures acesos", demo: true },
    { src: u("1785162434673-835bb98ad923"), alt: "Balizador iluminando caminho de jardim à noite", demo: true },
  ],
} satisfies {
  hero: Photo;
  about: Photo;
  rooms: Record<string, Photo>;
  instagram: Photo[];
};

export const productPhoto = (id: string) => u(id);
