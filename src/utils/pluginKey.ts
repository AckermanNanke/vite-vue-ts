import { freePopup, freeStorage } from "@utils/baseUtils";
import { AxiosInstance } from "axios";
import type { InjectionKey } from "vue";


/**
 * 应用级注入属性时使用的key值
 */
export const $http = Symbol() as InjectionKey<AxiosInstance>;
export const $sessionStorage = Symbol() as InjectionKey<freeStorage>;
export const $loacalStorage = Symbol() as InjectionKey<freeStorage>;
export const $message = Symbol() as InjectionKey<freePopup>;
