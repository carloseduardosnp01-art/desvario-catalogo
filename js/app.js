/* ==========================================================================
   Desvario · js/app.js
   Todo o comportamento do site fica neste arquivo, dividido em partes:

     1. Estado e elementos da página
     2. Requisições AJAX (XMLHttpRequest + callbacks)
     3. Funções auxiliares para montar a tela
     4. Estados da interface: carregando, vazio e erro
     5. Catálogo: listagem, busca, filtros, ordenação e paginação
     6. Detalhes da carta (modal)
     7. Decks e regiões
     8. Eventos
     9. Início
   ========================================================================== */


/* ---------- 1. Estado e elementos da página ---------- */

const CARTAS_POR_PAGINA = 12;

// Tudo o que o site precisa "lembrar" enquanto está aberto fica neste objeto.
const estado = {
  cartas: [],         // todas as cartas recebidas de data/cartas.json
  resultado: [],      // cartas que passaram na busca e nos filtros (já ordenadas)
  pagina: 1,          // página atual do catálogo
  cartaAberta: null,  // id da carta mostrada no modal
  listaDoModal: [],   // lista percorrida pelos botões "Anterior" e "Próxima"
  posicaoNoModal: 0,  // posição da carta aberta dentro dessa lista
};

// Campos do formulário de busca e filtros
const formFiltros = document.querySelector("#form-filtros");
const campoBusca = document.querySelector("#filtro-busca");
const selectOrdem = document.querySelector("#filtro-ordem");
const selectCategoria = document.querySelector("#filtro-categoria");
const selectAtributo = document.querySelector("#filtro-atributo");
const selectDeck = document.querySelector("#filtro-deck");
const botaoLimpar = document.querySelector("#botao-limpar");

// Áreas do catálogo
const listaCartas = document.querySelector("#lista-cartas");
const statusCatalogo = document.querySelector("#status-catalogo");
const contagem = document.querySelector("#contagem-resultados");
const paginacao = document.querySelector("#paginacao");

// Modal de detalhes
const tituloModal = document.querySelector("#modal-carta-titulo");
const detalheStatus = document.querySelector("#detalhe-status");
const detalheConteudo = document.querySelector("#detalhe-conteudo");
const botaoAnterior = document.querySelector("#detalhe-anterior");
const botaoProxima = document.querySelector("#detalhe-proxima");
const posicaoCarta = document.querySelector("#detalhe-posicao");

// Dados fixos usados para desenhar as cartas
const ATRIBUTOS = {
  "CHÁ": { chave: "cha", nome: "Chá" },
  TEMPO: { chave: "tempo", nome: "Tempo" },
  TINTA: { chave: "tinta", nome: "Tinta" },
  ESPELHO: { chave: "espelho", nome: "Espelho" },
  FOLHA: { chave: "folha", nome: "Folha" },
  CINZA: { chave: "cinza", nome: "Cinza" },
};

// Cor da moldura de cada categoria (usada pelo CSS através do atributo data-moldura)
const MOLDURAS = {
  "Monstro Normal": "normal",
  "Monstro de Efeito": "efeito",
  Magia: "magia",
  Armadilha: "armadilha",
};


/* ---------- 2. Requisições AJAX ---------- */

// Modo de teste, usado no roteiro do README para demonstrar os estados da interface:
//   index.html?lento -> espera 2 segundos antes de cada requisição (mostra o "Carregando…")
//   index.html?erro  -> a primeira busca da lista e a primeira dos detalhes falham de propósito
const modoLento = location.search.includes("lento");
let falharLista = location.search.includes("erro");
let falharDetalhes = location.search.includes("erro");

// Busca um arquivo JSON no servidor.
// Quando a resposta chega, chama o callback aoReceber(dados);
// se algo der errado, chama o callback aoFalhar(mensagem).
function buscarJSON(url, aoReceber, aoFalhar) {
  const requisicao = new XMLHttpRequest();
  requisicao.open("GET", url);
  requisicao.responseType = "json"; // o navegador já converte o texto JSON em objetos e arrays

  // "load": o servidor respondeu (com sucesso ou com um código de erro, como 404)
  requisicao.addEventListener("load", () => {
    if (requisicao.status !== 200) {
      aoFalhar(`O servidor respondeu com o código ${requisicao.status}. Os dados não foram encontrados.`);
    } else if (requisicao.response === null) {
      aoFalhar("Os dados recebidos estão em um formato inválido."); // o arquivo não é um JSON válido
    } else {
      aoReceber(requisicao.response);
    }
  });

  // "error": não houve resposta (servidor desligado, sem internet...)
  requisicao.addEventListener("error", () => {
    aoFalhar("Não foi possível conectar ao servidor. Verifique sua conexão.");
  });

  if (modoLento) {
    setTimeout(() => requisicao.send(), 2000);
  } else {
    requisicao.send();
  }
}

// Lista resumida de todas as cartas
function buscarCartas(aoReceber, aoFalhar) {
  let url = "data/cartas.json";
  if (falharLista) {
    url = "data/arquivo-inexistente.json"; // provoca um erro 404 de verdade
    falharLista = false;                   // só na primeira vez, para o "Tentar novamente" funcionar
  }
  buscarJSON(url, aoReceber, aoFalhar);
}

// Informações adicionais de UMA carta: uma nova requisição a cada carta aberta
function buscarDetalhes(id, aoReceber, aoFalhar) {
  let url = `data/cartas/${id}.json`;
  if (falharDetalhes) {
    url = "data/arquivo-inexistente.json";
    falharDetalhes = false;
  }
  buscarJSON(url, aoReceber, aoFalhar);
}


/* ---------- 3. Funções auxiliares para montar a tela ---------- */

// Cria um elemento com classe e texto. O texto entra sempre por textContent (seguro).
function criarElemento(tag, classe = "", texto = "") {
  const elemento = document.createElement(tag);
  if (classe !== "") {
    elemento.className = classe;
  }
  if (texto !== "") {
    elemento.textContent = texto;
  }
  return elemento;
}

function ehMonstro(carta) {
  return carta.categoria === "Monstro Normal" || carta.categoria === "Monstro de Efeito";
}

// Liga um botão ao modal de detalhes: o Bootstrap abre o modal (atributos data-bs-*)
// e o nosso callback busca os dados da carta.
function ligarAoModal(botao, id) {
  botao.setAttribute("data-bs-toggle", "modal");
  botao.setAttribute("data-bs-target", "#modal-carta");
  botao.addEventListener("click", () => abrirDetalhes(id));
}

// Ícone do canto da carta: o atributo (monstros) ou o tipo da carta (Magia e Armadilha).
// A imagem de cada ícone é escolhida pelo CSS a partir do atributo data-atributo.
function preencherIcone(icone, carta) {
  if (ehMonstro(carta)) {
    const atributo = ATRIBUTOS[carta.atributo];
    icone.setAttribute("data-atributo", atributo.chave);
    icone.setAttribute("aria-label", `Atributo ${atributo.nome}`);
    icone.setAttribute("title", atributo.nome);
  } else {
    icone.setAttribute("data-atributo", MOLDURAS[carta.categoria]); // "magia" ou "armadilha"
    icone.setAttribute("aria-label", `Carta de ${carta.categoria}`);
    icone.setAttribute("title", carta.categoria);
  }
}

// Estrelas de Nível (monstros) ou o subtipo entre colchetes (Magias e Armadilhas)
function preencherNivel(paragrafo, carta) {
  paragrafo.innerHTML = ""; // limpa o conteúdo anterior
  if (ehMonstro(carta)) {
    const estrelas = criarElemento("span", "estrelas", "★".repeat(carta.nivel)); // repete a estrela "nivel" vezes
    estrelas.setAttribute("aria-hidden", "true");
    paragrafo.append(estrelas, criarElemento("span", "visually-hidden", `Nível ${carta.nivel}`));
  } else {
    paragrafo.append(criarElemento("span", "subtipo-magia", `[${carta.subtipo}]`));
  }
}

// Linha de tipo que aparece dentro da carta: [Monstro Normal], [Carta de Magia]...
function textoDoTipo(carta) {
  return ehMonstro(carta) ? `[${carta.categoria}]` : `[Carta de ${carta.categoria}]`;
}

// Quantos Tributos a Invocação-Normal exige, conforme o Nível do monstro
function descreverTributos(nivel) {
  if (nivel <= 4) {
    return "Sem Tributo";
  }
  if (nivel <= 6) {
    return "1 Tributo";
  }
  return "2 Tributos";
}

// Soma as cópias de uma lista de cartas com reduce
function somarCopias(cartas) {
  return cartas.reduce((soma, carta) => soma + carta.copias, 0);
}


/* ---------- 4. Estados da interface: carregando, vazio e erro ---------- */

function limparStatus(area) {
  area.innerHTML = "";
}

function mostrarCarregando(area, mensagem) {
  const bloco = criarElemento("div", "estado estado--carregando");
  bloco.setAttribute("role", "status");
  const spinner = criarElemento("div", "spinner-border text-desvario");
  spinner.setAttribute("aria-hidden", "true");
  bloco.append(spinner, criarElemento("p", "mb-0", mensagem));

  area.innerHTML = "";
  area.appendChild(bloco);
}

function mostrarVazio(area, mensagem) {
  const bloco = criarElemento("div", "estado estado--vazio");
  bloco.setAttribute("role", "status");
  const botao = criarElemento("button", "btn btn-outline-secondary", "Limpar filtros");
  botao.setAttribute("type", "button");
  botao.addEventListener("click", limparFiltros);
  bloco.append(criarElemento("p", "", mensagem), botao);

  area.innerHTML = "";
  area.appendChild(bloco);
}

// Aviso de erro com o botão "Tentar novamente".
// aoTentarNovamente é um callback: a função que será chamada no clique.
function mostrarErro(area, titulo, mensagem, aoTentarNovamente) {
  const bloco = criarElemento("div", "alert alert-danger estado estado--erro");
  bloco.setAttribute("role", "alert");
  const botao = criarElemento("button", "btn btn-danger", "Tentar novamente");
  botao.setAttribute("type", "button");
  botao.addEventListener("click", aoTentarNovamente);
  bloco.append(criarElemento("p", "fw-bold mb-1", titulo), criarElemento("p", "", mensagem), botao);

  area.innerHTML = "";
  area.appendChild(bloco);
  botao.focus(); // leva o foco (e o leitor de tela) direto para a solução
}


/* ---------- 5. Catálogo: listagem, busca, filtros, ordenação e paginação ---------- */

// Busca a lista de cartas e desenha o catálogo, os decks e as regiões.
// aoConcluir é um callback opcional; a função vazia () => {} é o valor padrão.
function carregarCartas(aoConcluir = () => {}) {
  listaCartas.innerHTML = "";
  paginacao.innerHTML = "";
  contagem.textContent = "";
  mostrarCarregando(statusCatalogo, "Carregando as cartas de Desvario…");
  document.querySelectorAll("[data-deck]").forEach((painel) => {
    mostrarCarregando(painel, "Carregando os decks…");
  });

  buscarCartas(
    (cartas) => {
      estado.cartas = cartas;
      desenharDecks();
      desenharRegioes();
      aplicarFiltros();
      aoConcluir();
    },
    (mensagem) => {
      mostrarErro(statusCatalogo, "Não foi possível carregar o catálogo.", mensagem, () => carregarCartas());
      document.querySelectorAll("[data-deck]").forEach((painel) => {
        painel.textContent = "Os decks aparecem assim que o catálogo for carregado.";
      });
    }
  );
}

// Monta uma carta do catálogo com createElement
function criarCarta(carta) {
  const coluna = criarElemento("div", "col");
  const artigo = criarElemento("article", "card carta h-100");
  artigo.setAttribute("data-moldura", MOLDURAS[carta.categoria]);

  const icone = criarElemento("span", "icone-atributo");
  icone.setAttribute("role", "img");
  preencherIcone(icone, carta);
  const topo = criarElemento("div", "carta__topo");
  topo.append(criarElemento("h3", "card-title carta__nome", carta.titulo), icone);

  const nivel = criarElemento("p", "carta__nivel");
  preencherNivel(nivel, carta);

  const arte = criarElemento("img", "carta__arte");
  arte.src = carta.imagem;
  arte.alt = `Ilustração da carta ${carta.titulo}`;
  arte.width = 640;
  arte.height = 640;
  arte.loading = "lazy";

  const caixa = criarElemento("div", "card-body carta__caixa-texto");
  caixa.append(
    criarElemento("p", "carta__tipo", textoDoTipo(carta)),
    criarElemento("p", "card-text carta__resumo", carta.resumo)
  );

  const botao = criarElemento("button", "btn btn-sm btn-desvario", "Ver detalhes");
  botao.setAttribute("type", "button");
  botao.appendChild(criarElemento("span", "visually-hidden", ` de ${carta.titulo}`));
  ligarAoModal(botao, carta.id);
  const rodape = criarElemento("div", "card-footer carta__rodape");
  rodape.append(criarElemento("span", "carta__codigo", carta.codigo), botao);

  artigo.append(topo, nivel, arte, caixa, rodape);
  coluna.appendChild(artigo);
  return coluna;
}

// Busca e filtros encadeados com filter. Não faz nova requisição:
// trabalha sobre as cartas que já foram carregadas.
function aplicarFiltros() {
  if (estado.cartas.length === 0) {
    return; // a lista ainda não chegou: não há o que filtrar
  }

  const termo = semAcentos(campoBusca.value.trim().toLowerCase());
  const categoria = selectCategoria.value; // "" = todas
  const atributo = selectAtributo.value;
  const deck = selectDeck.value;

  const filtradas = estado.cartas
    .filter((carta) => termo === "" || textoPesquisavel(carta).includes(termo))
    .filter((carta) => categoria === "" || carta.categoria === categoria)
    .filter((carta) => atributo === "" || carta.atributo === atributo)
    .filter((carta) => deck === "" || carta.deck === deck);

  estado.resultado = ordenar(filtradas, selectOrdem.value);
  estado.pagina = 1;
  mostrarPagina();
}

// A busca procura no código, no nome e no resumo da carta
function textoPesquisavel(carta) {
  return semAcentos(`${carta.codigo} ${carta.titulo} ${carta.resumo}`.toLowerCase());
}

// Troca cada letra acentuada pela letra sem acento, para "dragao" encontrar "Dragão"
const SEM_ACENTO = {
  á: "a", à: "a", â: "a", ã: "a", é: "e", ê: "e", í: "i",
  ó: "o", ô: "o", õ: "o", ú: "u", ü: "u", ç: "c",
};

function semAcentos(texto) {
  return [...texto].map((letra) => SEM_ACENTO[letra] || letra).join("");
}

// Ordena uma CÓPIA da lista, porque sort modifica o array original
function ordenar(cartas, criterio) {
  const copia = [...cartas];

  if (criterio === "nivel-desc") {
    // Magias e Armadilhas não têm Nível: contam como 0 e vão para o fim
    return copia.sort((a, b) => (b.nivel || 0) - (a.nivel || 0));
  }
  if (criterio === "nivel-asc") {
    // Aqui contam como 99, para também irem para o fim
    return copia.sort((a, b) => (a.nivel || 99) - (b.nivel || 99));
  }
  return copia.sort((a, b) => a.id - b.id); // padrão: pelo código da carta
}

function limparFiltros() {
  campoBusca.value = "";
  selectOrdem.value = "codigo";
  selectCategoria.value = "";
  selectAtributo.value = "";
  selectDeck.value = "";
  aplicarFiltros();
}

// Desenha só as cartas da página atual (12 por vez), para a lista não ficar infinita
function mostrarPagina() {
  listaCartas.innerHTML = "";

  if (estado.resultado.length === 0) {
    contagem.textContent = "Nenhuma carta encontrada.";
    desenharPaginacao(0);
    mostrarVazio(statusCatalogo, "Nenhuma carta corresponde à busca ou aos filtros escolhidos.");
    return;
  }

  limparStatus(statusCatalogo);

  const totalPaginas = Math.ceil(estado.resultado.length / CARTAS_POR_PAGINA); // arredonda para cima
  const inicio = (estado.pagina - 1) * CARTAS_POR_PAGINA;                      // posição da 1ª carta da página
  const cartasDaPagina = estado.resultado.slice(inicio, inicio + CARTAS_POR_PAGINA); // pega só esse pedaço

  cartasDaPagina.forEach((carta) => listaCartas.appendChild(criarCarta(carta)));

  // Resumo com a quantidade de cartas encontradas
  const total = estado.cartas.length;
  const encontradas = estado.resultado.length;
  const faixa = `${inicio + 1}–${inicio + cartasDaPagina.length}`;
  if (encontradas === total) {
    contagem.textContent = `Exibindo ${faixa} de ${total} cartas.`;
  } else {
    contagem.textContent = `${encontradas} de ${total} cartas encontradas · exibindo ${faixa}.`;
  }

  desenharPaginacao(totalPaginas);
}

// Paginação do Bootstrap montada com createElement
function desenharPaginacao(totalPaginas) {
  paginacao.innerHTML = "";
  paginacao.hidden = totalPaginas <= 1;
  if (totalPaginas <= 1) {
    return;
  }

  const lista = criarElemento("ul", "pagination justify-content-center flex-wrap");
  lista.appendChild(criarBotaoPagina("‹", estado.pagina - 1, "Página anterior", estado.pagina === 1, false));
  for (let numero = 1; numero <= totalPaginas; numero++) {
    lista.appendChild(criarBotaoPagina(String(numero), numero, `Página ${numero}`, false, numero === estado.pagina));
  }
  lista.appendChild(criarBotaoPagina("›", estado.pagina + 1, "Próxima página", estado.pagina === totalPaginas, false));
  paginacao.appendChild(lista);
}

function criarBotaoPagina(rotulo, pagina, descricao, desabilitado, atual) {
  const item = criarElemento("li", "page-item");
  const botao = criarElemento("button", "page-link", rotulo);
  botao.setAttribute("type", "button");
  botao.setAttribute("aria-label", descricao);

  if (desabilitado) {
    item.classList.add("disabled");
    botao.disabled = true;
  }
  if (atual) {
    item.classList.add("active");
    botao.setAttribute("aria-current", "page");
  }

  botao.addEventListener("click", () => irParaPagina(pagina));
  item.appendChild(botao);
  return item;
}

function irParaPagina(numero) {
  estado.pagina = numero;
  mostrarPagina();
  contagem.scrollIntoView(); // leva a tela de volta ao começo da lista
}


/* ---------- 6. Detalhes da carta (modal) ---------- */

// Lista usada pelos botões "Anterior" e "Próxima": o resultado atual do catálogo,
// se a carta estiver nele; senão, todas as cartas.
function listaParaNavegar(id) {
  const estaNoResultado = estado.resultado.some((carta) => carta.id === id);
  return estaNoResultado ? estado.resultado : estado.cartas;
}

function abrirDetalhes(id) {
  const lista = listaParaNavegar(id);
  const carta = lista.find((item) => item.id === id);

  // As cartas do topo da página podem ser clicadas antes de a lista chegar (ou depois de ela falhar)
  if (carta === undefined) {
    tituloModal.textContent = "Detalhes da carta";
    detalheConteudo.hidden = true;
    estado.listaDoModal = [];
    estado.posicaoNoModal = 0;
    atualizarNavegacao();
    mostrarErro(detalheStatus, "As cartas ainda não foram carregadas.",
      "Aguarde um instante e clique em “Tentar novamente”.", () => {
        if (estado.cartas.length > 0) {
          abrirDetalhes(id);                        // a lista já chegou
        } else {
          carregarCartas(() => abrirDetalhes(id));  // carrega a lista e depois abre a carta
        }
      });
    return;
  }

  estado.cartaAberta = id;
  estado.listaDoModal = lista;
  estado.posicaoNoModal = lista.indexOf(carta); // posição da carta dentro da lista
  atualizarNavegacao();

  tituloModal.textContent = carta.titulo;
  detalheConteudo.hidden = true;
  mostrarCarregando(detalheStatus, "Consultando os detalhes da carta…");

  // Nova requisição AJAX: data/cartas/{id}.json
  buscarDetalhes(
    id,
    (detalhe) => {
      if (estado.cartaAberta !== id) {
        return; // o usuário já trocou de carta: esta resposta chegou atrasada
      }
      preencherDetalhes(carta, detalhe);
      limparStatus(detalheStatus);
      detalheConteudo.hidden = false;
    },
    (mensagem) => {
      if (estado.cartaAberta !== id) {
        return;
      }
      mostrarErro(detalheStatus, "Não foi possível carregar os detalhes desta carta.", mensagem, () => abrirDetalhes(id));
    }
  );
}

// Junta os dados da lista (carta) com os dados que vieram da nova requisição (detalhe)
function preencherDetalhes(carta, detalhe) {
  const monstro = ehMonstro(carta);

  // Carta grande, no estilo de uma carta física
  document.querySelector("#detalhe-carta").setAttribute("data-moldura", MOLDURAS[carta.categoria]);
  document.querySelector("#detalhe-nome").textContent = carta.titulo;
  preencherIcone(document.querySelector("#detalhe-atributo"), carta);
  preencherNivel(document.querySelector("#detalhe-nivel"), carta);

  const arte = document.querySelector("#detalhe-arte");
  arte.src = carta.imagem;
  arte.alt = `Ilustração da carta ${carta.titulo}`;

  const tipo = document.querySelector("#detalhe-tipo");
  const stats = document.querySelector("#detalhe-stats");
  if (monstro) {
    const complemento = carta.categoria === "Monstro Normal" ? "" : ` / ${carta.subtipo}`;
    tipo.textContent = `[${detalhe.tipoMonstro}${complemento}]`;
    stats.textContent = `ATK/${detalhe.atk}  DEF/${detalhe.def}`;
  } else {
    tipo.textContent = `[${carta.subtipo}]`;
    stats.textContent = "";
  }
  stats.hidden = !monstro;

  // Monstro Normal mostra o texto de história na carta; as demais mostram o efeito
  const texto = document.querySelector("#detalhe-texto");
  if (detalhe.efeito) {
    texto.textContent = detalhe.efeito;
    texto.classList.remove("fst-italic");
  } else {
    texto.textContent = detalhe.historia;
    texto.classList.add("fst-italic");
  }

  // Ficha ao lado da carta
  document.querySelector("#detalhe-codigo").textContent = carta.codigo;
  document.querySelector("#detalhe-categoria").textContent = carta.categoria;
  document.querySelector("#detalhe-subtipo").textContent = monstro
    ? `${detalhe.tipoMonstro} · ${ATRIBUTOS[carta.atributo].nome}`
    : carta.subtipo;
  document.querySelector("#linha-invocacao").hidden = !monstro;
  document.querySelector("#detalhe-invocacao").textContent = monstro
    ? `Nível ${carta.nivel} · ${descreverTributos(carta.nivel)}`
    : "";
  document.querySelector("#detalhe-regiao").textContent = detalhe.regiao;
  document.querySelector("#detalhe-deck").textContent = `${carta.deck} (${carta.copias}×)`;

  document.querySelector("#bloco-efeito").hidden = !detalhe.efeito;
  document.querySelector("#detalhe-efeito").textContent = detalhe.efeito || "";
  document.querySelector("#bloco-historia").hidden = !detalhe.historia;
  document.querySelector("#detalhe-historia").textContent = detalhe.historia || "";

  document.querySelector("#detalhe-descricao-arte").textContent = detalhe.descricaoArte;
  document.querySelector("#detalhe-credito").textContent = detalhe.creditoArte;
}

// Liga/desliga os botões "Anterior" e "Próxima" e mostra "3 de 33"
function atualizarNavegacao() {
  const total = estado.listaDoModal.length;
  const posicao = estado.posicaoNoModal;
  botaoAnterior.disabled = posicao <= 0;
  botaoProxima.disabled = posicao >= total - 1;
  posicaoCarta.textContent = total > 0 ? `${posicao + 1} de ${total}` : "";
}

// passo = -1 (anterior) ou +1 (próxima). Cada troca faz uma nova requisição de detalhes.
function navegar(passo) {
  const vizinha = estado.listaDoModal[estado.posicaoNoModal + passo];
  if (vizinha !== undefined) {
    abrirDetalhes(vizinha.id);
  }
}


/* ---------- 7. Decks e regiões ---------- */

// Cada deck vira uma "mesa" com as cartas empilhadas conforme o número de cópias
function desenharDecks() {
  document.querySelectorAll("[data-deck]").forEach((painel) => {
    const nomeDoDeck = painel.getAttribute("data-deck");
    const cartasDoDeck = estado.cartas.filter((carta) => carta.deck === nomeDoDeck);

    const monstros = cartasDoDeck.filter((carta) => ehMonstro(carta));
    const magias = cartasDoDeck.filter((carta) => carta.categoria === "Magia");
    const armadilhas = cartasDoDeck.filter((carta) => carta.categoria === "Armadilha");

    const resumo = criarElemento("p", "resumo-deck",
      `Total: ${somarCopias(cartasDoDeck)} cartas (${somarCopias(monstros)} monstros · ` +
      `${somarCopias(magias)} magias · ${somarCopias(armadilhas)} armadilhas) · ` +
      `${cartasDoDeck.length} cartas diferentes`);

    const mesa = criarElemento("ul", "row row-cols-3 row-cols-sm-4 row-cols-md-6 g-3 list-unstyled mesa-deck");
    mesa.setAttribute("aria-label", `Cartas do deck ${nomeDoDeck}`);
    cartasDoDeck.forEach((carta) => mesa.appendChild(criarMiniCarta(carta)));

    painel.innerHTML = "";
    painel.append(resumo, mesa);
  });
}

function criarMiniCarta(carta) {
  const item = criarElemento("li", "col");
  const botao = criarElemento("button", "mini-carta");
  botao.setAttribute("type", "button");
  botao.setAttribute("data-moldura", MOLDURAS[carta.categoria]);
  botao.setAttribute("data-copias", carta.copias);
  ligarAoModal(botao, carta.id);

  // O nome acessível do botão é o próprio texto visível: nome da carta + quantidade de cópias
  const nome = criarElemento("span", "mini-carta__nome", carta.titulo);

  const arte = criarElemento("img", "mini-carta__arte");
  arte.src = carta.imagem;
  arte.alt = ""; // decorativa: o nome da carta já está escrito no botão
  arte.width = 640;
  arte.height = 640;
  arte.loading = "lazy";

  const copias = criarElemento("span", "badge rounded-pill mini-carta__copias", `${carta.copias}×`);
  copias.appendChild(criarElemento("span", "visually-hidden", carta.copias === 1 ? " cópia no deck" : " cópias no deck"));

  botao.append(nome, arte, copias);
  item.appendChild(botao);
  return item;
}

// Em cada região, mostra as cartas cujo campo "regiao" é igual ao nome dela
function desenharRegioes() {
  document.querySelectorAll("[data-regiao]").forEach((area) => {
    const nomeDaRegiao = area.getAttribute("data-regiao");
    const cartasDaRegiao = estado.cartas.filter((carta) => carta.regiao === nomeDaRegiao);

    const lista = criarElemento("ul", "lista-cartas-regiao");
    cartasDaRegiao.forEach((carta) => lista.appendChild(criarCartaDaRegiao(carta)));

    area.innerHTML = "";
    area.append(criarElemento("h5", "h6 titulo-ficha", `Cartas referentes a esta região (${cartasDaRegiao.length})`), lista);
    area.hidden = cartasDaRegiao.length === 0;
  });
}

function criarCartaDaRegiao(carta) {
  const item = criarElemento("li");
  const botao = criarElemento("button", "carta-regiao");
  botao.setAttribute("type", "button");
  botao.setAttribute("data-moldura", MOLDURAS[carta.categoria]);
  ligarAoModal(botao, carta.id);

  const arte = criarElemento("img", "carta-regiao__arte");
  arte.src = carta.imagem;
  arte.alt = ""; // decorativa: o nome da carta está escrito ao lado
  arte.width = 640;
  arte.height = 640;
  arte.loading = "lazy";

  botao.append(arte, criarElemento("span", "carta-regiao__nome", carta.titulo));
  item.appendChild(botao);
  return item;
}


/* ---------- 8. Eventos ---------- */

// Busca a cada tecla e filtros a cada mudança
campoBusca.addEventListener("input", aplicarFiltros);
selectOrdem.addEventListener("change", aplicarFiltros);
selectCategoria.addEventListener("change", aplicarFiltros);
selectAtributo.addEventListener("change", aplicarFiltros);
selectDeck.addEventListener("change", aplicarFiltros);
botaoLimpar.addEventListener("click", limparFiltros);

// Enter no campo de busca não recarrega a página
formFiltros.addEventListener("submit", (evento) => {
  evento.preventDefault();
  aplicarFiltros();
});

// Botões "Anterior" e "Próxima" do modal
botaoAnterior.addEventListener("click", () => navegar(-1));
botaoProxima.addEventListener("click", () => navegar(1));

// Cartas em destaque no topo: estão escritas no HTML, e o id vem do atributo data-carta-id
document.querySelectorAll(".leque__carta").forEach((botao) => {
  const id = Number(botao.getAttribute("data-carta-id"));
  botao.addEventListener("click", () => abrirDetalhes(id));
});

// Menu do celular: fecha ao escolher um link ou ao apertar Esc
const menu = document.querySelector("#menu-principal");
const botaoMenu = document.querySelector(".navbar-toggler");

function fecharMenu() {
  menu.classList.remove("show");
  botaoMenu.classList.add("collapsed");
  botaoMenu.setAttribute("aria-expanded", "false");
}

document.querySelectorAll("#menu-principal .nav-link").forEach((link) => {
  link.addEventListener("click", fecharMenu);
});

document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape" && menu.classList.contains("show")) {
    fecharMenu();
    botaoMenu.focus(); // devolve o foco ao botão do menu
  }
});


/* ---------- 9. Início ---------- */

carregarCartas();
