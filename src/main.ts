import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

export const app = createApp(App);
app.use(router).mount("#app");

console.log("构建信息");
console.log(import.meta.env);
console.log(app);
console.log("构建信息");
