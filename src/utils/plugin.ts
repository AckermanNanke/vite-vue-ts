import { InjectionKey, readonly } from "vue";
import {
  $loacalStorage,
  $sessionStorage,
  $http,
  $Router,
  $message,
} from "@utils/pluginKey";
import { Router, useRouter } from "vue-router";
import Request from "@utils/request";
import { FLocal, freeStorage, Fsession } from "./baseUtils";
import { AxiosInstance } from "axios";

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
    app.provide($message, message);
  },
};
