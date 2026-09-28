# Desvario: O Reino do Avesso · Catálogo de Cartas

Catálogo interativo das cartas de **Desvario**, um jogo de duelo de cartas autoral inspirado nas regras clássicas de Yu-Gi-Oh! e no universo do absurdo. As cartas são carregadas por **AJAX (XMLHttpRequest)** a partir de arquivos JSON. O site permite **buscar e filtrar** as cartas e **ver os detalhes** de cada uma em um modal, **sem recarregar a página**.

| | |
|---|---|
| **Aluno** | Carlos Eduardo Pena Fiel Menon de Freitas |
| **Disciplina** | Desenvolvimento Web · FACET-SNP-307 · UNEMAT · 2026/2 |
| **Professor** | Ivan Luiz Pedroso Pires |
| **Avaliação** | Avaliação prática individual 1: website AJAX com Bootstrap |
| **Tema** | Catálogo de cartas do jogo *Desvario: O Reino do Avesso* |
| **Repositório** | [github.com/carloseduardosnp01-art/desvario-catalogo](https://github.com/carloseduardosnp01-art/desvario-catalogo) |
| **Site publicado** | [carloseduardosnp01-art.github.io/desvario-catalogo](https://carloseduardosnp01-art.github.io/desvario-catalogo/) |

---

## Sumário
1. [Sobre o tema](#sobre-o-tema)
2. [Funcionalidades](#funcionalidades)
3. [Como executar](#como-executar)
4. [Roteiro de testes](#roteiro-de-testes)
5. [Atendimento aos requisitos](#atendimento-aos-requisitos)
6. [Framework CSS: por que Bootstrap](#framework-css-por-que-bootstrap)
7. [Acessibilidade e desempenho (Lighthouse)](#acessibilidade-e-desempenho-lighthouse)
8. [Estrutura de pastas](#estrutura-de-pastas)
9. [Fonte e formato dos dados](#fonte-e-formato-dos-dados)
10. [Fontes, imagens e bibliotecas](#fontes-imagens-e-bibliotecas)

---

## Sobre o tema

Em Desvario, rios de chá correm morro acima e relógios andam para trás: é o absurdo que mantém o reino vivo e colorido. O **Arquiteto Cinzento** e a **Ordem Cinzenta** (réguas, carimbos e borrachas vivos) querem “corrigir” o mundo, apagando suas cores. O **Sonhador de Tinta**, alguém do nosso mundo que caiu numa poça de tinta, precisa reunir os habitantes do reino em duelos de cartas para salvá-lo.

O catálogo apresenta as **33 cartas** do jogo, divididas em quatro categorias (Monstro Normal, Monstro de Efeito, Magia e Armadilha), seis atributos (Chá, Tempo, Tinta, Espelho, Folha e Cinza) e dois decks iniciais de 40 cartas.

---

## Funcionalidades

- **Listagem dinâmica:** as 33 cartas vêm de `data/cartas.json` por AJAX (XMLHttpRequest), e cada carta é montada na tela com `createElement` a partir desses dados.
- **Detalhes da carta:** ao clicar em **Ver detalhes**, uma **nova requisição AJAX** busca `data/cartas/{id}.json`, com ATK/DEF, efeito, texto de história, região e descrição da arte. O resultado aparece num **modal do Bootstrap**.
- **Busca, filtros, ordenação e paginação:**
  - busca por texto no código, no nome e no resumo da carta, sem diferenciar acentos (`dragao` encontra “Dragão”);
  - filtros por **categoria**, **atributo** e **deck**, encadeados com `filter`;
  - ordenação por código ou por Nível, com `sort`;
  - **paginação** com 12 cartas por página (componente *Pagination* do Bootstrap), para a lista não virar uma rolagem infinita conforme o catálogo cresce;
  - tudo combinável e sem recarregar a página.
- **Navegação no modal:** botões **Anterior/Próxima** passam para a carta vizinha do resultado atual. Cada troca faz uma nova requisição de detalhes.
- **Estados da interface:**
  - indicador de carregamento (spinner);
  - mensagem quando nenhuma carta é encontrada, com botão **Limpar filtros**;
  - aviso de erro compreensível, com botão **Tentar novamente**, tanto na lista quanto nos detalhes.
- **Apresentação** com o logo do jogo e um leque de três cartas reais, que também abrem o modal de detalhes.
- **História em capítulos**, ilustrada com as artes das cartas.
- **Explorador das cinco regiões** de Desvario em **abas** do Bootstrap, cada uma com ilustração panorâmica, história e as **cartas referentes à região**, filtradas pelo campo `regiao` de `data/cartas.json` e clicáveis para abrir o modal.
- **Regras do jogo** em um **accordion** do Bootstrap.
- **Decks iniciais** em **abas (pills)** do Bootstrap: uma “mesa” com as cartas empilhadas conforme o número de cópias e um resumo calculado com `reduce` (total de cartas, monstros, magias e armadilhas). Cada carta abre o mesmo modal de detalhes.
- **Animações e SVG:**
  - microinterações com `transition`: sublinhado nos links do menu, botões que sobem, cartas que se elevam e abas das regiões;
  - animações com `@keyframes`: cartas do topo flutuando e vapor da xícara do rodapé;
  - **SVG inline** nos ícones dos botões do topo, na seta de “Voltar ao topo” e na xícara do rodapé (desenhada com `circle`, `rect` e `path`), que inclina e solta vapor ao passar o mouse;
  - tudo respeita `prefers-reduced-motion`.
- **Layout responsivo** com o grid do Bootstrap: o catálogo tem 2 colunas no celular (com uma versão compacta da carta), 3 em tablets e telas médias e 4 em telas extragrandes.
- **Acessibilidade:**
  - link “Pular para o conteúdo” e hierarquia de títulos;
  - `label` em todos os campos e `alt` em todas as imagens informativas;
  - regiões `aria-live` para contagem e estados;
  - foco no botão “Tentar novamente” quando ocorre erro;
  - menu do celular que fecha ao escolher um link ou com a tecla **Esc**, devolvendo o foco ao botão;
  - foco visível em todos os elementos, contraste AA e nome acessível dos botões igual ao texto visível;
  - respeito a `prefers-reduced-motion`.

---

## Como executar

> ⚠️ O site **não funciona abrindo o `index.html` com dois cliques** (`file://`), porque o navegador bloqueia requisições AJAX a arquivos locais. É preciso um servidor HTTP local.

Escolha **uma** das opções abaixo, sempre dentro da pasta do projeto:

**Opção 1: Python** (já vem instalado na maioria dos computadores)
```bash
python -m http.server 8000
```
Depois, acesse **http://localhost:8000** no navegador.

**Opção 2: Node.js**
```bash
npx serve .
```
Depois, acesse o endereço indicado no terminal (normalmente **http://localhost:3000**).

**Opção 3: VS Code**
Instale a extensão **Live Server**, clique com o botão direito em `index.html` e escolha **Open with Live Server**.

É necessária conexão com a internet para carregar o Bootstrap pela CDN (as fontes e as imagens ficam no próprio projeto).

> Se você alterar algum arquivo JSON e a mudança não aparecer, recarregue com **Ctrl+F5** (o navegador pode guardar a versão antiga em cache).

---

## Roteiro de testes

Com o servidor rodando em `http://localhost:8000`:

| # | O que testar | Como testar | Resultado esperado |
|---|---|---|---|
| 1 | **Listagem** | Abra `http://localhost:8000` e vá até **Catálogo**. Com o DevTools (F12) aberto, vá na aba **Rede/Network**. | Aparecem as 12 primeiras cartas, o texto “Exibindo 1–12 de 33 cartas” e a paginação (1, 2, 3). A aba Rede mostra a requisição `data/cartas.json` (tipo *xhr*, status 200). |
| 2 | **Detalhes (nova requisição)** | Clique em **Ver detalhes** em qualquer carta, por exemplo “O Arquiteto Cinzento”. | Abre um modal com a carta completa, ATK/DEF, efeito, Nível/Tributos, região e descrição da arte. A aba Rede mostra **uma nova requisição** `data/cartas/13.json`. Cada carta aberta gera uma nova requisição. |
| 3 | **Busca por texto** | Digite `dragão` (ou `dragao`) no campo **Buscar carta**. | A lista é filtrada a cada tecla, sem recarregar a página, e mostra “Dragão Ponteiro”. |
| 4 | **Filtros** | Escolha **Categoria: Armadilha**. Depois escolha **Deck: Ordem Cinzenta**. | Primeiro aparecem só as 5 Armadilhas. Depois, só as 3 Armadilhas da Ordem Cinzenta. **Limpar filtros** mostra tudo de novo. |
| 5 | **Ordenação e paginação** | Escolha **Ordenar por: Maior Nível**. Depois clique na página **2** e em **›**. | A lista começa por “O Arquiteto Cinzento” (Nível 8). A página 2 mostra “Exibindo 13–24”, e a tela volta ao começo da lista. Na última página, **›** fica desabilitado. |
| 6 | **Navegação no modal** | Abra uma carta e clique em **Próxima ›**. | O modal mostra a próxima carta do resultado atual (“2 de 33”) e a aba Rede registra uma nova requisição `data/cartas/{id}.json`. |
| 7 | **Estado de carregamento** | Abra `http://localhost:8000/?lento`. | Por 2 segundos aparece o spinner “Carregando as cartas de Desvario…”. Ao abrir uma carta, aparece “Consultando os detalhes da carta…”. |
| 8 | **Estado vazio** | Digite `xyz` no campo de busca. | Aparece “Nenhuma carta corresponde à busca ou aos filtros escolhidos.” com o botão **Limpar filtros**. |
| 9 | **Erro + tentar novamente (lista e detalhes)** | Abra `http://localhost:8000/?erro`. Clique em **Tentar novamente**. Depois abra uma carta e clique em **Tentar novamente** no modal. | A primeira requisição da lista falha (HTTP 404 real) e aparece “Não foi possível carregar o catálogo.”; ao tentar novamente, as cartas carregam. No modal acontece o mesmo com os detalhes. |
| 10 | **Erro real de rede** | Com a página aberta, marque **Offline** na aba Rede do DevTools e clique em **Ver detalhes**. | Aparece a mensagem “Não foi possível conectar ao servidor…” com **Tentar novamente**. |
| 11 | **Responsividade** | Use o modo dispositivo do DevTools (Ctrl+Shift+M) e alterne entre celular (ex.: 375 px) e computador. | O menu vira um botão “hambúrguer” no celular (e fecha ao escolher um link ou com **Esc**), o catálogo se ajusta de 2 a 4 colunas e não há rolagem horizontal. |
| 12 | **Componentes Bootstrap** | Troque as abas em **As regiões de Desvario**, abra os itens do accordion em **Regras** e troque as abas em **Decks**. | Cada região mostra sua história e as cartas referentes a ela. O accordion abre e fecha as seções. As abas mostram os dois decks com 40 cartas cada (as pilhas indicam as cópias), e clicar em qualquer carta abre o modal. |

| 13 | **Animações e SVG** | Passe o mouse sobre os links do menu, os botões do topo e a xícara do rodapé. | O sublinhado dourado cresce nos links, os botões sobem e o ícone gira, e a xícara inclina com o vapor subindo. Com “reduzir movimento” ativado no sistema, as animações param. |
| 14 | **Teclado** | Use só **Tab**, **Shift+Tab**, **Enter** e **Esc**. | O primeiro Tab mostra “Pular para o conteúdo”; o foco fica sempre visível; o modal abre e fecha pelo teclado. |

> Os parâmetros `?lento` e `?erro` existem apenas para demonstrar os estados da interface. Eles estão explicados no início da parte 2 de `js/app.js`.

---

## Atendimento aos requisitos

| Requisito do enunciado | Onde está atendido |
|---|---|
| **2a** HTML5, idioma, UTF-8, título, viewport | `index.html`: `<!DOCTYPE html>`, `lang="pt-BR"`, `<meta charset="UTF-8">`, `<title>`, `<meta name="viewport">` |
| **2a** Três áreas: apresentação, catálogo e sobre | `index.html`: `#inicio` (com `#historia`), `#catalogo` e `#sobre` (além de `#regras` e `#decks`) |
| **2b** `header`, `nav`, `main`, `footer`, `section`, `article` | `index.html`. Cada carta do catálogo é um `<article>` (criado em `js/app.js`, função `criarCarta()`) |
| **2b** Hierarquia de títulos | Um único `h1` e, abaixo dele, `h2` por seção e `h3`/`h4`/`h5` nos subitens, sem pular níveis |
| **2b** Texto alternativo e rótulos | `alt` em todas as imagens informativas (as das cartas são geradas em `criarCarta()`). Todos os campos têm `<label for>` |
| **2c** Contêineres e grid do Bootstrap | `.container`, `.row`, `.col-*` e `row-cols-2 row-cols-md-3 row-cols-xl-4` no catálogo |
| **2d** Navbar, cards, botões, formulário | Navbar colapsável, `.card` em cada carta, `.btn` e o formulário `#form-filtros` |
| **2d** Componente interativo | **Modal** (detalhes da carta), **Accordion** (regras), **Pills/Tabs** (regiões e decks), **Collapse** (menu no celular), **Pagination** (catálogo) |
| **3a** Listagem AJAX com ≥ 8 itens (id, título, categoria, resumo) | `js/app.js` → `carregarCartas()` chama `buscarCartas()`, que busca `data/cartas.json` (33 itens com `id`, `titulo`, `categoria` e `resumo`). Cada carta é montada por `criarCarta()` |
| **3b** Nova requisição de detalhes | `js/app.js` → `abrirDetalhes(id)` chama `buscarDetalhes(id)`, que busca `data/cartas/{id}.json` |
| **3c** Busca e filtro sem recarregar | `js/app.js` → `aplicarFiltros()` (filter encadeado), `ordenar()` (sort) e `mostrarPagina()`. Os eventos ficam na parte 8 do arquivo |
| **3d** Carregando, vazio e erro com nova tentativa | `js/app.js` → `mostrarCarregando()`, `mostrarVazio()` e `mostrarErro()` (com botão “Tentar novamente”), usados na lista e no modal |
| **4** HTML, CSS, JS e dados separados | `index.html`, `css/style.css`, `js/app.js` e `data/*.json` |
| **4** XMLHttpRequest, sem frameworks JS | Apenas JavaScript puro e Bootstrap |
| **4** Fonte de listagem ≠ fonte de detalhes | `data/cartas.json` (lista) e `data/cartas/{id}.json` (detalhes) |
| **4** Servidor HTTP local documentado | Seção [Como executar](#como-executar) |

---

## Framework CSS: por que Bootstrap

O **Bootstrap 5** foi escolhido porque oferece, prontos e acessíveis, os componentes que o catálogo precisa (navbar colapsável, cards, formulário, modal, accordion, abas e paginação) e um grid responsivo simples de usar. Assim, o CSS próprio (`css/style.css`) fica dedicado à identidade visual do jogo: molduras das cartas, cores dos atributos e animações.

---

## Acessibilidade e desempenho (Lighthouse)

Auditoria feita com o **Lighthouse 12** (Chrome), com o site rodando em `http://localhost:8000`.

| Categoria | Celular: antes | Celular: depois | Computador: depois |
|---|---|---|---|
| Acessibilidade | 100 | **100** | **100** |
| Boas práticas | 100 | **100** | **100** |
| SEO | 100 | **100** | **100** |
| Desempenho | 71 | **78** | **97** |

Métricas no celular (antes → depois): deslocamento de layout (CLS) **0,114 → 0**; tempo de bloqueio (TBT) **120 ms → 50 ms**; maior elemento visível (LCP) **6,0 s → 5,3 s**. O Lighthouse no modo celular simula uma rede 4G lenta; no computador, o LCP é de 1,2 s.

**As 3 principais correções:**
1. **Carregamento da primeira tela:** o logo, que é o maior elemento visível, passou de 94 KB para 51 KB e é pré-carregado com prioridade alta; as imagens que ficam fora da primeira tela no celular (cartas do topo e miniaturas das regiões) passaram a carregar só quando necessário (`loading="lazy"`).
2. **Fontes no próprio site:** Cinzel e Crimson Pro passaram a ser servidas da pasta `fontes/` e pré-carregadas, em vez de virem do Google Fonts. Isso eliminou a troca de fonte que empurrava o conteúdo (CLS de 0,114 para 0) e uma conexão com servidor externo.
3. **Acessibilidade além da nota automática:** contraste AA na aba ativa das regiões e no subtipo das Magias e Armadilhas, textos com no mínimo 12 px no celular, foco sempre visível e nome acessível dos botões contendo o texto visível (WCAG 2.5.3). Também foi feito o teste completo de teclado (Tab, Shift+Tab, Enter e Esc).

---

## Estrutura de pastas

```
.
├── index.html              # Página única (estrutura semântica)
├── css/
│   └── style.css           # Estilos próprios (fontes, tema, molduras das cartas, estados, animações)
├── js/
│   └── app.js              # Todo o comportamento do site, dividido em 9 partes comentadas
├── data/
│   ├── cartas.json         # Fonte da LISTAGEM (33 cartas, dados resumidos)
│   └── cartas/
│       ├── 1.json … 33.json  # Fonte dos DETALHES (uma por carta)
├── fontes/                 # Fontes Cinzel e Crimson Pro (woff2)
├── img/
│   ├── logo-desvario.webp  # Logo do jogo (fundo transparente, 720 × 214)
│   ├── atributos-desvario.webp  # Ilustração dos seis atributos (seção de regras)
│   ├── favicon-32.png      # Ícone do site
│   ├── apple-touch-icon.png  # Ícone para tela inicial de celulares
│   ├── atributos/          # Ícones dos atributos (emblemas pintados) e de Magia/Armadilha (SVG)
│   ├── regioes/            # Ilustrações das 5 regiões (WebP 960×640) e miniaturas das abas
│   └── cartas/             # Artes das 33 cartas (WebP 640×640)
└── docs/
    ├── cartas-e-artes.md   # Documento de design: regras, cartas e guia de arte
    └── Desvario_Cartas.xlsx  # Planilha de controle das cartas e decks
```

### Organização do JavaScript

Todo o JavaScript está em **`js/app.js`**, carregado no `<head>` com `defer` (o script roda depois que o HTML é montado). O arquivo é dividido em 9 partes, cada uma com um comentário explicando o que faz:

1. **Estado e elementos da página:** o objeto `estado` guarda as cartas, o resultado da busca e a página atual; as constantes guardam os elementos pegos com `querySelector`.
2. **Requisições AJAX:** `buscarJSON(url, aoReceber, aoFalhar)` usa `XMLHttpRequest` e avisa o resultado por **callbacks**. `buscarCartas()` e `buscarDetalhes(id)` usam essa função.
3. **Funções auxiliares:** criam elementos (`criarElemento`) e preenchem ícone, estrelas e tipo das cartas.
4. **Estados da interface:** `mostrarCarregando`, `mostrarVazio` e `mostrarErro`.
5. **Catálogo:** `carregarCartas`, `criarCarta`, `aplicarFiltros`, `ordenar` e a paginação.
6. **Detalhes:** `abrirDetalhes` faz a nova requisição e `preencherDetalhes` monta o modal.
7. **Decks e regiões:** montados com `filter` e `reduce` a partir das cartas carregadas.
8. **Eventos:** todos os `addEventListener` do site.
9. **Início:** chama `carregarCartas()`.

**Sobre o AJAX:** as requisições usam `XMLHttpRequest`, com os eventos `load` e `error` e callbacks (`aoReceber` e `aoFalhar`). Com `responseType = "json"`, o navegador já entrega os dados convertidos; se o arquivo não for um JSON válido, aparece o aviso de erro com “Tentar novamente”.

---

## Fonte e formato dos dados

Os dados são **autorais**, criados para este projeto, e ficam em arquivos JSON servidos por HTTP.

**Listagem**: `data/cartas.json` (um objeto por carta):
```json
{
  "id": 13,
  "codigo": "DSV-013",
  "titulo": "O Arquiteto Cinzento",
  "categoria": "Monstro de Efeito",
  "subtipo": "Efeito",
  "atributo": "CINZA",
  "nivel": 8,
  "resumo": "Líder da Ordem Cinzenta: enfraquece todos os monstros do oponente.",
  "imagem": "img/cartas/dsv-013-arquiteto-cinzento.webp",
  "deck": "Ordem Cinzenta",
  "copias": 2,
  "regiao": "Cidadela Cinzenta"
}
```

**Detalhes**: `data/cartas/13.json`:
```json
{
  "id": 13,
  "codigo": "DSV-013",
  "tipoMonstro": "Burocrata",
  "atk": 3000,
  "def": 2500,
  "efeito": "Enquanto esta carta estiver com a face para cima no campo, …",
  "historia": "Um mundo sem absurdo é um mundo sem erros. …",
  "regiao": "Cidadela Cinzenta",
  "descricaoArte": "Figura altíssima e rígida, …",
  "creditoArte": "Ilustração gerada por IA."
}
```

**Como adicionar uma carta nova:**
1. Salve a arte em `img/cartas/` (ex.: `dsv-034-nova-carta.webp`, quadrada).
2. Acrescente o objeto da carta em `data/cartas.json`, com o caminho da arte em `"imagem"`.
3. Crie o arquivo de detalhes `data/cartas/34.json`.

---

## Fontes, imagens e bibliotecas

| Recurso | Origem | Licença |
|---|---|---|
| Textos, cartas, regras e dados JSON | Autorais | — |
| Ícones de Magia e Armadilha (`img/atributos/magia.svg` e `armadilha.svg`) e SVGs inline do `index.html` (ícones dos botões, seta e xícara do rodapé) | Autorais (SVG escrito à mão) | — |
| Artes das cartas (`img/cartas/dsv-*.webp`), das regiões (`img/regioes/*.webp`), dos atributos (`atributos-desvario.webp` e `img/atributos/*.webp`) e logo (`logo-desvario.webp`, favicons) | Geradas com inteligência artificial a partir das descrições autorais em `docs/`, depois recortadas, com o fundo do logo removido, e comprimidas para o site | — |
| [Bootstrap 5.3.3](https://getbootstrap.com/) (CSS e JS com Popper) | CDN jsDelivr | MIT |
| Fontes [Cinzel](https://fonts.google.com/specimen/Cinzel) e [Crimson Pro](https://fonts.google.com/specimen/Crimson+Pro) (arquivos em `fontes/`) | Google Fonts | SIL Open Font License |
| Estrutura de regras (Nível, Tributo, Magias e Armadilhas) | Inspirada em *Yu-Gi-Oh!* (Konami). Projeto acadêmico, sem fins comerciais e sem uso de marcas, nomes ou imagens do jogo original | — |
| Ferramentas | VS Code, DevTools do navegador, Lighthouse e Claude Code (assistente de IA usado como apoio no desenvolvimento) | — |

---

## Próximas etapas

Este é o mesmo projeto das três unidades da disciplina. Próximos passos:
- **Promises e async/await:** trocar o `XMLHttpRequest` por `fetch` na função `buscarJSON()`.
- **AJAX, JSON e SPA:** organizar o site como uma aplicação de página única.
- **Avaliação 2 (client-side):** um duelo de cartas simples jogável no navegador, usando os dois decks.
- **Unidade 3 (server-side):** API com Express, login com Google e decks salvos pelo jogador.
