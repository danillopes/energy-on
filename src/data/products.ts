import { productPhoto } from "@/config/images";
import type { CategoryId, FinishId, RoomId, StyleId } from "./taxonomy";

/**
 * CATÁLOGO DE EXEMPLO
 * -------------------
 * Estes itens são fictícios e existem só para demonstrar o catálogo.
 * Não há preços, marcas, estoque nem especificações técnicas — esses dados
 * devem vir do catálogo real da loja (planilha, CMS ou banco de dados).
 *
 * Para integrar: implemente `getProducts()` buscando da sua fonte e mantenha
 * o formato `Product`. Os componentes não precisam mudar.
 */

export type ProductGalleryItem = {
  src: string;
  alt: string;
  title: string;
  subtitle?: string;
};

export type ProductSpecs = {
  dimensoes?: string;
  material?: string;
  soquetes?: string;
  temperatura?: string;
  tensao?: string;
  potencia?: string;
};

export type Product = {
  slug: string;
  name: string;
  category: CategoryId;
  rooms: RoomId[];
  style: StyleId;
  finish: FinishId;
  image: string;
  imageAlt: string;
  summary: string;
  /** true = item demonstrativo, sinalizado na interface */
  demo: boolean;
  gallery?: ProductGalleryItem[];
  specs?: ProductSpecs;
};

const p = (item: Omit<Product, "demo">): Product => ({ ...item, demo: true });

const products: Product[] = [
  p({
    slug: "lustre-aurea",
    name: "Lustre Áurea Contemporâneo",
    category: "lustres",
    rooms: ["sala"],
    style: "contemporaneo",
    finish: "dourado",
    image: "/media/lustre-aurea-jantar.jpg",
    imageAlt: "Lustre contemporâneo Áurea com hastes em latão escovado e globos de vidro âmbar acesos sobre mesa de jantar em mármore",
    summary: "Peça escultural contemporânea com estrutura ramificada em latão escovado e globos de vidro âmbar soprado artesanalmente.",
    gallery: [
      {
        src: "/media/lustre-aurea-jantar.jpg",
        alt: "Lustre Áurea suspenso sobre mesa de jantar em mármore com iluminação quente",
        title: "Harmonia na Mesa de Jantar",
        subtitle: "Posicionado a 80 cm do tampo para jantares intimistas sem ofuscamento",
      },
      {
        src: "/media/lustre-aurea-living.jpg",
        alt: "Lustre Áurea como protagonista em living amplo com painel ripado e pé-direito alto",
        title: "Living & Pé-Direito Generoso",
        subtitle: "Composição com madeira ripada e sanca perimetral indireta",
      },
      {
        src: "/media/lustre-aurea-macro.jpg",
        alt: "Close-up macro do globo de vidro âmbar trabalhado e soquete em latão escovado",
        title: "Detalhe do Vidro Âmbar & Latão",
        subtitle: "Vidro artesanal com ondas ópticas e filamento quente de 2700K",
      },
      {
        src: "/media/lustre-aurea-baixo.jpg",
        alt: "Perspectiva zenital de baixo para cima mostrando a geometria radial do lustre",
        title: "Vista de Baixo (Geometria Radial)",
        subtitle: "Distribuição escultural em 360° com sombras suaves no teto",
      },
      {
        src: "/media/lustre-aurea-dia.jpg",
        alt: "Lustre Áurea desligado durante o dia com luz natural entrando pelas janelas",
        title: "Escultura à Luz Natural",
        subtitle: "Presença arquitetônica refinada mesmo com a iluminação desligada",
      },
      {
        src: "/media/lustre-aurea-intimista.jpg",
        alt: "Composição intimista com reflexos do lustre em taças e tampo de mármore à noite",
        title: "Atmosfera Noturna & Reflexos",
        subtitle: "Efeito de luz aconchegante para recepções e jantares sofisticados",
      },
    ],
    specs: {
      dimensoes: "Ø 120 cm × Altura 65 cm (cabo ajustável até 2,00 m)",
      material: "Latão escovado de alta densidade e vidro âmbar soprado artesanal",
      soquetes: "8 soquetes E27 (Lâmpadas de filamento LED inclusas)",
      temperatura: "2700K (Branco quente suave acolhedor)",
      tensao: "Bivolt automático (110V / 220V)",
      potencia: "8× 4W LED (Equivalente a 320W incandescente)",
    },
  }),
  p({
    slug: "lustre-halo",
    name: "Lustre Halo",
    category: "lustres",
    rooms: ["sala"],
    style: "classico",
    finish: "dourado",
    image: productPhoto("1627306411131-358d6d0fd2cb"),
    imageAlt: "Lustre clássico de cristais com braços em formato de vela, aceso",
    summary: "Peça central para salas de pé-direito generoso, com brilho que se espalha pelo teto.",
  }),
  p({
    slug: "lustre-aurora",
    name: "Lustre Aurora",
    category: "lustres",
    rooms: ["sala", "quarto"],
    style: "classico",
    finish: "cromado",
    image: productPhoto("1531762948975-73032b7b61f4"),
    imageAlt: "Lustres de cristal acesos em um salão",
    summary: "Brilho facetado para salas de jantar e quartos com proposta clássica.",
  }),
  p({
    slug: "pendente-cupula",
    name: "Pendente Cúpula",
    category: "pendentes",
    rooms: ["cozinha", "sala"],
    style: "contemporaneo",
    finish: "cobre",
    image: productPhoto("1540932239986-30128078f3c5"),
    imageAlt: "Três pendentes em formato de cúpula com acabamento acobreado, acesos",
    summary: "Composição em alturas diferentes para ilhas, bancadas e mesas de jantar.",
  }),
  p({
    slug: "pendente-noir",
    name: "Pendente Noir",
    category: "pendentes",
    rooms: ["cozinha"],
    style: "industrial",
    finish: "preto",
    image: productPhoto("1628752039723-35fd10d4ffcd"),
    imageAlt: "Pendentes pretos acesos sobre uma mesa em ambiente escuro",
    summary: "Linhas retas e foco direcionado para bancadas de trabalho.",
  }),
  p({
    slug: "pendente-esfera",
    name: "Pendente Esfera",
    category: "pendentes",
    rooms: ["sala", "quarto"],
    style: "minimalista",
    finish: "branco",
    image: productPhoto("1779618127224-cfc3339620d3"),
    imageAlt: "Pendentes esféricos brancos com detalhes em madeira",
    summary: "Luz difusa e uniforme, ideal ao lado da cama ou sobre mesas laterais.",
  }),
  p({
    slug: "pendente-tubo",
    name: "Pendente Tubo",
    category: "pendentes",
    rooms: ["cozinha", "sala"],
    style: "contemporaneo",
    finish: "vidro",
    image: productPhoto("1760067537454-bdbd4646e559"),
    imageAlt: "Três pendentes tubulares em vidro com bolhas",
    summary: "Vidro texturizado que espalha brilho sem ofuscar.",
  }),
  p({
    slug: "plafon-linear",
    name: "Plafon Linear",
    category: "plafons",
    rooms: ["quarto", "sala"],
    style: "minimalista",
    finish: "branco",
    image: productPhoto("1632378206664-853dabd4ffb4"),
    imageAlt: "Ambiente com paredes de madeira e luminária de teto acesa",
    summary: "Iluminação geral discreta, rente ao teto.",
  }),
  p({
    slug: "lustre-galeria",
    name: "Lustre Galeria",
    category: "lustres",
    rooms: ["sala"],
    style: "classico",
    finish: "dourado",
    image: productPhoto("1630587148265-761cbd139043"),
    imageAlt: "Corredor revestido em madeira com lustres de cristal em sequência",
    summary: "Lustres em sequência para corredores longos, halls e salas de jantar.",
  }),
  p({
    slug: "arandela-facho",
    name: "Arandela Facho",
    category: "arandelas",
    rooms: ["sala", "quarto"],
    style: "moderno",
    finish: "preto",
    image: productPhoto("1762631817831-c3e7ee1b1467"),
    imageAlt: "Arandela moderna emitindo luz quente na parede",
    summary: "Desenha fachos de luz na parede e cria profundidade.",
  }),
  p({
    slug: "arandela-lanterna",
    name: "Arandela Lanterna",
    category: "arandelas",
    rooms: ["sala", "quarto"],
    style: "classico",
    finish: "preto",
    image: productPhoto("1766955863395-405e2eb6b870"),
    imageAlt: "Arandela em formato de lanterna projetando sombras na parede clara",
    summary: "Desenho clássico que projeta sombras e transforma a parede em textura.",
  }),
  p({
    slug: "arandela-espelho",
    name: "Arandela Espelho",
    category: "arandelas",
    rooms: ["banheiro"],
    style: "moderno",
    finish: "preto",
    image: productPhoto("1763485955998-a9284d042d50"),
    imageAlt: "Bancada de banheiro com cubas duplas e arandelas nas laterais do espelho",
    summary: "Luz lateral ao espelho, sem sombras no rosto.",
  }),
  p({
    slug: "spot-embutir-orbita",
    name: "Spot Órbita",
    category: "spots",
    rooms: ["sala", "cozinha", "banheiro"],
    style: "minimalista",
    finish: "preto",
    image: productPhoto("1778774470906-05d2bd4924d0"),
    imageAlt: "Corredor escuro marcado por pontos de luz embutidos",
    summary: "Fachos precisos para destacar paredes, quadros e texturas.",
  }),
  p({
    slug: "trilho-linea",
    name: "Trilho Linea",
    category: "trilhos",
    rooms: ["sala", "cozinha"],
    style: "industrial",
    finish: "preto",
    image: productPhoto("1766289496591-3d9ecfc5c1b4"),
    imageAlt: "Trilho com spots instalado entre vigas de madeira no teto",
    summary: "Spots reposicionáveis para quem muda a decoração com frequência.",
  }),
  p({
    slug: "fita-led-perfil",
    name: "Fita LED em perfil",
    category: "fitas-led",
    rooms: ["sala", "cozinha", "banheiro"],
    style: "contemporaneo",
    finish: "branco",
    image: productPhoto("1570005616859-784c0e1644c5"),
    imageAlt: "Linhas de luz LED cruzando uma parede escura",
    summary: "Linhas de luz em sancas, nichos, marcenaria e rodapés.",
  }),
  p({
    slug: "luminaria-mesa-tripe",
    name: "Luminária Tripé",
    category: "luminarias-de-mesa",
    rooms: ["quarto", "sala"],
    style: "moderno",
    finish: "madeira",
    image: productPhoto("1517991104123-1d56a6e81ed9"),
    imageAlt: "Luminária de mesa com base tripé de madeira e cúpula de tecido acesa",
    summary: "Luz de apoio para leitura e mesas de cabeceira.",
  }),
  p({
    slug: "luminaria-mesa-cogumelo",
    name: "Luminária Cogumelo",
    category: "luminarias-de-mesa",
    rooms: ["quarto"],
    style: "contemporaneo",
    finish: "branco",
    image: productPhoto("1786325835316-6af65bd31231"),
    imageAlt: "Luminária de mesa em formato de cogumelo com cúpula iluminada",
    summary: "Brilho suave e escultórico para aparadores e cabeceiras.",
  }),
  p({
    slug: "luminaria-piso-haste",
    name: "Luminária de piso Haste",
    category: "luminarias-de-piso",
    rooms: ["sala"],
    style: "minimalista",
    finish: "preto",
    image: productPhoto("1494438639946-1ebd1d20bf85"),
    imageAlt: "Luminária de leitura preta com haste fina junto à parede",
    summary: "Ilumina cantos de leitura sem obra nem instalação.",
  }),
  p({
    slug: "luminaria-piso-torchiere",
    name: "Luminária de piso Coluna",
    category: "luminarias-de-piso",
    rooms: ["sala", "quarto"],
    style: "moderno",
    finish: "preto",
    image: productPhoto("1623963553117-235d83f224dd"),
    imageAlt: "Luminária de piso acesa próxima a uma cortina",
    summary: "Luz rebatida no teto para um ambiente mais amplo e acolhedor.",
  }),
  p({
    slug: "lanterna-jardim",
    name: "Lanterna Jardim",
    category: "iluminacao-externa",
    rooms: ["externa"],
    style: "classico",
    finish: "dourado",
    image: productPhoto("1640365554715-cfbb20efcf91"),
    imageAlt: "Lanterna esférica acesa em um jardim ao entardecer",
    summary: "Luz decorativa para jardins, pergolados e varandas.",
  }),
  p({
    slug: "arandela-externa-fachada",
    name: "Arandela Fachada",
    category: "iluminacao-externa",
    rooms: ["externa"],
    style: "classico",
    finish: "preto",
    image: productPhoto("1742086805658-b63ff0d236b2"),
    imageAlt: "Arandela externa acesa em parede de tijolos",
    summary: "Valoriza fachadas, entradas e varandas.",
  }),
];

/** Ponto único de leitura do catálogo — troque pela sua fonte de dados real. */
export function getProducts(): Product[] {
  return products;
}

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductsByRoom(room: RoomId, limit = 4): Product[] {
  return products.filter((product) => product.rooms.includes(room)).slice(0, limit);
}
