import { site } from "@/config/site";
import { getInstagramFeed } from "@/lib/instagram";
import { cn } from "@/lib/cn";
import { InstagramIcon } from "../shared/Icons";
import { SmartImage } from "../shared/SmartImage";

// Mosaico que fecha a grade sem buracos: 2 colunas no celular, 4 no desktop.
const tile = [
  "col-span-2 row-span-2",
  "col-span-1",
  "col-span-1",
  "col-span-2",
  "col-span-1 lg:col-span-2",
  "col-span-1 lg:col-span-2",
];

export async function Instagram() {
  const feed = await getInstagramFeed(6);
  const profile = site.instagram.url;

  return (
    <section id="inspiracoes" aria-labelledby="inspiracoes-title" className="section-y border-t border-smoke bg-ink">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="inspiracoes-title" className="type-h2 lg:col-span-6">
            Inspiração em cada detalhe.
          </h2>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="type-lead max-w-[46ch]">
              Acompanhe nossas novidades, projetos e ideias para transformar seus ambientes.
            </p>
          </div>
        </div>

        <ul className="mt-12 grid auto-rows-[38vw] grid-cols-2 gap-2 sm:auto-rows-[26vw] sm:gap-3 lg:mt-16 lg:auto-rows-[15vw] lg:grid-cols-4 3xl:auto-rows-[13rem]">
          {feed.posts.slice(0, 6).map((post, index) => {
            const content = (
              <SmartImage
                src={post.image}
                alt={post.alt}
                fill
                sizes={index === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                quality={60}
                fallbackLabel={post.alt}
                className="object-cover object-center transition-transform duration-[1200ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
              />
            );
            return (
              <li key={post.id} className={cn("group relative overflow-hidden rounded-sm bg-graphite", tile[index])}>
                {post.permalink ? (
                  <a href={post.permalink} target="_blank" rel="noopener noreferrer" className="absolute inset-0">
                    {content}
                    <span className="sr-only">Abrir publicação no Instagram</span>
                  </a>
                ) : (
                  content
                )}
              </li>
            );
          })}
        </ul>

        <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-micro text-mist">
            {feed.live
              ? "Publicações mais recentes do nosso perfil."
              : "Prévia ilustrativa: as publicações reais aparecem aqui quando a integração com o Instagram for ativada."}
          </p>
          {profile ? (
            <a href={profile} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <InstagramIcon size={18} />
              Acompanhe no Instagram
            </a>
          ) : (
            <span className="btn btn-ghost cursor-not-allowed opacity-50" aria-disabled="true" title="Perfil ainda não configurado">
              <InstagramIcon size={18} />
              Acompanhe no Instagram
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
