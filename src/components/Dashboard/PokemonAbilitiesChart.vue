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
  const pokemonClient = new PokemonClient();

  const abilitiesFromApi = await pokemonClient.listAbilities();
  const abilities = await Promise.all(
    abilitiesFromApi.results.map(async (ability) => {
      const abilityFromApi = await pokemonClient.getAbilityByName(ability.name);

      return {
        ...abilityFromApi
      };
    })
  );

  abilities.sort((a, b) => b.pokemon.length - a.pokemon.length);

  chartData.value = {
    labels: abilities.map((ability) => ability.name.charAt(0).toUpperCase() + ability.name.slice(1)),
    datasets: [
      {
        label: "Quantity of pokemons",
        data: abilities.map((ability) => ability.pokemon.length),
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
