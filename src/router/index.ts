import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    name: "index",
    path: "/index",
    component: () => import("/src/pages/index.vue"),
  },
  {
    name: "register",
    path: "/register",
    component: () => import("/src/pages/register.vue"),
  },
  {
    name: "login",
    path: "/login",
    component: () => import("/src/pages/login.vue"),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
