<script lang="ts">
//TODO: create a pokemon page

import { defineComponent } from "vue";
import { PokemonService } from "../utils/api";
import { IPokemon } from "../interfaces/pokemon-interface";

const pokemonService = new PokemonService();

export default defineComponent({
  name: "Pokemon",
  data() {
    return {
      pokemon: {} as IPokemon,
      loading: true,
    };
  },
  async created() {
    this.pokemon = await pokemonService.getPokemon(`${this.$route.params.name}`);
    this.loading = false;
  },
});

</script>

<template>
  <div class="detalhes-pokemon">
    TODO: adicionar os detalhes do pokemon aqui carregados por api
  </div>
</template>

<style scoped lang="scss">
</style>
