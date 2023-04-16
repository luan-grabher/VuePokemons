<script lang="ts" setup>
/*
- [ ]  Habilidades Mais raras -> /api/v2/ability/ (ChartType: Radar) -> formula para calcular a raridade quanto menos pokemons tem a habilidade mais rara ela é
*/
import { NamedAPIResourceList, PokemonClient } from "pokenode-ts";
import { Radar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const pokemonClient = new PokemonClient();

const pokemonHabilitiesFromApi = []; //TODO: get habilities from api
const pokemonHabilities = []; //TODO: for each habilities get details and calculate rarity
const habilitiesSortedByRarity = []; //TODO: fazer sort das habilidades pela raridade

const labels = []; //TODO: normalize labels with first 10 habilities names
const data = []; //TODO: normalize data with first 10 habilities rarity values

</script>

<template>
  <div class="tipos">
    chart de habilidades
    <Radar :data="data" />
  </div>
</template>
