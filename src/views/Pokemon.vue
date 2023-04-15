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
            pokemon: {} as IPokemon,
            loading: true,
        };
    },
    async created() {
        this.pokemon = await pokemonService.getPokemon(`${this.$route.params.name}`);
        this.loading = false;
    },
    components: { PokeCard }
});

</script>

<template>
  <div class="detalhes-pokemon">
    <!-- TODO: mostrar os detalhes de uma forma diferente e remover o PokeCard -->
    <PokeCard :pokemon="pokemon" v-if="pokemon.id" />
  </div>
</template>

<style scoped lang="scss">
</style>
