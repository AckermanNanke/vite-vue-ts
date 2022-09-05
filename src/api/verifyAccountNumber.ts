import Request from "@utils/request";
import { AxiosResponse } from "axios";

export type reqType = {
  /**
   * 账号
   */
  accountNumber: string;
};
export type resType = {
};
/**
 *
 * @param { String } userID
 * @returns { Promise }
 */
export function verifyAccountNumber(data: reqType) {
  return Request.instance.post<resType, AxiosResponse<resType>, reqType>("verifyaccountnumber", data);
}
