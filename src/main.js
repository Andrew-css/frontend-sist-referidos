import { createApp } from "vue";
import { router } from "./routes/routes.js";
import { createPinia } from "pinia";
import axios from "axios";
import App from "./App.vue";


axios.defaults.baseURL = 'https://backend-sistema-referidos.onrender.com/api/'

const pinia = createPinia();

const myApp = createApp(App);

myApp.use(pinia);
myApp.use(router);

myApp.mount("#app");
