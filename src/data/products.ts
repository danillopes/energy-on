/**
 * Compatibilidade: o catálogo agora vive em `src/data/catalog/`.
 *   - brands.ts          fabricantes e catálogos de origem
 *   - products-gmh.ts    produtos GMH Trade
 *   - products-demo.ts   itens demonstrativos (sem marca/código)
 *   - validate.ts        checagem de duplicados, fotos e códigos
 */
export * from "./catalog/index.ts";
