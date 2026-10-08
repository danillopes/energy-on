import type { NextConfig } from "next";

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
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
