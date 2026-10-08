import Image from "next/image";
import { CompareSlider } from "../shared/CompareSlider";

export function BeforeAfter() {
  return (
    <section id="antes-depois" aria-labelledby="antes-depois-title" className="section-y border-t border-smoke bg-ink">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <span className="text-micro font-medium uppercase tracking-widest text-brand">
              Transformação em Ambiente Real
            </span>
            <h2 id="antes-depois-title" className="type-h2 mt-2">
              O mesmo espaço, outra atmosfera.
            </h2>
          </div>
          <p className="type-lead max-w-[48ch] lg:col-span-5">
            À esquerda, um único plafon frio de 6500K ilumina tudo por igual com sombras duras. À direita, o projeto
            luminotécnico com sanca quente, lustre escultural e spots cria aconchego e profundidade. Arraste a barra para
            comparar.
          </p>
        </div>

        <div className="mt-12 lg:mt-16">
          <CompareSlider
            label="Comparar ambiente real antes e depois do projeto de iluminação"
            className="aspect-[4/3] w-full sm:aspect-[16/9] 3xl:aspect-[21/9]"
            beforeLabel="Antes (Luz Chapada 6500K)"
            afterLabel="Depois (Luz em Camadas 2700K)"
            before={
              <Image
                src="/media/antes-sala-real.jpg"
                alt="Ambiente real antes: sala de estar iluminada apenas por uma luminária central fria no teto, sem profundidade"
                fill
                priority
                sizes="(min-width: 1536px) 1400px, 100vw"
                quality={85}
                className="object-cover object-center"
              />
            }
            after={
              <Image
                src="/media/depois-sala-real.jpg"
                alt="Ambiente real depois: a mesma sala com projeto luminotécnico completo da Energy On, com sanca quente, lustre escultural e spots"
                fill
                priority
                sizes="(min-width: 1536px) 1400px, 100vw"
                quality={85}
                className="object-cover object-center"
              />
            }
          />
        </div>

        {/* Comparativo das camadas de iluminação */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-sm border border-smoke/70 bg-graphite/40 p-4">
            <span className="text-micro text-mist">Antes</span>
            <p className="mt-1 text-small font-medium text-paper">Luminária Central Fria</p>
            <p className="mt-1 text-micro text-silver">
              Luz chapada e direta de 6500K: achata o pé-direito, ressalta imperfeições e cria um clima impessoal.
            </p>
          </div>
          <div className="rounded-sm border border-brand/30 bg-brand/5 p-4">
            <span className="text-micro font-medium text-brand">Depois • Camada 1</span>
            <p className="mt-1 text-small font-medium text-paper">Sanca Perimetral Indireta</p>
            <p className="mt-1 text-micro text-silver">
              Fita LED âmbar oculta no forro que rebate suavemente no teto e paredes com conforto visual total.
            </p>
          </div>
          <div className="rounded-sm border border-brand/30 bg-brand/5 p-4">
            <span className="text-micro font-medium text-brand">Depois • Camada 2</span>
            <p className="mt-1 text-small font-medium text-paper">Lustre Escultural de Vidro</p>
            <p className="mt-1 text-micro text-silver">
              Peça central contemporânea com globos de vidro âmbar que se torna o protagonista estético do espaço.
            </p>
          </div>
          <div className="rounded-sm border border-brand/30 bg-brand/5 p-4">
            <span className="text-micro font-medium text-brand">Depois • Camada 3</span>
            <p className="mt-1 text-small font-medium text-paper">Spots & Iluminação de Apoio</p>
            <p className="mt-1 text-micro text-silver">
              Fachos direcionados que valorizam as telas de arte na parede e luminária de piso para leitura.
            </p>
          </div>
        </div>

        <p className="mt-4 text-micro text-mist">
          Fotografia arquitetônica em ambiente real demonstrando a diferença prática de um projeto luminotécnico profissional.
        </p>
      </div>
    </section>
  );
}
