import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// 引入第三方插件库
import plugin from "@config/plugin";

// 阿里云图标库
import "@assets/iconfont/iconfont.css";

export const app = createApp(App);
app.use(router).use(plugin).mount("#app");

if (!import.meta.env.PROD) {
  console.log("初始化信息");
  console.log(import.meta.env);
  console.log("初始化信息");
}
