# Desvario: O Reino do Avesso: cartas e artes (Entrega 1)

Documento de referência do jogo. As regras são **inspiradas no Yu-Gi-Oh! clássico**, com Monstros (Normais e de Efeito), Magias e Armadilhas.

---

## 1. Regras (resumo que vai no accordion do site)

**Objetivo:** reduzir os **Pontos de Lucidez (PL)** do oponente de 8000 para 0. Também vence quem fizer o oponente precisar comprar uma carta com o deck vazio.

**Deck:** de 40 a 60 cartas, com no máximo 3 cópias de cada. A mão inicial tem 5 cartas.

**Fases do turno:**
1. **Compra:** compre 1 carta, inclusive no primeiro turno do duelo.
2. **Espera:** fase de manutenção, usada por alguns efeitos.
3. **Principal 1:** invocar monstros, ativar Magias e baixar cartas.
4. **Batalha:** seus monstros em Posição de Ataque podem atacar uma vez cada. Ninguém ataca no primeiro turno do duelo.
5. **Principal 2:** mesmas ações da Principal 1.
6. **Final:** se tiver mais de 6 cartas na mão, descarte o excesso.

**Invocação:**
- Você pode fazer **1 Invocação-Normal ou Baixar 1 monstro** por turno.
- Monstros de Nível **1 a 4** não pedem Tributo.
- Monstros de Nível **5 ou 6** pedem **1 Tributo**. Você envia 1 monstro seu do campo para o Cemitério.
- Monstros de Nível **7 ou mais** pedem **2 Tributos**.
- **Baixar** significa colocar o monstro com a face para baixo, em Posição de Defesa.
- **Mudar de posição:** 1 vez por turno para cada monstro. Não pode ser no turno em que ele foi invocado.
- **Invocação-Flip:** virar um monstro que está com a face para baixo, deixando-o em Posição de Ataque. Isso ativa os efeitos **FLIP**.

**Batalha:**
- **ATK contra ATK:** o monstro mais fraco é destruído e seu dono perde a diferença em PL. Em caso de empate, os dois são destruídos.
- **ATK contra DEF:** se o ATK for maior, o defensor é destruído, sem dano. Se for menor, o atacante não é destruído, mas o dono dele perde a diferença.
- **Ataque direto:** acontece quando o oponente não tem monstros. Ele perde PL igual ao ATK do atacante.

**Campo:** 5 zonas de Monstro, 5 zonas de Magia/Armadilha, 1 zona de Campo, além de Deck e Cemitério.

**Magias** (podem ser ativadas no seu turno):
- **Normal:** usa e vai para o Cemitério.
- **Contínua:** fica no campo.
- **Equipamento:** fica presa a um monstro.
- **Campo:** muda o terreno.

**Armadilhas:**
- Precisam ser **baixadas** primeiro e só podem ser ativadas **a partir do turno seguinte**, inclusive no turno do oponente.
- Tipos: **Normal**, **Contínua** e **Resposta**. A Resposta anula outras cartas.

### Atributos (os "elementos" de Desvario)
| Atributo | Símbolo | Cor | Tema |
|---|---|---|---|
| CHÁ | xícara | âmbar `#C8782A` | calor, conforto, adivinhação |
| TEMPO | ampulheta | bronze `#B08D57` | relógios, atrasos, horas tortas |
| TINTA | gota | roxo `#6B3FA0` | sonhos, cores, imaginação |
| ESPELHO | losango refletido | prata-azulado `#7FB7C9` | reflexos, inversões, ilusão |
| FOLHA | folha | verde `#4E8F4A` | jardins, plantas, xadrez vivo |
| CINZA | esquadro | cinza `#7A7A7A` | a Ordem Cinzenta, regras, carimbos |

Eu faço os ícones dos atributos em **SVG**, aproveitando o conteúdo da Aula 05.

### Tipos de monstro
Sonhador · Fera · Utensílio · Brinquedo · Planta · Burocrata

---

## 2. Lista de cartas

Legenda: ★ = **prioridade** (as 12 cartas da primeira entrega). As demais são extras, para quando der tempo.
Formato do código: `DSV-000`.

### Monstros Normais (a moldura amarela só tem texto de história, sem efeito)

**DSV-001 · Sr. Pontual, o Caracol Cronista**
- Nível 2 · TEMPO · Fera · ATK 700 / DEF 1200
- *"Carrega nas costas um relógio que nunca acertou a hora. Ainda assim, chega sempre no momento exato em que ninguém o esperava."*
- 🎨 **Arte:** um caracol gordinho e simpático, de monóculo e cachecol, que carrega um relógio de bolso de latão enorme no lugar da concha. Os ponteiros andam ao contrário. Fundo: uma trilha de musgo com números romanos caídos pelo chão.

**DSV-002 · Capitão Botão** ★
- Nível 4 · TINTA · Brinquedo · ATK 1700 / DEF 1300
- *"Costurado com botões de mil casacos esquecidos. Jurou proteger Desvario até que a última linha se solte."*
- 🎨 **Arte:** um soldado de brinquedo feito inteiramente de botões coloridos e costurados com linha vermelha. Usa uma agulha de costura como espada e um dedal como capacete. Pose heroica sobre um carretel.

**DSV-003 · Margarida Fofoqueira**
- Nível 3 · FOLHA · Planta · ATK 1200 / DEF 1000
- *"Sabe todos os segredos do jardim e conta todos eles, principalmente os que ainda não aconteceram."*
- 🎨 **Arte:** uma margarida gigante com rosto expressivo e fofoqueiro, cochichando com a mão-folha na frente da boca. Outras flores menores escutam, curiosas. Jardim com canteiros em formato de tabuleiro.

**DSV-004 · Dragão Ponteiro** ★
- Nível 7 · TEMPO · Fera · ATK 2500 / DEF 2000
- *"Dizem que seu rugido atrasa o dia inteiro em uma hora. Os relojoeiros de Desvario o temem e o adoram."*
- 🎨 **Arte:** um dragão imponente feito de bronze e engrenagens, com um mostrador de relógio no peito e asas formadas por ponteiros de relógio. Pequenas ampulhetas pendem dos chifres. Céu crepuscular com vários sóis em horários diferentes.

**DSV-005 · Régua Sentinela**
- Nível 4 · CINZA · Burocrata · ATK 1800 / DEF 1000
- *"Mede tudo, aprova nada. Onde passa, as curvas viram linhas retas."*
- 🎨 **Arte:** um soldado alto e magro, com o corpo feito de uma régua de madeira graduada. Os olhos são dois furos de fichário e a lança é um lápis apontado. **Tudo em tons de cinza**, com uma paisagem colorida sendo "endireitada" atrás dele.

### Monstros de Efeito (moldura laranja)

**DSV-006 · O Sonhador de Tinta** ★ (protagonista)
- Nível 4 · TINTA · Sonhador · ATK 1600 / DEF 1400
- **Efeito:** se esta carta destruir um monstro do oponente em batalha, você ganha 500 PL.
- *"Caiu numa poça de tinta e acordou do outro lado. Cada passo que dá devolve uma cor ao mundo."*
- 🎨 **Arte:** um jovem aventureiro de capa longa e surrada, com as mãos e a ponta da capa manchadas de tinta roxa e turquesa que escorre e pinta o chão cinza por onde pisa. Segura um pincel como se fosse uma varinha. Fundo: metade colorido, metade cinzento.

**DSV-007 · Madame Bule, a Vidente** ★
- Nível 3 · CHÁ · Utensílio · ATK 1000 / DEF 1600
- **Efeito:** quando esta carta for Invocada por Invocação-Normal, olhe as 3 cartas do topo do seu Deck e coloque-as de volta na ordem que quiser.
- *"O chá sabe antes de você. Ela só traduz."*
- 🎨 **Arte:** uma chaleira de porcelana antiga com rosto de senhora mística, de xale estampado e brincos de colher. O vapor sai pelo bico e forma cartas e símbolos no ar. Mesa com toalha de renda e uma bola de cristal feita de açúcar.

**DSV-008 · Coruja Invertida** ★
- Nível 4 · ESPELHO · Fera · ATK 1400 / DEF 1800
- **Efeito:** uma vez por turno, você pode escolher 1 monstro com a face para cima no campo. Até o fim deste turno, troque o ATK e a DEF originais dele.
- *".oãhc o êv amic arp ahlo meuQ"* (ao contrário: "Quem olha pra cima vê o chão.")
- 🎨 **Arte:** uma coruja pendurada de cabeça para baixo num galho, mas com o reflexo no lago abaixo em pé e olhando para o espectador. Olhos enormes que parecem espelhos. Penas prateadas e azuladas, com estrelas refletidas.

**DSV-009 · Xícara Saltitante**
- Nível 1 · CHÁ · Utensílio · ATK 300 / DEF 300
- **Efeito:** se esta carta for destruída em batalha e enviada ao Cemitério, compre 1 carta.
- *"Pula de pires em pires. Quando cai, sempre derrama algo útil."*
- 🎨 **Arte:** uma xícara pequena e alegre, com perninhas finas, pulando entre pires flutuantes. Gotas de chá dourado espirram e formam uma trilha. Fundo cor de creme com padrão de papel de parede antigo.

**DSV-010 · Torre Andarilha do Xadrez Vivo**
- Nível 5 · FOLHA · Brinquedo · ATK 2000 / DEF 2200
- **Efeito:** você pode Invocar esta carta por Invocação-Normal sem Tributo. Se fizer isso, o ATK original dela se torna 1000.
- *"Nunca anda em linha reta, o que deixa as outras peças do tabuleiro furiosas."*
- 🎨 **Arte:** uma torre de xadrez gigante de pedra coberta de hera e flores, andando com pernas de raízes por um jardim quadriculado. Pequenos peões-cogumelo fogem do caminho.

**DSV-011 · A Fiandeira de Sombras** ★
- Nível 6 · ESPELHO · Sonhador · ATK 2300 / DEF 1800
- **Efeito:** quando esta carta for Invocada por Invocação-Tributo, escolha 1 Magia ou Armadilha no campo e destrua-a.
- *"Tece caminhos que só existem enquanto ninguém olha para eles."*
- 🎨 **Arte:** uma figura esguia e elegante, com vários braços finos, tecendo fios prateados que viram pontes e escadas no ar. O rosto fica parcialmente escondido por um véu espelhado. Fundo noturno azul-escuro com constelações costuradas.

**DSV-012 · Carimbador Cinzento** ★
- Nível 3 · CINZA · Burocrata · ATK 1300 / DEF 900
- **Efeito:** FLIP: escolha 1 monstro que o oponente controla e destrua-o.
- *"INDEFERIDO. INDEFERIDO. INDEFERIDO."*
- 🎨 **Arte:** um homenzinho atarracado de terno cinza, com um carimbo gigante no lugar da cabeça. Carimba uma flor colorida, que vira cinza no mesmo instante. Pilhas de papéis ao redor. **Paleta toda em cinza**, exceto a flor.

**DSV-013 · O Arquiteto Cinzento** ★ (chefe final)
- Nível 8 · CINZA · Burocrata · ATK 3000 / DEF 2500
- **Efeito:** enquanto esta carta estiver com a face para cima no campo, todos os monstros que o oponente controla perdem 500 de ATK.
- *"Um mundo sem absurdo é um mundo sem erros. E um mundo sem erros é perfeito."*
- 🎨 **Arte:** uma figura altíssima e rígida, de sobretudo cinza impecável e cartola retangular, com o rosto liso e sem traços. Segura um esquadro e um compasso gigantes. Atrás dele, a cidade colorida de Desvario vira uma planta arquitetônica em linhas cinzentas. Só os olhos brilham, brancos.

### Magias (moldura verde)

**DSV-014 · Poça de Tinta** ★
- Magia Normal
- **Efeito:** adicione 1 monstro de Nível 4 ou menor do seu Deck à sua mão.
- 🎨 **Arte:** uma poça de tinta roxa e turquesa no chão de uma rua comum do nosso mundo. Nela se reflete um céu impossível, com luas e bules flutuando. Uma mão está entrando na poça.

**DSV-015 · Bosque das Horas Tortas** ★
- Magia de Campo
- **Efeito:** todos os monstros TEMPO e FOLHA no campo ganham 300 de ATK e DEF.
- 🎨 **Arte:** uma floresta de árvores retorcidas cujos troncos são relógios de pêndulo. Os galhos terminam em ponteiros e as folhas caem no formato de números. Uma luz dourada de fim de tarde atravessa tudo. Não aparece nenhum personagem.

**DSV-016 · Chá Escaldante**
- Magia Normal
- **Efeito:** cause 800 de dano ao oponente.
- 🎨 **Arte:** um bule inclinado derramando um jato de chá fervente em espiral, soltando muito vapor. Soldados-régua cinzentos fogem ao fundo.

**DSV-017 · Guarda-Chuva de Estrelas**
- Magia de Equipamento
- **Efeito:** o monstro equipado ganha 600 de ATK.
- 🎨 **Arte:** um guarda-chuva aberto, virado para cima, recolhendo estrelas que caem do céu noturno. O cabo é uma bengala dourada em espiral.

### Armadilhas (moldura rosa/magenta)

**DSV-018 · A Porta Que Não Estava Lá** ★
- Armadilha Normal
- **Efeito:** quando um monstro do oponente declarar um ataque, anule o ataque e encerre a Fase de Batalha.
- 🎨 **Arte:** uma porta de madeira ornamentada, entreaberta e flutuando no meio do nada, sem parede em volta. Uma luz colorida sai pela fresta. Um soldado-régua cinzento dá de cara com ela no meio do ataque.

**DSV-019 · Espelho do Avesso** ★
- Armadilha Normal
- **Efeito:** quando um monstro do oponente declarar um ataque, destrua o monstro atacante.
- 🎨 **Arte:** um espelho alto, de moldura rococó, cujo reflexo mostra o atacante de cabeça para baixo e se desfazendo em cacos. Rachaduras finas brilham em azul-prateado.

**DSV-020 · Carimbo de Indeferido**
- Armadilha de Resposta
- **Efeito:** pague 1000 PL. Anule a ativação de uma carta de Magia e destrua-a.
- 🎨 **Arte:** um carimbo gigante descendo sobre uma carta mágica brilhante e deixando a marca "INDEFERIDO" em vermelho, a única cor da cena. O resto é todo cinza.

---

### Novas cartas: Ordem Cinzenta (DSV-021 a DSV-033)

Todas são de atributo **CINZA**, tipo **Burocrata**, com arte em **paleta cinzenta** e linhas retas. Alguma cor aparece só quando a carta está "apagando" algo colorido.

**DSV-021 · Esquadro Guardião** (Monstro Normal)
- Nível 4 · CINZA · Burocrata · ATK 1200 / DEF 2000
- *"Noventa graus. Nem um a mais, nem um a menos. Nenhum sonho passa por ele sem estar no ângulo correto."*
- 🎨 **Arte:** um guarda robusto com o corpo em forma de esquadro de metal, escudo retangular e pés quadrados cravados no chão. Fica diante de um portão cinza, bloqueando a passagem.

**DSV-022 · Clipe Espião** (Efeito)
- Nível 1 · CINZA · Burocrata · ATK 200 / DEF 300
- **Efeito:** FLIP: olhe a mão do oponente.
- *"Prende-se a qualquer documento, e a qualquer segredo."*
- 🎨 **Arte:** um clipe de papel retorcido em forma de bichinho, com óculos escuros minúsculos, espiando de trás de uma pilha de pastas. Uma lupa na mão.

**DSV-023 · Secretária de Mil Gavetas** (Efeito)
- Nível 4 · CINZA · Burocrata · ATK 1500 / DEF 1500
- **Efeito:** uma vez por turno, você pode descartar 1 carta para comprar 1 carta.
- *"Tudo está arquivado. Achar é que é o problema."*
- 🎨 **Arte:** uma senhora alta e séria cujo corpo é um arquivo de aço com dezenas de gavetas, algumas abertas, cheias de fichas. Coque apertado com lápis espetados e óculos de meia-lua.

**DSV-024 · Apontador Voraz** (Efeito)
- Nível 3 · CINZA · Burocrata · ATK 1400 / DEF 800
- **Efeito:** se esta carta destruir um monstro do oponente em batalha, o oponente descarta 1 carta aleatória da mão.
- *"Aponta tudo até sobrar só a ponta, e depois nem ela."*
- 🎨 **Arte:** um apontador de metal com boca cheia de dentes de lâmina, mastigando um lápis de cor (o único ponto colorido da imagem). Aparas de lápis voam ao redor.

**DSV-025 · Compasso Perfurador** (Efeito)
- Nível 4 · CINZA · Burocrata · ATK 1600 / DEF 1200
- **Efeito:** se esta carta atacar um monstro em Posição de Defesa cujo DEF seja menor que o ATK desta carta, cause ao oponente dano igual à diferença.
- *"Desenha círculos perfeitos. Principalmente em volta dos alvos."*
- 🎨 **Arte:** um guerreiro esguio em forma de compasso, com uma perna em ponta afiada cravada no chão e a outra traçando um círculo perfeito ao redor de uma flor colorida assustada.

**DSV-026 · Borracha Apagadora** (Efeito)
- Nível 5 · CINZA · Burocrata · ATK 2100 / DEF 1600
- **Efeito:** quando esta carta for Invocada por Invocação-Tributo, escolha 1 monstro com a face para cima que o oponente controla e que tenha 1500 ou menos de ATK, e destrua-o.
- *"Onde ela passa, nem o rascunho sobrevive."*
- 🎨 **Arte:** uma criatura massiva feita de borracha escolar, metade branca e metade cinza, rolando sobre uma paisagem colorida e deixando atrás de si um rastro branco e vazio, com farelos de borracha.

**DSV-027 · Grampeador Colossal** (Monstro Normal)
- Nível 7 · CINZA · Burocrata · ATK 2600 / DEF 1800
- *"Prende o céu ao chão para que nada mais flutue sem autorização."*
- 🎨 **Arte:** um grampeador de metal do tamanho de um prédio, com a boca aberta como uma mandíbula, grampeando nuvens coloridas ao chão. Pequenos soldados-régua o acompanham.

**DSV-028 · Formulário em Três Vias** (Magia Normal)
- **Efeito:** compre 2 cartas e depois descarte 1 carta.
- 🎨 **Arte:** três folhas de formulário idênticas, sobrepostas e flutuando, cheias de campos e caixinhas, com um carimbo pairando sobre elas. Ao fundo, uma fila infinita de pessoas cinzentas.

**DSV-029 · Cidadela Cinzenta** (Magia de Campo)
- **Efeito:** todos os monstros CINZA no campo ganham 300 de ATK e DEF. Todos os monstros que não são CINZA perdem 200 de ATK.
- 🎨 **Arte:** uma cidade monumental de prédios idênticos, retos e cinzentos, organizados numa grade perfeita sob um céu sem nuvens, com uma torre-régua altíssima no centro. Nenhuma cor. Não aparece nenhum personagem.

**DSV-030 · Linha Reta** (Magia de Equipamento)
- **Efeito:** só pode ser equipada em um monstro CINZA. O monstro equipado ganha 700 de ATK.
- 🎨 **Arte:** uma linha reta perfeita, traçada em grafite, cortando a imagem de ponta a ponta e "endireitando" um rio sinuoso, uma árvore torta e um arco-íris no caminho.

**DSV-031 · Decreto do Recolher** (Magia Contínua)
- **Efeito:** uma vez por turno, você pode escolher 1 monstro com a face para cima que o oponente controla e mudar a posição de batalha dele.
- 🎨 **Arte:** um pergaminho oficial pregado num muro cinza, com letras rígidas e um selo de cera. Sombras de criaturas coloridas se encolhem e se escondem.

**DSV-032 · Fila de Espera** (Armadilha Contínua)
- **Efeito:** os monstros invocados pelo oponente não podem declarar ataque no turno em que foram invocados.
- 🎨 **Arte:** uma fila de criaturas coloridas de Desvario, entediadas e desanimadas, esperando diante de um guichê fechado com a placa "VOLTE AMANHÃ". Um relógio de parede parado.

**DSV-033 · Auditoria Surpresa** (Armadilha Normal)
- **Efeito:** quando o oponente Invocar por Invocação-Normal um monstro com 1500 ou mais de ATK, destrua esse monstro.
- 🎨 **Arte:** um alçapão se abrindo no chão sob um monstro colorido, com três auditores cinzentos de prancheta surgindo de baixo, anotando tudo.

---

## 3. Decks iniciais (40 cartas cada)

Regra: no máximo **3 cópias** de cada carta. Por isso cada deck precisa de pelo menos **14 cartas diferentes** (13 × 3 = 39).

### Deck A: Sonhadores de Desvario (16 cartas diferentes)
| Carta | Tipo | Cópias |
|---|---|---|
| DSV-001 Sr. Pontual, o Caracol Cronista | Normal ★2 | 2 |
| DSV-002 Capitão Botão | Normal ★4 | 3 |
| DSV-003 Margarida Fofoqueira | Normal ★3 | 2 |
| DSV-004 Dragão Ponteiro | Normal ★7 | 2 |
| DSV-006 O Sonhador de Tinta | Efeito ★4 | 3 |
| DSV-007 Madame Bule, a Vidente | Efeito ★3 | 3 |
| DSV-008 Coruja Invertida | Efeito ★4 | 3 |
| DSV-009 Xícara Saltitante | Efeito ★1 | 2 |
| DSV-010 Torre Andarilha do Xadrez Vivo | Efeito ★5 | 2 |
| DSV-011 A Fiandeira de Sombras | Efeito ★6 | 2 |
| **Monstros** | | **24** |
| DSV-014 Poça de Tinta | Magia Normal | 3 |
| DSV-015 Bosque das Horas Tortas | Magia de Campo | 2 |
| DSV-016 Chá Escaldante | Magia Normal | 3 |
| DSV-017 Guarda-Chuva de Estrelas | Magia de Equipamento | 2 |
| **Magias** | | **10** |
| DSV-018 A Porta Que Não Estava Lá | Armadilha Normal | 3 |
| DSV-019 Espelho do Avesso | Armadilha Normal | 3 |
| **Armadilhas** | | **6** |
| **TOTAL** | | **40** |

### Deck B: Ordem Cinzenta (17 cartas diferentes)
| Carta | Tipo | Cópias |
|---|---|---|
| DSV-005 Régua Sentinela | Normal ★4 | 3 |
| DSV-021 Esquadro Guardião | Normal ★4 | 3 |
| DSV-027 Grampeador Colossal | Normal ★7 | 2 |
| DSV-012 Carimbador Cinzento | Efeito ★3 | 2 |
| DSV-013 O Arquiteto Cinzento | Efeito ★8 | 2 |
| DSV-022 Clipe Espião | Efeito ★1 | 2 |
| DSV-023 Secretária de Mil Gavetas | Efeito ★4 | 3 |
| DSV-024 Apontador Voraz | Efeito ★3 | 2 |
| DSV-025 Compasso Perfurador | Efeito ★4 | 3 |
| DSV-026 Borracha Apagadora | Efeito ★5 | 2 |
| **Monstros** | | **24** |
| DSV-028 Formulário em Três Vias | Magia Normal | 3 |
| DSV-029 Cidadela Cinzenta | Magia de Campo | 2 |
| DSV-030 Linha Reta | Magia de Equipamento | 2 |
| DSV-031 Decreto do Recolher | Magia Contínua | 2 |
| **Magias** | | **9** |
| DSV-020 Carimbo de Indeferido | Armadilha de Resposta | 2 |
| DSV-032 Fila de Espera | Armadilha Contínua | 2 |
| DSV-033 Auditoria Surpresa | Armadilha Normal | 3 |
| **Armadilhas** | | **7** |
| **TOTAL** | | **40** |

As duas listas seguem a proporção clássica do Yu-Gi-Oh: cerca de 24 monstros, 9 a 10 magias e 6 a 7 armadilhas. Cada deck tem monstros de Nível 5+ para usar Invocação-Tributo.

---

## 4. Artes: checklist de produção

### Especificação para TODAS as ilustrações de carta
- **Formato:** quadrado **1:1**, igual à área da arte numa carta de Yu-Gi-Oh. **Mínimo de 600×600 px**.
- **Arquivo:** `.webp` ou `.jpg`, com **menos de 200 KB** cada (para o site carregar rápido).
- **Nome do arquivo:** `dsv-006-sonhador-de-tinta.webp` (código + nome, minúsculo, sem acento).
- **Estilo único para todas as cartas:** *ilustração de livro de contos vitoriano em aquarela e nanquim, cores saturadas e levemente surreais.*
- **Regra visual do jogo:** cartas **CINZA** (Ordem Cinzenta) usam paleta **dessaturada, cinza e com linhas retas**. As demais são **coloridas e curvas**.
- Se usar IA, anote a ferramenta usada. Ela vai no README (item "fontes das imagens").

**Início sugerido de prompt** (para manter a consistência):
> Victorian storybook illustration, watercolor and ink, whimsical surreal wonderland, saturated colors, square composition, no text, no border — [descrição da arte]

### Lista de entrega (marque ao terminar)

**Prioridade: as 12 cartas da primeira entrega**
- [ ] `dsv-002-capitao-botao`
- [ ] `dsv-004-dragao-ponteiro`
- [ ] `dsv-006-sonhador-de-tinta`
- [ ] `dsv-007-madame-bule`
- [ ] `dsv-008-coruja-invertida`
- [ ] `dsv-011-fiandeira-de-sombras`
- [ ] `dsv-012-carimbador-cinzento`
- [ ] `dsv-013-arquiteto-cinzento`
- [ ] `dsv-014-poca-de-tinta`
- [ ] `dsv-015-bosque-das-horas-tortas`
- [ ] `dsv-018-porta-que-nao-estava-la`
- [ ] `dsv-019-espelho-do-avesso`

**Restante dos Decks A e B** (entram no catálogo com imagem provisória até a arte ficar pronta)
- [ ] `dsv-001-sr-pontual`
- [ ] `dsv-003-margarida-fofoqueira`
- [ ] `dsv-005-regua-sentinela`
- [ ] `dsv-009-xicara-saltitante`
- [ ] `dsv-010-torre-andarilha`
- [ ] `dsv-016-cha-escaldante`
- [ ] `dsv-017-guarda-chuva-de-estrelas`
- [ ] `dsv-020-carimbo-de-indeferido`

**Ordem Cinzenta: novas cartas do Deck B**
- [ ] `dsv-021-esquadro-guardiao`
- [ ] `dsv-022-clipe-espiao`
- [ ] `dsv-023-secretaria-de-mil-gavetas`
- [ ] `dsv-024-apontador-voraz`
- [ ] `dsv-025-compasso-perfurador`
- [ ] `dsv-026-borracha-apagadora`
- [ ] `dsv-027-grampeador-colossal`
- [ ] `dsv-028-formulario-em-tres-vias`
- [ ] `dsv-029-cidadela-cinzenta`
- [ ] `dsv-030-linha-reta`
- [ ] `dsv-031-decreto-do-recolher`
- [ ] `dsv-032-fila-de-espera`
- [ ] `dsv-033-auditoria-surpresa`

**Artes do site (opcionais: se não fizer, eu crio em CSS/SVG)**
- [ ] `fundo-hero`: paisagem panorâmica de Desvario (16:9, 1920×1080), com metade colorida e metade sendo "corrigida" para cinza por linhas de esquadro.
- [ ] `verso-carta`: verso das cartas (proporção 59:86), com um redemoinho de tinta roxa e dourada, uma xícara no centro e borda ornamentada.

**Feito por mim, em código:** moldura das cartas (CSS), estrelas de nível, ícones dos 6 atributos (SVG), logo em tipografia, favicon.

> Pode me mandar as artes aos poucos, e eu vou encaixando. Até elas chegarem, o site usa imagens provisórias.
