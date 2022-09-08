import Mock from "mockjs";
import { timeout } from "./defaultSetting";
export const getEmailCode = {
  url: "/api/getemailcode",
  timeout,
  response: () => {
    return Mock.mock({
      smsVerifiationCode: "123456",
    })
  },
};
