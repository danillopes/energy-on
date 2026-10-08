import { photos } from "@/config/images";
import { LightUp } from "../shared/LightUp";
import { SmartImage } from "../shared/SmartImage";

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="relative border-t border-smoke bg-ink">
      <div className="grid lg:min-h-[44rem] lg:grid-cols-2">
        <LightUp className="aspect-[4/5] bg-graphite sm:aspect-[16/10] lg:aspect-auto">
          <SmartImage
            src={photos.about.src}
            alt={photos.about.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            fallbackLabel={photos.about.alt}
            className="object-cover object-center"
          />
        </LightUp>

        <div className="flex items-center">
          <div className="w-full px-[max(var(--gutter),var(--safe-left))] py-20 lg:max-w-[40rem] lg:px-16 xl:px-24">
            <h2 id="sobre-title" className="type-h2">
              Mais do que iluminar. Transformar.
            </h2>
            <p className="type-lead mt-8">
              Na Energy On, acreditamos que a iluminação vai além da funcionalidade. Cada detalhe tem o poder de
              valorizar espaços, criar atmosferas e transformar experiências.
            </p>
            <a href="#loja" className="btn btn-ghost mt-10">
              Conheça a Energy On
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
