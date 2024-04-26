import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import "bootstrap/dist/css/bootstrap.css";
import "primevue/resources/themes/bootstrap4-light-blue/theme.css";

const app = createApp(App);

/*
 * Use of PrimeVue component library for reusable and documented componets to speed up
 */
app.use(PrimeVue);

app.mount("#app");
