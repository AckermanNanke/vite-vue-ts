import Mock from "mockjs";
import { timeout } from "./defaultSetting";
export const getSmsCode = {
  url: "/api/getsmscode",
  timeout,
  response: () => {
    return Mock.mock({
      smsVerifiationCode: "123456",
    })
  },
};
