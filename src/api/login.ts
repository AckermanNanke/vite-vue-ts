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
  userID: string;
  userphone: string;
  userEmail: string;
  username: string;
};
export function login(data: reqType): Promise<AxiosResponse<resType>> {
  return Request.instance.post<resType, AxiosResponse<resType>, reqType>(
    "login",
    data
  );
}
