<script lang="ts">
import { getPokemons } from "../utils/api";
import { IPokemon } from "../interfaces/pokemon-interface";
import PokeCard from "../components/PokeData/PokeCard.vue";

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
  components: { PokeCard },
};
</script>

<template>
  <!-- TODO: Adicionar tabs e mostrar por padrao o dashboard com graficos sobre os pokemons -->

  <div class="home">
    <!-- TODO: Input para pesquisa + botao procurar -->

    <div v-if="loading" class="loading">
      <!-- TODO: Add loading animation from bootstrap -->
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Carregando...</span>
      </div>
    </div>
    <div v-else class="pokemon-list">
      <!-- TODO: Add pokemon list -->
      <div v-for="pokemon in pokemons" :key="pokemon.id">
        <PokeCard :pokemon="pokemon" v-if="pokemon.id" />
      </div>
    </div>
  </div>
</template>
