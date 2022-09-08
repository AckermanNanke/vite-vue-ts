import Mock from "mockjs";
import { timeout } from "./defaultSetting";
export const verifyAccountCode = {
  url: "/api/verifyaccountcode",
  timeout,
  response: () => {
    return Mock.mock({
    })
  },
};
