import Request from "@utils/request";
import { FLocal, Fsession } from "./baseUtils";
import { app } from "src/main";
import { readonly } from "vue";
import { $loacalStorage, $sessionStorage, $http } from "@config/data/pluginKey";

/**
 * 提供全局缓存插件使用方法
 */
app.provide($loacalStorage, readonly(FLocal));
app.provide($sessionStorage, readonly(Fsession));
/**
 * 提供全局请求插件使用方法
 */
app.provide($http, readonly(Request.instance));
