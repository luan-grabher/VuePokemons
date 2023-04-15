import { IPokemon } from "../interfaces/pokemon-interface";
import {
  PokemonClient,
  NamedAPIResourceList,
} from "pokenode-ts";
import { normalizePokemon } from "../normalizers/pokemonNormalizer";

export const defaultTake: number = 20;
export class PokemonService {
  private readonly client: PokemonClient;
  private allPokemons: IPokemon[] = [];
  private skipForNextPage: number;
  private skipForPreviousPage: number;

  constructor() {
    this.client = new PokemonClient();
    this.skipForNextPage = 0;
    this.skipForPreviousPage = 0;
  }

  public async loadAllPokemons(): Promise<void> {
    const isAllPokemonsAlreadyFetched: boolean = this.allPokemons.length > 0;
    if (isAllPokemonsAlreadyFetched) return;

    const allPokemonsApi : NamedAPIResourceList = await this.client.listPokemons(0, 10000);

    const allPokemons: IPokemon[] = await Promise.all(
      allPokemonsApi.results.map(async (pokemon) => {
        const pokemonNormalized: IPokemon = (await this.getPokemon(
          pokemon.name
        )) as IPokemon;
        return pokemonNormalized;
      })
    );

    this.allPokemons = allPokemons;
  }

  public async getPokemons(
    skip: number = 0,
    take: number = defaultTake
  ): Promise<IPokemon[]> {
    const pokemons = this.allPokemons.slice(skip, skip + take);
    this.skipForNextPage = skip + take;
    this.skipForPreviousPage = skip - take < 0 ? 0 : skip - take;

    return pokemons;
  }

  public async getNextPage(): Promise<IPokemon[]> {
    return await this.getPokemons(this.skipForNextPage);
  }

  public async getPreviousPage(): Promise<IPokemon[]> {
    return await this.getPokemons(this.skipForPreviousPage);
  }

  public async getPokemon(name: string): Promise<IPokemon | null> {
    const pokemon = await this.client.getPokemonByName(name.toLowerCase());
    const pokemonNormalized = normalizePokemon(pokemon);

    return pokemonNormalized;
  }

  public async findPokemonsBySearchTerm(
    searchTerm: string
  ): Promise<IPokemon[]> {
    const isTermInteger: boolean = Number.isInteger(Number(searchTerm));

    if (isTermInteger) {
      const pokemon = await this.getPokemon(searchTerm);
      if (!pokemon) return [];

      return [pokemon];
    }

    const termLowerCase = searchTerm.toLowerCase();


    const pokemonsFound = this.allPokemons.filter((pokemon) => {
      const pokemonNameLowerCase = pokemon.name.toLowerCase();
      const pokemonNameContainsTerm =
        pokemonNameLowerCase.includes(termLowerCase);

      return pokemonNameContainsTerm;
    });

    const firstPokemonsFound = pokemonsFound.slice(0, defaultTake);
    return firstPokemonsFound;
  }
}
