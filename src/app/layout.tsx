import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/config/site";
import { photos } from "@/config/images";
import "./globals.css";

// Archivo variável (peso 100–900, largura 62–125%), servida localmente: sem requisição a terceiros.
const archivo = localFont({
  src: "./fonts/archivo-latin-wdth-normal.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  style: "normal",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});

// Itálico serifado do “on” do logo — só os glifos latinos, um arquivo pequeno.
const playfair = localFont({
  src: "./fonts/playfair-display-latin-500-italic.woff2",
  variable: "--font-playfair",
  weight: "500",
  style: "italic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Energy On — Iluminação decorativa e soluções para ambientes",
    template: "%s | Energy On",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "iluminação decorativa",
    "lustres",
    "pendentes",
    "arandelas",
    "spots",
    "trilhos",
    "fita LED",
    "luminárias",
    "projeto luminotécnico",
    "Energy On",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.name,
    title: "Energy On — A iluminação transforma espaços",
    description: site.description,
    images: [{ url: `${photos.hero.src}?w=1200&h=630&fit=crop&auto=format&q=70`, width: 1200, height: 630, alt: photos.hero.alt }],
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#141414",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // permite usar env(safe-area-inset-*) em aparelhos com notch / Dynamic Island
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${playfair.variable}`} data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
      </head>
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:top-[calc(var(--safe-top)+0.75rem)] focus:left-3 focus:z-[60] focus:rounded-full focus:bg-paper focus:px-4 focus:py-2 focus:text-ink"
        >
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
