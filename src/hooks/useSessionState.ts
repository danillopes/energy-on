"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

/*
 * Estado preservado durante a visita (sessionStorage), lido com useSyncExternalStore:
 * no servidor e na hidratação vale o valor padrão; logo depois, a escolha salva
 * do visitante é aplicada — sem erro de hidratação e sem efeitos em cascata.
 */

const listeners = new Set<() => void>();
const subscribe = (callback: () => void) => {
  listeners.add(callback);
  return () => listeners.delete(callback);
};

function read(key: string): string | null {
  try {
    return window.sessionStorage.getItem(key) ?? memory.get(key) ?? null;
  } catch {
    return memory.get(key) ?? null; // armazenamento indisponível (modo privado, bloqueado)
  }
}

export function useSessionState<T>(name: string, initial: T, validate?: (value: unknown) => value is T) {
  const key = `eo:${name}`;
  const raw = useSyncExternalStore(
    subscribe,
    () => read(key),
    () => null,
  );

  const value = useMemo(() => {
    if (raw == null) return initial;
    try {
      const parsed: unknown = JSON.parse(raw);
      return !validate || validate(parsed) ? (parsed as T) : initial;
    } catch {
      return initial;
    }
  }, [raw, initial, validate]);

  const setValue = useCallback(
    (next: T) => {
      try {
        window.sessionStorage.setItem(key, JSON.stringify(next));
      } catch {
        /* sem armazenamento: a escolha vale só até recarregar */
        memory.set(key, JSON.stringify(next));
      }
      listeners.forEach((listener) => listener());
    },
    [key],
  );

  return [value, setValue] as const;
}

// Fallback em memória quando o sessionStorage está bloqueado.
const memory = new Map<string, string>();
