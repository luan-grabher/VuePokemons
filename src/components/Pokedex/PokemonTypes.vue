<script lang="ts" setup>
import { defineProps, reactive } from "vue";
import { pokemonTypes as allPokemonTypes } from "../../helpers/pokemonTypes";

const props = defineProps({
    pokemonTypes: {
        type: Array as () => string[],
        required: true,
    },
});

let pokemonTypesNormalized:
    { icon: string; color: string; label: string }[] =
    reactive([]);

for (const pokemonType of props.pokemonTypes) {
    const typeInList = allPokemonTypes[pokemonType];
    if (!typeInList) continue;

    pokemonTypesNormalized.push({
        icon: typeInList.icon,
        color: typeInList.color,
        label: typeInList.label,
    });
}
</script>

<template>
    <div class="pokemon-types-container d-flex gap-2">
        <div v-for="tipo in pokemonTypesNormalized" :key="tipo.label" class="pokemon-type d-flex gap-1" :style="{ backgroundColor: tipo.color }">
            <i :class="`pokemon-type-icon ${tipo.icon}`" ></i>
            <span class="pokemon-type-label">{{ tipo.label }}</span>            
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "../../assets/scss/variables.scss";

.pokemon-types-container {
    .pokemon-type {
        padding-inline: 0.5rem;
        padding-block: 0.1rem;
        align-items: center;
        border-radius: 1rem;

        .pokemon-type-label {
            font-size: 0.7rem;
            font-weight: bold;
        }
    }
}

</style>
