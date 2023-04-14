<script setup lang="ts" />

<template>
  <header class="header">
    <router-link to="/"
      ><img
        class="logo"
        src="../../assets/poke-logo.png"
        alt="logo"
      />
    </router-link>
  </header>
</template>

<style scoped lang="scss">
header {
  margin-bottom: 2.5rem;
}

.logo {
  height: 10rem;
}
</style>
