import Request from "@utils/request";
import { AxiosResponse } from "axios";

export type reqType = {
  /**
   * 场景编码
   */
  sceneValue: string;
  /**
   * 手机号
   */
  phone: string;
};

export type resType = {
  /**
   * 手机号
   */
  smsVerifiationCode: string;
};

/**
 * 获取用户信息
 * @param data
 * @returns
 */
export function getSmsCode(data: reqType) {
  return Request.instance.post<resType, AxiosResponse<resType>, reqType>("getsmscode", data);
}
