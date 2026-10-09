import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { ProductPageDetail } from "@/components/catalog/ProductPageDetail";
import { ProductVisual } from "@/components/catalog/ProductVisual";
import { brandName, getProduct, getProducts, resolveProduct } from "@/data/catalog";
import { categories, labelOf } from "@/data/taxonomy";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProducts().map((product) => ({ slug: product.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const resolved = resolveProduct(product);
  const category = labelOf(categories, product.category);
  const brand = brandName(product);
  const code = resolved.sku ? ` Código ${resolved.sku}.` : "";
  const title = [product.name, brand].filter(Boolean).join(" — ");
  const description =
    product.summary ??
    `${category}${brand ? ` ${brand}` : ""}${product.collection ? `, coleção ${product.collection}` : ""}.${code} Consulte disponibilidade e valor com a Energy On.`;
  return {
    title,
    description,
    alternates: { canonical: `/produtos/${product.slug}` },
    openGraph: {
      title: `${title} | Energy On`,
      description,
      url: `/produtos/${product.slug}`,
      ...(resolved.image && { images: [{ url: resolved.image.src, alt: resolved.image.alt }] }),
    },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = labelOf(categories, product.category);
  const all = getProducts();
  // Primeiro, peças da mesma coleção; depois, do mesmo tipo.
  const related = [
    ...all.filter((p) => p.id !== product.id && product.collection && p.collection === product.collection),
    ...all.filter((p) => p.id !== product.id && p.category === product.category && p.collection !== product.collection),
  ].slice(0, 4);

  const resolved = resolveProduct(product);
  const brand = brandName(product);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    category,
    ...(resolved.sku && { sku: resolved.sku, mpn: resolved.sku }),
    ...(brand && { brand: { "@type": "Brand", name: brand } }),
    ...(resolved.image && { image: resolved.image.src }),
  };

  return (
    <>
      <Header base="/" alwaysSolid />
      <main id="conteudo" className="pt-[calc(var(--header-h)+var(--safe-top))]">
        <div className="container-x py-8">
          <nav aria-label="Trilha de navegação">
            <ol className="flex flex-wrap items-center gap-2 text-small text-mist">
              <li>
                <Link href="/" className="link-line hover:text-paper">Início</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={`/?categoria=${product.category}#produtos`} className="link-line hover:text-paper">
                  {category}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-silver">{product.name}</li>
            </ol>
          </nav>
        </div>

        <div className="container-x pb-24">
          <ProductPageDetail product={product} />
        </div>

        {related.length > 0 && (
          <section aria-labelledby="relacionados" className="border-t border-smoke">
            <div className="container-x section-y">
              <h2 id="relacionados" className="type-h3">
                {product.collection ? `Mais da coleção ${product.collection}` : "Combina com"}
              </h2>
              <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
                {related.map((item) => {
                  const r = resolveProduct(item);
                  return (
                    <li key={item.id}>
                      <Link href={`/produtos/${item.slug}`} className="group block">
                        <span className="relative block aspect-[4/5] overflow-hidden rounded-xl">
                          <ProductVisual
                            image={r.image}
                            name={r.name}
                            brand={brandName(item)}
                            sizes="(min-width: 1024px) 25vw, 50vw"
                            hoverZoom
                          />
                        </span>
                        <span className="mt-3 block">{r.name}</span>
                        <span className="block text-small text-mist">{r.sku ?? labelOf(categories, item.category)}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        )}
      </main>
      <Footer homeLinks={false} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
