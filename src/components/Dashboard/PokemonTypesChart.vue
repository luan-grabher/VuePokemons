<script lang="ts" setup>
/*
- [ ]  Pokemons por tipo -> /api/v2/type/ (ChartType: Doughnut)
*/
import { NamedAPIResourceList, PokemonClient, Type } from "pokenode-ts";
import { Ref, onMounted, reactive, ref } from "vue";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";

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
            label: "Pokemons por tipo",
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
            const nameWithFirstLetterUppercase =
                pokemonType.name.charAt(0).toUpperCase() + pokemonType.name.slice(1);

            return {
                ...typeFromApi,
                name: nameWithFirstLetterUppercase,
            };
        })
    );

    labels.value = pokemonTypes.map((pokemonType) => pokemonType.name);
    datasetData.value = pokemonTypes.map((pokemonType) => pokemonType.pokemon.length);;
    backgroundColor.value = pokemonTypes.map(() => {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        return `#${randomColor}`;
    });

    chartData.value = {
        labels: labels.value,
        datasets: [
            {
                label: "Pokemons por tipo",
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
    <div class="tipos" v-if="chartData.datasets">
        <Doughnut :data="chartData" />
    </div>
</template>
