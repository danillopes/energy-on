# Energy On — Landing page

Site da Energy On, loja de iluminação decorativa. Next.js 16 (App Router), React 19, TypeScript e Tailwind CSS 4.
Sem bibliotecas de animação: tudo em CSS nativo + Intersection Observer.

## Como rodar

Requer Node.js 20.9 ou superior.

```bash
npm install
npm run dev        # desenvolvimento em http://localhost:3000
npm run build      # build de produção
npm start          # serve o build
npm run lint       # ESLint
npm run typecheck  # TypeScript
```

Antes de publicar, crie um arquivo `.env.local` (ou configure na hospedagem) com o endereço real do site:

```
NEXT_PUBLIC_SITE_URL=https://www.seudominio.com.br
```

Ele é usado no link do produto enviado pelo WhatsApp, no Open Graph, no sitemap e no robots.txt.
Recomendado: publicar na Vercel (zero configuração) ou em qualquer servidor Node.

## Onde editar cada coisa

| O quê | Arquivo |
| --- | --- |
| Telefone, WhatsApp, Instagram, endereço, menu, logo | `src/config/site.ts` |
| Fotos (hero, ambientes, sobre, Instagram) | `src/config/images.ts` |
| Produtos do catálogo | `src/data/catalog/` |
| Categorias, ambientes e estilos | `src/data/taxonomy.ts` |
| Textos dos ambientes | `src/data/environments.ts` |
| Textos do simulador de temperatura | `src/data/temperatures.ts` |
| Mensagens do WhatsApp | `src/lib/whatsapp.ts` |
| Cores, tipografia, botões, animações | `src/app/globals.css` |

### Logo oficial
Os arquivos `public/brand/energy-on-wordmark.webp` (cabeçalho) e `public/brand/energy-on-logo.webp`
(rodapé, com “Iluminação / Automação” e “RM Materiais Elétricos”) foram recortados da arte oficial da loja,
com fundo transparente. Se a loja tiver o logo em vetor (SVG/AI/PDF), troque os arquivos e os caminhos em
`logo` no `src/config/site.ts` para ganhar nitidez máxima.

Cores da marca (em `src/app/globals.css`): grafite `#141414`, branco e rosa-vermelho `#FC1E50`.

### Fotos
As fotos atuais são **demonstrativas** (Unsplash, licença de uso livre) e servem só para compor o layout.
Para usar as fotos da loja: exporte em AVIF ou WebP, salve em `public/media/` e troque o `src` em
`src/config/images.ts` (ou em cada produto) por `"/media/nome-do-arquivo.avif"`. Atualize o texto `alt`.

### Catálogo
Fica em `src/data/catalog/`:

| Arquivo | O quê |
| --- | --- |
| `brands.ts` | Fabricantes e catálogos de origem (link “Ver catálogo original”) |
| `products-gmh.ts` | 78 produtos GMH Trade (116 códigos), conferidos no site oficial |
| `products-demo.ts` | Itens ilustrativos (fotos de referência, sem marca e sem código) |
| `types.ts` | Formato de um produto: ID interno `EO-0000`, SKU por variante, coleção, ficha técnica, origem e status |
| `validate.ts` | Checagem: códigos/fotos/IDs repetidos, marca não cadastrada, demo com código etc. Erro aqui impede o build |

Regras: o código (`sku`) é copiado **exatamente** do fabricante e nunca preenchido por semelhança visual.
Se não houver código confirmado, use `status: "pendente"` — o WhatsApp avisa que o código ainda não foi confirmado.
A foto de um produto com várias cores indica qual cor aparece (`showsVariant`); se o cliente escolher outra, a ficha avisa.

Relatório do catálogo: `npm run catalog:audit`.

Para adicionar outro fabricante: cadastre a marca em `brands.ts`, crie `products-<marca>.ts` e inclua em `index.ts`.

### Instagram
Sem configuração, a seção mostra imagens demonstrativas com o aviso “Prévia ilustrativa”.
Para publicações reais via Instagram Graph API (Meta), defina no servidor:

```
INSTAGRAM_USER_ID=...
INSTAGRAM_ACCESS_TOKEN=...   # token de longa duração; expira em ~60 dias
```

Requisitos da Meta: conta profissional do Instagram vinculada a uma Página do Facebook e um app com
permissão de leitura de mídia. O feed é revalidado a cada hora (`src/lib/instagram.ts`).
Para mostrar o botão “Acompanhe no Instagram”, preencha `instagram.handle` em `src/config/site.ts`.

### Antes/depois e simulador
As duas seções usam uma sala ilustrada em SVG (`src/components/room/RoomScene.tsx`): a cor vem das fontes de
luz (sanca, spots, pendentes, luminária de piso), não de um filtro sobre a imagem. Isso garante alinhamento
perfeito entre “antes” e “depois” e funciona sem fotos. Para usar fotografias reais no comparador, troque os
dois `<RoomScene>` em `src/components/sections/BeforeAfter.tsx` por duas imagens do **mesmo enquadramento**.

## Estrutura

```
src/
  app/                  layout, página inicial, produto, privacidade, sitemap, robots, manifest
  components/
    sections/           Header, Hero, Environments, Simulator, BeforeAfter, Catalog, Instagram, About, Footer
    shared/             Logo, ícones, SmartImage (com fallback), LightUp, KeepAlive, CompareSlider
    room/               cena ilustrada do simulador/comparador
  config/               marca e imagens
  data/                 produtos, taxonomias, ambientes, temperaturas
  hooks/                estado de sessão, seção ativa, in-view, movimento reduzido
  lib/                  WhatsApp, loader de imagens, Instagram, cores
```

## Desempenho e preservação de estado

- **Keep-alive com limite:** os painéis de ambiente usam `<Activity>` do React com cache LRU de 3 painéis —
  ao voltar para uma aba, o conteúdo não é reconstruído; abas antigas são descartadas.
- **Filtros do catálogo:** resultados em cache LRU (12 combinações), cards memoizados, `useDeferredValue`
  para a troca de filtros não travar o toque, paginação de 9 em 9.
- **Escolhas preservadas na sessão:** ambiente, temperatura do simulador e filtros (também na URL,
  ex.: `/?categoria=pendentes&ambiente=cozinha`, para compartilhar).
- **Imagens:** `next/image` com loader próprio (AVIF/WebP no tamanho certo), lazy loading fora da tela,
  preload da foto do hero, fallback elegante se a imagem falhar.
- **Fonte local** (Archivo variável, um único arquivo WOFF2) — sem requisição ao Google Fonts.
- **Animações** só com `transform`, `opacity` e `filter`; parallax com um listener passivo limitado por
  `requestAnimationFrame`; tudo desativado com “reduzir movimento”.
- Cabeçalho muda de transparente para sólido via Intersection Observer (sem ouvir scroll).

## Pendências que dependem da loja

- Logo oficial (arquivo).
- Fotos próprias de ambientes e produtos.
- Catálogos das demais marcas (Nordecor, Sindora, Deluxe, Moon, Select, Perfom) — arquivos ainda não enviados.
- Perfil do Instagram e, se desejado, credenciais da API da Meta.
- Endereço, horário e link do mapa.
- Domínio (`NEXT_PUBLIC_SITE_URL`).
- Revisão jurídica da Política de Privacidade (texto-base em `src/app/privacidade/page.tsx`).

## Passeio virtual 360° ("Conheça a Energy On por dentro")

Seção `src/components/sections/StoreTour.tsx`, configurada em `site.tour` (`src/config/site.ts`).

- Usa o panorama oficial da loja no Google Maps (ID `CIHM0ogKEICAgIC2ubSXMg`, publicado pela Insight View).
- Nada do Google é carregado até o visitante tocar em **Iniciar visita virtual** — antes disso aparece só a foto da fachada (`public/media/loja-fachada.webp`).
- **Sem chave de API**: o site usa o código de incorporação padrão que o Google Maps gera em "Compartilhar → Incorporar um mapa".
- **Opcional — Maps Embed API**: se um dia o embed padrão deixar de funcionar, crie uma chave no Google Cloud, ative só a "Maps Embed API",
  restrinja a chave aos referenciadores HTTP do seu domínio (ex.: `https://energy-on.vercel.app/*`) e defina na Vercel
  `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY`. Essa chave é pública por natureza (vai no HTML) — por isso a restrição de domínio é obrigatória.
- Para trocar o panorama: abra a foto 360° no Google Maps, copie o trecho `!1s…` da URL e atualize `panoId`, `lat`, `lng` e `mapsUrl`.
