import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// 挂载axios
import { setHttp } from "@utils/baseSetting";

export const app = createApp(App);
app.use(router).use(setHttp).mount("#app");

console.log("构建信息");
console.log(import.meta.env);
console.log(app);
console.log("构建信息");
