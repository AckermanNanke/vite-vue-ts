import { createApp } from "vue";
import App from "./App.vue";
// 挂载axios请求
// import { setHttp } from "@config/http";
import { setHttp } from "/src/config/http";

/**
 * mock模式下
 * 不修改任何请求数据与返回数据
 * 直接返回mock数据
 */
if (import.meta.env.MODE === "mock") {
  import("./mock/");
}
createApp(App).use(setHttp).mount("#app");

console.log("构建信息");
console.log(import.meta.env);
console.log("构建信息");
