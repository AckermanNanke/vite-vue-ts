import {
  $http,
  $loacalStorage,
  $message,
  $sessionStorage
} from "@utils/pluginKey";
import Request from "@utils/request";
import { readonly } from "vue";
import { FLocal, Fsession } from "./baseUtils";

/**
 * ant-design-vue
 * 需手动导入方法与样式
 */
import { message } from "ant-design-vue";
import "ant-design-vue/es/message/style/css"; //vite只能用 ant-design-vue/es 而非 ant-design-vue/lib

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
     * ant-design 手动导入方法
     * @param  { MessageApi } message  全局提示
     */
    app.provide($message, readonly(message));
  },
};
