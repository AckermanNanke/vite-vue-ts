import type { InjectionKey } from "vue";
import { AxiosInstance } from "axios";
import { freeStorage } from "@utils/baseUtils";
/**
 * 应用级注入属性时使用的key值
 */
export declare const $http = Symbol as InjectionKey<AxiosInstance>;
export declare const $sessionStorage = Symbol as InjectionKey<freeStorage>;
export declare const $loacalStorage = Symbol as InjectionKey<freeStorage>;
