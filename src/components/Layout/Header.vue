<script setup lang="ts">
import IconPokeball from "../Icons/IconPokeball.vue";
</script>

<template>
  <header class="header d-flex justify-content-center">
    <router-link to="/"><img class="logo" src="../../assets/poke-logo.png" alt="logo" />
    </router-link>
  </header>
</template>

<style scoped lang="scss">
@import "../../assets/scss/variables.scss";

header {
  margin-bottom: 1rem;
}

.logo {
  height: 10rem;
}
</style>
