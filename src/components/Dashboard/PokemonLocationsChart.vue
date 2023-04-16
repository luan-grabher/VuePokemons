<script lang="ts" setup>
/*
- [ ]  Quantidade de pokemons por geração -> /api/v2/generation/ (ChartType: Line)
*/
import { GameClient, LocationClient } from "pokenode-ts";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from "chart.js";
import { onMounted, reactive, ref } from "vue";
import { getRandomColor } from "../../helpers/dashboardHelpers";

ChartJS.register(
  CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend
)

let chartData: any = ref({
  labels: [],
  datasets: [
    {
      label: "Localizações com mais pokemons",
      data: [],
      backgroundColor: getRandomColor(),
    },
  ],
});

async function loadLocalizations() {
  const localizationClient  = new LocationClient();

  const localizationsAreasFromApi = await localizationClient.listLocationAreas();
  const localizationsAreas = await Promise.all(
    localizationsAreasFromApi.results.map(async (localizationArea) => {
      const localizationAreaFromApi = await localizationClient.getLocationAreaByName(
        localizationArea.name
      );
      const nameWithFirstLetterUppercase =
        localizationArea.name.charAt(0).toUpperCase() +
        localizationArea.name.slice(1);

      return {
        ...localizationAreaFromApi,
        name: nameWithFirstLetterUppercase,
      };
    })
  );

  localizationsAreas.sort((a, b) => b.pokemon_encounters.length - a.pokemon_encounters.length);
  const top10LocalizationsAreas = localizationsAreas.slice(0, 10);

  chartData.value = {
    labels: top10LocalizationsAreas.map((localizationArea) => localizationArea.name),
    datasets: [
      {
        label: "Localizações com mais pokemons",
        data: top10LocalizationsAreas.map((localizationArea) => localizationArea.pokemon_encounters.length),
        backgroundColor: getRandomColor(),
      },
    ],
  };
}

onMounted(async () => {
  await loadLocalizations();
});

</script>

<template>
  <div class="tipos">
    <Bar :data="chartData" />
  </div>
</template>
