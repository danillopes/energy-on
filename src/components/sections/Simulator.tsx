"use client";

import { temperatures, type Temperature } from "@/data/temperatures";
import { useSessionState } from "@/hooks/useSessionState";
import { lightColor, rgb } from "@/lib/kelvin";
import { cn } from "@/lib/cn";
import { RoomScene } from "../room/RoomScene";

type Kelvin = Temperature["kelvin"];
const valid = temperatures.map((t) => t.kelvin);
const isKelvin = (value: unknown): value is Kelvin => valid.includes(value as Kelvin);

export function Simulator() {
  const [kelvin, setKelvin] = useSessionState<Kelvin>("temperatura", 3000, isKelvin);
  const current = temperatures.find((t) => t.kelvin === kelvin) ?? temperatures[1];

  return (
    <section aria-labelledby="simulador-title" className="section-y border-t border-smoke bg-ink">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4 lg:pt-2">
          <h2 id="simulador-title" className="type-h2">
            Veja a mesma sala em quatro temperaturas de luz.
          </h2>
          <p className="type-lead mt-6">
            A temperatura de cor, medida em kelvin, muda a sensação de um ambiente tanto quanto o desenho da
            luminária.
          </p>

          <fieldset className="mt-10">
            <legend className="text-small text-mist">Temperatura de cor</legend>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2">
              {temperatures.map((t) => {
                const selected = t.kelvin === kelvin;
                return (
                  <label
                    key={t.kelvin}
                    className={cn(
                      "relative flex min-h-24 cursor-pointer flex-col justify-between rounded-sm border p-4 transition-colors duration-300",
                      "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-paper",
                      selected ? "border-paper bg-paper text-ink" : "border-smoke text-paper hover:border-mist",
                    )}
                  >
                    <input
                      type="radio"
                      name="temperatura"
                      value={t.kelvin}
                      checked={selected}
                      onChange={() => setKelvin(t.kelvin)}
                      className="sr-only"
                    />
                    <span className="flex items-center justify-between">
                      <span className="text-[1.375rem] leading-none" style={{ fontStretch: "120%", fontWeight: 300 }}>
                        {t.kelvin}K
                      </span>
                      <span
                        aria-hidden="true"
                        className="h-2.5 w-2.5 rounded-full"
                        style={{
                          background: rgb(lightColor(t.kelvin)),
                          boxShadow: `0 0 10px 2px ${rgb(lightColor(t.kelvin), 0.6)}`,
                        }}
                      />
                    </span>
                    <span className={cn("mt-3 text-small", selected ? "text-ink/70" : "text-mist")}>{t.name}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        </div>

        <div className="lg:col-span-8">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-graphite sm:aspect-[16/10]">
            <RoomScene
              kelvin={kelvin}
              title={`Ilustração de uma sala com iluminação em ${kelvin} kelvin`}
              className="absolute inset-0 h-full w-full"
            />
            <span className="absolute top-3 left-3 rounded-full bg-ink/70 px-3 py-1 text-micro text-silver backdrop-blur">
              Simulação ilustrativa
            </span>
          </div>

          <div aria-live="polite" className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="type-h3">
                {current.kelvin}K, {current.name.toLowerCase()}
              </p>
              <p className="mt-2 text-silver">{current.feeling}</p>
            </div>
            <div>
              <p className="text-small text-mist">Onde costuma ser usada</p>
              <p className="mt-2 text-silver">{current.uses}</p>
            </div>
          </div>
          <p className="mt-8 max-w-[70ch] text-micro text-mist">
            Representação visual aproximada, sem valor técnico. Cores reais variam conforme a lâmpada, o
            índice de reprodução de cor (IRC), os acabamentos e a luz natural — consulte um especialista para
            o seu projeto luminotécnico.
          </p>
        </div>
      </div>
    </section>
  );
}
