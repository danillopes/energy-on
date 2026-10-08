"use client";

import { Activity, useState, type ReactNode } from "react";

type KeepAliveProps<K extends string> = {
  activeKey: K;
  /** Todas as chaves possíveis, na ordem estável do DOM (evita mover nós ao trocar de aba). */
  keys: readonly K[];
  /** Quantos painéis ficam preservados ao mesmo tempo (LRU). */
  max?: number;
  render: (key: K) => ReactNode;
};

/**
 * Keep-alive com cache limitado.
 * Usa <Activity> do React: painéis ocultos mantêm o estado (seleção, rolagem,
 * imagens já decodificadas), mas têm os efeitos pausados e baixa prioridade.
 * Só os `max` painéis usados mais recentemente ficam montados.
 */
export function KeepAlive<K extends string>({ activeKey, keys, max = 3, render }: KeepAliveProps<K>) {
  const [recent, setRecent] = useState<K[]>([activeKey]);

  // Ajuste de estado durante a renderização (padrão recomendado pelo React):
  // promove a aba ativa para o topo da lista LRU e descarta a mais antiga.
  if (recent[0] !== activeKey) {
    setRecent([activeKey, ...recent.filter((key) => key !== activeKey)].slice(0, max));
  }

  const mounted = keys.filter((key) => key === activeKey || recent.includes(key));

  return (
    <>
      {mounted.map((key) => (
        <Activity key={key} mode={key === activeKey ? "visible" : "hidden"}>
          {render(key)}
        </Activity>
      ))}
    </>
  );
}
