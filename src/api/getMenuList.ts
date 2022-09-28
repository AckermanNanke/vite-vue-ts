import Request from "@utils/request";
import { AxiosResponse } from "axios";

export type reqType = {
  userLv: string;
};
export type resType = {
  /**
   * 菜单列表
   */
  list: Array<dataType.menuItem>
};
/**
 * 获取菜单列表
 * @param { String } id 唯一标识
 * @param { String } name 菜单名称
 * @returns { Promise }
 */
export function getMenuList(data: reqType) {
  return Request.instance.post<resType, AxiosResponse<resType>, reqType>("getmenulist", data);
}
