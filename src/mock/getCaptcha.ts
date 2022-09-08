import Mock from "mockjs";
import { timeout } from "./defaultSetting";
export const getCaptcha = {
  url: "/api/getcaptcha",
  timeout,
  response: () => {
    return Mock.mock({
      captcha: "@string(4)",
    })
  },
};
