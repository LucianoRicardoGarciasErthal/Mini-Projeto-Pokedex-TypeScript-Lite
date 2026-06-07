# Pokédex TypeScript Lite 🎮

Aplicação back-end em Node.js com TypeScript que consulta a [PokeAPI](https://pokeapi.co/) e gerencia um catálogo local de Pokémon via terminal.

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

Ou em modo desenvolvimento:

```bash
npm run dev
```

Para compilar o TypeScript:

```bash
npm run build
```

---

## Arquitetura do Projeto

```
/pokedex-typescript-lite
│
├── src/
│   ├── main.ts                        # Ponto de entrada — instancia serviços e demonstra o fluxo
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

## Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| Buscar Pokémon | Consulta a PokeAPI por nome ou ID |
| Adicionar ao catálogo | Adiciona o Pokémon, impedindo duplicatas |
| Listar catálogo | Exibe todos os Pokémon salvos |
| Remover por ID | Remove um Pokémon específico pelo ID |
| Filtrar por tipo | Lista Pokémon de um tipo específico |
| Estatísticas | Peso total, contagem e validações |
| Tratamento de erros | Erros de API e entradas inválidas tratados com try/catch |

---

## Exemplos de Execução

### Busca válida

**Entrada testada:**
```
pikachu
```

**Saída esperada:**
```
[OK] Pokémon encontrado: pikachu
[OK] pikachu adicionado ao catálogo.
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

### Duplicidade

**Entrada testada:**
```
adicionar pikachu duas vezes
```

**Saída esperada:**
```
[OK] pikachu adicionado ao catálogo.
[AVISO] pikachu já está no catálogo.
```

---

### Listar catálogo

**Saída esperada:**
```
Catálogo atual:
#25 - pikachu | Tipos: electric | Altura: 4 | Peso: 60
#4 - charmander | Tipos: fire | Altura: 6 | Peso: 85
#1 - bulbasaur | Tipos: grass, poison | Altura: 7 | Peso: 69
#150 - mewtwo | Tipos: psychic | Altura: 20 | Peso: 1220
```

---

### Remoção

**Entrada testada:**
```
remover ID 25
```

**Saída esperada:**
```
[OK] Pokémon removido do catálogo.
```

---

### Remoção de ID inexistente

**Entrada testada:**
```
remover ID 9999
```

**Saída esperada:**
```
[AVISO] Nenhum Pokémon encontrado com esse ID.
```

---

### Estatísticas

**Saída esperada:**
```
--- Estatísticas do Catálogo ---
Total de Pokémon: 4
Peso total: 1434
Todos com nome válido: true
--------------------------------
```

---

## Métodos de Array Utilizados

| Método | Onde | Finalidade |
|---|---|---|
| `map` | PokeApiService | Transforma `types` da API em array de strings |
| `some` | BoxService | Verifica duplicidade antes de adicionar |
| `filter` | BoxService | Remove Pokémon por ID; filtra por tipo |
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

[Link do quadro Kanban](https://trello.com/seu-quadro-aqui)

---

## Autor

Seu Nome — [GitHub](https://github.com/seu-usuario)
