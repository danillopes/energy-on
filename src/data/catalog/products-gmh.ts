import type { Product } from "./types.ts";

/**
 * GMH TRADE — produtos conferidos no site oficial (https://www.gmhtrade.com.br/), 2026-10-08.
 * Código, nome, foto e ficha técnica foram lidos da própria página de cada linha;
 * cada foto foi ligada ao código que aparece ao lado dela no site.
 *
 * Fotos: uso autorizado (a Energy On é revendedora). Servidas pelo CDN da GMH (Wix),
 * já redimensionadas pelo loader em src/lib/image-loader.ts.
 *
 * Não encontrado no site: P-SUMATRA-30 (o Sumatra existe como P-SUMATRA-45 e P-SUMATRA-55).
 * Linhas Garden e Sci-Fi (citadas no catálogo 2025) não estão publicadas no site.
 *
 * Arquivo gerado a partir da transcrição do site — ao editar à mão, mantenha os códigos idênticos.
 */
export const gmhProducts: Product[] = [
  {
    id: "EO-0101",
    slug: "gmh-pendente-cosmos-60",
    name: "Pendente Cosmos 60",
    brandId: "gmh",
    collection: "Cosmos",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_52f46312e47947639559b26576614979~mv2.jpg",
      alt: "Pendente Cosmos 60 — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)",
      showsVariant: "gold"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-cosmos"
    },
    status: "confirmado",
    material: "Alumínio e acrílico",
    lightSource: "LED integrado",
    voltage: "Bivolt",
    dimmable: "Não dimerizável",
    ip: "IP20, uso interno",
    cord: "2 m",
    power: "38 W",
    lumens: "1026 lm",
    variants: [
      {
        id: "gold",
        label: "Gold",
        sku: "P-COSMOS-60-GOLD",
        color: "Gold"
      },
      {
        id: "preto",
        label: "Preto",
        sku: "P-COSMOS-60-PRETO",
        color: "Preto"
      },
      {
        id: "branco",
        label: "Branco",
        sku: "P-COSMOS-60-BRANCO",
        color: "Branco"
      },
      {
        id: "cobre",
        label: "Cobre",
        sku: "P-COSMOS-60-COBRE",
        color: "Cobre"
      },
      {
        id: "silver",
        label: "Silver",
        sku: "P-COSMOS-60-SILVER",
        color: "Silver"
      }
    ]
  },
  {
    id: "EO-0102",
    slug: "gmh-pendente-cosmos-80",
    name: "Pendente Cosmos 80",
    brandId: "gmh",
    collection: "Cosmos",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_90ee23f0209d4e378bd58e408d7042fe~mv2.jpg",
      alt: "Pendente Cosmos 80 — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)",
      showsVariant: "gold"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-cosmos",
      note: "No site, a foto desta peça tem o nome de arquivo P-COSMOS-60-GOLD.jpg, mas está na seção do Cosmos 80."
    },
    status: "confirmado",
    material: "Alumínio e acrílico",
    lightSource: "LED integrado",
    voltage: "Bivolt",
    dimmable: "Não dimerizável",
    ip: "IP20, uso interno",
    cord: "4 m",
    power: "50 W",
    lumens: "1300 lm",
    variants: [
      {
        id: "gold",
        label: "Gold",
        sku: "P-COSMOS-80-GOLD",
        color: "Gold"
      },
      {
        id: "preto",
        label: "Preto",
        sku: "P-COSMOS-80-PRETO",
        color: "Preto"
      }
    ]
  },
  {
    id: "EO-0103",
    slug: "gmh-pendente-cosmos-180",
    name: "Pendente Cosmos 180",
    brandId: "gmh",
    collection: "Cosmos",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_f907685c63df4d5b809bdd4c1c94210e~mv2.jpg",
      alt: "Pendente Cosmos 180 — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)",
      showsVariant: "preto"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-cosmos",
      note: "No site, a foto desta peça tem o nome de arquivo P-COSMOS-60-GOLD.jpg, mas está na seção do Cosmos 80."
    },
    status: "confirmado",
    material: "Alumínio e acrílico",
    lightSource: "LED integrado",
    voltage: "Bivolt",
    dimmable: "Não dimerizável",
    ip: "IP20, uso interno",
    cord: "4 m",
    power: "113 W",
    lumens: "3051 lm",
    variants: [
      {
        id: "preto",
        label: "Preto",
        sku: "P-COSMOS-180-PRETO",
        color: "Preto"
      },
      {
        id: "gold",
        label: "Gold",
        sku: "P-COSMOS-180-GOLD",
        color: "Gold"
      },
      {
        id: "branco",
        label: "Branco",
        sku: "P-COSMOS-180-BRANCO",
        color: "Branco"
      },
      {
        id: "cobre",
        label: "Cobre",
        sku: "P-COSMOS-180-COBRE",
        color: "Cobre"
      },
      {
        id: "silver",
        label: "Silver",
        sku: "P-COSMOS-180-SILVER",
        color: "Silver"
      }
    ]
  },
  {
    id: "EO-0104",
    slug: "gmh-pendente-cosmos-280",
    name: "Pendente Cosmos 280",
    brandId: "gmh",
    collection: "Cosmos",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_feea5c5e296741a6bc43f681b7740d24~mv2.jpg",
      alt: "Pendente Cosmos 280 — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)",
      showsVariant: "preto"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-cosmos",
      note: "No site, a foto desta peça tem o nome de arquivo P-COSMOS-60-GOLD.jpg, mas está na seção do Cosmos 80."
    },
    status: "confirmado",
    material: "Alumínio e acrílico",
    lightSource: "LED integrado",
    voltage: "Bivolt",
    dimmable: "Não dimerizável",
    ip: "IP20, uso interno",
    cord: "3 m",
    power: "176 W",
    lumens: "4752 lm",
    variants: [
      {
        id: "preto",
        label: "Preto",
        sku: "P-COSMOS-280-PRETO",
        color: "Preto"
      },
      {
        id: "gold",
        label: "Gold",
        sku: "P-COSMOS-280-GOLD",
        color: "Gold"
      },
      {
        id: "branco",
        label: "Branco",
        sku: "P-COSMOS-280-BRANCO",
        color: "Branco"
      },
      {
        id: "cobre",
        label: "Cobre",
        sku: "P-COSMOS-280-COBRE",
        color: "Cobre"
      },
      {
        id: "silver",
        label: "Silver",
        sku: "P-COSMOS-280-SILVER",
        color: "Silver"
      }
    ]
  },
  {
    id: "EO-0105",
    slug: "gmh-pendente-cosmos-400",
    name: "Pendente Cosmos 400",
    brandId: "gmh",
    collection: "Cosmos",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_29c43aade18c4508a612c35de75bf111~mv2.jpg",
      alt: "Pendente Cosmos 400 — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)",
      showsVariant: "gold"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-cosmos"
    },
    status: "confirmado",
    material: "Alumínio e acrílico",
    lightSource: "LED integrado",
    voltage: "Bivolt",
    dimmable: "Não dimerizável",
    ip: "IP20, uso interno",
    cord: "4 m",
    power: "243 W",
    lumens: "6561 lm",
    variants: [
      {
        id: "gold",
        label: "Gold",
        sku: "P-COSMOS-400-GOLD",
        color: "Gold"
      },
      {
        id: "preto",
        label: "Preto",
        sku: "P-COSMOS-400-PRETO",
        color: "Preto"
      },
      {
        id: "branco",
        label: "Branco",
        sku: "P-COSMOS-400-BRANCO",
        color: "Branco"
      },
      {
        id: "cobre",
        label: "Cobre",
        sku: "P-COSMOS-400-COBRE",
        color: "Cobre"
      },
      {
        id: "silver",
        label: "Silver",
        sku: "P-COSMOS-400-SILVER",
        color: "Silver"
      }
    ]
  },
  {
    id: "EO-0106",
    slug: "gmh-pendente-poderes-180",
    name: "Pendente Poderes 180",
    brandId: "gmh",
    collection: "Orgânica",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_7af6d273f62e4fb0b5dcd027a44ce6ce~mv2.png",
      alt: "Pendente Poderes 180 — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-org%C3%A2nica"
    },
    status: "confirmado",
    material: "Alumínio e silicone",
    lightSource: "LED integrado",
    voltage: "Bivolt",
    dimmable: "Não dimerizável",
    ip: "IP20, uso interno",
    cord: "4 m",
    power: "200 W",
    lumens: "13000 lm",
    sku: "P-PODERES-180-GOLD",
    color: "Gold"
  },
  {
    id: "EO-0107",
    slug: "gmh-pendente-eclipse-160",
    name: "Pendente Eclipse 160",
    brandId: "gmh",
    collection: "Orgânica",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_00a0de6f6f8b4bed98842091ff0a695d~mv2.jpeg",
      alt: "Pendente Eclipse 160 — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-org%C3%A2nica"
    },
    status: "confirmado",
    material: "Alumínio e silicone",
    lightSource: "LED integrado",
    voltage: "Bivolt",
    dimmable: "Não dimerizável",
    ip: "IP20, uso interno",
    cord: "4 m",
    power: "45 W",
    lumens: "1215 lm",
    sku: "P-ECLIPSE-160-PRETO",
    color: "Preto"
  },
  {
    id: "EO-0108",
    slug: "gmh-pendente-equidade-160",
    name: "Pendente Equidade 160",
    brandId: "gmh",
    collection: "Orgânica",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_b135b2d2d9a64abda5372ad72e7fdd40~mv2.jpeg",
      alt: "Pendente Equidade 160 — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-org%C3%A2nica"
    },
    status: "confirmado",
    material: "Alumínio e silicone",
    lightSource: "LED integrado",
    voltage: "Bivolt",
    dimmable: "Não dimerizável",
    ip: "IP20, uso interno",
    cord: "4 m",
    power: "53 W",
    lumens: "1431 lm",
    sku: "P-EQUIDADE-160-PRETO",
    color: "Preto"
  },
  {
    id: "EO-0109",
    slug: "gmh-pendente-newton-100",
    name: "Pendente Newton 100",
    brandId: "gmh",
    collection: "Orgânica",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_479c04b7471b400d99566bd2023f67de~mv2.png",
      alt: "Pendente Newton 100 — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-org%C3%A2nica"
    },
    status: "confirmado",
    material: "Alumínio e silicone",
    lightSource: "LED integrado",
    voltage: "Bivolt",
    dimmable: "Não dimerizável",
    ip: "IP20, uso interno",
    cord: "3 m",
    power: "90 W",
    lumens: "5400 lm",
    sku: "P-NEWTON-100-GOLD",
    color: "Gold"
  },
  {
    id: "EO-0110",
    slug: "gmh-pendente-potenza",
    name: "Pendente Potenza",
    brandId: "gmh",
    collection: "Orgânica",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_dd3f6e0358d5475c8861621f5591179b~mv2.png",
      alt: "Pendente Potenza — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)",
      showsVariant: "preto"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-org%C3%A2nica"
    },
    status: "confirmado",
    material: "Alumínio e silicone",
    lightSource: "LED integrado",
    voltage: "Bivolt",
    dimmable: "Não dimerizável",
    ip: "IP20, uso interno",
    cord: "2 m",
    power: "45 W",
    lumens: "3600 lm",
    variants: [
      {
        id: "preto",
        label: "Preto",
        sku: "P-POTENZA-PRETO",
        color: "Preto"
      },
      {
        id: "gold",
        label: "Gold",
        sku: "P-POTENZA-GOLD",
        color: "Gold"
      }
    ]
  },
  {
    id: "EO-0111",
    slug: "gmh-pendente-momento",
    name: "Pendente Momento",
    brandId: "gmh",
    collection: "Orgânica",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_336dbb8efc44496d9cb4802ba13cc15d~mv2.jpg",
      alt: "Pendente Momento — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)",
      showsVariant: "preto"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-org%C3%A2nica"
    },
    status: "confirmado",
    material: "Alumínio e silicone",
    lightSource: "LED integrado",
    voltage: "Bivolt",
    dimmable: "Não dimerizável",
    ip: "IP20, uso interno",
    cord: "2 m",
    power: "35 W",
    lumens: "2800 lm",
    variants: [
      {
        id: "preto",
        label: "Preto",
        sku: "P-MOMENTO-PRETO",
        color: "Preto"
      },
      {
        id: "gold",
        label: "Gold",
        sku: "P-MOMENTO-GOLD",
        color: "Gold"
      }
    ]
  },
  {
    id: "EO-0112",
    slug: "gmh-pendente-oceano-140",
    name: "Pendente Oceano 140",
    brandId: "gmh",
    collection: "Orgânica",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_441e5fc746f740c5a9d5204d29421711~mv2.jpg",
      alt: "Pendente Oceano 140 — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)",
      showsVariant: "gold"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-org%C3%A2nica"
    },
    status: "confirmado",
    material: "Alumínio e silicone",
    lightSource: "LED integrado",
    voltage: "Bivolt",
    dimmable: "Não dimerizável",
    ip: "IP20, uso interno",
    cord: "4 m",
    power: "70 W",
    lumens: "1750 lm",
    variants: [
      {
        id: "gold",
        label: "Gold",
        sku: "P-OCEANO-140-GOLD",
        color: "Gold"
      },
      {
        id: "preto",
        label: "Preto",
        sku: "P-OCEANO-140-PRETO",
        color: "Preto"
      }
    ]
  },
  {
    id: "EO-0113",
    slug: "gmh-pendente-sierra-60",
    name: "Pendente Sierra 60",
    brandId: "gmh",
    collection: "Orgânica",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_0a48e781f66049a3b7595f17b8f6111b~mv2.jpg",
      alt: "Pendente Sierra 60 — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)",
      showsVariant: "gold"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-org%C3%A2nica"
    },
    status: "confirmado",
    material: "Alumínio e silicone",
    lightSource: "LED integrado",
    voltage: "Bivolt",
    dimmable: "Não dimerizável",
    ip: "IP20, uso interno",
    cord: "4 m",
    power: "30 W",
    lumens: "750 lm",
    variants: [
      {
        id: "gold",
        label: "Gold",
        sku: "P-SIERRA-60-GOLD",
        color: "Gold"
      },
      {
        id: "preto",
        label: "Preto",
        sku: "P-SIERRA-60-PRETO",
        color: "Preto"
      }
    ]
  },
  {
    id: "EO-0114",
    slug: "gmh-pendente-celeste-100",
    name: "Pendente Celeste 100",
    brandId: "gmh",
    collection: "Orgânica",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_2a29747df4ab4326bc866e91a2f8b4f9~mv2.jpg",
      alt: "Pendente Celeste 100 — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-org%C3%A2nica"
    },
    status: "confirmado",
    material: "Alumínio e silicone",
    lightSource: "LED integrado",
    voltage: "Bivolt",
    dimmable: "Não dimerizável",
    ip: "IP20, uso interno",
    cord: "4 m",
    power: "113 W",
    lumens: "6780 lm",
    sku: "P-CELESTE-100-GOLD",
    color: "Gold"
  },
  {
    id: "EO-0115",
    slug: "gmh-pendente-unique-140",
    name: "Pendente Unique 140",
    brandId: "gmh",
    collection: "Orgânica",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_bb7bd52e7e2c43b7bce6840cd605a23a~mv2.jpg",
      alt: "Pendente Unique 140 — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)",
      showsVariant: "gold"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-org%C3%A2nica"
    },
    status: "confirmado",
    material: "Metal, alumínio e acrílico",
    lightSource: "LED integrado",
    voltage: "Bivolt",
    dimmable: "Não dimerizável",
    ip: "IP20, uso interno",
    cord: "4 m",
    power: "38 W",
    lumens: "1026 lm",
    variants: [
      {
        id: "gold",
        label: "Gold",
        sku: "P-UNIQUE-140-GOLD",
        color: "Gold"
      },
      {
        id: "black",
        label: "Black",
        sku: "P-UNIQUE-140-BLACK",
        color: "Black"
      }
    ]
  },
  {
    id: "EO-0116",
    slug: "gmh-pendente-andromeda-180",
    name: "Pendente Andromeda 180",
    brandId: "gmh",
    collection: "Orgânica",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_b8371509e21c498b93a363cca6782f1d~mv2.jpg",
      alt: "Pendente Andromeda 180 — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)",
      showsVariant: "preto"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-org%C3%A2nica"
    },
    status: "confirmado",
    material: "Alumínio e silicone",
    lightSource: "LED integrado",
    voltage: "Bivolt",
    dimmable: "Não dimerizável",
    ip: "IP20, uso interno",
    cord: "4 m",
    power: "113 W",
    lumens: "3051 lm",
    variants: [
      {
        id: "preto",
        label: "Preto",
        sku: "P-ANDROMEDA-180-PRETO",
        color: "Preto"
      },
      {
        id: "gold",
        label: "Gold",
        sku: "P-ANDROMEDA-180-GOLD",
        color: "Gold"
      }
    ]
  },
  {
    id: "EO-0117",
    slug: "gmh-pendente-constelacao",
    name: "Pendente Constelação",
    brandId: "gmh",
    collection: "Orgânica",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_09798e608aa54515a3e3f7cf72c3e772~mv2.jpg",
      alt: "Pendente Constelação — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)",
      showsVariant: "preto"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-org%C3%A2nica"
    },
    status: "confirmado",
    material: "Alumínio e acrílico",
    lightSource: "LED integrado",
    voltage: "Bivolt",
    dimmable: "Não dimerizável",
    ip: "IP20, uso interno",
    cord: "2 m",
    power: "40 W",
    lumens: "1080 lm",
    variants: [
      {
        id: "preto",
        label: "Preto",
        sku: "P-CONSTELACAO-PRETO",
        color: "Preto"
      },
      {
        id: "gold",
        label: "Gold",
        sku: "P-CONSTELACAO-GOLD",
        color: "Gold"
      },
      {
        id: "branco",
        label: "Branco",
        sku: "P-CONSTELACAO-BRANCO",
        color: "Branco"
      }
    ]
  },
  {
    id: "EO-0118",
    slug: "gmh-pendente-ballet",
    name: "Pendente Ballet",
    brandId: "gmh",
    collection: "Espetáculo",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_d88ea6a2873149cea9f699be1d67e428~mv2.png",
      alt: "Pendente Ballet — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-espet%C3%A1ulo"
    },
    status: "confirmado",
    material: "Metal e silicone",
    lightSource: "LED integrado",
    voltage: "Bivolt",
    dimmable: "Não dimerizável",
    ip: "IP20, uso interno",
    cord: "1,6 m",
    power: "20 W",
    lumens: "1200 lm",
    variants: [
      {
        id: "gold",
        label: "Gold",
        sku: "P-BALLET-100-GOLD",
        color: "Gold"
      },
      {
        id: "preto",
        label: "Preto",
        sku: "P-BALLET-100-PRETO",
        color: "Preto"
      }
    ]
  },
  {
    id: "EO-0119",
    slug: "gmh-pendente-orquestra",
    name: "Pendente Orquestra",
    brandId: "gmh",
    collection: "Espetáculo",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_d7296de614874a89aa94b63401d22b4d~mv2.png",
      alt: "Pendente Orquestra — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-espet%C3%A1ulo"
    },
    status: "confirmado",
    material: "Metal e silicone",
    lightSource: "LED integrado",
    voltage: "Bivolt",
    dimmable: "Não dimerizável",
    ip: "IP20, uso interno",
    cord: "1,6 m",
    power: "30 W",
    lumens: "1800 lm",
    variants: [
      {
        id: "gold",
        label: "Gold",
        sku: "P-ORQUESTRA-100-GOLD",
        color: "Gold"
      },
      {
        id: "preto",
        label: "Preto",
        sku: "P-ORQUESTRA-100-PRETO",
        color: "Preto"
      }
    ]
  },
  {
    id: "EO-0120",
    slug: "gmh-pendente-opera",
    name: "Pendente Opera",
    brandId: "gmh",
    collection: "Espetáculo",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_fde88ab2821144e595ab89390dd59142~mv2.png",
      alt: "Pendente Opera — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-espet%C3%A1ulo"
    },
    status: "confirmado",
    material: "Metal e silicone",
    lightSource: "LED integrado",
    voltage: "Bivolt",
    dimmable: "Não dimerizável",
    ip: "IP20, uso interno",
    cord: "1,6 m",
    power: "50 W",
    lumens: "1250 lm",
    variants: [
      {
        id: "gold",
        label: "Gold",
        sku: "P-OPERA-100-GOLD",
        color: "Gold"
      },
      {
        id: "preto",
        label: "Preto",
        sku: "P-OPERA-100-PRETO",
        color: "Preto"
      }
    ]
  },
  {
    id: "EO-0121",
    slug: "gmh-pendente-psyche",
    name: "Pendente Psyche",
    brandId: "gmh",
    collection: "Encanto",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_cbed1d9b60b845b0b20982ed0375b7e7~mv2.png",
      alt: "Pendente Psyche — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-encanto"
    },
    status: "confirmado",
    material: "Metal e acrílico",
    lightSource: "LED integrado",
    voltage: "Bivolt",
    dimmable: "Não dimerizável",
    ip: "IP20, uso interno",
    cord: "3 m",
    power: "3 W",
    lumens: "180 lm",
    sku: "P-PSYCHE-GOLD",
    color: "Gold"
  },
  {
    id: "EO-0122",
    slug: "gmh-arandela-psyche",
    name: "Arandela Psyche",
    brandId: "gmh",
    collection: "Encanto",
    category: "arandelas",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_5d2447fca68347859b893b1d73af60cd~mv2.png",
      alt: "Arandela Psyche — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-encanto"
    },
    status: "confirmado",
    material: "Metal e acrílico",
    lightSource: "LED integrado",
    voltage: "Bivolt",
    dimmable: "Não dimerizável",
    ip: "IP20, uso interno",
    power: "3 W",
    lumens: "180 lm",
    sku: "A-PSYCHE-GOLD",
    color: "Gold"
  },
  {
    id: "EO-0123",
    slug: "gmh-pendente-wing",
    name: "Pendente Wing",
    brandId: "gmh",
    collection: "Encanto",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_17635320bdf84f6eaee4db3b72626e43~mv2.png",
      alt: "Pendente Wing — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-encanto"
    },
    status: "confirmado",
    material: "Metal e acrílico",
    lightSource: "LED integrado",
    voltage: "Bivolt",
    dimmable: "Não dimerizável",
    ip: "IP20, uso interno",
    cord: "3 m",
    power: "5 W",
    lumens: "300 lm",
    sku: "P-WING-GOLD",
    color: "Gold"
  },
  {
    id: "EO-0124",
    slug: "gmh-arandela-wing",
    name: "Arandela Wing",
    brandId: "gmh",
    collection: "Encanto",
    category: "arandelas",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_d27e1459c5c743c19c3ac52b6a6b8437~mv2.png",
      alt: "Arandela Wing — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-encanto"
    },
    status: "confirmado",
    material: "Metal e acrílico",
    lightSource: "LED integrado",
    voltage: "Bivolt",
    dimmable: "Não dimerizável",
    ip: "IP20, uso interno",
    power: "5 W",
    lumens: "300 lm",
    sku: "A-WING-GOLD",
    color: "Gold"
  },
  {
    id: "EO-0125",
    slug: "gmh-pendente-super-lua",
    name: "Pendente Super Lua",
    brandId: "gmh",
    collection: "Planetas",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_29720802474f4f0b8708692b702d0790~mv2.png",
      alt: "Pendente Super Lua — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/planetas"
    },
    status: "confirmado",
    material: "Pedra e metal",
    lightSource: "LED integrado",
    voltage: "Bivolt",
    dimmable: "Não dimerizável",
    ip: "IP20, uso interno",
    cord: "1,8 m",
    power: "9 W",
    lumens: "180 lm",
    sku: "P-SUPERLUA-GOLD",
    color: "Gold"
  },
  {
    id: "EO-0126",
    slug: "gmh-pendente-lua",
    name: "Pendente Lua",
    brandId: "gmh",
    collection: "Planetas",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_757eee8655014087b6d3801d7dc7ad38~mv2.jpg",
      alt: "Pendente Lua — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/planetas"
    },
    status: "confirmado",
    material: "Metal e vidro",
    lightSource: "LED integrado",
    voltage: "Bivolt",
    dimmable: "Não dimerizável",
    ip: "IP20, uso interno",
    cord: "1,7 m",
    power: "3 W",
    lumens: "180 lm",
    sku: "P-LUA-GOLD",
    color: "Gold"
  },
  {
    id: "EO-0127",
    slug: "gmh-arandela-lua",
    name: "Arandela Lua",
    brandId: "gmh",
    collection: "Planetas",
    category: "arandelas",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_50f153591d2040f9bfc56ecc9b6058b6~mv2.jpg",
      alt: "Arandela Lua — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/planetas"
    },
    status: "confirmado",
    material: "Metal e vidro",
    lightSource: "LED integrado",
    voltage: "Bivolt",
    dimmable: "Não dimerizável",
    ip: "IP20, uso interno",
    power: "3 W",
    lumens: "180 lm",
    sku: "A-LUA-GOLD",
    color: "Gold"
  },
  {
    id: "EO-0128",
    slug: "gmh-pendente-black-moon",
    name: "Pendente Black Moon",
    brandId: "gmh",
    collection: "Planetas",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_69af934079d14a118528376c4d635b38~mv2.jpg",
      alt: "Pendente Black Moon — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/planetas"
    },
    status: "confirmado",
    material: "Metal e vidro",
    lightSource: "LED integrado",
    voltage: "Bivolt",
    dimmable: "Não dimerizável",
    ip: "IP20, uso interno",
    cord: "1,7 m",
    power: "3 W",
    lumens: "180 lm",
    sku: "P-BLACK-MOON"
  },
  {
    id: "EO-0129",
    slug: "gmh-pendente-nix",
    name: "Pendente Nix",
    brandId: "gmh",
    collection: "Planetas",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_ec38e9189b454424a8a0129410ddf98f~mv2.jpg",
      alt: "Pendente Nix — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)",
      showsVariant: "gold"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/planetas"
    },
    status: "confirmado",
    material: "Metal e vidro",
    lightSource: "LED integrado",
    voltage: "Bivolt",
    dimmable: "Não dimerizável",
    ip: "IP20, uso interno",
    cord: "3 m",
    power: "3 W",
    lumens: "180 lm",
    variants: [
      {
        id: "gold",
        label: "Gold",
        sku: "P-NIX-GOLD",
        color: "Gold"
      },
      {
        id: "black",
        label: "Black",
        sku: "P-NIX-BLACK",
        color: "Black"
      },
      {
        id: "chrome",
        label: "Chrome",
        sku: "P-NIX-CHROME",
        color: "Chrome"
      }
    ]
  },
  {
    id: "EO-0130",
    slug: "gmh-arandela-nix",
    name: "Arandela Nix",
    brandId: "gmh",
    collection: "Planetas",
    category: "arandelas",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_fddef6e1eb5b4b27a1ffb84a99f8f538~mv2.jpg",
      alt: "Arandela Nix — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/planetas"
    },
    status: "confirmado",
    material: "Metal e vidro",
    lightSource: "LED integrado",
    voltage: "Bivolt",
    dimmable: "Não dimerizável",
    ip: "IP20, uso interno",
    power: "3 W",
    lumens: "180 lm",
    sku: "A-NIX-GOLD",
    color: "Gold"
  },
  {
    id: "EO-0131",
    slug: "gmh-pendente-cometa",
    name: "Pendente Cometa",
    brandId: "gmh",
    collection: "Planetas",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_15d3fcf0dc2142edb89d0e1f200c7dad~mv2.jpg",
      alt: "Pendente Cometa — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/planetas"
    },
    status: "confirmado",
    material: "Metal e vidro",
    lightSource: "LED integrado",
    voltage: "Bivolt",
    dimmable: "Não dimerizável",
    ip: "IP20, uso interno",
    cord: "3 m",
    power: "3 W",
    lumens: "180 lm",
    sku: "P-COMETA-GOLD",
    color: "Gold"
  },
  {
    id: "EO-0132",
    slug: "gmh-arandela-cometa",
    name: "Arandela Cometa",
    brandId: "gmh",
    collection: "Planetas",
    category: "arandelas",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_58a1669bad984df4a018fc9519213099~mv2.jpg",
      alt: "Arandela Cometa — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/planetas"
    },
    status: "confirmado",
    material: "Metal e vidro",
    lightSource: "LED integrado",
    voltage: "Bivolt",
    dimmable: "Não dimerizável",
    ip: "IP20, uso interno",
    power: "3 W",
    lumens: "180 lm",
    sku: "A-COMETA-GOLD",
    color: "Gold"
  },
  {
    id: "EO-0133",
    slug: "gmh-pendente-saturno",
    name: "Pendente Saturno",
    brandId: "gmh",
    collection: "Planetas",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_cbc6efc8d0ba440ea1c30714b51365ba~mv2.jpg",
      alt: "Pendente Saturno — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/planetas"
    },
    status: "confirmado",
    material: "Metal e vidro",
    lightSource: "LED integrado",
    voltage: "Bivolt",
    dimmable: "Não dimerizável",
    ip: "IP20, uso interno",
    cord: "3 m",
    power: "7 W",
    lumens: "420 lm",
    sku: "P-SATURNO-GOLD",
    color: "Gold"
  },
  {
    id: "EO-0134",
    slug: "gmh-arandela-saturno",
    name: "Arandela Saturno",
    brandId: "gmh",
    collection: "Planetas",
    category: "arandelas",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_930697a6f17c470888b316d3d4bc4a0a~mv2.jpg",
      alt: "Arandela Saturno — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/planetas"
    },
    status: "confirmado",
    material: "Metal, alumínio e vidro",
    lightSource: "LED integrado",
    voltage: "Bivolt",
    dimmable: "Não dimerizável",
    ip: "IP20, uso interno",
    cord: "0,35 m",
    power: "7 W",
    lumens: "420 lm",
    sku: "A-SATURNO-GOLD",
    color: "Gold"
  },
  {
    id: "EO-0135",
    slug: "gmh-pendente-urano",
    name: "Pendente Urano",
    brandId: "gmh",
    collection: "Planetas",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_27c645b1cdb54d549572e89aebc528da~mv2.jpg",
      alt: "Pendente Urano — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/planetas"
    },
    status: "confirmado",
    material: "Metal e vidro",
    lightSource: "LED integrado",
    voltage: "Bivolt",
    dimmable: "Não dimerizável",
    ip: "IP20, uso interno",
    cord: "3 m",
    power: "5 W",
    lumens: "300 lm",
    sku: "P-URANO-GOLD",
    color: "Gold"
  },
  {
    id: "EO-0136",
    slug: "gmh-arandela-urano",
    name: "Arandela Urano",
    brandId: "gmh",
    collection: "Planetas",
    category: "arandelas",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_b23a18e04f644a52a352eb1525a2a396~mv2.jpg",
      alt: "Arandela Urano — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/planetas"
    },
    status: "confirmado",
    material: "Metal e vidro",
    lightSource: "LED integrado",
    voltage: "Bivolt",
    dimmable: "Não dimerizável",
    ip: "IP20, uso interno",
    power: "5 W",
    lumens: "300 lm",
    sku: "A-URANO-GOLD",
    color: "Gold"
  },
  {
    id: "EO-0137",
    slug: "gmh-pendente-mercurio",
    name: "Pendente Mercúrio",
    brandId: "gmh",
    collection: "Planetas",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_da938de4647e40c6bcab3914c2dc9d91~mv2.jpg",
      alt: "Pendente Mercúrio — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)",
      showsVariant: "black"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/planetas"
    },
    status: "confirmado",
    material: "Metal e acrílico",
    lightSource: "LED integrado",
    voltage: "Bivolt",
    dimmable: "Não dimerizável",
    ip: "IP20, uso interno",
    cord: "1,7 m",
    power: "9 W",
    lumens: "540 lm",
    variants: [
      {
        id: "black",
        label: "Black",
        sku: "P-MERCURIO-BLACK",
        color: "Black"
      },
      {
        id: "gold",
        label: "Gold",
        sku: "P-MERCURIO-GOLD",
        color: "Gold"
      }
    ]
  },
  {
    id: "EO-0138",
    slug: "gmh-pendente-plutao",
    name: "Pendente Plutão",
    brandId: "gmh",
    collection: "Planetas",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_267af11b6347442eb68bed6507fd0ef7~mv2.jpg",
      alt: "Pendente Plutão — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/planetas"
    },
    status: "confirmado",
    material: "Metal e vidro",
    lightSource: "LED integrado",
    voltage: "Bivolt",
    dimmable: "Não dimerizável",
    ip: "IP20, uso interno",
    cord: "1,7 m",
    power: "3 W",
    lumens: "180 lm",
    sku: "P-PLUTAO-GOLD",
    color: "Gold"
  },
  {
    id: "EO-0139",
    slug: "gmh-pendente-eris",
    name: "Pendente Eris",
    brandId: "gmh",
    collection: "Planetas",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_4d139c9650ef4bd284b8c717e91d9fed~mv2.jpg",
      alt: "Pendente Eris — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/planetas"
    },
    status: "confirmado",
    material: "Metal e vidro",
    lightSource: "G9 (acompanha lâmpada)",
    voltage: "Bivolt",
    dimmable: "Não dimerizável",
    ip: "IP20, uso interno",
    cord: "1,7 m",
    power: "5 W",
    lumens: "300 lm",
    sku: "P-ERIS-AMBAR",
    color: "Âmbar"
  },
  {
    id: "EO-0140",
    slug: "gmh-pendente-ametista",
    name: "Pendente Ametista",
    brandId: "gmh",
    collection: "Vidro",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_076e0ad379e44a8b9b92b01b0e9602dc~mv2.jpg",
      alt: "Pendente Ametista — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-vidro"
    },
    status: "confirmado",
    material: "Metal e vidro",
    lightSource: "Bocal E27",
    voltage: "Bivolt",
    ip: "IP20, uso interno",
    cord: "1,5 m",
    power: "Máx. 60 W",
    sku: "P-AMETISTA-AMBAR",
    color: "Âmbar"
  },
  {
    id: "EO-0141",
    slug: "gmh-pendente-citrino",
    name: "Pendente Citrino",
    brandId: "gmh",
    collection: "Vidro",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_2ce757c56c414e28a68299f7c47bbdce~mv2.jpg",
      alt: "Pendente Citrino — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-vidro"
    },
    status: "confirmado",
    material: "Metal e vidro",
    lightSource: "Bocal E27",
    voltage: "Bivolt",
    ip: "IP20, uso interno",
    cord: "1,5 m",
    power: "Máx. 60 W",
    sku: "P-CITRINO-AMBAR",
    color: "Âmbar"
  },
  {
    id: "EO-0142",
    slug: "gmh-pendente-agata",
    name: "Pendente Ágata",
    brandId: "gmh",
    collection: "Vidro",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_0f16c6b22b694786840e07cd6e62d068~mv2.png",
      alt: "Pendente Ágata — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-vidro"
    },
    status: "confirmado",
    material: "Metal e vidro",
    lightSource: "Bocal E27",
    voltage: "Bivolt",
    ip: "IP20, uso interno",
    cord: "1,5 m",
    power: "Máx. 60 W",
    sku: "P-AGATA-AMBAR",
    color: "Âmbar"
  },
  {
    id: "EO-0143",
    slug: "gmh-pendente-pirita",
    name: "Pendente Pirita",
    brandId: "gmh",
    collection: "Vidro",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_1c4e0f06c67341d48b4ce5fc190dbef4~mv2.png",
      alt: "Pendente Pirita — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-vidro"
    },
    status: "confirmado",
    material: "Metal e vidro",
    lightSource: "Bocal E27",
    voltage: "Bivolt",
    ip: "IP20, uso interno",
    cord: "1,5 m",
    power: "Máx. 60 W",
    sku: "P-PIRITA-AMBAR",
    color: "Âmbar"
  },
  {
    id: "EO-0144",
    slug: "gmh-pendente-quartzo",
    name: "Pendente Quartzo",
    brandId: "gmh",
    collection: "Vidro",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_4ec33fc4e51b4d19a38757884e283b7e~mv2.png",
      alt: "Pendente Quartzo — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-vidro"
    },
    status: "confirmado",
    material: "Metal, alumínio e vidro",
    lightSource: "Bocal E27",
    voltage: "Bivolt",
    ip: "IP20, uso interno",
    cord: "1,5 m",
    power: "Máx. 60 W",
    variants: [
      {
        id: "ambar",
        label: "Âmbar",
        sku: "P-QUARTZO-AMBAR",
        color: "Âmbar"
      },
      {
        id: "fume",
        label: "Fumê",
        sku: "P-QUARTZO-FUME",
        color: "Fumê"
      }
    ]
  },
  {
    id: "EO-0145",
    slug: "gmh-pendente-selenita",
    name: "Pendente Selenita",
    brandId: "gmh",
    collection: "Vidro",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_ecc8796d2bc444fd9b44683a899ea0fa~mv2.png",
      alt: "Pendente Selenita — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-vidro"
    },
    status: "confirmado",
    material: "Metal, alumínio e vidro",
    lightSource: "Bocal E27",
    voltage: "Bivolt",
    ip: "IP20, uso interno",
    cord: "1,5 m",
    power: "Máx. 60 W",
    variants: [
      {
        id: "ambar",
        label: "Âmbar",
        sku: "P-SELENITA-AMBAR",
        color: "Âmbar"
      },
      {
        id: "fume",
        label: "Fumê",
        sku: "P-SELENITA-FUME",
        color: "Fumê"
      }
    ]
  },
  {
    id: "EO-0146",
    slug: "gmh-pendente-bora-bora-40",
    name: "Pendente Bora Bora 40",
    brandId: "gmh",
    collection: "Natural",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_2b4e4c9835d644bc85911c7cee3c0de7~mv2.png",
      alt: "Pendente Bora Bora 40 — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-natural"
    },
    status: "confirmado",
    material: "Madeira e fibra de bambu",
    lightSource: "Bocal E27",
    voltage: "Bivolt",
    ip: "IP20, uso interno",
    cord: "1,5 m",
    power: "Máx. 60 W",
    sku: "P-BORA-BORA-40"
  },
  {
    id: "EO-0147",
    slug: "gmh-pendente-bali",
    name: "Pendente Bali",
    brandId: "gmh",
    collection: "Natural",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_9aad062f1318493d95b97bfd85d847d4~mv2.jpg",
      alt: "Pendente Bali — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-natural"
    },
    status: "confirmado",
    material: "Madeira e fibra de bambu",
    lightSource: "Bocal E27",
    voltage: "Bivolt",
    ip: "IP20, uso interno",
    cord: "1,5 m",
    power: "Máx. 60 W",
    variants: [
      {
        id: "40",
        label: "40",
        name: "Pendente Bali 40",
        sku: "P-BALI-40"
      },
      {
        id: "50",
        label: "50",
        name: "Pendente Bali 50",
        sku: "P-BALI-50"
      }
    ]
  },
  {
    id: "EO-0148",
    slug: "gmh-pendente-batu",
    name: "Pendente Batu",
    brandId: "gmh",
    collection: "Natural",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_44f82db5e7ae4b7588d216284153a884~mv2.jpg",
      alt: "Pendente Batu — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-natural"
    },
    status: "confirmado",
    material: "Madeira e fibra de bambu",
    lightSource: "Bocal E27",
    voltage: "Bivolt",
    ip: "IP20, uso interno",
    cord: "1,5 m",
    power: "Máx. 60 W",
    variants: [
      {
        id: "40",
        label: "40",
        name: "Pendente Batu 40",
        sku: "P-BATU-40"
      },
      {
        id: "60",
        label: "60",
        name: "Pendente Batu 60",
        sku: "P-BATU-60"
      }
    ]
  },
  {
    id: "EO-0149",
    slug: "gmh-pendente-borneu",
    name: "Pendente Borneu",
    brandId: "gmh",
    collection: "Natural",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_5c304ec6fc374a4ebea986ff375b917e~mv2.jpg",
      alt: "Pendente Borneu — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-natural"
    },
    status: "confirmado",
    material: "Madeira e fibra de bambu",
    lightSource: "Bocal E27",
    voltage: "Bivolt",
    ip: "IP20, uso interno",
    cord: "1,5 m",
    power: "Máx. 60 W",
    variants: [
      {
        id: "50",
        label: "50",
        name: "Pendente Borneu 50",
        sku: "P-BORNEU-50"
      },
      {
        id: "60",
        label: "60",
        name: "Pendente Borneu 60",
        sku: "P-BORNEU-60"
      }
    ]
  },
  {
    id: "EO-0150",
    slug: "gmh-pendente-cidora-25",
    name: "Pendente Cidora 25",
    brandId: "gmh",
    collection: "Natural",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_94bf22fe90f6403989ea8e0940becae9~mv2.jpg",
      alt: "Pendente Cidora 25 — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-natural"
    },
    status: "confirmado",
    material: "Madeira e fibra de bambu",
    lightSource: "Bocal E27",
    voltage: "Bivolt",
    ip: "IP20, uso interno",
    cord: "1,5 m",
    power: "Máx. 60 W",
    sku: "P-CIDORA-25"
  },
  {
    id: "EO-0151",
    slug: "gmh-pendente-nias-40",
    name: "Pendente Nias 40",
    brandId: "gmh",
    collection: "Natural",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_14cd5d9973c74acc85b5c0de16a97156~mv2.png",
      alt: "Pendente Nias 40 — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-natural"
    },
    status: "confirmado",
    material: "Madeira e fibra de bambu",
    lightSource: "Bocal E27",
    voltage: "Bivolt",
    ip: "IP20, uso interno",
    cord: "1,5 m",
    power: "Máx. 60 W",
    sku: "P-NIAS-40"
  },
  {
    id: "EO-0152",
    slug: "gmh-pendente-hiva-30",
    name: "Pendente Hiva 30",
    brandId: "gmh",
    collection: "Natural",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_9fe1d49d5f5a4492a7e971bafe74af13~mv2.png",
      alt: "Pendente Hiva 30 — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-natural"
    },
    status: "confirmado",
    material: "Madeira e fibra de bambu",
    lightSource: "Bocal E27",
    voltage: "Bivolt",
    ip: "IP20, uso interno",
    cord: "1,5 m",
    power: "Máx. 60 W",
    sku: "P-HIVA-30"
  },
  {
    id: "EO-0153",
    slug: "gmh-pendente-jacarta-40",
    name: "Pendente Jacarta 40",
    brandId: "gmh",
    collection: "Natural",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_daab40249dfd43d78800d19d5bb9f015~mv2.png",
      alt: "Pendente Jacarta 40 — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-natural"
    },
    status: "confirmado",
    material: "Madeira e fibra de bambu",
    lightSource: "Bocal E27",
    voltage: "Bivolt",
    ip: "IP20, uso interno",
    cord: "1,5 m",
    power: "Máx. 60 W",
    sku: "P-JACARTA-40"
  },
  {
    id: "EO-0154",
    slug: "gmh-pendente-sumba-24",
    name: "Pendente Sumba 24",
    brandId: "gmh",
    collection: "Natural",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_a846b80f716d4838a2182dcd51ced6e4~mv2.png",
      alt: "Pendente Sumba 24 — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-natural"
    },
    status: "confirmado",
    material: "Madeira e fibra de bambu",
    lightSource: "Bocal E27",
    voltage: "Bivolt",
    ip: "IP20, uso interno",
    cord: "1,5 m",
    power: "Máx. 60 W",
    sku: "P-SUMBA-24"
  },
  {
    id: "EO-0155",
    slug: "gmh-pendente-taiti-35",
    name: "Pendente Taiti 35",
    brandId: "gmh",
    collection: "Natural",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_e1cd1889941440c09b80a3df13857191~mv2.png",
      alt: "Pendente Taiti 35 — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-natural"
    },
    status: "confirmado",
    material: "Madeira e fibra de bambu",
    lightSource: "Bocal E27",
    voltage: "Bivolt",
    ip: "IP20, uso interno",
    cord: "1,5 m",
    power: "Máx. 60 W",
    sku: "P-TAITI-35"
  },
  {
    id: "EO-0156",
    slug: "gmh-pendente-sumatra",
    name: "Pendente Sumatra",
    brandId: "gmh",
    collection: "Natural",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_58de0dd2e77246d984dfb9b8cf05c392~mv2.png",
      alt: "Pendente Sumatra — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-natural"
    },
    status: "confirmado",
    material: "Madeira e fibra de bambu",
    lightSource: "Bocal E27",
    voltage: "Bivolt",
    ip: "IP20, uso interno",
    cord: "1,5 m",
    power: "Máx. 60 W",
    variants: [
      {
        id: "45",
        label: "45",
        name: "Pendente Sumatra 45",
        sku: "P-SUMATRA-45"
      },
      {
        id: "55",
        label: "55",
        name: "Pendente Sumatra 55",
        sku: "P-SUMATRA-55"
      }
    ]
  },
  {
    id: "EO-0157",
    slug: "gmh-pendente-java-40",
    name: "Pendente Java 40",
    brandId: "gmh",
    collection: "Natural",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_ea7812541ffe404ea64790da2b42c1c6~mv2.png",
      alt: "Pendente Java 40 — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-natural"
    },
    status: "confirmado",
    material: "Madeira e fibra de bambu",
    lightSource: "Bocal E27",
    voltage: "Bivolt",
    ip: "IP20, uso interno",
    cord: "1,5 m",
    power: "Máx. 60 W",
    sku: "P-JAVA-40"
  },
  {
    id: "EO-0158",
    slug: "gmh-pendente-komodo-23",
    name: "Pendente Komodo 23",
    brandId: "gmh",
    collection: "Natural",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_2f15f5cde95f49468c0fbcc1ec5fe337~mv2.png",
      alt: "Pendente Komodo 23 — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-natural"
    },
    status: "confirmado",
    material: "Madeira e fibra de bambu",
    lightSource: "Bocal E27",
    voltage: "Bivolt",
    ip: "IP20, uso interno",
    cord: "1,5 m",
    power: "Máx. 60 W",
    sku: "P-KOMODO-23"
  },
  {
    id: "EO-0159",
    slug: "gmh-pendente-saliki-55",
    name: "Pendente Saliki 55",
    brandId: "gmh",
    collection: "Natural",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_a60c3412e0614f62b882dfaeb91a85a4~mv2.png",
      alt: "Pendente Saliki 55 — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-natural"
    },
    status: "confirmado",
    material: "Madeira e fibra de bambu",
    lightSource: "Bocal E27",
    voltage: "Bivolt",
    ip: "IP20, uso interno",
    cord: "1,5 m",
    power: "Máx. 60 W",
    sku: "P-SALIKI-55"
  },
  {
    id: "EO-0160",
    slug: "gmh-pendente-flores-18",
    name: "Pendente Flores 18",
    brandId: "gmh",
    collection: "Natural",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_a0b35c346c234d4bb13dda77d6465a8a~mv2.png",
      alt: "Pendente Flores 18 — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-natural"
    },
    status: "confirmado",
    material: "Madeira e fibra de sisal",
    lightSource: "Bocal E27",
    voltage: "Bivolt",
    ip: "IP20, uso interno",
    cord: "1,5 m",
    power: "Máx. 60 W",
    sku: "P-FLORES-18"
  },
  {
    id: "EO-0161",
    slug: "gmh-pendente-gili-17",
    name: "Pendente Gili 17",
    brandId: "gmh",
    collection: "Natural",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_c0af53ca8f944b65a3ce860ff09dc3e4~mv2.png",
      alt: "Pendente Gili 17 — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-natural"
    },
    status: "confirmado",
    material: "Madeira e fibra de sisal",
    lightSource: "Bocal E27",
    voltage: "Bivolt",
    ip: "IP20, uso interno",
    cord: "1,5 m",
    power: "Máx. 60 W",
    sku: "P-GILI-17"
  },
  {
    id: "EO-0162",
    slug: "gmh-pendente-biak-18",
    name: "Pendente Biak 18",
    brandId: "gmh",
    collection: "Natural",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_f9ba8f1c461045eb80453fa5aca33095~mv2.png",
      alt: "Pendente Biak 18 — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-natural"
    },
    status: "confirmado",
    material: "Madeira e fibra de sisal",
    lightSource: "Bocal E27",
    voltage: "Bivolt",
    ip: "IP20, uso interno",
    cord: "1,5 m",
    power: "Máx. 60 W",
    sku: "P-BIAK-18"
  },
  {
    id: "EO-0163",
    slug: "gmh-pendente-mojo-17",
    name: "Pendente Mojo 17",
    brandId: "gmh",
    collection: "Natural",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_4df78a488bec408ba8cd6b22d9e6f2b6~mv2.png",
      alt: "Pendente Mojo 17 — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-natural"
    },
    status: "confirmado",
    material: "Madeira e fibra de sisal",
    lightSource: "Bocal E27",
    voltage: "Bivolt",
    ip: "IP20, uso interno",
    cord: "1,5 m",
    power: "Máx. 60 W",
    sku: "P-MOJO-17"
  },
  {
    id: "EO-0164",
    slug: "gmh-pendente-timor-40",
    name: "Pendente Timor 40",
    brandId: "gmh",
    collection: "Natural",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_1e90252076064cb084c03d13ef4dd577~mv2.png",
      alt: "Pendente Timor 40 — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-natural"
    },
    status: "confirmado",
    material: "Madeira e fibra de sisal",
    lightSource: "Bocal E27",
    voltage: "Bivolt",
    ip: "IP20, uso interno",
    cord: "1,5 m",
    power: "Máx. 60 W",
    sku: "P-TIMOR-40"
  },
  {
    id: "EO-0165",
    slug: "gmh-pendente-nova-guine-42",
    name: "Pendente Nova Guiné 42",
    brandId: "gmh",
    collection: "Natural",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_4f4b3e14ce8a434a9eb5e989cc617450~mv2.jpg",
      alt: "Pendente Nova Guiné 42 — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-natural"
    },
    status: "confirmado",
    material: "Madeira e fibra de rattan",
    lightSource: "Bocal E27",
    voltage: "Bivolt",
    ip: "IP20, uso interno",
    cord: "1,5 m",
    power: "Máx. 60 W",
    sku: "P-NOVA-GUINE-42"
  },
  {
    id: "EO-0166",
    slug: "gmh-pendente-hao-35",
    name: "Pendente Hao 35",
    brandId: "gmh",
    collection: "Natural",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_7a2c96ea2816499393371418aa40c268~mv2.jpg",
      alt: "Pendente Hao 35 — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-natural"
    },
    status: "confirmado",
    material: "Madeira e fibra de rattan",
    lightSource: "Bocal E27",
    voltage: "Bivolt",
    ip: "IP20, uso interno",
    cord: "1,5 m",
    power: "Máx. 60 W",
    sku: "P-HAO-35"
  },
  {
    id: "EO-0167",
    slug: "gmh-pendente-austrais-40",
    name: "Pendente Austrais 40",
    brandId: "gmh",
    collection: "Natural",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_642800b80a9a4da691b1db072cb8539d~mv2.png",
      alt: "Pendente Austrais 40 — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-natural"
    },
    status: "confirmado",
    material: "Madeira e fibra de rattan",
    lightSource: "Bocal E27",
    voltage: "Bivolt",
    ip: "IP20, uso interno",
    cord: "1,5 m",
    power: "Máx. 60 W",
    sku: "P-AUSTRAIS-40"
  },
  {
    id: "EO-0168",
    slug: "gmh-pendente-gambier",
    name: "Pendente Gambier",
    brandId: "gmh",
    collection: "Natural",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_92bde77f5e064a7880f5f88a61cbd37c~mv2.png",
      alt: "Pendente Gambier — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-natural"
    },
    status: "confirmado",
    material: "Madeira e fibra de rattan",
    lightSource: "Bocal E27",
    voltage: "Bivolt",
    ip: "IP20, uso interno",
    cord: "1,5 m",
    power: "Máx. 60 W",
    variants: [
      {
        id: "35",
        label: "35",
        name: "Pendente Gambier 35",
        sku: "P-GAMBIER-35"
      },
      {
        id: "50",
        label: "50",
        name: "Pendente Gambier 50",
        sku: "P-GAMBIER-50"
      }
    ]
  },
  {
    id: "EO-0169",
    slug: "gmh-pendente-marquesas-35",
    name: "Pendente Marquesas 35",
    brandId: "gmh",
    collection: "Natural",
    category: "pendentes",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_59c2752918724f0d8d8a02fa8fce8003~mv2.png",
      alt: "Pendente Marquesas 35 — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-natural"
    },
    status: "confirmado",
    material: "Madeira e fibra de rattan",
    lightSource: "Bocal E27",
    voltage: "Bivolt",
    ip: "IP20, uso interno",
    cord: "1,5 m",
    power: "Máx. 60 W",
    sku: "P-MARQUESAS-35"
  },
  {
    id: "EO-0170",
    slug: "gmh-arandela-nias-30",
    name: "Arandela Nias 30",
    brandId: "gmh",
    collection: "Natural",
    category: "arandelas",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_42d864694f6244229755a06cdc595faa~mv2.png",
      alt: "Arandela Nias 30 — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-natural"
    },
    status: "confirmado",
    material: "Madeira e fibra de bambu",
    lightSource: "Bocal E27",
    voltage: "Bivolt",
    ip: "IP20, uso interno",
    cord: "1,1 m",
    power: "Máx. 60 W",
    sku: "A-NIAS-30"
  },
  {
    id: "EO-0171",
    slug: "gmh-arandela-sumba-20",
    name: "Arandela Sumba 20",
    brandId: "gmh",
    collection: "Natural",
    category: "arandelas",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_f711fef652864478aa4512c8aecc4bed~mv2.png",
      alt: "Arandela Sumba 20 — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-natural"
    },
    status: "confirmado",
    material: "Madeira e fibra de bambu",
    lightSource: "Bocal E27",
    voltage: "Bivolt",
    ip: "IP20, uso interno",
    cord: "1,1 m",
    power: "Máx. 60 W",
    sku: "A-SUMBA-20"
  },
  {
    id: "EO-0172",
    slug: "gmh-arandela-austrais-30",
    name: "Arandela Austrais 30",
    brandId: "gmh",
    collection: "Natural",
    category: "arandelas",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_3053621028e649229234971720a6a62a~mv2.png",
      alt: "Arandela Austrais 30 — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-natural"
    },
    status: "confirmado",
    material: "Madeira e fibra de rattan",
    lightSource: "Bocal E27",
    voltage: "Bivolt",
    ip: "IP20, uso interno",
    cord: "1,5 m",
    power: "Máx. 60 W",
    sku: "A-AUSTRAIS-30"
  },
  {
    id: "EO-0173",
    slug: "gmh-luminaria-de-mesa-bali-25",
    name: "Luminária de mesa Bali 25",
    brandId: "gmh",
    collection: "Natural",
    category: "luminarias-de-mesa",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_fbd0bc73c72044ba9f223bee5cc5331b~mv2.png",
      alt: "Luminária de mesa Bali 25 — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-natural"
    },
    status: "confirmado",
    material: "Madeira e fibra de bambu",
    lightSource: "Bocal E27",
    voltage: "Bivolt",
    ip: "IP20, uso interno",
    cord: "1,5 m",
    power: "Máx. 60 W",
    sku: "L-BALI-25"
  },
  {
    id: "EO-0174",
    slug: "gmh-luminaria-de-mesa-padar-20",
    name: "Luminária de mesa Padar 20",
    brandId: "gmh",
    collection: "Natural",
    category: "luminarias-de-mesa",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_000a6024e7b04da7a5d667c763cda2a9~mv2.png",
      alt: "Luminária de mesa Padar 20 — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-natural"
    },
    status: "confirmado",
    material: "Madeira e fibra de bambu",
    lightSource: "Bocal E27",
    voltage: "Bivolt",
    ip: "IP20, uso interno",
    cord: "1,5 m",
    power: "Máx. 60 W",
    sku: "L-PADAR-20"
  },
  {
    id: "EO-0175",
    slug: "gmh-luminaria-de-mesa-sumba-20",
    name: "Luminária de mesa Sumba 20",
    brandId: "gmh",
    collection: "Natural",
    category: "luminarias-de-mesa",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_d5623682d3af458db05ca5ec6f580185~mv2.jpg",
      alt: "Luminária de mesa Sumba 20 — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-natural"
    },
    status: "confirmado",
    material: "Madeira e fibra de bambu",
    lightSource: "Bocal E27",
    voltage: "Bivolt",
    ip: "IP20, uso interno",
    cord: "1,5 m",
    power: "Máx. 60 W",
    sku: "L-SUMBA-20"
  },
  {
    id: "EO-0176",
    slug: "gmh-luminaria-de-mesa-komodo-23",
    name: "Luminária de mesa Komodo 23",
    brandId: "gmh",
    collection: "Natural",
    category: "luminarias-de-mesa",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_7fdc2c34d3784662a83fb338dcb5f63d~mv2.png",
      alt: "Luminária de mesa Komodo 23 — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-natural"
    },
    status: "confirmado",
    material: "Madeira e fibra de bambu",
    lightSource: "Bocal E27",
    voltage: "Bivolt",
    ip: "IP20, uso interno",
    cord: "1,5 m",
    power: "Máx. 60 W",
    sku: "L-KOMODO-23"
  },
  {
    id: "EO-0177",
    slug: "gmh-luminaria-de-mesa-flores-18",
    name: "Luminária de mesa Flores 18",
    brandId: "gmh",
    collection: "Natural",
    category: "luminarias-de-mesa",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_467d462370564d78a19c50e74821b986~mv2.jpg",
      alt: "Luminária de mesa Flores 18 — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-natural"
    },
    status: "confirmado",
    material: "Madeira e fibra de sisal",
    lightSource: "Bocal E27",
    voltage: "Bivolt",
    ip: "IP20, uso interno",
    cord: "1,5 m",
    power: "Máx. 60 W",
    sku: "L-FLORES-18"
  },
  {
    id: "EO-0178",
    slug: "gmh-luminaria-de-mesa-gili-17",
    name: "Luminária de mesa Gili 17",
    brandId: "gmh",
    collection: "Natural",
    category: "luminarias-de-mesa",
    rooms: [],
    image: {
      src: "https://static.wixstatic.com/media/75a4ef_311f02574768426b97d358464b3e51e7~mv2.jpg",
      alt: "Luminária de mesa Gili 17 — GMH Trade, foto do fabricante",
      fit: "contain",
      credit: "GMH Trade (site oficial)"
    },
    source: {
      catalogId: "gmh-site",
      url: "https://www.gmhtrade.com.br/linha-natural"
    },
    status: "confirmado",
    material: "Madeira e fibra de sisal",
    lightSource: "Bocal E27",
    voltage: "Bivolt",
    ip: "IP20, uso interno",
    cord: "1,5 m",
    power: "Máx. 60 W",
    sku: "L-GILI-17"
  },
];
