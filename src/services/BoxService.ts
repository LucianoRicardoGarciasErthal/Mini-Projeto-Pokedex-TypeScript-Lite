import { PokemonResumo } from "../models/Pokemon";
import { LocalBoxError } from "../models/CustomErrors";
import { formatarPokemon, msgOk, msgAviso } from "../utils/textFormatters";

// Classe principal que gerencia o catálogo de Pokémon em memória
export class BoxService {
  private pokemons: PokemonResumo[] = [];

  // Adiciona um Pokémon ao catálogo, impedindo duplicatas (RF08, RF11 - some)
  public adicionar(pokemon: PokemonResumo): void {
    const jaExiste: boolean = this.pokemons.some((item) => item.id === pokemon.id);

    if (jaExiste) {
      console.log(msgAviso(`${pokemon.nome} já está no catálogo.`));
      return;
    }

    this.pokemons.push(pokemon);
    console.log(msgOk(`${pokemon.nome} adicionado ao catálogo.`));
  }

  // Lista todos os Pokémon do catálogo (RF09, RF11 - forEach)
  public listar(): void {
    if (this.pokemons.length === 0) {
      console.log(msgAviso("Catálogo vazio."));
      return;
    }

    console.log("\nCatálogo atual:");
    this.pokemons.forEach((pokemon) => {
      console.log(formatarPokemon(pokemon));
    });
    console.log("");
  }

  // Remove um Pokémon pelo ID (RF10, RF11 - filter)
  public remover(id: number): void {
    const existe: boolean = this.pokemons.some((pokemon) => pokemon.id === id);

    if (!existe) {
      console.log(msgAviso("Nenhum Pokémon encontrado com esse ID."));
      return;
    }

    this.pokemons = this.pokemons.filter((pokemon) => pokemon.id !== id);
    console.log(msgOk("Pokémon removido do catálogo."));
  }

  // Busca um Pokémon específico pelo ID (RF11 - find)
  public buscarPorId(id: number): PokemonResumo | undefined {
    return this.pokemons.find((pokemon) => pokemon.id === id);
  }

  // Verifica se todos os Pokémon têm nome preenchido (RF11 - every)
  public todosComNome(): boolean {
    return this.pokemons.every((pokemon) => pokemon.nome.length > 0);
  }

  // Calcula o peso total dos Pokémon no catálogo (RF11 - reduce)
  public pesoTotal(): number {
    return this.pokemons.reduce((acumulador, pokemon) => acumulador + pokemon.peso, 0);
  }

  // Retorna apenas os Pokémon de um tipo específico (RF11 - filter)
  public filtrarPorTipo(tipo: string): PokemonResumo[] {
    return this.pokemons.filter((pokemon) =>
      pokemon.tipos.includes(tipo.toLowerCase())
    );
  }

  // Retorna o tamanho atual do catálogo
  public get tamanho(): number {
    return this.pokemons.length;
  }
}
