"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { BulbIcon } from "./Icons";

type SmartImageProps = Omit<ImageProps, "onError"> & { fallbackLabel?: string };

/**
 * next/image com tratamento de erro: se a foto não carregar, mostra um
 * espaço neutro do mesmo tamanho (sem quebrar o layout) com a descrição.
 */
export function SmartImage({ className, fallbackLabel, alt, ...props }: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        role="img"
        aria-label={alt}
        className={cn(
          "flex flex-col items-center justify-center gap-3 bg-graphite p-6 text-center text-mist",
          props.fill ? "absolute inset-0" : "h-full w-full",
          className,
        )}
      >
        <BulbIcon size={28} />
        <span className="max-w-[28ch] text-micro leading-snug">{fallbackLabel ?? "Imagem indisponível"}</span>
      </span>
    );
  }

  return <Image alt={alt} className={cn("object-center", className)} onError={() => setFailed(true)} {...props} />;
}
