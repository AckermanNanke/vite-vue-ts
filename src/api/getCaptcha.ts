import Request from "@utils/request";
import { AxiosResponse } from "axios";

export type reqType = {
  /**
   * 手机号
   */
  phone: string;
};

export type resType = {
  /**
   * 手机号
   */
  captcha: string;
};

/**
 * 获取用户信息
 * @param data
 * @returns
 */
export function getCaptcha(data: reqType) {
  return Request.instance.post<resType, AxiosResponse<resType>, reqType>("getcaptcha", data);
}
