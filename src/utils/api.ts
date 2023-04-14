import { IPokemon } from "../interfaces/pokemon-interface";
import { PokemonClient, Pokemon, NamedAPIResourceList } from "pokenode-ts";

const imagesUrl = "https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/other/home/:id.png?raw=true";
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
    skip: number = 0,
    take: number = 20 
  ): Promise<IPokemon[]> {
    const pokemonsListResult: NamedAPIResourceList =
      await this.client.listPokemons(skip, take);

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
    const pokemonNameUcaseFirst: string = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    return {
      id: pokemon?.id,
      name: pokemonNameUcaseFirst,
      imageSrc: this.getPokemonImageSrc(pokemon),
    } as IPokemon;
  }

  private getPokemonImageSrc(pokemon: Pokemon): string {
    const pokemonId: number = pokemon.id;
    const pokemonIdString: string = pokemonId.toString();

    return imagesUrl.replace(":id", pokemonIdString);
  }
}
