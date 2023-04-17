<script lang="ts" setup>
import { PokemonClient } from "pokenode-ts";
import { onMounted, ref } from "vue";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";
import { pokemonTypes as allPokemonTypesColors } from "../../helpers/pokemonTypes";
import { capitalizeFirstWordLetters, getRandomColor, getResultsFromApi } from "../../helpers/dashboardHelpers";

ChartJS.register(ArcElement, Tooltip, Legend);
let chartData: any = ref({});

async function loadTypes() {
    const pokemonTypes = await getResultsFromApi(PokemonClient, "listTypes", "getTypeByName");
    pokemonTypes.sort((a: any, b: any) => a.pokemon.length - b.pokemon.length);

    chartData.value = {
        labels: pokemonTypes.map((pokemonType: any) => capitalizeFirstWordLetters(pokemonType.name)),
        datasets: [
            {
                label: "Quantity of pokemons",
                data: pokemonTypes.map((pokemonType: any) => pokemonType.pokemon.length),
                backgroundColor: pokemonTypes.map((pokemonType: any) => allPokemonTypesColors[pokemonType.name]?.color || getRandomColor()),
            },
        ],
    };
}

onMounted(async () => {
    await loadTypes();
});
</script>

<template>
    <div v-if="chartData.datasets">
        <Pie :data="chartData" :options="{
            responsive: true,
            maintainAspectRatio: false
        }" />
    </div>
</template>
