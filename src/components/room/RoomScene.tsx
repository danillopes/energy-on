"use client";

import { memo, useId } from "react";
import { lightColor, rgb } from "@/lib/kelvin";

type RoomSceneProps = {
  /** Temperatura de cor das fontes de luz. */
  kelvin: number;
  /**
   * layered = projeto de iluminação em camadas (sanca, spots, pendentes, luminária de piso)
   * flat    = um único plafon central, luz chapada e sem pontos de destaque
   */
  variant?: "layered" | "flat";
  title: string;
  className?: string;
};

/*
 * Ambiente ilustrado em perspectiva de um ponto (fuga em 800,410).
 * A cena base é neutra; a cor vem apenas das FONTES de luz e das áreas que elas
 * iluminam (gradientes em `currentColor` com mistura “screen”), em vez de um filtro
 * aplicado sobre a imagem inteira. Trocar a temperatura muda `color` no SVG e a
 * transição de cor acontece em CSS.
 */
const VP = { x: 800, y: 410 };
const floorX = (x: number) => VP.x + ((x - VP.x) * (1000 - VP.y)) / (700 - VP.y);
const pendants = [1095, 1175, 1255];
const spots = [500, 670, 840];

function RoomSceneBase({ kelvin, variant = "layered", title, className }: RoomSceneProps) {
  const uid = useId().replace(/:/g, "");
  const id = (name: string) => `${uid}-${name}`;
  const url = (name: string) => `url(#${id(name)})`;
  const color = rgb(lightColor(kelvin));
  const lit = variant === "layered";

  return (
    <svg
      viewBox="0 0 1600 1000"
      role="img"
      aria-label={title}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      style={{ color, transition: "color 0.9s cubic-bezier(0.22, 1, 0.36, 1)" }}
    >
      <defs>
        <linearGradient id={id("wall")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={lit ? "#1b1b1b" : "#3a3a3a"} />
          <stop offset="1" stopColor={lit ? "#101010" : "#323232"} />
        </linearGradient>
        <linearGradient id={id("floor")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={lit ? "#141414" : "#2c2c2c"} />
          <stop offset="1" stopColor={lit ? "#060606" : "#222222"} />
        </linearGradient>
        <linearGradient id={id("cove")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.75" />
          <stop offset="0.35" stopColor="currentColor" stopOpacity="0.18" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={id("ceilingGlow")} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.35" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={id("scallop")} cx="0.5" cy="0" r="1" fx="0.5" fy="0">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.85" />
          <stop offset="0.45" stopColor="currentColor" stopOpacity="0.28" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id("beam")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.32" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.02" />
        </linearGradient>
        <radialGradient id={id("pool")}>
          <stop offset="0" stopColor="currentColor" stopOpacity="0.75" />
          <stop offset="0.6" stopColor="currentColor" stopOpacity="0.18" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id("glow")}>
          <stop offset="0" stopColor="currentColor" stopOpacity="0.9" />
          <stop offset="0.25" stopColor="currentColor" stopOpacity="0.35" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id("flat")} cx="0.5" cy="0" r="1.1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.32" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.12" />
        </radialGradient>
        <linearGradient id={id("vignette")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.6" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      {/* ---------- Arquitetura ---------- */}
      <polygon points="0,0 1600,0 1400,120 200,120" fill={lit ? "#0b0b0b" : "#2b2b2b"} />
      <polygon points="0,0 200,120 200,700 0,1000" fill={lit ? "#0e0e0e" : "#2e2e2e"} />
      <polygon points="1600,0 1400,120 1400,700 1600,1000" fill={lit ? "#0f0f0f" : "#2f2f2f"} />
      <rect x="200" y="120" width="1200" height="580" fill={url("wall")} />
      <polygon points="200,700 1400,700 1600,1000 0,1000" fill={url("floor")} />

      {/* Tábuas do piso convergindo para o ponto de fuga */}
      <g stroke="#ffffff" strokeOpacity="0.05" strokeWidth="1.2">
        {Array.from({ length: 11 }, (_, i) => {
          const x = 200 + i * 120;
          return <line key={x} x1={x} y1="700" x2={floorX(x)} y2="1000" />;
        })}
      </g>

      {/* Sanca: rasgo no teto onde fica a fita LED */}
      <rect x="200" y="112" width="1200" height="10" fill="#050505" />

      {/* Quadro */}
      <rect x="520" y="262" width="300" height="180" fill="#0c0c0c" stroke="#2c2c2c" strokeWidth="2" />
      <circle cx="610" cy="352" r="46" fill="none" stroke="#3a3a3a" strokeWidth="2" />
      <line x1="660" y1="300" x2="780" y2="404" stroke="#3a3a3a" strokeWidth="2" />

      {/* Tapete */}
      <polygon points="330,728 960,728 1010,830 270,830" fill={lit ? "#121212" : "#2a2a2a"} />

      {/* Sofá */}
      <g fill={lit ? "#1a1a1a" : "#3c3c3c"}>
        <rect x="380" y="512" width="500" height="82" rx="10" />
        <rect x="360" y="580" width="540" height="84" rx="10" />
        <rect x="350" y="548" width="54" height="116" rx="12" />
        <rect x="856" y="548" width="54" height="116" rx="12" />
      </g>
      <g stroke="#000" strokeOpacity="0.5" strokeWidth="2">
        <line x1="547" y1="520" x2="547" y2="588" />
        <line x1="713" y1="520" x2="713" y2="588" />
        <line x1="547" y1="596" x2="547" y2="660" />
        <line x1="713" y1="596" x2="713" y2="660" />
      </g>
      <rect x="372" y="664" width="10" height="26" fill="#0a0a0a" />
      <rect x="878" y="664" width="10" height="26" fill="#0a0a0a" />

      {/* Mesa de jantar e cadeiras */}
      <g fill={lit ? "#1c1c1c" : "#3e3e3e"}>
        <rect x="1052" y="530" width="56" height="62" rx="6" />
        <rect x="1242" y="530" width="56" height="62" rx="6" />
        <rect x="1000" y="584" width="350" height="14" />
        <rect x="1024" y="598" width="10" height="104" />
        <rect x="1316" y="598" width="10" height="104" />
      </g>

      {/* Luminária de piso (estrutura) */}
      <ellipse cx="290" cy="702" rx="38" ry="6" fill="#0a0a0a" />
      <line x1="290" y1="700" x2="290" y2="402" stroke={lit ? "#2a2a2a" : "#4a4a4a"} strokeWidth="5" />

      {/* Cabos e cúpulas dos pendentes */}
      {pendants.map((x) => (
        <g key={x}>
          <line x1={x} y1="120" x2={x} y2="440" stroke={lit ? "#2a2a2a" : "#4a4a4a"} strokeWidth="2" />
          <path
            d={`M${x - 36},482 Q${x - 36},440 ${x},440 Q${x + 36},440 ${x + 36},482 Z`}
            fill={lit ? "#0d0d0d" : "#1f1f1f"}
            stroke="#3a3a3a"
            strokeWidth="1.5"
          />
        </g>
      ))}

      {/* ---------- Luz ---------- */}
      {lit ? (
        <g style={{ mixBlendMode: "screen" }}>
          {/* Sanca de LED: lava a parede de cima para baixo e rebate no teto */}
          <rect x="200" y="122" width="1200" height="300" fill={url("cove")} />
          <polygon points="0,0 1600,0 1400,120 200,120" fill={url("ceilingGlow")} />
          <rect x="200" y="119" width="1200" height="3" fill="currentColor" opacity="0.9" />

          {/* Spots de embutir: fachos em “vieira” sobre a parede e o quadro */}
          {spots.map((x) => (
            <g key={x}>
              <path
                d={`M${x - 8},122 C${x - 70},260 ${x - 62},420 ${x},450 C${x + 62},420 ${x + 70},260 ${x + 8},122 Z`}
                fill={url("scallop")}
                opacity="0.6"
              />
              <ellipse cx={x} cy="123" rx="10" ry="3" fill="currentColor" />
            </g>
          ))}

          {/* Pendentes: facho, brilho na mesa e reflexo no piso */}
          {pendants.map((x) => (
            <g key={x}>
              <polygon points={`${x - 34},482 ${x - 120},592 ${x + 120},592 ${x + 34},482`} fill={url("beam")} />
              <ellipse cx={x} cy="484" rx="26" ry="7" fill="currentColor" />
              <ellipse cx={x} cy="486" rx="70" ry="30" fill={url("glow")} />
            </g>
          ))}
          <ellipse cx="1175" cy="588" rx="220" ry="16" fill={url("pool")} />
          <ellipse cx="1175" cy="790" rx="330" ry="70" fill={url("pool")} opacity="0.4" />

          {/* Luminária de piso: cúpula acesa, luz rebatida na parede e no sofá */}
          <path d="M248,402 L262,350 L318,350 L332,402 Z" fill="currentColor" opacity="0.92" />
          <ellipse cx="290" cy="372" rx="190" ry="160" fill={url("glow")} opacity="0.6" />
          <ellipse cx="420" cy="610" rx="230" ry="110" fill={url("pool")} opacity="0.45" />
          <ellipse cx="300" cy="720" rx="170" ry="34" fill={url("pool")} opacity="0.5" />

          {/* Rebatimento geral muito sutil */}
          <rect x="0" y="0" width="1600" height="1000" fill="currentColor" opacity="0.035" />
        </g>
      ) : (
        <g style={{ mixBlendMode: "screen" }}>
          {/* Um plafon central: tudo recebe a mesma luz, sem profundidade */}
          <ellipse cx="800" cy="84" rx="90" ry="10" fill="currentColor" />
          <rect x="0" y="0" width="1600" height="1000" fill={url("flat")} />
        </g>
      )}
      {!lit && <path d="M248,402 L262,350 L318,350 L332,402 Z" fill="#454545" />}

      <rect x="0" y="0" width="1600" height="1000" fill={url("vignette")} />
    </svg>
  );
}

export const RoomScene = memo(RoomSceneBase);
