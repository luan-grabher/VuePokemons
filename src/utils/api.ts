import { IPokemon } from "../interfaces/pokemon-interface";
import { PokemonClient, Pokemon, NamedAPIResourceList } from "pokenode-ts";

const imagesUrl =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
export class PokemonService {
  private readonly client: PokemonClient;
  private nextListPage: string | null;
  private previousListPage: string | null;

  constructor() {
    this.client = new PokemonClient();
    this.nextListPage = null;
    this.previousListPage = null;
  }

  public async getPokemons(
    limit: number = 10,
    offset: number = 0
  ): Promise<IPokemon[]> {
    const pokemonsListResult: NamedAPIResourceList =
      await this.client.listPokemons(limit, offset);

    this.nextListPage = pokemonsListResult.next;
    this.previousListPage = pokemonsListResult.previous;

    const pokemons: IPokemon[] = await Promise.all(
        pokemonsListResult.results.map(async (pokemon) => {
            const pokemonNormalized: IPokemon = await this.getPokemon(pokemon.name);
            return pokemonNormalized;
        })        
    );

    return pokemons;
  }

  public async getPokemon(name: string): Promise<IPokemon> {
    const pokemon = await this.client.getPokemonByName(name);

    return {
      id: pokemon?.id,
      name: pokemon?.name,
      imageSrc: `${imagesUrl}${pokemon?.id}.png`,
    } as IPokemon;
  }
}
