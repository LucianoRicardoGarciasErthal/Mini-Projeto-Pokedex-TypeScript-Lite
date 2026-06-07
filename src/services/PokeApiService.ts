import { PokemonResumo, PokemonApiResponse } from "../models/Pokemon";
import { APIError } from "../models/CustomErrors";
import { msgErro } from "../utils/textFormatters";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

// Busca um Pokémon pelo nome ou ID na PokeAPI
export async function buscarPokemon(nomeOuId: string): Promise<PokemonResumo | null> {
  const url = `${BASE_URL}/${nomeOuId.toLowerCase().trim()}`;

  try {
    const resposta = await fetch(url);

    if (!resposta.ok) {
      if (resposta.status === 404) {
        console.log(msgErro(`Pokémon não encontrado: ${nomeOuId}`));
        return null;
      }
      throw new APIError(`Erro na API: status ${resposta.status}`);
    }

    const dados = (await resposta.json()) as PokemonApiResponse;

    // Mapeia os tipos usando map (RF11 - método de array)
    const tipos: string[] = dados.types.map((item) => item.type.name);

    const pokemon: PokemonResumo = {
      id: dados.id,
      nome: dados.name,
      tipos,
      altura: dados.height,
      peso: dados.weight,
    };

    console.log(msgErro("").replace("[ERRO] ", "[OK] ") + `Pokémon encontrado: ${pokemon.nome}`);
    return pokemon;

  } catch (erro) {
    if (erro instanceof APIError) {
      console.log(msgErro(erro.message));
    } else {
      console.log(msgErro("Não foi possível buscar o Pokémon. Verifique sua conexão."));
    }
    return null;
  }
}
