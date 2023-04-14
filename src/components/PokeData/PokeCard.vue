<script setup lang="ts">
import { IPokemon } from "../../interfaces/pokemon-interface";

const pokemon = withDefaults(defineProps<IPokemon>(), {});
</script>

<template>
  <div class="w-100">
    <router-link :to="`/pokemon/${pokemon.name}`">
      <div class="card">
        <img :src="pokemon.imageSrc" alt="poke-sprite" />
        <p>#{{ pokemon.id }}</p>
        <p>{{ pokemon.name }}</p>
        <!-- TODO: Adicionar demais informações do pokemon -->
      </div>
    </router-link>
  </div>
</template>

<style scoped lang="scss">
</style>
