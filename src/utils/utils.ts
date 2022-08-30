import type { reqType as loginDatatype } from "@api/login";
import { login } from "@api/login";
import type { reqType as registerDataType } from "@api/register";
import { Fsession } from "./baseUtils";

import { register } from "@api/register";
import router from "../router";
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
