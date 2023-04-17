<script lang="ts" setup>
import { onMounted, reactive, Ref, ref } from "vue";
import { PokemonService } from "../../services/pokemonService";
import PokeCard from "./PokeCard.vue";
import { IPokemon } from "../../interfaces/pokemonInterface";

const pokemonService = new PokemonService();

const loading: Ref<Boolean> = ref(true);
let pokemons: IPokemon[] = reactive([]);
const searchTerm: Ref<string> = ref("");

async function loadPokemons(getPokemonsFunction: Function) {
  pokemons = [];

  loading.value = true;

  try {
    pokemons = await getPokemonsFunction();
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}

async function searchPokemon() {
  let getPokemonsFunction = async () => {
    return await pokemonService.getPokemons();
  };

  const hasSearchTerm = searchTerm.value.length > 0;

  if (hasSearchTerm) {
    getPokemonsFunction = async () => {
      return await pokemonService.findPokemonsBySearchTerm(searchTerm.value);
    };
  }

  await loadPokemons(getPokemonsFunction);
}

async function getPreviousPage() {
  await loadPokemons(async () => {
    return await pokemonService.getPreviousPage();
  });
  window.scrollTo(0, 0);
}

async function getNextPage() {
  await loadPokemons(async () => {
    return await pokemonService.getNextPage();
  });
  window.scrollTo(0, 0);
}

function onKeyPressInput(event: KeyboardEvent) {
  searchPokemon();
}

onMounted(async () => {
  await pokemonService.loadAllPokemons();
  await searchPokemon();
});
</script>

<template>
  <div class="pokemon-list-container">
    <div class="search-bar w-100 d-flex justify-content-center mb-4">
      <div class="col-12 col-md-6 d-flex gap-2 align-items-center">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="text" class="col" placeholder="Search pokemon..." aria-label="Search pokemon"
          aria-describedby="button-addon2" v-model="searchTerm" @keypress="onKeyPressInput" />
      </div>
    </div>

    <div v-if="loading" class="loading">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-if="!loading && pokemons.length === 0" class="no-pokemons">
      <h1>No pokemon found</h1>
    </div>

    <div v-if="!loading && pokemons.length > 0">
      <div class="pokemon-list row justify-content-between">
        <div v-for="pokemon in pokemons" :key="pokemon.id" class="pokemon-card col-12 col-sm-6 col-md-3 mb-4">
          <PokeCard :pokemon="pokemon" v-if="pokemon.id" />
        </div>
      </div>

      <div class="paginator w-100 d-flex gap-4 justify-content-center mt-4" v-if="!searchTerm">
        <button class="btn" type="button" @click="getPreviousPage">
          <i class="fa-solid fa-chevron-left"></i>
          Previous
        </button>
        <button class="btn" type="button" @click="getNextPage">
          Next
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../assets/scss/variables.scss";

.pokemon-list-container {
  .search-bar {
    div {
      border-radius: 0.25rem;
      background-color: $secondary;
      padding: 0.5rem;

      i {
        margin-inline: 0.5rem;
      }

      input {
        border: none;
        background-color: transparent;
        color: $gray;
        font-size: 1rem;

        &:focus {
          outline: none;
        }
      }
    }
  }

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .no-pokemons {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .pokemon-list {
    .pokemon-card {
      display: flex;
      justify-content: center;
    }
  }

  .paginator {
    button {
      border: 1px solid $primary;
      color: $primary;
      border-radius: 0.25rem;
      padding: 0.5rem;

      &:hover {
        background-color: $primary;
        color: $gray;
      }
    }
  }
}
</style>
