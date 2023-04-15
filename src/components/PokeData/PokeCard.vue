<script  lang="ts">
import { defineComponent } from "vue";
import { IPokemon } from "../../interfaces/pokemon-interface";

export default defineComponent({
  name: "PokeCard",
  props: {
    pokemon: {
      type: Object as () => IPokemon | null,
      required: true,
    },
  },
});

</script>

<template>
  <div class="w-100" v-if="pokemon">
    <router-link :to="`/pokemon/${pokemon.name}`">
      <div class="card p-3">
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
