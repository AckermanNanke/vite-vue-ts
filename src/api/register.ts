import Request from "@utils/request";
import { AxiosResponse } from "axios";

export type reqType = {
  userName: string;
  password: string;
  phone: number;
  smsVerifiationCode: string;
};
export type resType = {
  /**
   * 用户名
   */
  token: string;
};
/**
 * 注册
 * @param { String } userName
 * @param { String } password
 * @param { String } phone
 * @param { String } smsVerifiationCode
 * @returns { Promise }
 */
export function register(data: reqType) {
  return Request.instance.post<resType, AxiosResponse<resType>, reqType>(
    "register",
    data
  );
}
