import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// 引入第三方插件库
import plugin from "@utils/plugin";

export const app = createApp(App);
app.use(router).use(plugin).mount("#app");

if (!import.meta.env.PROD) {
  console.log("构建信息");
  console.log(import.meta.env);
  console.log(app);
  console.log("构建信息");
}
