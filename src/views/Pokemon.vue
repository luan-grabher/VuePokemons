<script lang="ts" setup>
import { Ref, onMounted, reactive, ref } from "vue";
import { PokemonService } from "../services/pokemonService";
import { useRoute } from "vue-router";
import PokemonTypes from "../components/Pokedex/PokemonTypes.vue";
import PokemonSizes from "../components/Pokedex/PokemonSizes.vue";
import PokemonAbilities from "../components/Pokedex/PokemonAbilities.vue";
import { IPokemon } from "../interfaces/pokemonInterface";

const pokemonService = new PokemonService();

let pokemon: Ref<IPokemon | null> = ref({} as IPokemon);
const loading: Ref<Boolean> = ref(true);

const route = useRoute();
const nameOnRoute = `${route.params.name}`;

async function getPokemon() {
  pokemon.value = await pokemonService.getPokemon(nameOnRoute);
  loading.value = false;
}

onMounted(async () => {
  await getPokemon();
});
</script>

<template>
  <div class="container px-5 px-md-0" v-if="pokemon?.id">
    <div class="pokemon-title">
      <p class="pokemon-id">#{{ pokemon.id }}</p>
      <p class="pokemon-name">{{ pokemon.name }}</p>
    </div>
    <div class="pokemon-details-and-image row">
      <div class="pokemon-sprite col-12 col-md-7 mx-auto">
        <img :src="pokemon.imageSrc" alt="poke-sprite" class="mx-auto d-block" />
      </div>

      <div class="pokemon-details col-12 col-md-4 pt-3 pt-md-0">
        <div class="pokemon-types">
          <PokemonTypes :pokemonTypes="pokemon.types" />
        </div>
        <div class="pokemon-sizes">
          <PokemonSizes :height="pokemon.height" :weight="pokemon.weight" textAlign="start" />
        </div>
        <div class="pokemon-habilities d-flex gap-2">
          <PokemonAbilities :pokemonAbilities="pokemon.abilities" />
        </div>
        <div class="base-status">
          <h5>Base Status:</h5>

          <div class="base-status-items d-flex justify-content-between flex-wrap gap-2">
            <div>HP: {{ pokemon.life }}</div>
            <div>Attack: {{ pokemon.attack }}</div>
            <div>Defense: {{ pokemon.defense }}</div>
            <div>Sp. Atk: {{ pokemon.spAttack }}</div>
            <div>Sp. Def: {{ pokemon.spDefense }}</div>
            <div>Speed: {{ pokemon.speed }}</div>
          </div>
        </div>

        <div class="pokemon-games">
          <h5>Found in games:</h5>
          <div class="d-flex flex-wrap gap-2 justify-content-between">
            <span v-for="game in pokemon.games" :key="game" class="badge">
              {{ game }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/scss/variables.scss";

.container {
  min-width: 375px;
  max-width: 920px;

  .pokemon-title {
    font-weight: bold;
    line-height: 1.8rem;

    .pokemon-name {
      font-size: 2rem;
    }

    .pokemon-id {
      font-size: 1.5rem;
      color: $primary;
    }
  }

  .pokemon-details-and-image {
    .pokemon-sprite {
      img {
        filter: drop-shadow(10px 10px 10px #222);
        width: 80%;
      }
    }

    .pokemon-details {
      >div {
        margin-bottom: 1rem;
      }

      .base-status {
        .base-status-items {
          div {
            border-radius: 0.5rem;
            background-color: $secondary;
            color: $gray;
            font-weight: bold;
            font-size: 0.8rem;
            padding: 0.2rem 0.5rem;
            text-transform: uppercase;
            box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1),
              0 1px 3px 0 rgba(0, 0, 0, 0.1);
          }
        }
      }

      .pokemon-games {
        span {
          text-transform: uppercase;
          background-color: $primary-dark;
        }
      }

    }
  }
}
</style>
