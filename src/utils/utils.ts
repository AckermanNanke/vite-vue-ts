import type { reqType } from "@api/login";
import { login } from "@api/login";
import { FLocal, Fsession } from "./baseUtils";

import router from "../router";
/**
 * 登录方法封装
 * @param data 登录用参数
 */
export function toLogin(data: reqType) {
  return login(data)
    .then((res) => {
      Fsession.set("userInfo", res.data);
      router.replace({
        path: "/index",
      });

      return Promise.resolve(res.data);
    })
    .catch((err) => {
      console.log(err, 1111111111);
      Fsession.clear();
      return Promise.reject(err);
    });
}
