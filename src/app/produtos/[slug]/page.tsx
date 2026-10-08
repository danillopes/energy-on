import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { WhatsAppIcon } from "@/components/shared/Icons";
import { SmartImage } from "@/components/shared/SmartImage";
import { ProductGallery } from "@/components/shared/ProductGallery";
import { getProduct, getProducts } from "@/data/products";
import { categories, finishes, labelOf, rooms, styles } from "@/data/taxonomy";
import { productQuoteLink } from "@/lib/whatsapp";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProducts().map((product) => ({ slug: product.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const category = labelOf(categories, product.category);
  return {
    title: `${product.name} — ${category}`,
    description: `${product.summary} ${category} com acabamento ${labelOf(finishes, product.finish).toLowerCase()}. Solicite um orçamento à Energy On.`,
    alternates: { canonical: `/produtos/${product.slug}` },
    openGraph: {
      title: `${product.name} | Energy On`,
      description: product.summary,
      url: `/produtos/${product.slug}`,
      images: [{ url: `${product.image}?w=1200&h=630&fit=crop&auto=format&q=70`, width: 1200, height: 630, alt: product.imageAlt }],
    },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = labelOf(categories, product.category);
  const related = getProducts()
    .filter((item) => item.slug !== product.slug && (item.category === product.category || item.rooms.some((r) => product.rooms.includes(r))))
    .slice(0, 4);

  const details = [
    { label: "Categoria", value: category },
    { label: "Acabamento", value: labelOf(finishes, product.finish) },
    { label: "Estilo", value: labelOf(styles, product.style) },
    { label: "Ambientes", value: product.rooms.map((room) => labelOf(rooms, room)).join(", ") },
    ...(product.specs?.dimensoes ? [{ label: "Dimensões", value: product.specs.dimensoes }] : []),
    ...(product.specs?.material ? [{ label: "Material", value: product.specs.material }] : []),
    ...(product.specs?.temperatura ? [{ label: "Temperatura", value: product.specs.temperatura }] : []),
    ...(product.specs?.soquetes ? [{ label: "Soquetes / Lâmpadas", value: product.specs.soquetes }] : []),
    ...(product.specs?.tensao ? [{ label: "Tensão", value: product.specs.tensao }] : []),
  ];

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

        <article className="container-x grid gap-10 pb-24 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <ProductGallery
              items={product.gallery}
              defaultImage={product.image}
              defaultAlt={product.imageAlt}
              productName={product.name}
            />
          </div>

          <div className="flex flex-col lg:col-span-5 lg:py-6">
            <p className="text-small text-mist">{category}</p>
            <h1 className="type-h2 mt-2">{product.name}</h1>
            <p className="type-lead mt-6">{product.summary}</p>

            <dl className="mt-10 border-t border-smoke">
              {details.map((item) => (
                <div key={item.label} className="grid grid-cols-[8rem_1fr] gap-4 border-b border-smoke py-4">
                  <dt className="text-mist">{item.label}</dt>
                  <dd className="text-silver">{item.value}</dd>
                </div>
              ))}
            </dl>

            {product.demo && (
              <p className="mt-6 text-micro text-mist">
                Item de exemplo. Medidas, potência, temperatura de cor, preço e disponibilidade são informados
                pela equipe no atendimento.
              </p>
            )}

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href={productQuoteLink(product)} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
                <WhatsAppIcon size={18} />
                Solicitar orçamento
              </a>
              <Link href="/#produtos" className="btn btn-ghost">
                Voltar ao catálogo
              </Link>
            </div>
          </div>
        </article>

        {related.length > 0 && (
          <section aria-labelledby="relacionados" className="border-t border-smoke">
            <div className="container-x section-y">
              <h2 id="relacionados" className="type-h3">Combina com</h2>
              <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/produtos/${item.slug}`} className="group block">
                      <span className="relative block aspect-[4/5] overflow-hidden rounded-sm bg-graphite">
                        <SmartImage
                          src={item.image}
                          alt={item.imageAlt}
                          fill
                          sizes="(min-width: 1024px) 25vw, 50vw"
                          quality={60}
                          fallbackLabel={item.name}
                          className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                      </span>
                      <span className="mt-3 block">{item.name}</span>
                      <span className="block text-small text-mist">{labelOf(categories, item.category)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>
      <Footer homeLinks={false} />
    </>
  );
}
