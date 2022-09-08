import Mock from "mockjs";
import { timeout } from "./defaultSetting";
export const register = {
  url: "/api/register",
  timeout,
  response: () => {
    return Mock.mock({
      token: "@guid",
    })
  },
};
