import { createApp } from "vue";
import { router } from "./routes/routes.js";
import { createPinia } from "pinia";
import axios from "axios";
import App from "./App.vue";
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'


axios.defaults.baseURL = 'http://localhost:3005/api/'

const pinia = createPinia();

const myApp = createApp(App);

myApp.use(pinia);
myApp.use(router);
myApp.use(FloatingVue);

myApp.mount("#app");
