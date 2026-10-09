/**
 * Relatório do catálogo: quantos produtos, quantos confirmados, pendências,
 * duplicados e problemas de foto/código.
 *
 *   npm run catalog:audit
 */
import { allProducts, brandName, getCatalogSource, resolveProduct, validateCatalog } from "../src/data/catalog/index.ts";

const byStatus = (status: string) => allProducts.filter((p) => p.status === status);
const real = allProducts.filter((p) => p.status !== "demonstrativo");
const skus = real.flatMap((p) => (p.variants?.length ? p.variants.map((v) => v.sku) : [p.sku])).filter(Boolean);

console.log("CATÁLOGO ENERGY ON — AUDITORIA\n");
console.log(`Registros no total ............ ${allProducts.length}`);
console.log(`  de fabricante ............... ${real.length} (${skus.length} códigos)`);
console.log(`    confirmados no catálogo ... ${byStatus("confirmado").length}`);
console.log(`    código informado pela loja  ${byStatus("informado").length}`);
console.log(`    pendentes de identificação  ${byStatus("pendente").length}`);
console.log(`  demonstrativos (sem marca) .. ${byStatus("demonstrativo").length}`);
console.log(`  sem foto .................... ${allProducts.filter((p) => !p.image).length}`);

console.log("\nPRODUTOS DE FABRICANTE");
for (const product of real) {
  const variants = product.variants?.length ? product.variants : [undefined];
  for (const variant of variants) {
    const r = resolveProduct(product, variant?.id);
    const source = getCatalogSource(r.source?.catalogId);
    const where = [source?.title, r.source?.page != null ? `p. ${r.source.page}` : null, r.source?.url].filter(Boolean).join(" · ");
    console.log(`  ${product.id}  ${brandName(product)} | ${r.name} | ${r.sku ?? "SEM CÓDIGO"} | ${r.status} | foto: ${r.image ? "sim" : "não"} | ${where || "sem origem"}`);
  }
}

const issues = validateCatalog(allProducts);
console.log(`\nPROBLEMAS (${issues.filter((i) => i.level === "erro").length} erros, ${issues.filter((i) => i.level === "aviso").length} avisos)`);
for (const issue of issues) console.log(`  ${issue.level === "erro" ? "ERRO " : "aviso"} [${issue.productId}] ${issue.message}`);
if (issues.some((i) => i.level === "erro")) process.exit(1);
