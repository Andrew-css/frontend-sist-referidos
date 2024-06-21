import { createRouter, createWebHashHistory } from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import Formulario from "../components/Formulario.vue"



const routes = [
  { path: "/", component: HelloWorld },
  { path: "/formulario", component: Formulario },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
