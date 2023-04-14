<script lang="ts">
import { PokemonService } from "../utils/api";
import { IPokemon } from "../interfaces/pokemon-interface";
import PokeCard from "../components/PokeData/PokeCard.vue";

const pokemonService = new PokemonService();

export default {
  name: "Home",
  data() {
    return {
      pokemons: [] as IPokemon[],
      loading: true,
    };
  },
  async created() {
    this.pokemons = await pokemonService.getPokemons();
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
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Carregando...</span>
      </div>
    </div>
    <div v-else class="pokemon-list row mx-2 gap-2 justify-content-center">
      <!-- TODO: Add pokemon list -->
      <div v-for="pokemon in pokemons" :key="pokemon.id" class="pokemon-card col-12 col-sm-6 col-md-2">
        <PokeCard :pokemon="pokemon" v-if="pokemon.id" />
      </div>
    </div>
  </div>
</template>
