import type { InjectionKey } from "vue";
import { AxiosInstance } from "axios";
import { freeStorage } from "@utils/baseUtils";
import { Router } from "vue-router";

import { MessageApi } from "ant-design-vue/lib/message";

/**
 * 应用级注入属性时使用的key值
 */
export const $http = Symbol() as InjectionKey<AxiosInstance>;
export const $sessionStorage = Symbol() as InjectionKey<freeStorage>;
export const $loacalStorage = Symbol() as InjectionKey<freeStorage>;
export const $Router = Symbol() as InjectionKey<Router>;
export const $message = Symbol() as InjectionKey<MessageApi>;
