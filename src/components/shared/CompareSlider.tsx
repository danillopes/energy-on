"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type CompareSliderProps = {
  before: ReactNode;
  after: ReactNode;
  beforeLabel?: string;
  afterLabel?: string;
  label: string;
  initial?: number;
  className?: string;
};

/**
 * Comparador antes/depois.
 * - Mouse, toque e caneta via Pointer Events (com captura do ponteiro).
 * - Teclado: setas (2%), Page Up/Down (10%), Home/End.
 * - `touch-action: pan-y`: no celular, arrastar na horizontal move a barra
 *   e arrastar na vertical continua rolando a página.
 * - A posição é escrita direto numa variável CSS (sem re-renderizar a cada movimento).
 */
export function CompareSlider({
  before,
  after,
  beforeLabel = "Antes",
  afterLabel = "Depois",
  label,
  initial = 50,
  className,
}: CompareSliderProps) {
  const root = useRef<HTMLDivElement>(null);
  const position = useRef(initial);
  const frame = useRef(0);
  const dragging = useRef(false);
  const [value, setValue] = useState(initial);

  const apply = useCallback((next: number) => {
    const clamped = Math.max(0, Math.min(100, next));
    position.current = clamped;
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      root.current?.style.setProperty("--pos", `${position.current}%`);
      setValue(Math.round(position.current));
    });
  }, []);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const fromPointer = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    apply(((event.clientX - rect.left) / rect.width) * 100);
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    fromPointer(event);
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) fromPointer(event);
  };
  const onPointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const steps: Record<string, number> = { ArrowLeft: -2, ArrowDown: -2, ArrowRight: 2, ArrowUp: 2, PageDown: -10, PageUp: 10 };
    if (event.key in steps) apply(position.current + steps[event.key]);
    else if (event.key === "Home") apply(0);
    else if (event.key === "End") apply(100);
    else return;
    event.preventDefault();
  };

  return (
    <div
      ref={root}
      className={cn("relative select-none overflow-hidden rounded-sm bg-graphite", className)}
      style={{ ["--pos" as string]: `${initial}%`, touchAction: "pan-y" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
    >
      <div className="absolute inset-0" aria-hidden="true">{before}</div>
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{ clipPath: "inset(0 0 0 var(--pos))", WebkitClipPath: "inset(0 0 0 var(--pos))" }}
      >
        {after}
      </div>

      <span className="pointer-events-none absolute top-3 left-3 rounded-full bg-ink/70 px-3 py-1 text-micro text-silver backdrop-blur">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute top-3 right-3 rounded-full bg-brand px-3 py-1 text-micro text-paper">
        {afterLabel}
      </span>

      {/* Barra + alça */}
      <div
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        aria-valuetext={`${value}% mostrando “${beforeLabel}”`}
        onKeyDown={onKeyDown}
        className="group absolute inset-y-0 z-10 -ml-6 w-12 cursor-ew-resize focus-visible:outline-none"
        style={{ left: "var(--pos)" }}
      >
        <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-paper shadow-[0_0_12px_rgb(255_255_255/0.5)]" />
        <span className="absolute top-1/2 left-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-brand bg-brand text-paper shadow-[0_0_24px_rgb(252_30_80/0.45)] transition-transform duration-300 group-focus-visible:scale-110 group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-paper group-active:scale-95">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" />
          </svg>
        </span>
      </div>
    </div>
  );
}
