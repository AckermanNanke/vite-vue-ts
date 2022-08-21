import Request from "@utils/request";
import { AxiosResponse } from "axios";

export type reqType = {
  userID: string;
};
export type resType = {
  /**
   * 消息数量
   */
  total: number;
};
export function getMessageNumber(
  data?: reqType
): Promise<AxiosResponse<resType>> {
  return Request.instance.post<resType, AxiosResponse<resType>, reqType>(
    "getmessagenumber",
    data
  );
}
