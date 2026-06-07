# Pokédex TypeScript Lite 🎮

Aplicação back-end em Node.js com TypeScript que consulta a [PokeAPI](https://pokeapi.co/) e gerencia um catálogo local de Pokémon via terminal.

A cada execução, **5 Pokémon são sorteados aleatoriamente** entre os 151 da geração 1 — a lista muda toda vez que você roda o projeto.

---

## Objetivo

Praticar os fundamentos do desenvolvimento back-end com Node.js e TypeScript: consumo de API externa, tipagem forte, orientação a objetos, métodos de array, tratamento de erros e organização em camadas.

---

## Tecnologias Utilizadas

- Node.js (v18+)
- TypeScript 5
- tsx (execução em desenvolvimento)
- PokeAPI (API pública, sem autenticação)

---

## Pré-requisitos

- Node.js versão 18 ou superior instalado
- npm instalado

---

## Como Instalar

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/pokedex-typescript-lite.git

# Acesse a pasta do projeto
cd pokedex-typescript-lite

# Instale as dependências de desenvolvimento
npm install
```

---

## Como Executar

```bash
npm run start
```

A cada execução, 5 Pokémon diferentes são sorteados automaticamente da geração 1.

---

## Arquitetura do Projeto

```
/pokedex-typescript-lite
│
├── src/
│   ├── main.ts                        # Ponto de entrada — sorteia Pokémon e demonstra o fluxo
│   ├── controllers/
│   │   └── TerminalController.ts      # Orquestra operações e exibições no terminal
│   ├── services/
│   │   ├── PokeApiService.ts          # Integração com a PokeAPI (fetch + async/await)
│   │   └── BoxService.ts             # Gerenciamento do catálogo em memória
│   ├── models/
│   │   ├── Pokemon.ts                 # Interfaces PokemonResumo e PokemonApiResponse
│   │   └── CustomErrors.ts           # Classes APIError e LocalBoxError
│   └── utils/
│       └── textFormatters.ts          # Funções utilitárias puras de formatação
│
├── pc_box.json                        # Base de dados local (array vazio inicial)
├── tsconfig.json                      # Configuração do TypeScript (Strict Mode)
├── package.json                       # Dependências e scripts
└── README.md
```

---

## Como funciona o sorteio

No `main.ts` existe uma lista com todos os 151 Pokémon da geração 1. A cada execução:

1. A lista é embaralhada com `.sort(() => Math.random() - 0.5)`
2. Os 5 primeiros são selecionados com `.slice(0, 5)`
3. O programa busca cada um na PokeAPI e adiciona ao catálogo

---

## Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| Sorteio aleatório | 5 Pokémon diferentes a cada execução |
| Buscar Pokémon | Consulta a PokeAPI por nome ou ID |
| Adicionar ao catálogo | Adiciona o Pokémon, impedindo duplicatas |
| Listar catálogo | Exibe todos os Pokémon salvos |
| Remover por ID | Remove um Pokémon específico pelo ID |
| Remover por nome | Remove um Pokémon específico pelo nome |
| Estatísticas | Peso total, contagem e validações |
| Tratamento de erros | Erros de API e entradas inválidas tratados com try/catch |

---

## Exemplos de Execução

### Sorteio e busca (resultado varia a cada execução)

**Saída esperada:**
```
===========================================
       Pokédex TypeScript Lite 🎮         
===========================================

>> Pokémon sorteados para esta sessão: haunter, tauros, eevee, poliwag, arcanine

>> Buscando Pokémon...

[OK] Pokémon encontrado: haunter
[OK] haunter adicionado ao catálogo.
[OK] Pokémon encontrado: tauros
[OK] tauros adicionado ao catálogo.
[OK] Pokémon encontrado: eevee
[OK] eevee adicionado ao catálogo.
[OK] Pokémon encontrado: poliwag
[OK] poliwag adicionado ao catálogo.
[OK] Pokémon encontrado: arcanine
[OK] arcanine adicionado ao catálogo.
```

---

### Duplicidade (testa com o primeiro sorteado)

**Saída esperada:**
```
>> Tentando adicionar haunter novamente...
[OK] Pokémon encontrado: haunter
[AVISO] haunter já está no catálogo.
```

---

### Busca inválida

**Entrada testada:**
```
pokemon-inexistente
```

**Saída esperada:**
```
[ERRO] Pokémon não encontrado: pokemon-inexistente
```

---

### Listar catálogo

**Saída esperada:**
```
Catálogo atual:
#93 - haunter | Tipos: ghost, poison | Altura: 16 | Peso: 1
#128 - tauros | Tipos: normal | Altura: 14 | Peso: 884
#133 - eevee | Tipos: normal | Altura: 3 | Peso: 65
#60 - poliwag | Tipos: water | Altura: 6 | Peso: 124
#59 - arcanine | Tipos: fire | Altura: 19 | Peso: 1550
```

---

### Estatísticas

**Saída esperada:**
```
--- Estatísticas do Catálogo ---
Total de Pokémon: 5
Peso total: 2624
Todos com nome válido: true
--------------------------------
```

---

### Remoção (remove o último sorteado)

**Saída esperada:**
```
>> Demonstrando remoção — removendo o último sorteado: arcanine
[OK] arcanine removido do catálogo.
```

---

### Remoção de ID inexistente

**Saída esperada:**
```
[AVISO] Nenhum Pokémon encontrado com esse ID.
```

---

## Métodos de Array Utilizados

| Método | Onde | Finalidade |
|---|---|---|
| `map` | PokeApiService | Transforma `types` da API em array de strings |
| `sort` | main.ts | Embaralha a lista de Pokémon para o sorteio |
| `some` | BoxService | Verifica duplicidade antes de adicionar |
| `filter` | BoxService | Remove Pokémon por ID ou nome; filtra por tipo |
| `find` | BoxService | Busca Pokémon pelo ID |
| `every` | BoxService | Valida se todos têm nome |
| `reduce` | BoxService | Calcula peso total do catálogo |
| `forEach` | BoxService | Itera para listar o catálogo |

---

## Branches Utilizadas

```
main
develop
feat/pokedex
docs/readme
```

---

## Quadro Kanban

Link do quadro Kanban - [ https://trello.com/u/lucianoricardogarciaserthal1/boards ]

---

## Autor

Luciano Ricardo Garcias Erthal — [ https://github.com/LucianoRicardoGarciasErthal ]
