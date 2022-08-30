import Request from "@utils/request";
import { AxiosResponse } from "axios";

export type reqType = {
  /**
   * 用户ID
   */
  userID: string;
};
export type resType = {
  /**
   * 消息数量
   */
  total: number;
};
/**
 *
 * @param { String } userID
 * @returns { Promise }
 */
export function getMessageNumber(data: reqType): Promise<AxiosResponse<reqType, resType>> {
  return Request.instance.post<resType, AxiosResponse<reqType, resType>, reqType>("getmessagenumber", data);
}
