import { IPokemon } from "../interfaces/pokemonInterface";
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

    const allPokemonsCached= sessionStorage.getItem("allPokemons");
    if (allPokemonsCached) {
      this.allPokemons = JSON.parse(allPokemonsCached);
      return;
    }

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
    sessionStorage.setItem("allPokemons", JSON.stringify(allPokemons));    
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
    const lowerCaseSearch = name.toLowerCase();

    const pokemonOnList = this.allPokemons.find(
      (pokemon) => {
        const hasTypes = !!pokemon.types.length;
        const isSameName = pokemon.name.toLowerCase() === lowerCaseSearch;
        return hasTypes && isSameName;
      }
    );
    if (pokemonOnList) return pokemonOnList;

    const pokemonFromApi = await this.client.getPokemonByName(lowerCaseSearch);
    const pokemonNormalized = normalizePokemon(pokemonFromApi);

    return pokemonNormalized;
  }

  public async findPokemonsBySearchTerm(
    searchTerm: string
  ): Promise<IPokemon[]> {
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
