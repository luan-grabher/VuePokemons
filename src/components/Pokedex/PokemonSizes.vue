<script lang="ts" setup>
import { Ref, defineProps, ref } from "vue";


const props = defineProps({
    height: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    textAlign: {
        type: String,
        required: false
    }
});
</script>

<template>
    <div class="pokemon-sizes-content d-flex">
        <div class="col-6" :class="`text-${textAlign || 'center'}`">
            <div class="size-label">
                <i class="fa-solid fa-up-down"></i>
                Height
            </div>
            <div class="size-value">
                {{ height }}cm
            </div>
        </div>
        <div class="col-6" :class="`text-${textAlign || 'center'}`">
        <div class="size-label">
            <i class="fa-solid fa-weight-hanging"></i>
            Weight
        </div>
        <div class="size-value">
            {{ weight }}kg
        </div>
    </div>
</div></template>

<style scoped lang="scss">
@import "../../assets/scss/variables.scss";

.pokemon-sizes-content {
    .size-label {
        font-size: 0.7rem;
        font-weight: bold;
        color: $gray;
    }

    .size-value {
        color: $primary;
        font-size: 1rem;
        font-weight: bold;
    }
}
</style>