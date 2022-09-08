import Mock from "mockjs";
import { timeout } from "./defaultSetting";
export const getUserInfo = {
  url: "/api/getuserinfo",
  timeout,
  response: () => {
    return Mock.mock({
      userID: "@uuid",
      name: "@cname",
      address: "@county(true)",
      certID: "@id",
    })
  },
};
