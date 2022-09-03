import Request from "@utils/request";
import { AxiosResponse } from "axios";

export type reqType = {
  accountNumber: string;
  password: string;
};
export type resType = {
  /**
   * 用户名
   */
  accessToken: string
  userID: string;
  username: string;
  userphone: string;
  userEmail: string;
};
/**
 * 登录接口
 * @param { String } accountNumber
 * @param { String } password
 * @returns { Promise }
 */
export function login(data: reqType) {
  return Request.instance.post<resType, AxiosResponse<resType>, reqType>("login", data);
}
