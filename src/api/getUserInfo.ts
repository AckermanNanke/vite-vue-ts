import Request from "@utils/request";
import { AxiosResponse } from "axios";

export type resType = {
  /**
   * 用户名
   */
  username: string;
};
/**
 * 获取用户信息
 * @param data
 * @returns
 */
export function getUserInfo() {
  return Request.instance.post<resType, AxiosResponse<resType>>("getuserinfo");
}
