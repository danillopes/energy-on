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
      src: "/media/ambiente-sala.webp",
      alt: "Living contemporâneo de alto padrão com iluminação em camadas, sanca perimetral em LED quente, painel ripado e poltrona bouclé no canto de leitura",
      ratio: 1.33,
      demo: true,
    },
    quarto: {
      src: "/media/ambiente-quarto.webp",
      alt: "Suíte master acolhedora à noite com cabeceira retroiluminada em LED quente, pendentes em latão e vista panorâmica",
      ratio: 1.33,
      demo: true,
    },
    cozinha: {
      src: "/media/ambiente-cozinha.webp",
      alt: "Cozinha gourmet contemporânea com pendentes sobre a ilha em mármore, trilho de spots e perfil LED sob armários",
      ratio: 1.33,
      demo: true,
    },
    banheiro: {
      src: "/media/ambiente-banheiro.webp",
      alt: "Banheiro spa de luxo com espelho orgânico retroiluminado, pendentes em latão e nicho com luz indireta no box",
      ratio: 1.33,
      demo: true,
    },
    externa: {
      src: "/media/ambiente-externa.webp",
      alt: "Fachada arquitetônica e área externa ao entardecer com balizadores de piso, degraus iluminados e refletores em árvores",
      ratio: 1.33,
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
