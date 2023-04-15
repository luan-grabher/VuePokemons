<script lang="ts" setup>
import { onMounted, reactive, Ref, ref } from "vue";
import { IPokemon } from "../../interfaces/pokemon-interface";
import { PokemonService } from "../../services/pokemonService";
import PokeCard from "../PokeData/PokeCard.vue";

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
};

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
};

async function getPreviousPage() {
    await loadPokemons(async () => {
        return await pokemonService.getPreviousPage();
    });
    window.scrollTo(0, 0);
};

async function getNextPage() {
    await loadPokemons(async () => {
        return await pokemonService.getNextPage();
    });
    window.scrollTo(0, 0);
};

function onKeyPressInput(event: KeyboardEvent) {
    if (event.key === "Enter") searchPokemon();
};

onMounted(async () => {   
    await pokemonService.loadAllPokemons(); 
    await searchPokemon();
});
</script>

<template>
    <div class="pokemon-list-container">
        <div class="search-bar w-100 d-flex justify-content-center mb-4">
            <div class="col-6 d-flex gap-2">
                <input type="text" class="form-control" placeholder="Pesquisar pokemon" aria-label="Pesquisar pokemon"
                    aria-describedby="button-addon2" v-model="searchTerm" @keypress="onKeyPressInput" />
                <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="searchPokemon">
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
                <div v-for="pokemon in pokemons" :key="pokemon.id" class="pokemon-card col-12 col-sm-6 col-md-2">
                    <PokeCard :pokemon="pokemon" v-if="pokemon.id" />
                </div>
            </div>

            <div class="paginator w-100 d-flex gap-2 justify-content-center mt-4">
                <button class="btn btn-outline-secondary" type="button" @click="getPreviousPage">
                    Anterior
                </button>
                <button class="btn btn-outline-secondary" type="button" @click="getNextPage">
                    Próximo
                </button>
            </div>
        </div>
    </div>
</template>
