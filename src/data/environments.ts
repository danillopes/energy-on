import { photos, type Photo } from "@/config/images";
import type { RoomId } from "./taxonomy";

export type Environment = {
  id: RoomId;
  name: string;
  short: string;
  lead: string;
  ideas: string[];
  photo: Photo;
};

export const environments: Environment[] = [
  {
    id: "sala",
    name: "Salas de estar",
    short: "Camadas de luz para receber, ler e descansar.",
    lead: "Valorize cada momento com uma iluminação que combina conforto, elegância e personalidade.",
    ideas: [
      "Combine luz geral suave com pontos de destaque em quadros e texturas.",
      "Use luminárias de piso perto da poltrona para criar um canto de leitura.",
      "Fitas LED em sancas e nichos deixam o teto mais leve à noite.",
    ],
    photo: photos.rooms.sala,
  },
  {
    id: "quarto",
    name: "Quartos",
    short: "Luz baixa e quente para desacelerar.",
    lead: "Um quarto bem iluminado prepara o corpo para o descanso e ainda funciona na hora de se arrumar.",
    ideas: [
      "Pendentes ou abajures nas cabeceiras liberam a mesa e iluminam a leitura.",
      "Prefira temperaturas quentes e circuitos com dimerização.",
      "Ilumine o interior do closet e do guarda-roupa para enxergar as cores.",
    ],
    photo: photos.rooms.quarto,
  },
  {
    id: "cozinha",
    name: "Cozinhas",
    short: "Precisão na bancada, aconchego na mesa.",
    lead: "Na cozinha, a luz certa deixa o preparo mais seguro e transforma a ilha no centro da casa.",
    ideas: [
      "Pendentes sobre a ilha marcam o espaço e iluminam o trabalho.",
      "Perfis de LED sob os armários eliminam sombras na bancada.",
      "Trilhos permitem redirecionar a luz conforme o uso.",
    ],
    photo: photos.rooms.cozinha,
  },
  {
    id: "banheiro",
    name: "Banheiros",
    short: "Luz frontal no espelho, clima de spa no resto.",
    lead: "Equilibre luz funcional para o espelho com efeitos suaves que deixam o banho mais relaxante.",
    ideas: [
      "Arandelas nas laterais do espelho iluminam o rosto sem sombras.",
      "Fita LED atrás do espelho ou sob a bancada cria uma luz de presença.",
      "Escolha luminárias com proteção adequada para áreas úmidas.",
    ],
    photo: photos.rooms.banheiro,
  },
  {
    id: "externa",
    name: "Áreas externas",
    short: "Caminhos, fachadas e jardins depois do pôr do sol.",
    lead: "A iluminação externa amplia a casa para fora e garante segurança nos percursos.",
    ideas: [
      "Balizadores marcam caminhos e degraus sem ofuscar.",
      "Luz de baixo para cima destaca árvores, muros e texturas da fachada.",
      "Arandelas nas entradas recebem bem e reforçam a segurança.",
    ],
    photo: photos.rooms.externa,
  },
];
