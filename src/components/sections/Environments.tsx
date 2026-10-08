"use client";

import { useCallback, useRef, type KeyboardEvent } from "react";
import { environments, type Environment } from "@/data/environments";
import { getProductsByRoom } from "@/data/products";
import { categories, labelOf, type RoomId } from "@/data/taxonomy";
import { useSessionState } from "@/hooks/useSessionState";
import { cn } from "@/lib/cn";
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

        {/* Abas em formato de card — rolagem lateral no celular, grade no desktop */}
        <div
          role="tablist"
          aria-label="Ambientes"
          onKeyDown={onKeyDown}
          className="scroll-row -mx-[var(--gutter)] mt-12 px-[var(--gutter)] pb-2 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-4 lg:overflow-visible lg:px-0"
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
                className="group flex w-[68vw] max-w-72 flex-col justify-start text-left sm:w-64 lg:w-auto lg:max-w-none"
              >
                <span className="relative block aspect-[4/5] overflow-hidden rounded-sm bg-graphite">
                  <SmartImage
                    src={env.photo.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 20vw, 68vw"
                    quality={60}
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

        <div className="mt-14 lg:mt-20">
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
      <LightUp className="aspect-[4/3] rounded-sm bg-graphite lg:col-span-7 lg:aspect-auto lg:min-h-[34rem]">
        <SmartImage
          src={env.photo.src}
          alt={env.photo.alt}
          fill
          sizes="(min-width: 1024px) 58vw, 100vw"
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
