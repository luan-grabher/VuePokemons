<script lang="ts" setup>
import { ref } from "vue";

const msg = ref("Hello, World!");
</script>

<template>
    <div class="dashboard">
        <h1>Dashboard</h1>
        <p>{{ msg }}</p>
    </div>
</template>