import { IPokemonType } from "../interfaces/pokemonTypeInterface";

export const pokemonTypes: {
  [key: string]: IPokemonType;
} = {
  normal: {
    icon: "fa fa-circle",
    color: "#A8A878",
    label: "Normal",
  } as IPokemonType,
  fire: {
    icon: "fa fa-fire",
    color: "#F08030",
    label: "Fogo",
  } as IPokemonType,
  water: {
    icon: "fa fa-tint",
    color: "#6890F0",
    label: "Água",
  } as IPokemonType,
  electric: {
    icon: "fa fa-bolt",
    color: "#F8D030",
    label: "Elétrico",
  } as IPokemonType,
  grass: {
    icon: "fa fa-leaf",
    color: "#78C850",
    label: "Grama",
  } as IPokemonType,
  ice: {
    icon: "fa fa-snowflake",
    color: "#98D8D8",
    label: "Gelo",
  } as IPokemonType,
  fighting: {
    icon: "fa fa-hand-rock",
    color: "#C03028",
    label: "Lutador",
  } as IPokemonType,
  poison: {
    icon: "fa-solid fa-skull-crossbones",
    color: "#A040A0",
    label: "Venenoso",
  } as IPokemonType,
  ground: {
    icon: "fa-solid fa-earth-americas",
    color: "#E0C068",
    label: "Terra",
  } as IPokemonType,
  flying: {
    icon: "fa fa-paper-plane",
    color: "#A890F0",
    label: "Voador",
  } as IPokemonType,
  psychic: {
    icon: "fa fa-magic",
    color: "#F85888",
    label: "Psíquico",
  } as IPokemonType,
  bug: {
    icon: "fa fa-bug",
    color: "#A8B820",
    label: "Inseto",
  } as IPokemonType,
  rock: {
    icon: "fa fa-gavel",
    color: "#B8A038",
    label: "Pedra",
  } as IPokemonType,
  ghost: {
    icon: "fa fa-ghost",
    color: "#705898",
    label: "Fantasma",
  } as IPokemonType,
  dragon: {
    icon: "fa fa-diamond",
    color: "#7038F8",
    label: "Dragão",
  } as IPokemonType,
  dark: {
    icon: "fa fa-moon",
    color: "#705848",
    label: "Noturno",
  } as IPokemonType,
  steel: {
    icon: "fa fa-cog",
    color: "#B8B8D0",
    label: "Aço",
  } as IPokemonType,
  fairy: {
    icon: "fa fa-heart",
    color: "#EE99AC",
    label: "Fada",
  } as IPokemonType,
};
