<script lang="ts" setup>
import { ref } from "vue";
import Dashboard from "../components/Dashboard/Dashboard.vue";
import PokemonList from "../components/PokemonList/PokemonList.vue";
import pokeballSVG from "../assets/pokeball.svg";
import pokedexSVG from "../assets/pokedex.svg";

interface Tab {
  name: string;
  component: any;
  svgSrc: string;
}

const tabs: Tab[] = [
  {
    name: "Dashboard",
    svgSrc: pokeballSVG
  } as Tab,
  {
    name: "Pokedex",
    svgSrc: pokedexSVG
  } as Tab,
];

const currentTab = ref(tabs[0]);
</script>

<template>
  <div class="home container">
    <div class="tabs rounded d-flex justify-content-around shadow-sm mb-4">
      <div
        v-for="tab in tabs"
        :key="tab.name"
        class="tab"
        :class="{ active: tab.name === currentTab.name }"
        @click="currentTab = tab"
      >
        <div class="icon">
          <img :src="tab.svgSrc" />
        </div>
        {{ tab.name }}
      </div>
    </div>

    <div class="tab-contents">
      <Dashboard v-show="currentTab.name === 'Dashboard'" />
      <PokemonList v-show="currentTab.name === 'Pokedex'" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "../assets/scss/variables.scss";

.home {
  min-width: 375px;
  max-width: 920px;

  .tabs {
    background-color: $secondary;

    .tab {
      padding: 1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      font-weight: bold;

      .icon {
        width: 2.5rem;
        height: 2.5rem;
        margin-right: 0.5rem;

        img {
          filter: $filter-gray-light;
        }
      }

      &.active {
        color: $primary;
        border-bottom: 4px solid $primary;

        .icon {
          img {
          filter: $filter-primary;
        }
        }
      }
    }
  }
}
</style>
