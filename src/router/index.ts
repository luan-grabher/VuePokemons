import { createRouter, createWebHistory } from "vue-router";
import HomeVue from "../views/Home.vue";
import PokemonVue from "../views/Pokemon.vue";

const routes = [
  { path: "/", name: "Home", component: HomeVue },
  { path: "/pokemon/:name", name: "Detalhes Pokemon", component: PokemonVue },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
