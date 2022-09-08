import Mock from "mockjs";
import { timeout } from "./defaultSetting";
export const login = {
  url: "/api/login",
  timeout,
  response: () => {
    return Mock.mock({
      accessToken: "@guid",
      userID: "@guid",
      username: "马玉万",
      userphone: "17663910224",
      userEmail: "1178809645@qq.com",
    })
  },
};
