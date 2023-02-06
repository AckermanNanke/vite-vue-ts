import {
  $http,
  $loacalStorage,
  $message,
  $sessionStorage
} from "@config/data/pluginKey";
import { FLocal, Fpopup, Fsession } from "@config/pluginImplements";
import Request from "@utils/request";
import { readonly } from "vue";


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
     * 提供全局提示弹窗
     * @param  { MessageApi } message  
     */
    app.provide($message, readonly(Fpopup));
  },
};
