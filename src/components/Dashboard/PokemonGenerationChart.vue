<script lang="ts" setup>
import { GameClient } from "pokenode-ts";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { onMounted, ref } from "vue";
import { capitalizeFirstWordLetters, getResultsFromApi } from "../../helpers/dashboardHelpers";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

let chartData: any = ref({});

async function loadGenerations() {
  const pokemonGenerations = await getResultsFromApi(GameClient, "listGenerations", "getGenerationByName");

  chartData.value = {
    labels: pokemonGenerations.map((pokemonGeneration: any) => capitalizeFirstWordLetters(pokemonGeneration.name)),
    datasets: [
      {
        label: "Quantity of pokemons",
        data: pokemonGenerations.map((pokemonGeneration: any) => pokemonGeneration.pokemon_species.length),
        backgroundColor: "#353c61",
      },
    ]
  }
}

onMounted(async () => {
  await loadGenerations();
});

</script>

<template>
  <div class="generations" v-if="chartData?.labels?.length">
    <Line :data="chartData" />
  </div>
</template>
