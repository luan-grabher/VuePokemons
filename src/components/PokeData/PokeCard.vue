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
      <div class="card p-3 shadow">
        <img :src="pokemon.imageSrc" alt="poke-sprite" />
        <div class="pokemon-title">
          <p>#{{ pokemon.id }}</p>
          <p>{{ pokemon.name }}</p>
        </div>
        <div class="pokemon-types">
          <p v-for="tipo in pokemon.tipos" :key="tipo">
            {{ tipo }}
          </p>
        </div>
        <div class="pokemon-sizes">
          <p>Altura: {{ pokemon.altura }}cm</p>
          <p>Peso: {{ pokemon.peso }}kg</p>
        </div>
        <div class="pokemon-habilities d-flex gap-2">
          <p>Habilidades: 
            <span v-for="habilidade in pokemon.habilidades" :key="habilidade" class="badge bg-secondary">
              {{ habilidade }}
            </span>
          </p>
        </div>

        <button class="btn btn-outline-secondary" type="button">
        Detalhes
      </button>
      </div>
    </router-link>
  </div>
</template>

<style scoped lang="scss">
</style>
