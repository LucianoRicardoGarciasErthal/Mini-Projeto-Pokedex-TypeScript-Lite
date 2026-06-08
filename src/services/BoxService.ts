import { PokemonResumo } from "../models/Pokemon";
import { LocalBoxError } from "../models/CustomErrors";
import { formatarPokemon, msgOk, msgAviso } from "../utils/textFormatters";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

// Caminho do arquivo JSON — resolve a partir da raiz do projeto
const ARQUIVO = join(process.cwd(), "pc_box.json");

export class BoxService {
  private pokemons: PokemonResumo[] = [];

  // Lê o arquivo e carrega os dados para o array em memória
  public async carregar(): Promise<void> {
    try {
      const conteudo = await readFile(ARQUIVO, "utf-8");
      this.pokemons = JSON.parse(conteudo) as PokemonResumo[];
      console.log(`[OK] Catálogo carregado: ${this.pokemons.length} Pokémon encontrados.\n`);
    } catch {
      this.pokemons = [];
      console.log("[INFO] Nenhum catálogo encontrado. Iniciando vazio.\n");
    }
  }

  // Salva o array atual no arquivo JSON
  private async salvar(): Promise<void> {
    const conteudo = JSON.stringify(this.pokemons, null, 2);
    await writeFile(ARQUIVO, conteudo, "utf-8");
  }

  // Adiciona um Pokémon e salva no arquivo
  public async adicionar(pokemon: PokemonResumo): Promise<void> {
    const jaExiste = this.pokemons.some((item) => item.id === pokemon.id);

    if (jaExiste) {
      console.log(msgAviso(`${pokemon.nome} já está no catálogo.`));
      return;
    }

    this.pokemons.push(pokemon);
    await this.salvar();
    console.log(msgOk(`${pokemon.nome} adicionado ao catálogo.`));
  }

  // Lista os Pokémon do catálogo
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

  // Remove pelo ID e salva no arquivo
  public async remover(id: number): Promise<void> {
    const existe = this.pokemons.some((pokemon) => pokemon.id === id);

    if (!existe) {
      console.log(msgAviso("Nenhum Pokémon encontrado com esse ID."));
      return;
    }

    this.pokemons = this.pokemons.filter((pokemon) => pokemon.id !== id);
    await this.salvar();
    console.log(msgOk("Pokémon removido do catálogo."));
  }

  // Remove pelo nome e salva no arquivo
  public async removerPorNome(nome: string): Promise<void> {
    const nomeLower = nome.toLowerCase();
    const existe = this.pokemons.some((pokemon) => pokemon.nome === nomeLower);

    if (!existe) {
      console.log(msgAviso(`Nenhum Pokémon encontrado com o nome "${nome}".`));
      return;
    }

    this.pokemons = this.pokemons.filter((pokemon) => pokemon.nome !== nomeLower);
    await this.salvar();
    console.log(msgOk(`${nome} removido do catálogo.`));
  }

  // Busca pelo ID
  public buscarPorId(id: number): PokemonResumo | undefined {
    return this.pokemons.find((pokemon) => pokemon.id === id);
  }

  // Verifica se todos têm nome
  public todosComNome(): boolean {
    return this.pokemons.every((pokemon) => pokemon.nome.length > 0);
  }

  // Calcula peso total
  public pesoTotal(): number {
    return this.pokemons.reduce((acumulador, pokemon) => acumulador + pokemon.peso, 0);
  }

  // Filtra por tipo
  public filtrarPorTipo(tipo: string): PokemonResumo[] {
    return this.pokemons.filter((pokemon) =>
      pokemon.tipos.includes(tipo.toLowerCase())
    );
  }

  // Quantidade de Pokémon no catálogo
  public get tamanho(): number {
    return this.pokemons.length;
  }
}