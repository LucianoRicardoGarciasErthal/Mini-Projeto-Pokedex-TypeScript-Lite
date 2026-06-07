import { BoxService } from "../services/BoxService";
import { buscarPokemon } from "../services/PokeApiService";
import { capitalizar } from "../utils/textFormatters";

// Orquestra as operações do terminal e exibe resultados ao usuário
export class TerminalController {
  private catalogo: BoxService;

  constructor(catalogo: BoxService) {
    this.catalogo = catalogo;
  }

  // Executa busca e adiciona automaticamente ao catálogo
  public async buscarEAdicionar(nomeOuId: string): Promise<void> {
    const pokemon = await buscarPokemon(nomeOuId);
    if (pokemon !== null) {
      this.catalogo.adicionar(pokemon);
    }
  }

  // Exibe o catálogo atual
  public exibirCatalogo(): void {
    this.catalogo.listar();
  }

  // Remove pelo ID e exibe mensagem
  public removerPorId(id: number): void {
    this.catalogo.remover(id);
  }

  // Exibe estatísticas do catálogo
  public exibirEstatisticas(): void {
    console.log("\n--- Estatísticas do Catálogo ---");
    console.log(`Total de Pokémon: ${this.catalogo.tamanho}`);
    console.log(`Peso total: ${this.catalogo.pesoTotal()}`);
    console.log(`Todos com nome válido: ${this.catalogo.todosComNome()}`);
    console.log("--------------------------------\n");
  }

  // Filtra e exibe Pokémon por tipo
  public exibirPorTipo(tipo: string): void {
    const resultado = this.catalogo.filtrarPorTipo(tipo);
    if (resultado.length === 0) {
      console.log(`[AVISO] Nenhum Pokémon do tipo "${capitalizar(tipo)}" no catálogo.`);
      return;
    }
    console.log(`\nPokémon do tipo ${capitalizar(tipo)}:`);
    resultado.forEach((p) => console.log(`  #${p.id} - ${p.nome}`));
    console.log("");
  }
}
