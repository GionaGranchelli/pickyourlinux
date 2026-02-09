# Como funciona

Esta pagina traz uma visao guiada pela documentacao sobre o motor de decisao, o modelo de dados e as regras de explicabilidade do Pick Your Linux.

## Fontes de documentacao cobertas

- ARCHITECTURE.md
- DATA_CONTRACT.md
- DATA_RULES.md
- QUESTION_CATALOG.md
- CONSTRAINT_MAPPING.md
- RESULTS_COPY.md
- TESTING.md
- TONE_AND_COPY.md
- FRONTEND-IMPLEMENTATION-RULES.md

## 1. Promessa do produto

Pick Your Linux e um motor de compatibilidade deterministico. Nao faz ranking, nao atribui pontuacao e nao sugere uma unica distro "melhor". Ele apenas filtra com regras explicitas e mostra razoes transparentes.

- Multiplos resultados sao esperados quando varias distros atendem aos mesmos criterios.
- Nao existem pesos ocultos, notas de popularidade ou recomendacoes subjetivas.
- Voce pode mudar respostas e ver imediatamente o que muda.

## 2. Arquitetura principal

O sistema e dividido em camadas estritas para manter a logica testavel e a UI sem tomada de decisao.

- Camada de dados (`/src/data`): schemas, catalogo de perguntas, dataset de distros.
- Camada de logica (`/src/engine/logic.ts`): avaliacao pura de condicoes e patches.
- Camada de estado (`/src/engine/state.ts`): orquestracao de fluxo, progresso, desfazer, modelos de resultado.
- Camada de UI (`/src/components`): componentes apenas de renderizacao.
- Direcao de importacao: UI -> state -> logic.

## 3. Contrato de dados (UserIntent)

Cada resposta atualiza um unico objeto `UserIntent` validado. Esse e o estado de decisao.

- Preferencias de instalacao e manutencao definem tolerancia a friccao.
- Preferencia por software proprietario controla aceitacao de componentes fechados.
- Contexto de hardware inclui arquitetura, RAM, secure boot e detalhes de GPU.
- Tags de uso incluem Gaming, Privacy, Work, Server e OldHardware.
- Refinamentos opcionais incluem desktop, modelo de release, init system e gerenciador de pacotes.

## 4. Motor de perguntas

As perguntas sao orientadas por dados. Cada opcao contem patches JSON deterministas. A visibilidade e controlada apenas por condicoes explicitas.

- Operacoes de patch permitidas: `set`, `add_tag`, `remove_tag`.
- Operacoes de condicao permitidas: `eq`, `neq`, `in`, `contains`, `and`, `or`.
- Sem funcoes nos dados, sem callbacks e sem `eval` em runtime.
- Ordem das perguntas e comportamento por fase vem do catalogo, nao da UI.

## 5. Jornada por fases

A profundidade do fluxo e progressiva e apenas para frente: Quick (Beginner) -> Intermediate -> Advanced.

- Quick coleta rapidamente as restricoes de maior sinal.
- Intermediate adiciona refinamentos praticos (estilo de desktop, modelo de atualizacao, detalhes de hardware).
- Advanced adiciona preferencias explicitas de sistema (init, gerenciador de pacotes, controles mais rigidos).
- O usuario pode parar nos resultados apos quick/intermediate e continuar refinando depois sem recomecar.

## 6. Restricoes rigidas (Pass/Fail)

Restricoes rigidas excluem distros incompativeis. Se uma distro falha em uma regra rigida, ela sai.

- Exigir instalador GUI exclui distros com instalacao manual.
- Exigir manutencao sem terminal exclui distros que exigem manutencao hands-on.
- Evitar software proprietario exclui distros que dependem dele.
- Exigir software proprietario exclui distros sem suporte proprietario.
- Exigir suporte a hardware antigo exclui distros nao adequadas a maquinas modestas/antigas.
- Preferencias de Secure Boot e NVIDIA aplicam verificacoes adicionais explicitas.

## 7. Razoes de compatibilidade suave

Razoes suaves nao criam ranking. Elas apenas explicam por que uma distro compativel pode se encaixar melhor em certos objetivos.

- Perfil de gaming e privacidade gera razoes de explicabilidade.
- Preferencias de desktop/release/init/package manager adicionam razoes explicitas.
- Os resultados separam razoes guiadas por escolhas e matches de filtros rigidos.

## 8. Resultados e explicabilidade

Resultados sao apresentados como saidas de compatibilidade, nao como recomendacoes.

- Cada card inclui filtros rigidos atendidos, razoes guiadas por escolhas e possivel friccao.
- Painel de explicabilidade mostra restricoes ativas e motivos de exclusao.
- Pagina de comparacao exibe atributos de distros lado a lado com a mesma fonte de dados.
- Ordenacao padrao: mais matches no topo; filtros sao explicitos e reversiveis.

## 9. Qualidade de dados e auditorias

Os dados das distros seguem validacao por schema e auditorias de consistencia.

- Validacao de schema garante valores legais para cada atributo.
- Regras de auditoria sinalizam combinacoes suspeitas (ex.: suporte NVIDIA vs politica proprietaria).
- Alegacoes de Secure Boot e expectativas de manutencao rolling sao auditadas quanto a consistencia.

## 10. Testes e gates de validacao

Mudancas devem passar por pipelines deterministicas de validacao.

- O validador de fluxo verifica coerencia de visibilidade e transicoes.
- Validadores de perguntas e distros garantem integridade de schema e catalogo.
- Testes da engine cobrem logica de condicoes, comportamento de patch, conclusao e desfazer.
- Objetivo: comportamento explicavel e reproduzivel sob tipagem estrita e controle por schema.

## 11. Regras de UX e copy

A linguagem e desenhada para clareza e reversibilidade.

- Evite palavras como best, top, recommended ou promessas baseadas em popularidade.
- Evite enquadramento de julgamento de habilidade na UI; foque em conforto e objetivos.
- Cada escolha deve ser reversivel: revisar respostas, editar ou reiniciar.
