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
    component: () => import("/src/pages/user/register.vue"),
  },
  {
    name: "login",
    path: "/login",
    component: () => import("/src/pages/user/login.vue"),
  },
  {
    name: "reset-password",
    path: "/reset-password/:id",
    component: () => import("/src/pages/user/reset-password.vue"),
  },
  {
    name: "user-result",
    path: "/user-result",
    component: () => import("/src/pages/user/reult.vue"),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
