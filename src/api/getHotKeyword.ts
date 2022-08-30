import Request from "@utils/request";
import { AxiosResponse } from "axios";

export type reqType = Record<string, never>;
export type resType = {
  /**
   * 用户名
   */
  list: Array<string>;
};
export function getHotKeyword(data?: reqType): Promise<AxiosResponse<reqType, resType>> {
  return Request.instance.post<resType, AxiosResponse<reqType, resType>, reqType>("gethotkeyword", data);
}
