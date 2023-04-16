<script lang="ts" setup>
import { Ref, defineProps, ref } from "vue";


const props = defineProps({
    altura: {
        type: Number,
        required: true,
    },
    peso: {
        type: Number,
        required: true,
    }
});

const altura: Ref<number> = ref(props.altura);
const peso: Ref<number> = ref(props.peso);


</script>

<template>
    <div class="pokemon-sizes-content d-flex">
        <div class="col-6 text-center">
            <div class="size-label">
                <i class="fa-solid fa-up-down" ></i>
                Altura
            </div>
            <div class="size-value">                
                {{ altura }}cm
            </div>
        </div>
        <div class="col-6 text-center">
            <div class="size-label">
                <i class="fa-solid fa-weight-hanging" ></i>
                Peso
            </div>
            <div class="size-value">
                {{ peso }}kg
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import "../../assets/scss/variables.scss";

    .pokemon-sizes-content{
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