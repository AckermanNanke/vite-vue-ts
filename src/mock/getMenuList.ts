import Mock from "mockjs";
import { timeout } from "./defaultSetting";
export const getMenuList = {
  url: "/api/getmenulist",
  timeout,
  response: () => {
    return Mock.mock({
      list: [
        {
          id: "10001",
          name: "主页",
          url: "/",
        },
        {
          id: "20001",
          name: "小游戏",
          url: "/login",
          children: [{
            id: "21001",
            name: "贪吃蛇",
            url: "/",
          }]
        },
        {
          id: "30001",
          name: "小工具",
          url: "/",
          children: [{
            id: "31001",
            name: "H5人脸识别",
            url: "/face-h5",
          }]
        }
      ],
    })
  }
};
