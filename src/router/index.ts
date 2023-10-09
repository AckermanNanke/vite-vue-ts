import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
/**
 * TODO
 * params传参需在此定义传参类型，会导致页面 URL 展示不对，正在查找原因
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
    name: "infiniteScroll",
    path: "/infiniteScroll",
    component: () => import("/src/pages/infiniteScroll.vue"),
  },
  {
    name: "faceH5",
    path: "/faceH5",
    component: () => import("/src/pages/faceH5.vue"),
  },
  {
    name: "calendar",
    path: "/calendar",
    component: () => import("/src/pages/calendar.vue"),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
