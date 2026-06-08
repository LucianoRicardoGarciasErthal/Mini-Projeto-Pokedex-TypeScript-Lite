import { BoxService } from "./services/BoxService";
import { TerminalController } from "./controllers/TerminalController";

// Gera um número inteiro aleatório entre min e max (inclusive)
function sortearId(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Gera uma lista de IDs únicos e aleatórios
function sortearIds(quantidade: number, min: number, max: number): number[] {
  const ids: number[] = [];

  while (ids.length < quantidade) {
    const id = sortearId(min, max);
    if (!ids.includes(id)) {
      ids.push(id);
    }
  }

  return ids;
}

async function main(): Promise<void> {
  console.log("===========================================");
  console.log("       Pokédex TypeScript Lite 🎮         ");
  console.log("===========================================\n");

  const catalogo = new BoxService();
  const controller = new TerminalController(catalogo);

  await catalogo.carregar(); // salvar dados no arquivo

  // Sorteia 5 IDs únicos entre 1 e 151 (Pokémon da 1ª geração)
  const idsSorteados = sortearIds(5, 1, 151);

  console.log(`>> Pokémon sorteados desta rodada: ${idsSorteados.join(", ")}\n`);

  // Busca cada Pokémon sorteado
  for (const id of idsSorteados) {
    await controller.buscarEAdicionar(String(id));
  }

  console.log("\n>> Catálogo desta rodada:");
  controller.exibirCatalogo();

  controller.exibirEstatisticas();

  console.log("\n===========================================");
  console.log("       Execução concluída com sucesso!     ");
  console.log("===========================================");
}

main();