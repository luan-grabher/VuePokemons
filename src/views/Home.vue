<script lang="ts">
import Dashboard from "../components/Dashboard/Dashboard.vue";
import IconPokeballVue from "../components/Icons/IconPokeball.vue";
import PokemonList from "../components/PokemonList/PokemonList.vue";

const tabs = [
  {
    name: "Dashboard",
    component: Dashboard,
    icon: IconPokeballVue,
  },
  {
    name: "Pokemons",
    component: PokemonList,
    icon: IconPokeballVue,
  },
];

const currentTab = tabs[0];

export default {
  name: "Home",
  components: {
    PokemonList,
    Dashboard,
  },
  data() {
    return {
      tabs,
      currentTab,
      fillIconSelected: "#000",
      fillIconNotSelected: "red",
    };
  },
};

console.log(currentTab);
</script>

<template>
  <div class="home">
    <div class="tabs">
      <div
        v-for="tab in tabs"
        :key="tab.name"
        class="tab"
        :class="{ active: tab.name === currentTab.name }"
        @click="currentTab = tab"
      >
        <div class="icon">
          <component :is="tab.icon" :fill="fillIconSelected" />
        </div>
        {{ tab.name }}
      </div>
    </div>

    <component :is="currentTab.component" />
  </div>
</template>

<style lang="scss" scoped>
.home {
  .tabs {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 50px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 20px;

    .tab {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      .icon {
        width: 30px;
        height: 30px;
        margin-right: 10px;
      }

      &.active {
        color: #000;
        font-weight: bold;
        border-bottom: 2px solid #000;
      }
    }
  }
}
</style>
