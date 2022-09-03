import Request from "@utils/request";
import { AxiosResponse } from "axios";

export type reqType = {
  /**
   * 行号
   */
  bankNo: string;
};
export type resType = {
  /**
   * 消息数量
   */
  bankNo1: string;
};
/**
 *
 * @param { String } userID
 * @returns { Promise }
 */
export function getBankInfo(data: reqType) {
  return Request.instance.post<resType, AxiosResponse<resType>, reqType>("getbankinfo", data);
}
