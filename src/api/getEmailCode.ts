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
  email: string;
};

export type resType = {
  /**
   * 验证码
   */
  emailVerifiationCode: string;
};

/**
 * 获取用户信息
 * @param data
 * @returns
 */
export function getEmailCode(data: reqType) {
  return Request.instance.post<resType, AxiosResponse<resType>, reqType>("getemailcode", data);
}
