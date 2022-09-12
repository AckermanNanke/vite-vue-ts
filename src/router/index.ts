import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
/**
 * params传参需在此定义传参类型
 * 例如：/user-result:type:urlName:status:countDown?
 */
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/index",
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
    path: "/user-result:type:urlName:status:countDown?",
    component: () => import("/src/pages/user/reult.vue"),
    props: true
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
