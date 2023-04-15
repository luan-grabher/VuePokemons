import { IPokemon } from "../interfaces/pokemon-interface";
import { Pokemon } from "pokenode-ts";

export const normalizePokemon = (pokemon: Pokemon): IPokemon | null => {
    if (!pokemon) {
        return null;
    }

    const pokemonNameUcaseFirst: string =
        pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    
    return {
        id: pokemon?.id,
        name: pokemonNameUcaseFirst,
        imageSrc: getPokemonImageSrc(pokemon),
        peso: pokemon.weight,
        altura: pokemon.height,
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
    }

   function getPokemonImageSrc(pokemon: Pokemon): string {
        const defaultImageSrc: string = "https://via.placeholder.com/96x96.png?text=Pokemon+nao+encontrado";
        const defaultFrontImageSrc: string | null = pokemon?.sprites?.front_default;
        const homeImageSrc: string | null | undefined = pokemon?.sprites?.other?.home?.front_default;
    
        return homeImageSrc || defaultFrontImageSrc || defaultImageSrc;
      }