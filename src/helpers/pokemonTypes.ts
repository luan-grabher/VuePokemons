import { IPokemonType } from "../interfaces/pokemonTypeInterface";

export const pokemonTypes: {
  [key: string]: IPokemonType;
} = {
  normal: {
    icon: "fa fa-circle",
    color: "#A8A878",
  } as IPokemonType,
  fire: {
    icon: "fa fa-fire",
    color: "#F08030",
  } as IPokemonType,
  water: {
    icon: "fa fa-tint",
    color: "#6890F0",
    label: "Água",
  } as IPokemonType,
  electric: {
    icon: "fa fa-bolt",
    color: "#F8D030"
  } as IPokemonType,
  grass: {
    icon: "fa fa-leaf",
    color: "#78C850"
  } as IPokemonType,
  ice: {
    icon: "fa fa-snowflake",
    color: "#98D8D8"
  } as IPokemonType,
  fighting: {
    icon: "fa fa-hand-rock",
    color: "#C03028"
  } as IPokemonType,
  poison: {
    icon: "fa-solid fa-skull-crossbones",
    color: "#A040A0"
  } as IPokemonType,
  ground: {
    icon: "fa-solid fa-earth-americas",
    color: "#E0C068"
  } as IPokemonType,
  flying: {
    icon: "fa fa-paper-plane",
    color: "#A890F0"
  } as IPokemonType,
  psychic: {
    icon: "fa fa-magic",
    color: "#F85888"
  } as IPokemonType,
  bug: {
    icon: "fa fa-bug",
    color: "#A8B820"
  } as IPokemonType,
  rock: {
    icon: "fa fa-gavel",
    color: "#B8A038"
  } as IPokemonType,
  ghost: {
    icon: "fa fa-ghost",
    color: "#705898"
  } as IPokemonType,
  dragon: {
    icon: "fa fa-diamond",
    color: "#7038F8"
  } as IPokemonType,
  dark: {
    icon: "fa fa-moon",
    color: "#705848"
  } as IPokemonType,
  steel: {
    icon: "fa fa-cog",
    color: "#B8B8D0"
  } as IPokemonType,
  fairy: {
    icon: "fa fa-heart",
    color: "#EE99AC"
  } as IPokemonType,
};
