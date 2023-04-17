<script lang="ts" setup>
import { NamedAPIResourceList, PokemonClient, Type } from "pokenode-ts";
import { Ref, onMounted, reactive, ref } from "vue";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";
import { pokemonTypes as allPokemonTypesColors } from "../../helpers/pokemonTypes";
import { getRandomColor } from "../../helpers/dashboardHelpers";

ChartJS.register(ArcElement, Tooltip, Legend);

const pokemonClient = new PokemonClient();

let pokemonTypesFromApi: NamedAPIResourceList;
let pokemonTypes: Type[] = reactive([]);
let labels: Ref<string[]> = ref([]);
let datasetData: Ref<number[]> = ref([]);
let backgroundColor: Ref<string[]> = ref([]);

let chartData: any = ref({
    labels: labels.value,
    datasets: [
        {
            label: "Quantity of pokemons",
            data: datasetData.value,
            backgroundColor: backgroundColor.value,
        },
    ],
});

async function loadTypes() {
    pokemonTypesFromApi = await pokemonClient.listTypes();

    if (!pokemonTypesFromApi.results.length) return;

    pokemonTypes = await Promise.all(
        pokemonTypesFromApi.results.map(async (pokemonType) => {
            const typeFromApi = await pokemonClient.getTypeByName(pokemonType.name);
            return {
                ...typeFromApi
            };
        })
    );

    pokemonTypes.sort((a, b) => a.pokemon.length - b.pokemon.length);

    labels.value = pokemonTypes.map((pokemonType) => pokemonType.name.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" "));
    datasetData.value = pokemonTypes.map((pokemonType) => pokemonType.pokemon.length);;
    backgroundColor.value = pokemonTypes.map((pokemonType) => allPokemonTypesColors[pokemonType.name]?.color || getRandomColor());

    chartData.value = {
        labels: labels.value,
        datasets: [
            {
                label: "Quantity of pokemons",
                data: datasetData.value,
                backgroundColor: backgroundColor.value,
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
