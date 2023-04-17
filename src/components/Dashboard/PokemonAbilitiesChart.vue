<script lang="ts" setup>
import { PokemonClient } from "pokenode-ts";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { onMounted, ref } from "vue";
import { capitalizeFirstWordLetters, getResultsFromApi } from "../../helpers/dashboardHelpers";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

let chartData: any = ref({});

async function loadAbilities() {
  const abilities = await getResultsFromApi(PokemonClient, "listAbilities", "getAbilityByName");
  abilities.sort((a: any, b: any) => b.pokemon.length - a.pokemon.length);

  chartData.value = {
    labels: abilities.map((ability: any) => capitalizeFirstWordLetters(ability.name)),
    datasets: [
      {
        label: "Quantity of pokemons",
        data: abilities.map((ability: any) => ability.pokemon.length),
        backgroundColor: "#F9BC1A",
      },
    ],
  };
}

onMounted(async () => {
  await loadAbilities();
});
</script>

<template>
  <div class="pokemon-abilities-chart" v-if="chartData?.labels?.length">
    <Bar :data="chartData" />
  </div>
</template>
