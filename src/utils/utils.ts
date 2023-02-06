import type { reqType as loginDatatype } from "@api/login";
import { login } from "@api/login";
import type { reqType as registerDataType } from "@api/register";
import { Fsession } from "@config/pluginImplements";

import { register } from "@api/register";
import router from "../router";

/**
 * 防抖函数
 * @param { Function } fn 传入的处理方法
 * @param { number } delay 延迟时间
 * */
export function debounce(fn: Function, delay: number = 1000): Function {
  let Timer: NodeJS.Timer | null = null;
  return function () {
    clearTimeout(Number(Timer));
    Timer = setTimeout(() => {
      fn.call(null, arguments);
    }, delay);
  };
};

/**
 * 节流函数
 * @param func 使用节流函数的方法
 * @param delay 间隔时间
 * @returns 
 */
export function throttle(func: Function, delay: number): (this: any) => void {
  let preTime = 0;
  return function (this: any) {
    let now = Date.now();
    if (Date.now() - preTime > delay) {
      func.apply(this, arguments);
      preTime = now;
    }
  }
}

/**
 * 注册方法封装
 * @param data 注册用参数
 */
export function toRegister(data: registerDataType) {
  return register(data)
    .then((res) => {
      Fsession.set("tokrn", res.data.token);
      router.replace({
        path: "/login",
      });
      return Promise.resolve(res.data);
    })
    .catch((err) => {
      Fsession.clear();
      return Promise.reject(err);
    });
}
/**
 * 登录方法封装
 * @param data 登录用参数
 */
export function toLogin(data: loginDatatype) {
  return login(data)
    .then((res) => {
      Fsession.set("userInfo", res.data);
      router.replace({
        path: "/index",
      });
      return Promise.resolve(res.data);
    })
    .catch((err) => {
      Fsession.clear();
      return Promise.reject(err);
    });
}
