/**
 * Aproximação da cor de um corpo negro em uma temperatura (algoritmo de Tanner Helland).
 * Usada apenas para a simulação ilustrativa — não é uma conversão colorimétrica exata.
 */
export function kelvinToRgb(kelvin: number): [number, number, number] {
  const t = kelvin / 100;
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  const r = t <= 66 ? 255 : 329.698727446 * Math.pow(t - 60, -0.1332047592);
  const g =
    t <= 66
      ? 99.4708025861 * Math.log(t) - 161.1195681661
      : 288.1221695283 * Math.pow(t - 60, -0.0755148492);
  const b = t >= 66 ? 255 : t <= 19 ? 0 : 138.5177312231 * Math.log(t - 10) - 305.0447927307;
  return [clamp(r), clamp(g), clamp(b)];
}

/**
 * Paleta ilustrativa para as temperaturas do simulador. Ajustada para que a
 * diferença seja perceptível na tela (o olho se adapta à luz real; a tela, não).
 */
const illustrative: Record<number, [number, number, number]> = {
  2700: [255, 166, 84],
  3000: [255, 186, 118],
  4000: [255, 226, 196],
  6500: [204, 222, 255],
};

export function lightColor(kelvin: number): [number, number, number] {
  return illustrative[kelvin] ?? kelvinToRgb(kelvin);
}

export const rgb = ([r, g, b]: [number, number, number], alpha = 1) =>
  alpha === 1 ? `rgb(${r} ${g} ${b})` : `rgb(${r} ${g} ${b} / ${alpha})`;
