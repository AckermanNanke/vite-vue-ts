import {
  $http,
  $loacalStorage,
  $message,
  $Router,
  $sessionStorage
} from "@utils/pluginKey";
import Request from "@utils/request";
import { readonly } from "vue";
import { useRouter } from "vue-router";
import { FLocal, Fsession } from "./baseUtils";

import { message } from "ant-design-vue";
import "ant-design-vue/es/message/style/css"; //vite只能用 ant-design-vue/es 而非 ant-design-vue/lib

const router = useRouter();

/**
 * 插件安装方法封装
 */
export default {
  install: function (app: any, options: unknown) {
    /**
     * 提供全局缓存插件使用方法
     */
    app.provide($loacalStorage, readonly(FLocal));
    app.provide($sessionStorage, readonly(Fsession));
    /**
     * 提供全局请求插件使用方法
     */
    app.provide($http, readonly(Request.instance));
    /**
     * 提供全局路由使用方法
     */
    app.provide($Router, router);
    /**
     * ant-design 手动导入方法
     * @param  { MessageApi } message  全局提示
     */
    app.provide($message, message);
  },
};
