import type { NextConfig } from "next";

/**
 * Content Security Policy — restringe de onde o navegador pode carregar cada
 * recurso. Mantida numa linha só (sem quebras) no valor do cabeçalho.
 *
 * Notas:
 * - Site estático (SSG) na Vercel: o Next injeta scripts inline de
 *   inicialização/hidratação que, sem nonce por requisição (indisponível em
 *   páginas estáticas), exigem 'unsafe-inline' em script-src. Evitamos
 *   'unsafe-eval'. Endurecer com nonce exigiria middleware (tornando as rotas
 *   dinâmicas), fora do escopo de um site institucional estático.
 * - img-src: só os domínios realmente usados — Unsplash (fotos demonstrativas),
 *   Wix (fotos oficiais GMH) e os CDNs do Instagram/Meta (feed, quando ativado).
 * - Sem iframes no site: frame-ancestors 'none' impede que a página seja
 *   embutida em outros sites (anti-clickjacking), junto com X-Frame-Options.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://images.unsplash.com https://static.wixstatic.com https://*.cdninstagram.com https://*.fbcdn.net",
  "font-src 'self'",
  "connect-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

/**
 * Imagens: usamos um loader próprio (src/lib/image-loader.ts) que pede ao CDN
 * de origem o tamanho e o formato certos (AVIF/WebP via `auto=format`).
 * Assim o site funciona igual em `next start`, Vercel ou exportação estática.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    qualities: [60, 70, 75],
    deviceSizes: [390, 640, 828, 1080, 1440, 1920, 2560],
    imageSizes: [96, 160, 256, 384],
  },
  async headers() {
    return [
      {
        // Arquivos da marca e mídias locais: cache longo no navegador/CDN.
        source: "/:dir(brand|media)/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // HTTPS obrigatório por 1 ano. Sem includeSubDomains/preload até
          // confirmar que todos os subdomínios usam HTTPS (recomendação do brief).
          { key: "Strict-Transport-Security", value: "max-age=31536000" },
        ],
      },
    ];
  },
};

export default nextConfig;
