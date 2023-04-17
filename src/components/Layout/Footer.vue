<script lang="ts">
const thisYear = new Date().getFullYear();

export default {
  data() {
    return { thisYear };
  },
};
</script>

<template>
  <div class="footer-box w-100 text-center mb-5">
    Pokedex App &copy; {{ thisYear }}
  </div>
</template>

<style scoped lang="scss">
.footer-box {
  margin-top: 5rem;
}
</style>
