import { IPokemonType } from "../interfaces/pokemonTypeInterface";

export const pokemonTypes: {
  [key: string]: IPokemonType;
} = {
  normal: {
    icon: "fa fa-circle",
    color: "#A8A878",
    name: "normal",
  } as IPokemonType,
  fire: {
    icon: "fa fa-fire",
    color: "#F08030",
    name: "fire",
  } as IPokemonType,
  water: {
    icon: "fa fa-tint",
    color: "#6890F0",
    name: "water",
  } as IPokemonType,
  electric: {
    icon: "fa fa-bolt",
    color: "#F8D030",
    name: "electric",
  } as IPokemonType,
  grass: {
    icon: "fa fa-leaf",
    color: "#78C850",
    name: "grass",
  } as IPokemonType,
  ice: {
    icon: "fa fa-snowflake",
    color: "#98D8D8",
    name: "ice",
  } as IPokemonType,
  fighting: {
    icon: "fa fa-hand-rock",
    color: "#C03028",
    name: "fighting",
  } as IPokemonType,
  poison: {
    icon: "fa-solid fa-skull-crossbones",
    color: "#A040A0",
    name: "poison",
  } as IPokemonType,
  ground: {
    icon: "fa-solid fa-earth-americas",
    color: "#E0C068",
    name: "ground",
  } as IPokemonType,
  flying: {
    icon: "fa fa-paper-plane",
    color: "#A890F0",
    name: "flying",
  } as IPokemonType,
  psychic: {
    icon: "fa fa-magic",
    color: "#F85888",
    name: "psychic",
  } as IPokemonType,
  bug: {
    icon: "fa fa-bug",
    color: "#A8B820",
    name: "bug",
  } as IPokemonType,
  rock: {
    icon: "fa fa-gavel",
    color: "#B8A038",
    name: "rock",
  } as IPokemonType,
  ghost: {
    icon: "fa fa-ghost",
    color: "#705898",
    name: "ghost",
  } as IPokemonType,
  dragon: {
    icon: "fa fa-diamond",
    color: "#7038F8",
    name: "dragon",
  } as IPokemonType,
  dark: {
    icon: "fa fa-moon",
    color: "#705848",
    name: "dark",
  } as IPokemonType,
  steel: {
    icon: "fa fa-cog",
    color: "#B8B8D0",
    name: "steel",
  } as IPokemonType,
  fairy: {
    icon: "fa fa-heart",
    color: "#EE99AC",
    name: "fairy",
  } as IPokemonType,
};
