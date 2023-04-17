import { IPokemon } from "../interfaces/pokemonInterface";
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
    weight: pokemon.weight / 10,
    height: pokemon.height * 10,
    types: pokemon.types.map((type) => type.type.name),
    abilities: pokemon.abilities.map((ability) => ability.ability.name),
    games: pokemon.game_indices.map((game) => game.version.name),
    movesQuantity: pokemon.moves.length,
    life: pokemon.stats[0].base_stat,
    attack: pokemon.stats[1].base_stat,
    defense: pokemon.stats[2].base_stat,
    spAttack: pokemon.stats[3].base_stat,
    spDefense: pokemon.stats[4].base_stat,
    speed: pokemon.stats[5].base_stat,
  } as IPokemon;
};

const defaultImageSrc: string = "https://via.placeholder.com/96x96.png?text=No+Image";

function getPokemonImageSrc(pokemon: Pokemon): string {
  const pokemonSprites = pokemon?.sprites;
  if (!pokemonSprites) return defaultImageSrc;

  const defaultFrontImageSrc: string | null = pokemonSprites?.front_default;
  const homeImageSrc: string | null | undefined = pokemonSprites?.other?.home?.front_default;

  return homeImageSrc || defaultFrontImageSrc || defaultImageSrc;
}
