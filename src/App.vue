<script setup lang="ts">
import Header from "./components/Layout/Header.vue";
import Footer from "./components/Layout/Footer.vue";
</script>

<template>
  <Header />
  <router-view style="z-index: 2" />
  <Footer />
</template>

<style lang="scss">
@import "./assets/scss/variables.scss";

body {
  color: $gray-light;
  background: linear-gradient(to bottom, $dark, $dark-light);
}

p {
  margin: 0px;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}
</style>
