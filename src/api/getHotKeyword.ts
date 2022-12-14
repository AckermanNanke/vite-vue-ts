import Request from "@utils/request";
import { AxiosResponse } from "axios";

export type reqType = Record<string, never>;
export type resType = {
  /**
   * 用户名
   */
  list: Array<string>;
};
export function getHotKeyword(data?: reqType) {
  return Request.instance.post<resType, AxiosResponse<resType>, reqType>("gethotkeyword", data);
}
