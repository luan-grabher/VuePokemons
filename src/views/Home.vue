<script lang="ts">
import { PokemonService } from "../services/pokemonService";
import { IPokemon } from "../interfaces/pokemon-interface";
import PokeCard from "../components/PokeData/PokeCard.vue";

const pokemonService = new PokemonService();

export default {
  name: "Home",
  data() {
    return {
      pokemons: [] as IPokemon[],
      loading: true,
      searchTerm: "",
      loadPokemons: async (getPokemonsFunction: Function) => {},
      searchPokemon: async () => {},
      onKeyPressInput: (event: KeyboardEvent) => {
        if (event.key === "Enter") this.searchPokemon();
      },
      getPreviousPage: () => {},
      getNextPage: () => {},
    };
  },
  async created() {
    this.loadPokemons = async (getPokemonsFunction: Function) => {
      this.pokemons = [];
      this.loading = true;

      try {
        this.pokemons = await getPokemonsFunction();
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    };

    this.searchPokemon = async () => {
      let getPokemonsFunction = async () => {
        return await pokemonService.getPokemons();
      };

      const hasSearchTerm = this.searchTerm.length > 0;
      if (hasSearchTerm) {
        getPokemonsFunction = async () => {
          return await pokemonService.findPokemonsBySearchTerm(this.searchTerm);
        };
      }

      this.loadPokemons(getPokemonsFunction);
    };

    this.getPreviousPage = async () => {
      this.loadPokemons(async () => {
        return await pokemonService.getPreviousPage();
      });
      window.scrollTo(0, 0);
    };

    this.getNextPage = async () => {
      this.loadPokemons(async () => {
        return await pokemonService.getNextPage();
      });
      window.scrollTo(0, 0);
    };

    this.searchPokemon();
  },
  components: { PokeCard },
};
</script>

<template>
  <!-- TODO: Adicionar tabs e mostrar por padrao o dashboard com graficos sobre os pokemons -->

  <div class="home">
    <div class="search-bar w-100 d-flex justify-content-center mb-4">
      <div class="col-6 d-flex gap-2">
        <input
          type="text"
          class="form-control"
          placeholder="Pesquisar pokemon"
          aria-label="Pesquisar pokemon"
          aria-describedby="button-addon2"
          v-model="searchTerm"
          @keypress="onKeyPressInput"
        />
        <button
          class="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
          @click="searchPokemon"
        >
          Procurar
        </button>
      </div>
    </div>

    <div v-if="loading" class="loading">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Carregando...</span>
      </div>
    </div>

    <div v-if="!loading && pokemons.length === 0" class="no-pokemons">
      <h1>Nenhum pokemon encontrado</h1>
    </div>

    <div v-if="!loading && pokemons.length > 0">
      <div class="pokemon-list row mx-2 gap-2 justify-content-center">
        <div
          v-for="pokemon in pokemons"
          :key="pokemon.id"
          class="pokemon-card col-12 col-sm-6 col-md-2"
        >
          <PokeCard :pokemon="pokemon" v-if="pokemon.id" />
        </div>
      </div>

      <div class="paginator w-100 d-flex gap-2 justify-content-center mt-4">
        <button
          class="btn btn-outline-secondary"
          type="button"
          @click="getPreviousPage"
        >
          Anterior
        </button>
        <button
          class="btn btn-outline-secondary"
          type="button"
          @click="getNextPage"
        >
          Próximo
        </button>
      </div>
    </div>
  </div>
</template>
