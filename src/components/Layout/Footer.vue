<script lang="ts">
const thisYear = new Date().getFullYear();

export default {
  data() {
    return { thisYear };
  },
};
</script>

<template>
  <div class="footer-box">
    Pokedex App &copy; {{ thisYear }}
  </div>
</template>

<style scoped lang="scss">
.footer-box {
  margin-top: 5rem;
}
</style>
