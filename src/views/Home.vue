<script lang="ts">
import { getPokemons } from "../utils/api";
import { IPokemon } from "../interfaces/pokemon-interface";

export default {
  name: "Home",
  data() {
    return {
      pokemons: [] as IPokemon[],
      loading: true,
    };
  },
  async created() {
    this.pokemons = await getPokemons();
    this.loading = false;
  },
};

</script>

<template>
  <div class="home">
    <!-- TODO: Input para pesquisa + botao procurar -->
    
    <div v-if="loading" class="loading">
      <!-- TODO: Add loading animation -->
      Carregando...
    </div>
    <div v-else class="pokemon-list">
      <!-- TODO: Add pokemon list -->
    </div>
  </div>
</template>
