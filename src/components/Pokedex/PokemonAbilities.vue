<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps({
    pokemonAbilities: {
        type: Array as () => string[],
        required: true,
    },
});

</script>

<template>
    <div class="pokemon-abilities-container">
        <p>Habilidades: </p>
        <div class="abilities">
            <span v-for="habilidade in pokemonAbilities" :key="habilidade" class="ability">
                {{ habilidade }}
            </span>
        </div>        
    </div>
</template>

<style scoped lang="scss">
@import "../../assets/scss/variables.scss";

.pokemon-abilities-container {
    font-size: 0.8rem;
        font-weight: bold;

    .abilities {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        text-transform: capitalize;
    }

    .ability {
        font-size: 0.7rem;
        color: $primary;
    }
}
</style>
