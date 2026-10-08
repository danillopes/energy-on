import { site } from "@/config/site";
import { getProducts } from "@/data/products";
import { About } from "@/components/sections/About";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { ChandelierRepertoire } from "@/components/sections/ChandelierRepertoire";
import { Catalog } from "@/components/sections/Catalog";
import { Environments } from "@/components/sections/Environments";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Instagram } from "@/components/sections/Instagram";
import { Simulator } from "@/components/sections/Simulator";

// Revalida a página a cada hora (feed do Instagram, quando ativado).
export const revalidate = 3600;

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.contact.phoneDisplay,
    ...(site.instagram.url && { sameAs: [site.instagram.url] }),
    ...(site.address.street && {
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        addressLocality: site.address.city,
        addressRegion: site.address.state,
        postalCode: site.address.postalCode,
        addressCountry: "BR",
      },
    }),
  };

  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <Environments />
        <Simulator />
        <BeforeAfter />
        <ChandelierRepertoire />
        <Catalog products={getProducts()} />
        <Instagram />
        <About />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
