import { IPokemon } from "../interfaces/pokemon-interface";
import { Pokemon } from "pokenode-ts";

export const normalizePokemon = (pokemon: Pokemon): IPokemon | null => {
  if (!pokemon) {
    return null;
  }

  const nameLettersOnly: string = pokemon.name.replace(/[^a-zA-Z]/g, " ");
  const nameUcaseFirst: string =
    nameLettersOnly.charAt(0).toUpperCase() + nameLettersOnly.slice(1);

  return {
    id: pokemon?.id,
    name: nameUcaseFirst,
    imageSrc: getPokemonImageSrc(pokemon),
    peso: pokemon.weight / 10,
    altura: pokemon.height * 10,
    tipos: pokemon.types.map((type) => type.type.name),
    habilidades: pokemon.abilities.map((ability) => ability.ability.name),
    games: pokemon.game_indices.map((game) => game.version.name),
    quantidadeMovimentosDisponiveis: pokemon.moves.length,
    vida: pokemon.stats[0].base_stat,
    ataque: pokemon.stats[1].base_stat,
    defesa: pokemon.stats[2].base_stat,
    ataqueEspecial: pokemon.stats[3].base_stat,
    defesaEspecial: pokemon.stats[4].base_stat,
    velocidade: pokemon.stats[5].base_stat,
  };
};

function getPokemonImageSrc(pokemon: Pokemon): string {
  const defaultImageSrc: string =
    "https://via.placeholder.com/96x96.png?text=No+Image";
  const defaultFrontImageSrc: string | null = pokemon?.sprites?.front_default;
  const homeImageSrc: string | null | undefined =
    pokemon?.sprites?.other?.home?.front_default;

  return homeImageSrc || defaultFrontImageSrc || defaultImageSrc;
}
