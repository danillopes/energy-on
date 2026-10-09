/**
 * Fabricantes e catálogos de origem.
 * Cadastre a marca uma vez aqui e use só o `id` nos produtos — assim o nome
 * aparece sempre igual no site e na mensagem do WhatsApp.
 */

export type Brand = {
  id: string;
  name: string;
  site?: string;
};

export type CatalogSource = {
  id: string;
  brandId: string;
  title: string;
  year?: number;
  /** Link público do catálogo original (PDF, Scribd, site). */
  url?: string;
};

export const brands: Brand[] = [
  { id: "gmh", name: "GMH Trade", site: "https://www.gmhtrade.com.br/" },
  // Fornecedores da loja — os catálogos ainda não foram anexados ao projeto.
  { id: "nordecor", name: "Nordecor" },
  { id: "sindora", name: "Sindora" },
  { id: "deluxe", name: "Deluxe" },
  { id: "moon", name: "Moon" },
  { id: "select", name: "Select" },
  { id: "perfom", name: "Perfom" },
];

export const catalogs: CatalogSource[] = [
  {
    id: "gmh-site",
    brandId: "gmh",
    title: "Site oficial GMH Trade",
    url: "https://www.gmhtrade.com.br/services-9",
  },
  {
    id: "gmh-2025",
    brandId: "gmh",
    title: "Catálogo GMH 2025",
    year: 2025,
    url: "https://pt.scribd.com/document/865641081/Catalogo-GMH-2025",
  },
];

const brandMap = new Map(brands.map((brand) => [brand.id, brand]));
const catalogMap = new Map(catalogs.map((catalog) => [catalog.id, catalog]));

export const getBrand = (id?: string) => (id ? brandMap.get(id) : undefined);
export const getCatalogSource = (id?: string) => (id ? catalogMap.get(id) : undefined);
