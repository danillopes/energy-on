import type { Metadata } from "next";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { site } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como a Energy On trata os dados de quem visita o site, conforme a LGPD.",
  alternates: { canonical: "/privacidade" },
};

/**
 * Política de Privacidade organizada conforme a LGPD (Lei nº 13.709/2018),
 * descrevendo apenas o que o site realmente faz. Os campos marcados como
 * "[a preencher]" dependem de dados que só a loja possui (CNPJ e contato do
 * encarregado) — preencha-os e peça validação jurídica antes de considerar
 * o texto final.
 */
const UPDATED = "Outubro de 2026";

export default function PrivacyPage() {
  const fullAddress = [site.address.street, [site.address.city, site.address.state].filter(Boolean).join(" — ")]
    .filter(Boolean)
    .join(", ");

  return (
    <>
      <Header base="/" alwaysSolid />
      <main id="conteudo" className="container-x pt-[calc(var(--header-h)+var(--safe-top)+4rem)] pb-24">
        <article className="max-w-[68ch] space-y-8 text-silver">
          <header className="space-y-3">
            <h1 className="type-h2 text-paper">Política de Privacidade</h1>
            <p className="text-micro text-mist">Última atualização: {UPDATED}</p>
          </header>

          <p>
            Esta Política explica como a {site.name} ({site.legalName}) trata os dados pessoais de quem navega
            por este site, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD). Este é
            um site institucional: apresenta produtos e serviços de iluminação e direciona o atendimento ao WhatsApp.
            Ele não possui formulários de cadastro nem área de login.
          </p>

          <section className="space-y-3">
            <h2 className="type-h3 text-paper">1. Controlador dos dados</h2>
            <p>
              O controlador é a {site.legalName} ({site.name}), {site.segments}.
            </p>
            <ul className="space-y-1.5 border-l border-smoke pl-5">
              {fullAddress && <li>Endereço: {fullAddress}.</li>}
              <li>CNPJ: [a preencher].</li>
              <li>
                Contato geral: WhatsApp{" "}
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="link-line text-paper">
                  {site.contact.phoneDisplay}
                </a>
                .
              </li>
              <li>Contato para assuntos de privacidade / Encarregado (DPO): [e-mail a preencher].</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="type-h3 text-paper">2. Dados que tratamos</h2>
            <p>Não coletamos dados pessoais por formulários no site. Há tratamento de dados em três situações:</p>
            <ul className="space-y-2 border-l border-smoke pl-5">
              <li>
                <strong className="text-paper">Dados técnicos de acesso.</strong> Como qualquer site, nosso provedor de
                hospedagem (Vercel) e os serviços que fornecem as imagens registram, de forma automática, dados como
                endereço IP, data e hora, tipo de navegador e páginas acessadas, para entregar o conteúdo e manter a
                segurança.
              </li>
              <li>
                <strong className="text-paper">Preferências da visita.</strong> Guardamos no seu próprio navegador
                (armazenamento de sessão) escolhas como filtros do catálogo, ambiente selecionado e temperatura do
                simulador. Esses dados ficam no seu aparelho e são apagados ao fechar a aba.
              </li>
              <li>
                <strong className="text-paper">Dados que você envia pelo WhatsApp.</strong> Ao clicar em “Solicitar
                orçamento” ou “Consultar especialista”, você é levado ao WhatsApp com uma mensagem pronta. As
                informações que você decidir enviar (nome, mensagem, produto de interesse) são tratadas para o
                atendimento.
              </li>
            </ul>
            <p>Não tratamos dados pessoais sensíveis e o site não é direcionado a menores de idade.</p>
          </section>

          <section className="space-y-3">
            <h2 className="type-h3 text-paper">3. Finalidades</h2>
            <ul className="space-y-1.5 border-l border-smoke pl-5">
              <li>Exibir o site e suas imagens, e manter sua segurança e bom funcionamento.</li>
              <li>Lembrar suas preferências durante a navegação, para uma experiência mais fluida.</li>
              <li>Responder ao seu contato e elaborar orçamentos quando você nos procura pelo WhatsApp.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="type-h3 text-paper">4. Base legal</h2>
            <ul className="space-y-1.5 border-l border-smoke pl-5">
              <li>
                <strong className="text-paper">Legítimo interesse</strong> (art. 7º, IX) para os dados técnicos de
                acesso e a segurança do site.
              </li>
              <li>
                <strong className="text-paper">Procedimentos preliminares a um contrato</strong> (art. 7º, V) quando
                você nos contata para pedir um orçamento.
              </li>
              <li>
                As preferências guardadas no navegador não saem do seu aparelho e não são usadas para identificar você.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="type-h3 text-paper">5. Compartilhamento</h2>
            <p>Não vendemos nem cedemos seus dados. Há compartilhamento apenas com os serviços necessários para o site:</p>
            <ul className="space-y-1.5 border-l border-smoke pl-5">
              <li>
                <strong className="text-paper">Vercel</strong> — hospedagem do site (registros técnicos de acesso).
              </li>
              <li>
                <strong className="text-paper">Unsplash e GMH Trade (via Wix)</strong> — fornecem imagens exibidas no
                catálogo.
              </li>
              <li>
                <strong className="text-paper">WhatsApp / Meta</strong> — quando você opta por iniciar uma conversa de
                atendimento.
              </li>
            </ul>
            <p>
              Cada um desses serviços trata os dados conforme as próprias políticas de privacidade. Alguns podem estar
              em outros países; nesses casos a transferência segue a LGPD.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="type-h3 text-paper">6. Armazenamento e retenção</h2>
            <p>
              As preferências de navegação ficam no seu aparelho e são apagadas ao fechar a aba. As mensagens trocadas
              pelo WhatsApp permanecem no histórico do aplicativo e são mantidas pelo tempo necessário ao atendimento e
              às obrigações legais. Os registros técnicos de acesso seguem os prazos dos provedores dos serviços.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="type-h3 text-paper">7. Seus direitos</h2>
            <p>Como titular, você pode, nos termos do art. 18 da LGPD:</p>
            <ul className="space-y-1.5 border-l border-smoke pl-5">
              <li>confirmar a existência de tratamento e acessar seus dados;</li>
              <li>corrigir dados incompletos, inexatos ou desatualizados;</li>
              <li>solicitar anonimização, bloqueio ou eliminação de dados desnecessários;</li>
              <li>pedir a portabilidade e informações sobre com quem compartilhamos dados;</li>
              <li>revogar o consentimento e se opor a tratamentos, quando aplicável.</li>
            </ul>
            <p>
              Para exercer esses direitos, fale conosco pelo WhatsApp{" "}
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="link-line text-paper">
                {site.contact.phoneDisplay}
              </a>{" "}
              ou pelo contato de privacidade indicado acima.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="type-h3 text-paper">8. Alterações</h2>
            <p>
              Podemos atualizar esta Política para refletir mudanças no site ou na legislação. A data da última
              atualização fica sempre no topo desta página.
            </p>
          </section>

          <p className="text-micro text-mist">
            Observação: esta Política descreve o funcionamento atual do site. Antes de considerá-la final, a loja deve
            preencher os campos marcados como “[a preencher]” (CNPJ e contato de privacidade) e submetê-la à validação
            jurídica.
          </p>
        </article>
      </main>
      <Footer homeLinks={false} />
    </>
  );
}
