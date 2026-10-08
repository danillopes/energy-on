import Image from "next/image";
import { photos } from "@/config/images";
import { WHATSAPP_GENERAL_MESSAGE, whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "../shared/Icons";
import { HeroParallax } from "./HeroParallax";

/* Assinatura da marca em texto: “E” rosa, “NERGY” branco e “on” em itálico serifado,
   como no logo da loja — nítido em qualquer tamanho de tela. */
const letters = "NERGY".split("");

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[max(36rem,100svh)] flex-col overflow-hidden bg-ink"
    >
      <HeroParallax>
        <Image
          src={photos.hero.src}
          alt={photos.hero.alt}
          fill
          preload
          sizes="100vw"
          quality={70}
          className="hero-photo object-cover object-center"
        />
      </HeroParallax>

      {/* Overlay gradual: garante leitura sem apagar a luz da foto */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/0.55)_0%,rgb(0_0_0/0)_22%,rgb(0_0_0/0.1)_45%,rgb(20_20_20/0.85)_82%,#141414_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(120%_80%_at_0%_100%,rgb(0_0_0/0.7),transparent_60%)]"
      />

      <div className="container-x relative mt-auto pt-[calc(var(--header-h)+var(--safe-top)+3rem)] pb-6 lg:pb-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7 xl:col-span-6">
            <p
              className="hero-rise type-h2 max-w-[16ch] text-paper"
              style={{ ["--d" as string]: "0.75s" }}
            >
              A iluminação transforma espaços. Nós transformamos ambientes.
            </p>
            <p
              className="hero-rise type-lead mt-6 max-w-[46ch]"
              style={{ ["--d" as string]: "1.05s" }}
            >
              Descubra soluções em iluminação que valorizam cada detalhe e transformam a maneira como você vive
              seus espaços.
            </p>
            <div
              className="hero-rise mt-8 flex flex-col gap-3 sm:flex-row"
              style={{ ["--d" as string]: "1.3s" }}
            >
              <a href="#produtos" className="btn btn-solid">
                Conheça nossos produtos
              </a>
              <a
                href={whatsappLink(WHATSAPP_GENERAL_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                <WhatsAppIcon size={18} />
                Fale com um especialista
              </a>
            </div>
          </div>

          <a
            href="#ambientes"
            className="hero-rise group hidden items-center gap-4 justify-self-end text-small text-paper/70 transition-colors hover:text-paper lg:col-span-5 lg:flex xl:col-span-6"
            style={{ ["--d" as string]: "1.6s" }}
          >
            Role para descobrir os ambientes
            <span aria-hidden="true" className="relative block h-14 w-px overflow-hidden bg-white/20">
              <span className="cue-line absolute inset-0 bg-brand" />
            </span>
          </a>
        </div>

        <h1
          id="hero-title"
          aria-label="Energy On"
          className="type-display relative mt-10 w-full whitespace-nowrap text-paper select-none lg:mt-14"
          // Ocupa exatamente a largura útil: (largura do container − margens) ÷ proporção do desenho.
          style={{ fontSize: "calc((min(100vw, 105rem) - 2 * var(--gutter)) / 5.75)", fontWeight: 450, fontStretch: "112%" }}
        >
          <span aria-hidden="true" className="hero-letter text-[1.3em] font-semibold text-brand" style={{ ["--i" as string]: 0 }}>
            E
          </span>
          {letters.map((char, index) => (
            <span key={char} aria-hidden="true" className="hero-letter" style={{ ["--i" as string]: index + 1 }}>
              {char}
            </span>
          ))}
          <span
            aria-hidden="true"
            className="hero-letter -translate-x-[0.12em] translate-y-[0.22em] font-script text-[0.62em] font-medium tracking-normal text-brand italic"
            style={{ ["--i" as string]: 7, fontStretch: "100%" }}
          >
            on
          </span>
        </h1>
      </div>
    </section>
  );
}
