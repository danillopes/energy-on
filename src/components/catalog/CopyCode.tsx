"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { CheckIcon, CopyIcon } from "../shared/Icons";

async function writeClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Navegadores antigos ou contexto sem permissão: cópia pelo método clássico.
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.cssText = "position:fixed;top:0;left:0;opacity:0;pointer-events:none";
    document.body.appendChild(field);
    field.select();
    const ok = document.execCommand("copy");
    field.remove();
    return ok;
  }
}

/** Botão pequeno que copia o código do fabricante e confirma com um “Copiado”. */
export function CopyCode({ code, className }: { code: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <button
      type="button"
      onClick={async (event) => {
        event.stopPropagation();
        if (!(await writeClipboard(code))) return;
        setCopied(true);
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setCopied(false), 1800);
      }}
      aria-label={`Copiar código ${code}`}
      data-copied={copied || undefined}
      className={cn(
        "relative inline-grid h-8 min-w-8 shrink-0 place-items-center rounded-full px-2 text-mist transition-colors duration-300 hover:bg-white/10 hover:text-paper data-[copied]:text-paper",
        className,
      )}
    >
      <span className="flex items-center gap-1.5">
        {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
        <span className={cn("text-micro transition-opacity duration-300", copied ? "opacity-100" : "sr-only opacity-0")}>
          Copiado
        </span>
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? "Código copiado" : ""}
      </span>
    </button>
  );
}
