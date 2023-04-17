<script  lang="ts" setup>
import PokemonSizes from "./PokemonSizes.vue";
import PokemonTypes from "./PokemonTypes.vue";
import PokemonAbilities from "./PokemonAbilities.vue";
import { IPokemon } from "../../interfaces/pokemonInterface";

defineProps({
    pokemon: {
        type: Object as () => IPokemon | null,
        required: true
    }
});
</script>

<template>
  <div class="w-100 h-100" v-if="pokemon">
    <router-link :to="`/pokemon/${pokemon.name}`" class="h-100 d-block">
      <div class="card px-3 pb-3 shadow h-100">
        <img :src="pokemon.imageSrc" alt="poke-sprite" class="col-8 col-md-12 mx-auto" />
        <div class="pokemon-title">          
          <p class="pokemon-name">{{ pokemon.name }}</p>
          <p class="pokemon-id" >#{{ pokemon.id }}</p>
        </div>
        <div class="pokemon-types">
          <PokemonTypes :pokemonTypes="pokemon.types" />
        </div>
        <div class="pokemon-sizes">
          <PokemonSizes :height="pokemon.height" :weight="pokemon.weight" />
        </div>
        <div class="pokemon-habilities d-flex gap-2">
          <PokemonAbilities :pokemonAbilities="pokemon.abilities" />
        </div>
      </div>
    </router-link>
  </div>
</template>

<style scoped lang="scss">
@import "../../assets/scss/variables.scss";

a {
  text-decoration: none;
  color: $gray;
}

.card {
  border: 1px solid $gray-dark;
  border-radius: 0.5rem;
  background-color: $secondary;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }

  img {
    //shadow
    filter: drop-shadow(5px 5px 5px #222);
  }

  .pokemon-title{
    margin-top: 0.5rem;
    line-height:  1.4rem;
    .pokemon-name{
      font-size: 1.5rem;
      font-weight: 600;
      text-transform: capitalize;
    }
    .pokemon-id{
      font-size: 1rem;
      font-weight: 400;
      color: $gray-medium;
      font-weight: bold;
    }
  }

  .pokemon-types{
    margin-top: 0.5rem;
  }

  .pokemon-sizes{
    margin-block: 1rem;
  }
}
</style>
