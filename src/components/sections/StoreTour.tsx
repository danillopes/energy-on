"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";
import { tourEmbedUrl } from "@/lib/tour";
import { CloseIcon, PinIcon } from "../shared/Icons";

type Status = "preview" | "loading" | "ready";

/**
 * “Conheça a Energy On por dentro” — passeio virtual 360° real da loja (Google Maps).
 *
 * Desempenho: nada do Google é carregado até o visitante tocar em
 * “Iniciar visita virtual”. Antes disso a seção mostra só a foto da fachada.
 */
export function StoreTour() {
  const [status, setStatus] = useState<Status>("preview");
  const [fullscreen, setFullscreen] = useState(false);
  const frame = useRef<HTMLDivElement>(null);
  const started = status !== "preview";
  const { address, tour } = site;

  const start = useCallback(() => setStatus((s) => (s === "preview" ? "loading" : s)), []);
  const stop = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen();
    setStatus("preview");
  }, []);

  // Tela cheia do próprio quadro. No iPhone (sem Fullscreen API para elementos),
  // abre o mesmo panorama no Google Maps, que tem tela cheia nativa.
  const openFullscreen = useCallback(() => {
    const node = frame.current;
    if (node && document.fullscreenEnabled && node.requestFullscreen) {
      start();
      node.requestFullscreen().catch(() => window.open(tour.mapsUrl, "_blank", "noopener"));
    } else {
      window.open(tour.mapsUrl, "_blank", "noopener");
    }
  }, [start, tour.mapsUrl]);

  useEffect(() => {
    const onChange = () => setFullscreen(document.fullscreenElement === frame.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const fullAddress = [address.street, [address.city, address.state].filter(Boolean).join(" — ")]
    .filter(Boolean)
    .join(", ");

  return (
    <section id="loja" aria-labelledby="loja-title" className="section-y border-t border-smoke bg-ink">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="loja-title" className="type-h2 lg:col-span-7">
            Conheça a Energy On por dentro.
          </h2>
          <p className="type-lead max-w-[44ch] lg:col-span-5">
            Explore nosso espaço e descubra um universo de possibilidades em iluminação.
          </p>
        </div>

        {/* Quadro do passeio */}
        <div
          ref={frame}
          className={cn(
            "relative mt-12 overflow-hidden rounded-md border border-smoke bg-graphite lg:mt-16",
            fullscreen ? "rounded-none border-0" : "aspect-[4/5] sm:aspect-[16/10] lg:aspect-[21/9] lg:min-h-[32rem]",
          )}
        >
          {/* Prévia: foto real da fachada, sem carregar nada do Google */}
          <div
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-[var(--ease-out-soft)]",
              status === "ready" ? "pointer-events-none opacity-0" : "opacity-100",
            )}
            aria-hidden={status === "ready"}
          >
            <Image
              src={tour.preview.src}
              alt={tour.preview.alt}
              fill
              sizes="(min-width: 1024px) 90vw, 100vw"
              className={cn(
                "object-cover transition-[transform,filter] duration-[1.2s] ease-[var(--ease-out-soft)]",
                started ? "scale-105 blur-sm brightness-50" : "brightness-[0.55]",
              )}
            />
            <div className="absolute inset-0 bg-[radial-gradient(70%_70%_at_50%_55%,rgb(20_20_20/0.15),rgb(20_20_20/0.85))]" />

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-6 text-center">
              <span
                aria-hidden="true"
                className={cn(
                  "grid h-20 w-20 place-items-center rounded-full border border-white/40 text-small tracking-wide backdrop-blur-sm",
                  started && "animate-pulse",
                )}
                style={{ fontStretch: "118%", fontWeight: 500 }}
              >
                360°
              </span>

              {status === "preview" ? (
                <>
                  <button type="button" onClick={start} className="btn btn-solid">
                    Iniciar visita virtual
                  </button>
                  <p className="max-w-[36ch] text-small text-silver">
                    Passeio real pela loja, publicado no Google Maps. Arraste para olhar em volta e use os botões para
                    aproximar.
                  </p>
                </>
              ) : (
                <p role="status" className="text-small text-silver">
                  Carregando o passeio…
                </p>
              )}
            </div>
          </div>

          {/* Visualizador: só existe depois do clique */}
          {started && (
            <iframe
              title="Passeio virtual 360° pela loja Energy On (Google Maps)"
              src={tourEmbedUrl()}
              onLoad={() => setStatus("ready")}
              allow="fullscreen; accelerometer; gyroscope"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className={cn(
                "absolute inset-0 h-full w-full border-0 transition-opacity duration-700 ease-[var(--ease-out-soft)]",
                status === "ready" ? "opacity-100" : "opacity-0",
              )}
            />
          )}

          {started && (
            <button
              type="button"
              onClick={stop}
              className="absolute bottom-10 left-1/2 z-10 inline-flex min-h-10 -translate-x-1/2 items-center gap-2 rounded-full bg-ink/80 px-3.5 text-small text-paper backdrop-blur transition-colors hover:bg-ink"
            >
              <CloseIcon size={16} />
              Encerrar visita
            </button>
          )}
        </div>

        {/* Ações e endereço */}
        <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3 text-silver">
            <PinIcon size={18} className="mt-0.5 shrink-0 text-brand" />
            <p>
              {fullAddress}
              <br />
              <a
                href={address.mapsUrl || tour.placeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line text-small text-paper"
              >
                Como chegar
              </a>
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={openFullscreen} className="btn btn-ghost">
              Explorar em tela cheia
            </button>
            <a href={tour.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost sm:border-transparent">
              Abrir no Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
