<script lang="ts" setup>
import { LocationClient } from "pokenode-ts";
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
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

let chartData: any = ref({});

async function loadLocalizations() {
  const locationAreas: any = await getResultsFromApi(LocationClient, "listLocationAreas", "getLocationAreaByName");
  locationAreas.sort(
    (a: any, b: any) => b.pokemon_encounters.length - a.pokemon_encounters.length
  );
  const top10LocationsAreas = locationAreas.slice(0, 10);

  chartData.value = {
    labels: top10LocationsAreas.map(
      (locationArea: any) =>
        capitalizeFirstWordLetters(locationArea.name)
    ),
    datasets: [
      {
        label: "Quantity of pokemons",
        data: top10LocationsAreas.map(
          (locationArea: any) => locationArea.pokemon_encounters.length
        ),
        backgroundColor: "#353c61",
      },
    ],
  };
}

onMounted(async () => {
  await loadLocalizations();
});
</script>

<template>
  <div class="types" v-if="chartData?.labels?.length">
    <Bar :data="chartData" />
  </div>
</template>
