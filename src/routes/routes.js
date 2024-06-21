import { createRouter, createWebHashHistory } from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import Formulario from "../components/Formulario.vue";
import FormularioReferente from "../components/FormReferente.vue"
import Resenas from "../components/resena.vue"



const routes = [
  { path: "/", component: HelloWorld },
  { path: "/formulario", component: Formulario },
  { path: "/formref", component: FormularioReferente },
  { path: "/resena", component: Resenas },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
