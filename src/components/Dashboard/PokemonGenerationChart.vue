<script lang="ts" setup>
/*
- [ ]  Quantidade de pokemons por geração -> /api/v2/generation/ (ChartType: Line)
*/
import { NamedAPIResourceList, PokemonClient } from "pokenode-ts";
import { Line } from "vue-chartjs";
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

const pokemonGenerationsFromApi = []; //TODO: get generations from api
const pokemonGenerations = []; //TODO: for each generation get details with pokemons

const labels = []; //TODO: normalize labels with generation names
const data = []; //TODO: normalize data with generation pokemons count

</script>

<template>
  <div class="tipos">
    chart de gerações
    <Line :data="data" />
  </div>
</template>
