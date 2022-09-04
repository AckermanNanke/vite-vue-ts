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
    path: "/reset-password",
    component: () => import("/src/pages/user/reset-password.vue"),
    children: [
      {
        name: "step1",
        path: "step1",
        component: () => import("/src/pages/user/components/reset-password-step1.vue"),

      }
    ]
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
