import Request from "@utils/request";
import { AxiosResponse } from "axios";

export type reqType = {
  accountNumber: string;
  password: string;
  phone: string;
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
 * @param { String } accountNumber
 * @param { String } password
 * @param { String } phone
 * @param { String } smsVerifiationCode
 * @returns { Promise }
 */
export function register(data: reqType): Promise<AxiosResponse<reqType, resType>> {
  return Request.instance.post<resType, AxiosResponse<reqType, resType>, reqType>(
    "register",
    data
  );
}
