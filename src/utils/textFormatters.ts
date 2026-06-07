import { PokemonResumo } from "../models/Pokemon";

// Formata a exibição de um único Pokémon no terminal
export function formatarPokemon(pokemon: PokemonResumo): string {
  const tipos: string = pokemon.tipos.join(", ");
  return `#${pokemon.id} - ${pokemon.nome} | Tipos: ${tipos} | Altura: ${pokemon.altura} | Peso: ${pokemon.peso}`;
}

// Capitaliza a primeira letra de uma string
export function capitalizar(texto: string): string {
  if (texto.length === 0) return texto;
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

// Formata mensagem de sucesso
export function msgOk(texto: string): string {
  return `[OK] ${texto}`;
}

// Formata mensagem de aviso
export function msgAviso(texto: string): string {
  return `[AVISO] ${texto}`;
}

// Formata mensagem de erro
export function msgErro(texto: string): string {
  return `[ERRO] ${texto}`;
}
