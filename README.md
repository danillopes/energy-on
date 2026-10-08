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
| Produtos do catálogo | `src/data/products.ts` |
| Categorias, ambientes, estilos e acabamentos | `src/data/taxonomy.ts` |
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
Os 20 itens são **exemplos fictícios**, marcados com o selo “Exemplo”. Não há preços, marcas, estoque ou
especificações. Para ligar a uma fonte real (planilha, CMS ou banco), reimplemente `getProducts()` e
`getProduct()` em `src/data/products.ts` mantendo o tipo `Product` e mude `demo` para `false`.
Cada produto ganha automaticamente sua página em `/produtos/<slug>` e entra no sitemap.

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
- Catálogo real (nomes, fotos, acabamentos; preços só se a loja quiser exibir).
- Perfil do Instagram e, se desejado, credenciais da API da Meta.
- Endereço, horário e link do mapa.
- Domínio (`NEXT_PUBLIC_SITE_URL`).
- Revisão jurídica da Política de Privacidade (texto-base em `src/app/privacidade/page.tsx`).
