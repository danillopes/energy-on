import Link from "next/link";
import { site } from "@/config/site";
import { categories } from "@/data/taxonomy";
import { WHATSAPP_GENERAL_MESSAGE, whatsappLink } from "@/lib/whatsapp";
import { InstagramIcon, PinIcon, WhatsAppIcon } from "../shared/Icons";
import { Logo } from "../shared/Logo";
import { CategoryLink } from "./CategoryLink";

export function Footer({ homeLinks = true }: { homeLinks?: boolean }) {
  const { address, instagram } = site;
  const hasAddress = Boolean(address.street);
  const year = new Date().getFullYear();
  const prefix = homeLinks ? "" : "/";

  return (
    <footer id="contato" className="relative isolate overflow-hidden border-t border-smoke bg-ink">
      <div className="container-x section-y grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo variant="full" />
          <p className="mt-8 max-w-[34ch] text-silver">
            Iluminação decorativa e soluções para valorizar cada ambiente da sua casa.
          </p>
          <a
            href={whatsappLink(WHATSAPP_GENERAL_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-solid mt-8"
          >
            <WhatsAppIcon size={18} />
            Falar no WhatsApp
          </a>
        </div>

        <nav aria-label="Links rápidos" className="lg:col-span-2">
          <h2 className="text-small text-mist">Navegação</h2>
          <ul className="mt-5 flex flex-col gap-3">
            {site.nav.map((item) => (
              <li key={item.id}>
                <a href={`${prefix}#${item.id}`} className="link-line text-silver hover:text-paper">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Categorias de produtos" className="lg:col-span-3">
          <h2 className="text-small text-mist">Produtos</h2>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 lg:grid-cols-1">
            {categories.map((category) => (
              <li key={category.id}>
                <CategoryLink id={category.id} className="link-line text-silver hover:text-paper">
                  {category.label}
                </CategoryLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="text-small text-mist">Contato</h2>
          <ul className="mt-5 flex flex-col gap-4 text-silver">
            <li>
              <a
                href={whatsappLink(WHATSAPP_GENERAL_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 hover:text-paper"
              >
                <WhatsAppIcon size={18} />
                WhatsApp
              </a>
            </li>
            <li>
              {instagram.url ? (
                <a
                  href={instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 hover:text-paper"
                >
                  <InstagramIcon size={18} />@{instagram.handle}
                </a>
              ) : (
                <span className="inline-flex items-center gap-3 text-mist">
                  <InstagramIcon size={18} />
                  Instagram em breve
                </span>
              )}
            </li>
            <li className="flex gap-3">
              <PinIcon size={18} className="mt-1 shrink-0" />
              {hasAddress ? (
                <address className="not-italic">
                  {address.street}
                  {address.district && <>, {address.district}</>}
                  <br />
                  {[address.city, address.state].filter(Boolean).join(" — ")}
                  {address.postalCode && <>, CEP {address.postalCode}</>}
                  {address.hours && (
                    <>
                      <br />
                      <span className="text-mist">{address.hours}</span>
                    </>
                  )}
                  {address.mapsUrl && (
                    <>
                      <br />
                      <a href={address.mapsUrl} target="_blank" rel="noopener noreferrer" className="link-line text-paper">
                        Como chegar
                      </a>
                    </>
                  )}
                </address>
              ) : (
                <span className="text-mist">Endereço da loja: consulte pelo WhatsApp.</span>
              )}
            </li>
          </ul>
        </div>
      </div>

      <div className="container-x relative z-10 pb-[clamp(7rem,15vw,13rem)]">
        <div className="flex flex-col gap-3 border-t border-smoke pt-6 text-micro text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. Todos os direitos reservados.
          </p>
          <Link href="/privacidade" className="link-line hover:text-paper">
            Política de Privacidade
          </Link>
        </div>
      </div>

      {/* Curva da arte oficial da loja: faixa grafite e faixa rosa subindo da esquerda */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1600 200"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-0 h-[clamp(6rem,14vw,12rem)] w-full"
      >
        <path d="M0,0 C420,30 1000,120 1600,150 L1600,200 L0,200 Z" fill="#1d1d1d" />
        <path d="M0,40 C360,70 820,160 1250,200 L0,200 Z" fill="#fc1e50" />
      </svg>
    </footer>
  );
}
