import type { reqType } from "@api/login";
import { login } from "@api/login";
import { Fsession } from "@utils/baseUtils";
/**
 * 登录方法封装
 * @param data 登录用参数
 */
function toLogin(data: reqType) {
  login(data).then((res) => {
    Fsession.set("userInfo", res.data);
  });
}
export { toLogin };
