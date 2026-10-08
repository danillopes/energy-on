import type { Metadata } from "next";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como a Energy On trata os dados de quem visita o site.",
  alternates: { canonical: "/privacidade" },
};

/**
 * Texto-base. Revise com a assessoria jurídica da loja antes de publicar
 * (LGPD — Lei nº 13.709/2018) e preencha os dados do controlador.
 */
export default function PrivacyPage() {
  return (
    <>
      <Header base="/" alwaysSolid />
      <main id="conteudo" className="container-x pt-[calc(var(--header-h)+var(--safe-top)+4rem)] pb-24">
        <article className="max-w-[68ch] space-y-6 text-silver">
          <h1 className="type-h2 text-paper">Política de Privacidade</h1>
          <p className="text-micro text-mist">Modelo provisório — sujeito a revisão jurídica.</p>
          <p>
            Este site apresenta os produtos e serviços da {site.name}. Ele não possui formulários de cadastro e não
            coleta dados pessoais diretamente.
          </p>
          <h2 className="type-h3 text-paper">Contato pelo WhatsApp</h2>
          <p>
            Ao clicar em “Solicitar orçamento” ou “Fale com um especialista”, você é direcionado ao WhatsApp, um
            serviço da Meta, com uma mensagem pré-preenchida. As informações que você enviar por lá são usadas
            apenas para responder ao seu atendimento.
          </p>
          <h2 className="type-h3 text-paper">Armazenamento no navegador</h2>
          <p>
            Para manter suas escolhas durante a visita (filtros do catálogo, ambiente selecionado e temperatura do
            simulador), o site usa o armazenamento de sessão do navegador. Esses dados ficam no seu aparelho e são
            apagados ao fechar a aba.
          </p>
          <h2 className="type-h3 text-paper">Imagens e serviços de terceiros</h2>
          <p>
            Algumas imagens são carregadas de serviços externos, que podem registrar dados técnicos de acesso, como
            endereço IP e tipo de navegador, conforme as políticas desses serviços.
          </p>
          <h2 className="type-h3 text-paper">Seus direitos</h2>
          <p>
            Você pode solicitar informações, correção ou exclusão de dados tratados pela {site.name} pelo
            WhatsApp {site.contact.phoneDisplay}.
          </p>
        </article>
      </main>
      <Footer homeLinks={false} />
    </>
  );
}
