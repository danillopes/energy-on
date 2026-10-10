"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/cn";
import { WHATSAPP_GENERAL_MESSAGE, WHATSAPP_QUOTE_MESSAGE, whatsappLink } from "@/lib/whatsapp";
import { CloseIcon, WhatsAppIcon } from "../shared/Icons";
import { Logo } from "../shared/Logo";

const sectionIds = site.nav.map((item) => item.id);

export function Header({ base = "", alwaysSolid = false }: { base?: string; alwaysSolid?: boolean }) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  const sentinel = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  // Transparente sobre o hero; sólido assim que a página rola.
  // Um sentinela + IntersectionObserver evita ouvir o evento de scroll.
  useEffect(() => {
    const node = sentinel.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setSolid(!entry.isIntersecting));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) menuButton.current?.focus();
  }, []);

  // Menu mobile: trava a rolagem do fundo, fecha com Esc e mantém o foco dentro.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    const focusables = () =>
      Array.from(panel.current?.querySelectorAll<HTMLElement>("a, button") ?? []);
    focusables()[0]?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "Tab") {
        const items = focusables();
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    const onResize = () => window.innerWidth >= 1024 && close(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      root.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, close]);

  return (
    <>
      <div ref={sentinel} aria-hidden="true" className="pointer-events-none absolute top-0 left-0 h-6 w-px" />

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 pt-[var(--safe-top)] transition-[background-color,border-color,backdrop-filter] duration-700 ease-[var(--ease-out-soft)]",
          alwaysSolid || solid || open
            ? "border-b border-white/10 bg-ink/80 backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-x flex h-[var(--header-h)] items-center gap-6">
          <a href={`${base}#inicio`} className="relative z-10 -my-2 py-2" aria-label="Energy On — voltar ao início">
            <Logo priority />
          </a>

          <nav aria-label="Principal" className="mx-auto hidden lg:block">
            <ul className="flex items-center gap-1 xl:gap-3">
              {site.nav.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`${base}#${item.id}`}
                      aria-current={isActive ? "location" : undefined}
                      className={cn(
                        "relative block px-3 py-2 text-small transition-colors duration-300",
                        "after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-left after:bg-brand after:transition-transform after:duration-500 after:ease-[var(--ease-out-soft)]",
                        isActive
                          ? "text-paper after:scale-x-100"
                          : "text-paper/65 after:scale-x-0 hover:text-paper",
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-1 sm:gap-3 lg:ml-0">
            <a
              href={whatsappLink(WHATSAPP_GENERAL_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-11 w-11 place-items-center rounded-full text-paper transition-colors hover:bg-white/10"
              aria-label="Conversar pelo WhatsApp (abre em nova aba)"
            >
              <WhatsAppIcon size={20} />
            </a>
            <a
              href={whatsappLink(WHATSAPP_QUOTE_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-sm hidden md:inline-flex"
            >
              Solicitar orçamento
            </a>

            <button
              ref={menuButton}
              type="button"
              className="relative grid h-11 w-11 place-items-center lg:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              onClick={() => setOpen((value) => !value)}
            >
              <span aria-hidden="true" className="relative block h-3 w-6">
                <span
                  className={cn(
                    "absolute left-0 block h-px w-6 bg-paper transition-transform duration-500 ease-[var(--ease-out-soft)]",
                    open ? "top-1.5 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 block h-px bg-paper transition-all duration-500 ease-[var(--ease-out-soft)]",
                    open ? "top-1.5 w-6 -rotate-45" : "top-3 w-4",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile */}
      <div
        id="menu-mobile"
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-ink pt-[calc(var(--header-h)+var(--safe-top))] pb-[max(1.5rem,var(--safe-bottom))] transition-[opacity,visibility] duration-500 ease-[var(--ease-out-soft)] lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <nav aria-label="Menu mobile" className="container-x flex flex-1 flex-col justify-center overflow-y-auto py-6">
          <ul className="flex flex-col">
            {site.nav.map((item, index) => (
              <li
                key={item.id}
                className={cn(
                  "border-b border-smoke transition-[opacity,transform] duration-700 ease-[var(--ease-out-soft)]",
                  open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                )}
                style={{ transitionDelay: open ? `${80 + index * 50}ms` : "0ms" }}
              >
                <a
                  href={`${base}#${item.id}`}
                  onClick={() => close(false)}
                  aria-current={active === item.id ? "location" : undefined}
                  className="flex min-h-16 items-center justify-between py-3 text-[clamp(1.75rem,7vw,2.5rem)] font-light"
                  style={{ fontStretch: "118%" }}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn("h-2 w-2 rounded-full bg-brand transition-opacity", active === item.id ? "opacity-100" : "opacity-0")}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="container-x flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsappLink(WHATSAPP_QUOTE_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => close(false)}
            className="btn btn-solid flex-1"
          >
            <WhatsAppIcon size={18} /> Solicitar orçamento
          </a>
        </div>
        <button type="button" className="sr-only" onClick={() => close()}>
          <CloseIcon /> Fechar menu
        </button>
      </div>
    </>
  );
}
