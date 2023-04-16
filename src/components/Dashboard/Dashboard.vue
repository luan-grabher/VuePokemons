<script lang="ts" setup>
/*
- [ ]  Pizza Pokemons por tipo -> /api/v2/type/ (ChartType: Doughnut)
- [ ]  Quantidade de pokemons por geração -> /api/v2/generation/ (ChartType: Line)
- [ ]  Habilidades Mais raras -> /api/v2/ability/ (ChartType: Radar) -> formula para calcular a raridade quanto menos pokemons tem a habilidade mais rara ela é
- [ ]  ???? -> /????? (ChartType: Bar)

*/

import PokemonAbilitiesChart from './PokemonAbilitiesChart.vue';
import PokemonGenerationChart from './PokemonGenerationChart.vue';
import PokemonTypesChart from './PokemonTypesChart.vue';
import PokemonLocationsChart from './PokemonLocationsChart.vue';



</script>

<template>
    <div class="dashboard">
        <h1>Alguns dados sobre os Pokemons:</h1>
        <div class="charts d-flex flex-wrap">
            <div class="chart col-12 col-md-6">
                <h2>Pokemons por tipo:</h2>
                <PokemonTypesChart />                
            </div>
            <div class="chart col-12 col-md-6">
                <h2>Pokemons por geração:</h2>
                <PokemonGenerationChart />
            </div>
            <div class="chart col-12 col-md-6">
                <h2>Habilidades mais raras:</h2>
                <PokemonAbilitiesChart />
            </div>
            <div class="chart col-12 col-md-6">
                <h2>Localizações com mais pokemons:</h2>
                <PokemonLocationsChart />
            </div>
        </div>
    </div>
</template>