<script lang="ts">
import { defineComponent } from "vue";
import { PokemonService } from "../services/pokemonService";
import { IPokemon } from "../interfaces/pokemon-interface";
import PokeCard from "../components/PokeData/PokeCard.vue";

const pokemonService = new PokemonService();

export default defineComponent({
  name: "Pokemon",
  data() {
    return {
      pokemon: {} as IPokemon | null,
      loading: true,
    };
  },
  async created() {
    this.pokemon = await pokemonService.getPokemon(
      `${this.$route.params.name}`
    );
    this.loading = false;
  },
  components: { PokeCard },
});
</script>

<template>
  <div class="detalhes-pokemon" v-if="pokemon">
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
      <p>
        Habilidades:
        <span
          v-for="habilidade in pokemon.habilidades"
          :key="habilidade"
          class="badge bg-secondary"
        >
          {{ habilidade }}
        </span>
      </p>
    </div>
    <div class="status">
      <p>Vida: {{ pokemon.vida }}</p>
      <p>Ataque: {{ pokemon.ataque }}</p>
      <p>Defesa: {{ pokemon.defesa }}</p>
      <p>Ataque Especial: {{ pokemon.ataqueEspecial }}</p>
      <p>Defesa Especial: {{ pokemon.defesaEspecial }}</p>
      <p>Velocidade: {{ pokemon.velocidade }}</p>
    </div>

    <div class="pokemon-extra">
      <p>
        Quantidade de movimentos disponíveis:
        {{ pokemon.quantidadeMovimentosDisponiveis }}
      </p>
      <p>
        Games:
        <span
          v-for="game in pokemon.games"
          :key="game"
          class="badge bg-secondary"
        >
          {{ game }}
        </span>
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>
