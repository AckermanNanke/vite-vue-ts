import Request from "@utils/request";
import { AxiosResponse } from "axios";

export type reqType = {
  /**
   * 账号
   */
  accountNumber: string;
  /**
   * 验证码
   */
  verifiationCode: string;
  /**
   * 找回类型
   */
  retrieveType: string;
};
export type resType = {
};
/**
 *
 * @param { String } userID
 * @returns { Promise }
 */
export function verifyAccountCode(data: reqType) {
  return Request.instance.post<resType, AxiosResponse<resType>, reqType>("verifyaccountcode", data);
}
