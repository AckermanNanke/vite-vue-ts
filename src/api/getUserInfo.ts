import Request from "@utils/request";
import { AxiosResponse } from "axios";

export type reqType = {
  userID: string;
};
export type resType = {
  /**
   * 用户名
   */
  username: string;
};
export function getUserInfo(data: reqType): Promise<AxiosResponse<resType>> {
  return Request.instance.post<resType, AxiosResponse<resType>, reqType>(
    "getuserinfo",
    data
  );
}
