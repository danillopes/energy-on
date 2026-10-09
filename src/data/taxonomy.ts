/** Taxonomias do catálogo — base para filtros, rodapé e futuras integrações com CMS. */

export const categories = [
  { id: "lustres", label: "Lustres", singular: "Lustre" },
  { id: "pendentes", label: "Pendentes", singular: "Pendente" },
  { id: "plafons", label: "Plafons", singular: "Plafon" },
  { id: "arandelas", label: "Arandelas", singular: "Arandela" },
  { id: "spots", label: "Spots", singular: "Spot" },
  { id: "trilhos", label: "Trilhos", singular: "Trilho" },
  { id: "fitas-led", label: "Fitas LED", singular: "Fita LED" },
  { id: "luminarias-de-mesa", label: "Luminárias de mesa", singular: "Luminária de mesa" },
  { id: "luminarias-de-piso", label: "Luminárias de piso", singular: "Luminária de piso" },
  { id: "iluminacao-externa", label: "Iluminação externa", singular: "Iluminação externa" },
] as const;

export const rooms = [
  { id: "sala", label: "Sala" },
  { id: "quarto", label: "Quarto" },
  { id: "cozinha", label: "Cozinha" },
  { id: "banheiro", label: "Banheiro" },
  { id: "externa", label: "Área externa" },
] as const;

export const styles = [
  { id: "moderno", label: "Moderno" },
  { id: "classico", label: "Clássico" },
  { id: "minimalista", label: "Minimalista" },
  { id: "industrial", label: "Industrial" },
  { id: "contemporaneo", label: "Contemporâneo" },
  { id: "organico", label: "Orgânico" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];
export type RoomId = (typeof rooms)[number]["id"];
export type StyleId = (typeof styles)[number]["id"];

type Labeled = { id: string; label: string };
export const labelOf = <T extends Labeled>(list: readonly T[], id: string) =>
  list.find((item) => item.id === id)?.label ?? id;
