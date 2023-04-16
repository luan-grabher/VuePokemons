<script lang="ts" setup>
/*
- [ ]  Habilidades Mais raras -> /api/v2/ability/ (ChartType: Radar) -> formula para calcular a raridade quanto menos pokemons tem a habilidade mais rara ela é
*/
import { PokemonClient } from "pokenode-ts";
import { Radar } from "vue-chartjs";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { onMounted, reactive } from "vue";
import { getBackgroundColorsRandomly } from "../../helpers/dashboardHelpers";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const pokemonClient = new PokemonClient();
let chartData: ChartData<"radar", number[], string> = reactive({
  labels: [],
  datasets: [
    {
      label: "Habilidades mais raras",
      data: [],
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      pointBackgroundColor: 'rgba(255,99,132,1)',
      pointBorderColor: '#000',
      pointHoverBackgroundColor: '#000',
      pointHoverBorderColor: 'rgba(255,99,132,1)',
    },
  ],
});
const chartOptions = reactive({
  responsive: true,
  maintainAspectRatio: false
});

async function loadAbilities() {
  const abilitiesFromApi = await pokemonClient.listAbilities();
  const abilities = await Promise.all(
    abilitiesFromApi.results.map(async (ability) => {
      const abilityFromApi = await pokemonClient.getAbilityByName(ability.name);
      const nameWithFirstLetterUppercase =
        ability.name.charAt(0).toUpperCase() + ability.name.slice(1);

      return {
        ...abilityFromApi,
        name: nameWithFirstLetterUppercase,
      };
    })
  );

  abilities.sort((a, b) => a.pokemon.length - b.pokemon.length);
  abilities.reverse();
  
  //create new array for rarity to when bigger the number less rare the ability is, and the chart will show the most rare abilities
  const rarities: number[] = abilities.map((ability, index) => {
    return abilities.length - index;
  });

  chartData.labels = abilities.map((ability) => ability.name);
  chartData.datasets[0].data = rarities;

  console.log(chartData);
}

onMounted(async () => {
  await loadAbilities();
});
</script>

<template>
  <div class="pokemon-abilities-chart">
    <Radar :data="chartData" :options="chartOptions" />
  </div>
</template>
