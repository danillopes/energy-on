"use client";

import { useCallback, useEffect, useRef, type KeyboardEvent } from "react";
import { environments, type Environment } from "@/data/environments";
import { getProductsByRoom } from "@/data/products";
import { categories, labelOf, type RoomId } from "@/data/taxonomy";
import { useSessionState } from "@/hooks/useSessionState";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";
import { ArrowIcon } from "../shared/Icons";
import { KeepAlive } from "../shared/KeepAlive";
import { LightUp } from "../shared/LightUp";
import { SmartImage } from "../shared/SmartImage";
import { requestCatalogFilter } from "./catalog-bus";

const roomIds = environments.map((env) => env.id);
const isRoom = (value: unknown): value is RoomId => roomIds.includes(value as RoomId);

export function Environments() {
  const [active, setActive] = useSessionState<RoomId>("ambiente", "sala", isRoom);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const index = roomIds.indexOf(active);
      let next = index;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % roomIds.length;
      else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + roomIds.length) % roomIds.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = roomIds.length - 1;
      else return;
      event.preventDefault();
      setActive(roomIds[next]);
      tabs.current[next]?.focus();
    },
    [active, setActive],
  );

  return (
    <section id="ambientes" aria-labelledby="ambientes-title" className="section-y bg-ink">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="ambientes-title" className="type-h2 lg:col-span-7">
            Cada ambiente pede uma luz diferente.
          </h2>
          <p className="type-lead max-w-[44ch] lg:col-span-5">
            Escolha um espaço da casa e veja ideias de iluminação e peças que combinam com ele.
          </p>
        </div>

        {/* Celular e tablet: carrossel com um ambiente por vez */}
        <EnvironmentCarousel active={active} onChange={setActive} />

        {/* Desktop: abas em formato de card */}
        <div
          role="tablist"
          aria-label="Ambientes"
          onKeyDown={onKeyDown}
          className="mt-12 hidden lg:grid lg:grid-cols-5 lg:gap-4"
        >
          {environments.map((env, index) => {
            const selected = env.id === active;
            return (
              <button
                key={env.id}
                ref={(node) => {
                  tabs.current[index] = node;
                }}
                id={`tab-${env.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`painel-${env.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(env.id)}
                className="group flex flex-col justify-start text-left"
              >
                <span className="relative block aspect-[4/5] overflow-hidden rounded-sm bg-graphite">
                  <SmartImage
                    src={env.photo.src}
                    alt=""
                    fill
                    sizes="20vw"
                    quality={80}
                    fallbackLabel={env.name}
                    className={cn(
                      "object-cover object-center transition-[transform,filter] duration-700 ease-[var(--ease-out-soft)]",
                      selected ? "scale-100 brightness-100" : "scale-[1.03] brightness-[0.45] group-hover:brightness-75",
                    )}
                  />
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-0 bottom-0 h-0.5 origin-left bg-brand transition-transform duration-700 ease-[var(--ease-out-soft)]",
                      selected ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </span>
                <span className="mt-4 block type-h3">{env.name}</span>
                <span className="mt-1 block text-small text-mist">{env.short}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-10 lg:mt-20">
          <KeepAlive
            activeKey={active}
            keys={roomIds}
            max={3}
            render={(id) => <EnvironmentPanel env={environments.find((env) => env.id === id)!} />}
          />
        </div>
      </div>
    </section>
  );
}

/**
 * Carrossel do celular/tablet: cada slide ocupa a largura inteira do conteúdo,
 * centralizado, sem mostrar parte do próximo. Arrastar para o lado troca o
 * ambiente ativo e o painel de ideias logo abaixo acompanha.
 */
function EnvironmentCarousel({ active, onChange }: { active: RoomId; onChange: (id: RoomId) => void }) {
  const scroller = useRef<HTMLDivElement>(null);
  const slides = useRef<Array<HTMLLIElement | null>>([]);
  const reduced = useReducedMotion();
  const activeIndex = Math.max(0, roomIds.indexOf(active));
  const firstSync = useRef(true);

  // Slide que está centralizado na tela vira o ambiente ativo.
  useEffect(() => {
    const root = scroller.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).dataset.room as RoomId;
            if (id) onChange(id);
          }
        }
      },
      { root, threshold: 0.6 },
    );
    slides.current.forEach((slide) => slide && observer.observe(slide));
    return () => observer.disconnect();
  }, [onChange]);

  // Quando o ativo muda por fora (abertura da página, botões), leva o carrossel até ele.
  useEffect(() => {
    const root = scroller.current;
    const slide = slides.current[activeIndex];
    if (!root || !slide) return;
    const target = slide.offsetLeft - root.offsetLeft;
    if (Math.abs(root.scrollLeft - target) < 4) return;
    root.scrollTo({ left: target, behavior: firstSync.current || reduced ? "auto" : "smooth" });
    firstSync.current = false;
  }, [activeIndex, reduced]);

  const go = (index: number) => {
    const next = (index + roomIds.length) % roomIds.length;
    onChange(roomIds[next]);
  };

  return (
    <div
      className="mt-10 lg:hidden"
      role="region"
      aria-roledescription="carrossel"
      aria-label="Ambientes"
    >
      <div
        ref={scroller}
        className="flex snap-x snap-mandatory gap-[var(--gutter)] overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <ul className="contents">
          {environments.map((env, index) => (
            <li
              key={env.id}
              ref={(node) => {
                slides.current[index] = node;
              }}
              data-room={env.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} de ${environments.length}: ${env.name}`}
              className="w-full shrink-0 snap-center snap-always"
            >
              <div className="relative mx-auto aspect-[4/5] w-full max-w-xl overflow-hidden rounded-sm bg-graphite sm:aspect-[4/3]">
                <SmartImage
                  src={env.photo.src}
                  alt={env.photo.alt}
                  fill
                  sizes="(min-width: 640px) 576px, 100vw"
                  quality={80}
                  loading={index === 0 ? "eager" : "lazy"}
                  fallbackLabel={env.name}
                  className="object-cover object-center"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent p-5 pt-16">
                  <p className="type-h3">{env.name}</p>
                  <p className="mt-1 text-small text-silver">{env.short}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Navegação: anterior, indicadores e próximo */}
      <div className="mx-auto mt-5 flex max-w-xl items-center justify-between">
        <button
          type="button"
          onClick={() => go(activeIndex - 1)}
          aria-label="Ambiente anterior"
          className="grid h-11 w-11 place-items-center rounded-full border border-smoke text-paper active:scale-95"
        >
          <span className="rotate-180">
            <ArrowIcon size={18} />
          </span>
        </button>

        <div className="flex items-center gap-2">
          {environments.map((env, index) => (
            <button
              key={env.id}
              type="button"
              onClick={() => onChange(env.id)}
              aria-label={`Ir para ${env.name}`}
              aria-current={index === activeIndex ? "true" : undefined}
              className="grid h-11 w-6 place-items-center"
            >
              <span
                className={cn(
                  "block h-1.5 rounded-full transition-all duration-500 ease-[var(--ease-out-soft)]",
                  index === activeIndex ? "w-6 bg-brand" : "w-1.5 bg-smoke",
                )}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(activeIndex + 1)}
          aria-label="Próximo ambiente"
          className="grid h-11 w-11 place-items-center rounded-full border border-smoke text-paper active:scale-95"
        >
          <ArrowIcon size={18} />
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {environments[activeIndex]?.name}
      </p>
    </div>
  );
}

function EnvironmentPanel({ env }: { env: Environment }) {
  const suggestions = getProductsByRoom(env.id, 3);

  return (
    <div
      id={`painel-${env.id}`}
      role="tabpanel"
      aria-labelledby={`tab-${env.id}`}
      tabIndex={0}
      className="grid gap-10 focus-visible:outline-offset-8 lg:grid-cols-12 lg:gap-16"
    >
      {/* No celular a foto já aparece no carrossel; aqui ela só entra no desktop */}
      <LightUp className="hidden rounded-sm bg-graphite lg:col-span-7 lg:block lg:min-h-[34rem]">
        <SmartImage
          src={env.photo.src}
          alt={env.photo.alt}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          quality={80}
          fallbackLabel={env.photo.alt}
          className="object-cover object-center"
        />
      </LightUp>

      <div className="flex flex-col lg:col-span-5 lg:py-4">
        <h3 className="type-h2 text-[clamp(1.75rem,1.2rem+1.6vw,2.5rem)]">{env.name}</h3>
        <p className="type-lead mt-5">{env.lead}</p>

        <ul className="mt-8 border-t border-smoke">
          {env.ideas.map((idea) => (
            <li key={idea} className="border-b border-smoke py-4 text-silver">
              {idea}
            </li>
          ))}
        </ul>

        {suggestions.length > 0 && (
          <div className="mt-10">
            <p className="text-small text-mist">Peças que combinam</p>
            <ul className="mt-4 grid grid-cols-3 gap-3">
              {suggestions.map((product) => (
                <li key={product.slug}>
                  <a href={`/produtos/${product.slug}`} className="group block">
                    <span className="relative block aspect-square overflow-hidden rounded-sm bg-graphite">
                      <SmartImage
                        src={product.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 10vw, 30vw"
                        quality={60}
                        fallbackLabel={product.name}
                        className="object-cover object-center transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-105"
                      />
                    </span>
                    <span className="mt-2 block text-small leading-snug">{product.name}</span>
                    <span className="block text-micro text-mist">{labelOf(categories, product.category)}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="button"
          onClick={() => requestCatalogFilter({ room: env.id })}
          className="btn btn-ghost mt-10 self-start"
        >
          Explorar peças para {env.name.toLowerCase()}
        </button>
      </div>
    </div>
  );
}
