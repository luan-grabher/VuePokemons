<script lang="ts" setup>
/*
- [ ]  Quantidade de pokemons por geração -> /api/v2/generation/ (ChartType: Line)
*/
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
  Legend,
ChartData
} from "chart.js";
import { onMounted, reactive, ref } from "vue";
import { getRandomColor } from "../../helpers/dashboardHelpers";

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
  const gameClient = new GameClient();

  const pokemonGenerationsFromApi = await gameClient.listGenerations();
  const pokemonGenerations = await Promise.all(
    pokemonGenerationsFromApi.results.map(async (pokemonGeneration) => {
      const generationFromApi = await gameClient.getGenerationByName(
        pokemonGeneration.name
      );

      return {
        ...generationFromApi
      };
    })
  );

  chartData.value = {
    labels: pokemonGenerations.map((pokemonGeneration) => pokemonGeneration.name.charAt(0).toUpperCase() + pokemonGeneration.name.slice(1)),
    datasets: [
      {
        label: "Quantity of pokemons",
        data: pokemonGenerations.map((pokemonGeneration) => pokemonGeneration.pokemon_species.length),
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
  <div class="tipos" v-if="chartData?.labels?.length">
    <Line :data="chartData" />
  </div>
</template>
