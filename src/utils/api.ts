import { IPokemon } from "../interfaces/pokemon-interface";

const baseUrl = "https://pokeapi.co/api/v2";
const pokemonUrl = `${baseUrl}/pokemon`;

export async function getPokemons(
  limit: number = 10,
  offset: number = 0
): Promise<IPokemon[]> {
  const response = await fetch(`{pokemonUrl}?limit=${limit}&offset=${offset}`);
  const data = await response.json();

  const pokemons = data.results.map((pokemon: any) => {

    return {
      id: pokemon.id,
      name: pokemon.name,
      imageSrc: pokemon.sprites.front_default,
    } as IPokemon;
  });

  return pokemons;
}

export async function getPokemon(nameOrId: string): Promise<IPokemon> {
  const response = await fetch(`${pokemonUrl}/${nameOrId}`);
  const data = await response.json();

  return {
    id: data.id,
    name: data.name,
    imageSrc: data.sprites.front_default,
  } as IPokemon;
}
