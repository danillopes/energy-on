export type Temperature = {
  kelvin: 2700 | 3000 | 4000 | 6500;
  name: string;
  feeling: string;
  uses: string;
};

export const temperatures: Temperature[] = [
  {
    kelvin: 2700,
    name: "Branco extra quente",
    feeling: "Aconchegante e intimista, próximo da luz de uma lâmpada incandescente.",
    uses: "Quartos, salas de TV, restaurantes e áreas de descanso.",
  },
  {
    kelvin: 3000,
    name: "Branco quente",
    feeling: "Acolhedor sem perder nitidez — o equilíbrio mais usado em residências.",
    uses: "Salas de estar e jantar, varandas, lavabos e hotelaria.",
  },
  {
    kelvin: 4000,
    name: "Branco neutro",
    feeling: "Limpo e natural, favorece a percepção das cores e a concentração.",
    uses: "Cozinhas, banheiros, escritórios, lojas e áreas de trabalho.",
  },
  {
    kelvin: 6500,
    name: "Branco frio",
    feeling: "Luz azulada e estimulante, com sensação de alta claridade.",
    uses: "Garagens, áreas técnicas, depósitos e ambientes de inspeção.",
  },
];
