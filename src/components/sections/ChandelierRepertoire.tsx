"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { productQuoteLink } from "@/lib/whatsapp";
import { ArrowIcon, WhatsAppIcon } from "../shared/Icons";

const references = [
  {
    id: "jantar",
    title: "Mesa de Jantar",
    subtitle: "Ponto focal e proporção ideal",
    image: "/media/lustre-aurea-jantar.webp",
    alt: "Lustre Áurea com braços dourados em latão e globos âmbar sobre mesa de jantar em mármore nero marquina à noite",
    tag: "Sala de Jantar • 2700K",
    description:
      "Instalado a 80 cm do tampo de mármore, o Lustre Áurea cria uma área de refeições intimista. A luz filtrada pelos globos de vidro âmbar ilumina os pratos com suavidade, eliminando qualquer sensação de ofuscamento.",
    architecturalTip: "Dica: Em mesas de 8 a 10 lugares, a extensão de 120 cm do lustre acompanha a linearidade do tampo sem pesar.",
  },
  {
    id: "living",
    title: "Living & Pé-Direito Alto",
    subtitle: "Protagonista no espaço integrado",
    image: "/media/lustre-aurea-living.webp",
    alt: "Lustre Áurea como peça central em living sofisticado com painel ripado, sanca de LED e sofá claro",
    tag: "Living • Pé-Direito Duplo",
    description:
      "Em ambientes amplos com painéis ripados e pé-direito generoso, os múltiplos braços orgânicos preenchem o volume aéreo com leveza escultural, dialogando com as linhas retas da marcenaria e a sanca indireta.",
    architecturalTip: "Dica: O acabamento em latão escovado contrasta elegantemente com tons amadeirados e tecidos neutros.",
  },
  {
    id: "macro",
    title: "Vidro Âmbar & Detalhes",
    subtitle: "Close-up em acabamento artesanal",
    image: "/media/lustre-aurea-macro.webp",
    alt: "Macro detalhado do vidro âmbar soprado artesanalmente com relevo óptico e articulação usinada em latão",
    tag: "Detalhe Construtivo • Macro",
    description:
      "Cada cúpula é soprada em vidro âmbar com relevo óptico sutil que difunde o filamento de LED. As articulações metálicas usinadas em latão escovado permitem pequenos ajustes angulares na instalação.",
    architecturalTip: "Dica: O vidro âmbar adiciona uma camada de calor cromático que valoriza a pele e a paleta de cores do ambiente.",
  },
  {
    id: "baixo",
    title: "Perspectiva Inferior",
    subtitle: "Geometria radial e equilíbrio visual",
    image: "/media/lustre-aurea-baixo.webp",
    alt: "Vista zenital de baixo para cima do Lustre Áurea mostrando o desenho radial das hastes sob o teto ripado",
    tag: "Perspectiva Zenital • Vista de Baixo",
    description:
      "A vista de baixo revela o equilíbrio da geometria radial das hastes. Os 8 pontos de luz distribuem a luminosidade em 360°, projetando sombras suaves e elegantes no forro do teto.",
    architecturalTip: "Dica: Perfeito para quem aprecia peças com forte apelo geométrico tanto de lado quanto de baixo.",
  },
  {
    id: "dia",
    title: "Escultura à Luz Natural",
    subtitle: "Presença estética mesmo desligado",
    image: "/media/lustre-aurea-dia.webp",
    alt: "Lustre Áurea desligado durante a manhã com luz natural entrando pelas grandes janelas panorâmicas",
    tag: "Luz Natural • Peça de Arte",
    description:
      "Durante o dia, mesmo com as lâmpadas desligadas, a peça funciona como uma verdadeira escultura de design. Os reflexos da luz do sol no vidro âmbar e no latão mantêm a sofisticação da sala o dia inteiro.",
    architecturalTip: "Dica: Uma luminária de alto padrão deve enriquecer o ambiente tanto acesa à noite quanto desligada de dia.",
  },
  {
    id: "intimista",
    title: "Atmosfera Noturna & Reflexos",
    subtitle: "Clima intimista para receber",
    image: "/media/lustre-aurea-intimista.webp",
    alt: "Reflexos da luz do Lustre Áurea em taças de cristal e mesa de mármore com efeito de bokeh dourado à noite",
    tag: "Atmosfera • Noite & Recepções",
    description:
      "À noite, a combinação do filamento LED quente com o vidro âmbar projeta reflexos cintilantes em cristais, talheres e tampos reflexivos, criando uma atmosfera digna de alta gastronomia.",
    architecturalTip: "Dica: Compatível com dimerização para reduzir a intensidade na hora de servir o jantar.",
  },
];

const chandelierProduct = {
  slug: "lustre-aurea",
  name: "Lustre Áurea Contemporâneo",
  image: "/media/lustre-aurea-jantar.webp",
};

export function ChandelierRepertoire() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const current = references[selectedIndex];

  const next = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % references.length);
  }, []);

  const prev = useCallback(() => {
    setSelectedIndex((prev) => (prev - 1 + references.length) % references.length);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, prev]);

  return (
    <section id="repertorio" aria-labelledby="repertorio-title" className="section-y border-t border-smoke bg-ink">
      <div className="container-x">
        {/* Cabeçalho da seção */}
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <span className="text-micro font-medium uppercase tracking-widest text-brand">
              Repertório de Referências Reais
            </span>
            <h2 id="repertorio-title" className="type-h2 mt-2">
              O mesmo lustre em diferentes perspectivas.
            </h2>
          </div>
          <p className="type-lead max-w-[48ch] lg:col-span-5">
            Conheça o <strong>Lustre Áurea</strong>: uma peça autoral em latão escovado e vidro âmbar. Explore como ela
            se transforma da sala de jantar ao living, de dia e à noite.
          </p>
        </div>

        {/* Visualizador Principal */}
        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-12 lg:items-stretch">
          {/* Imagem em destaque com centralização total */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-graphite sm:aspect-[16/10] lg:col-span-8 lg:aspect-auto lg:min-h-[38rem]">
            <Image
              key={current.image}
              src={current.image}
              alt={current.alt}
              fill
              loading="lazy"
              sizes="(min-width: 1024px) 66vw, 100vw"
              quality={75}
              className="object-cover object-center transition-[transform,opacity] duration-700 ease-[var(--ease-out-soft)] hover:scale-[1.02]"
            />

            {/* Tag e indicador do repertório */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="rounded-full bg-ink/80 px-3.5 py-1 text-micro font-medium text-silver backdrop-blur">
                {current.tag}
              </span>
            </div>

            <div className="absolute top-4 right-4 rounded-full bg-ink/80 px-3 py-1 text-micro text-silver backdrop-blur">
              {selectedIndex + 1} de {references.length}
            </div>

            {/* Botões de navegação sobrepostos na imagem */}
            <div className="absolute inset-y-0 inset-x-3 flex items-center justify-between pointer-events-none">
              <button
                type="button"
                onClick={prev}
                aria-label="Ver referência anterior do lustre"
                className="pointer-events-auto grid h-11 w-11 place-items-center rounded-full bg-ink/70 text-paper backdrop-blur transition-all duration-200 hover:bg-brand hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-paper"
              >
                <span className="rotate-180">
                  <ArrowIcon size={18} />
                </span>
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Ver próxima referência do lustre"
                className="pointer-events-auto grid h-11 w-11 place-items-center rounded-full bg-ink/70 text-paper backdrop-blur transition-all duration-200 hover:bg-brand hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-paper"
              >
                <ArrowIcon size={18} />
              </button>
            </div>

            {/* Legenda na base da foto */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/95 via-ink/60 to-transparent p-6 sm:p-8">
              <p className="type-h3 text-paper">{current.title}</p>
              <p className="mt-1 text-small text-silver">{current.subtitle}</p>
            </div>
          </div>

          {/* Painel lateral de detalhes e especificações */}
          <div className="flex flex-col justify-between rounded-sm border border-smoke/70 bg-graphite/30 p-6 sm:p-8 lg:col-span-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-micro font-medium text-brand">
                <span>Peça em Destaque</span>
                <span className="h-1 w-1 rounded-full bg-brand" />
                <span>Lustre Áurea</span>
              </div>

              <h3 className="type-h2 mt-4 text-[clamp(1.5rem,1.2rem+1vw,2rem)]">{current.title}</h3>
              <p className="mt-4 text-silver leading-relaxed">{current.description}</p>

              <div className="mt-6 rounded-sm border border-smoke/60 bg-ink/60 p-4">
                <p className="text-micro font-medium text-paper">Aplicação Luminotécnica</p>
                <p className="mt-1 text-micro text-mist leading-relaxed">{current.architecturalTip}</p>
              </div>

              {/* Especificações rápidas da peça */}
              <div className="mt-6 border-t border-smoke/70 pt-6">
                <p className="text-micro font-medium text-mist uppercase tracking-wider">Ficha Técnica</p>
                <dl className="mt-3 grid grid-cols-2 gap-3 text-micro">
                  <div>
                    <dt className="text-mist">Diâmetro</dt>
                    <dd className="font-medium text-paper">Ø 120 cm</dd>
                  </div>
                  <div>
                    <dt className="text-mist">Lâmpadas</dt>
                    <dd className="font-medium text-paper">8× E27 Filament</dd>
                  </div>
                  <div>
                    <dt className="text-mist">Temperatura</dt>
                    <dd className="font-medium text-brand">2700K Quente</dd>
                  </div>
                  <div>
                    <dt className="text-mist">Materiais</dt>
                    <dd className="font-medium text-paper">Latão & Vidro Âmbar</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3 border-t border-smoke/70 pt-6">
              <a
                href={productQuoteLink(chandelierProduct)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-solid w-full"
              >
                <WhatsAppIcon size={18} />
                Solicitar orçamento deste lustre
              </a>
              <Link href={`/produtos/${chandelierProduct.slug}`} className="btn btn-ghost w-full">
                Ver galeria completa no catálogo
              </Link>
            </div>
          </div>
        </div>

        {/* Faixa de Miniaturas (Repertório em 6 ângulos) */}
        <div className="mt-8">
          <p className="text-micro font-medium uppercase tracking-wider text-mist">
            Navegue pelas 6 referências fotográficas do mesmo lustre:
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {references.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  aria-pressed={isSelected}
                  className={cn(
                    "group relative flex flex-col items-start overflow-hidden rounded-sm border p-2 text-left transition-all duration-300",
                    isSelected
                      ? "border-brand bg-brand/10 ring-1 ring-brand"
                      : "border-smoke bg-graphite/40 hover:border-mist hover:bg-graphite/70",
                  )}
                >
                  <span className="relative block aspect-[4/3] w-full overflow-hidden rounded-sm">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1024px) 15vw, 40vw"
                      quality={60}
                      className={cn(
                        "object-cover object-center transition-[transform,filter] duration-500",
                        isSelected ? "scale-105 brightness-105" : "brightness-75 group-hover:brightness-100",
                      )}
                    />
                  </span>
                  <span className="mt-2 block w-full truncate text-micro font-medium text-paper">
                    {index + 1}. {item.title}
                  </span>
                  <span className="block w-full truncate text-[0.7rem] text-mist">{item.subtitle}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
