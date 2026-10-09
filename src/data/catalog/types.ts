import type { CategoryId, RoomId, StyleId } from "../taxonomy.ts";

/**
 * Situação de cada registro do catálogo.
 *
 * - confirmado     → código e dados conferidos no catálogo do fabricante (com página de referência).
 * - informado      → código passado pela loja, ainda sem conferência na página do catálogo.
 * - pendente       → produto real, mas o código exato ainda não foi identificado.
 * - demonstrativo  → foto ilustrativa do site, sem fabricante (não é produto do catálogo).
 *
 * Regra: nunca preencher `sku` por semelhança visual. Na dúvida, `pendente`.
 */
export type VerificationStatus = "confirmado" | "informado" | "pendente" | "demonstrativo";

export type ProductImage = {
  src: string;
  alt: string;
  /** contain = foto de produto (fundo neutro, sem corte); cover = foto de ambiente. */
  fit?: "contain" | "cover";
  /** De onde veio a foto (ex.: "GMH Trade (site oficial)", "Unsplash"). */
  credit?: string;
  /**
   * Id da variante que aparece na foto. Se o cliente escolher outra cor, a
   * interface avisa que a foto mostra este acabamento — nunca troca de foto por uma parecida.
   */
  showsVariant?: string;
};

export type ProductGalleryItem = {
  src: string;
  alt: string;
  title: string;
  subtitle?: string;
};

/** Onde a informação foi encontrada. */
export type SourceRef = {
  /** id de `catalogs` em brands.ts */
  catalogId?: string;
  /** Página do catálogo (PDF/Scribd) onde o produto aparece. */
  page?: number | string;
  /** Página do produto no site oficial do fabricante. */
  url?: string;
  /** Observação interna (não aparece para o cliente). */
  note?: string;
};

/** Campos técnicos — todos opcionais: só aparecem quando vierem do catálogo. */
export type ProductSpecs = {
  color?: string;
  dimensions?: string;
  material?: string;
  /** Comprimento do fio (ex.: "4 m"). */
  cord?: string;
  power?: string;
  /** Fluxo luminoso (ex.: "1026 lm"). */
  lumens?: string;
  colorTemperature?: string;
  /** "LED integrado", "Bocal E27"… */
  lightSource?: string;
  voltage?: string;
  dimmable?: string;
  ip?: string;
};

export type ProductVariant = ProductSpecs & {
  /** Id interno da variante, estável (vai na URL: ?variante=60-gold). */
  id: string;
  /** Texto do seletor (ex.: "60 · Gold"). */
  label: string;
  /** Nome completo da variante, se diferente do produto (ex.: "Pendente Cosmos 60"). */
  name?: string;
  /** Código exato do fabricante para esta variante. */
  sku?: string;
  image?: ProductImage;
  source?: SourceRef;
  status?: VerificationStatus;
};

export type Product = ProductSpecs & {
  /** Identificador interno da Energy On, independente do SKU do fabricante. Nunca reutilizar. */
  id: string;
  slug: string;
  name: string;
  brandId?: string;
  /** Coleção/linha do fabricante (ex.: "Cosmos"). */
  collection?: string;
  category: CategoryId;
  style?: StyleId;
  rooms: RoomId[];
  summary?: string;
  /** null = foto ainda não fornecida/autorizada. */
  image: ProductImage | null;
  gallery?: ProductGalleryItem[];
  /** Código do fabricante quando o produto não tem variantes. */
  sku?: string;
  variants?: ProductVariant[];
  source?: SourceRef;
  status: VerificationStatus;
};

/** Produto já com a variante escolhida aplicada — é o que a interface e o WhatsApp usam. */
export type ResolvedProduct = ProductSpecs & {
  product: Product;
  variant?: ProductVariant;
  name: string;
  sku?: string;
  image: ProductImage | null;
  source?: SourceRef;
  status: VerificationStatus;
};
