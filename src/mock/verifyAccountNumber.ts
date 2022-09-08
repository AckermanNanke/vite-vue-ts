import Mock from "mockjs";
import { timeout } from "./defaultSetting";
export const verifyAccountNumber = {
  url: "/api/verifyaccountnumber",
  timeout,
  response: () => {
    return Mock.mock({
    })
  },
};
