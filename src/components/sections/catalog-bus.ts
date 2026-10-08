import type { CategoryId, RoomId } from "@/data/taxonomy";

/** Pedido de filtro vindo de outra seção (ex.: “Explorar peças para quartos”). */
export type CatalogFilterRequest = { room?: RoomId; category?: CategoryId };

export const CATALOG_FILTER_EVENT = "energyon:catalog-filter";

export function requestCatalogFilter(request: CatalogFilterRequest) {
  window.dispatchEvent(new CustomEvent<CatalogFilterRequest>(CATALOG_FILTER_EVENT, { detail: request }));
  document.getElementById("produtos")?.scrollIntoView({ block: "start" });
}
