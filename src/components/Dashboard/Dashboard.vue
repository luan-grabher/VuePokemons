<script lang="ts" setup>
import PokemonAbilitiesChart from "./PokemonAbilitiesChart.vue";
import PokemonGenerationChart from "./PokemonGenerationChart.vue";
import PokemonTypesChart from "./PokemonTypesChart.vue";
import PokemonLocationsChart from "./PokemonLocationsChart.vue";
</script>

<template>
    <div class="dashboard">
        <div class="charts d-flex flex-wrap">
            <div class="chart col-12 col-md-6">
                <h2>Pokemom Quantity by Type:</h2>
                <PokemonTypesChart />
            </div>
            <div class="chart col-12 col-md-6">
                <h2>Pokemom Quantity by Generation:</h2>
                <PokemonGenerationChart />
            </div>
            <div class="chart col-12 col-md-6">
                <h2>Most common abilities:</h2>
                <PokemonAbilitiesChart />
            </div>
            <div class="chart col-12 col-md-6">
                <h2>Locations with most pokemons:</h2>
                <PokemonLocationsChart />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "../../assets/scss/variables.scss";

.dashboard {
    background-color: $gray;
    margin-top: 2rem;
    border-radius: 0.5rem;
    padding: 3rem;

    .charts {
        .chart {
            padding-bottom: 4rem;
            text-align: center;

            h2 {
                color: $dark;
                text-transform: uppercase;
                font-size: 1.2rem;
                font-weight: bold;
            }
        }
    }
}
</style>
