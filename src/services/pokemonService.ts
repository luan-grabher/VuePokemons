import { IPokemon } from "../interfaces/pokemon-interface";
import { PokemonClient, Pokemon, NamedAPIResourceList, Home } from "pokenode-ts";

const defaultTake: number = 20;
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
    take: number = defaultTake
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
    const pokemon = await this.client.getPokemonByName(name.toLowerCase());
    if (!pokemon) {
      return {
        id: 0,
        name: "Not found",
        imageSrc: "",
      };
    }

    const pokemonNameUcaseFirst: string =
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    return {
      id: pokemon?.id,
      name: pokemonNameUcaseFirst,
      imageSrc: this.getPokemonImageSrc(pokemon),
    } as IPokemon;
  }

  private getPokemonImageSrc(pokemon: Pokemon): string {
    const defaultImageSrc: string = "https://via.placeholder.com/96x96.png?text=Pokemon+nao+encontrado";
    const defaultFrontImageSrc: string | null = pokemon?.sprites?.front_default;
    const homeImageSrc: string | null | undefined = pokemon?.sprites?.other?.home?.front_default;

    return homeImageSrc || defaultFrontImageSrc || defaultImageSrc;
  }

  public async findPokemonsBySearchTerm(
    searchTerm: string
  ): Promise<IPokemon[]> {
    const isTermInteger: boolean = Number.isInteger(Number(searchTerm));

    if (isTermInteger) {
      const pokemon = await this.getPokemon(searchTerm);
      return [pokemon];
    }

    const termLowerCase = searchTerm.toLowerCase();

    const allPokemons = await this.getPokemons(0, 10000);
    const pokemonsFound = allPokemons.filter((pokemon) => {
      const pokemonNameLowerCase = pokemon.name.toLowerCase();
      const pokemonNameContainsTerm =
        pokemonNameLowerCase.includes(termLowerCase);

      return pokemonNameContainsTerm;
    });

    const firstPokemonsFound = pokemonsFound.slice(0, defaultTake);
    return firstPokemonsFound;
  }
}
