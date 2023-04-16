<script lang="ts" setup>
/*
- [ ]  Pizza Pokemons por tipo -> /api/v2/type/ (ChartType: Doughnut)
- [ ]  Quantidade de pokemons por geração -> /api/v2/generation/ (ChartType: Line)
- [ ]  Habilidades Mais raras -> /api/v2/ability/ (ChartType: Radar) -> formula para calcular a raridade quanto menos pokemons tem a habilidade mais rara ela é
- [ ]  ???? -> /????? (ChartType: Bar)
*/

import PokemonGenerationChart from './PokemonGenerationChart.vue';
import PokemonHabilitiesChart from './PokemonHabilitiesChart.vue';
import PokemonTypesChart from './PokemonTypesChart.vue';



</script>

<template>
    <div class="dashboard">
        <h1>Alguns dados sobre os Pokemons:</h1>
        <div class="charts">
            <div class="chart col-12 col-md-4">
                <PokemonTypesChart />                
            </div>
            <div class="chart col-12 col-md-4">
                <!-- <PokemonGenerationChart /> -->
            </div>
            <div class="chart col-12 col-md-4">
                <!--<PokemonHabilitiesChart /> -->
            </div>
        </div>
    </div>
</template>