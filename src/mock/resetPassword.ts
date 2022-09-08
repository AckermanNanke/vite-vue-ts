import Mock from "mockjs";
import { timeout } from "./defaultSetting";
export const resetPassword = {
  url: "/api/resetpassword",
  timeout,
  response: () => {
    return Mock.mock({
    })
  },
};
