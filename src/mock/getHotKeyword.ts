import Mock from "mockjs";
import { timeout } from "./defaultSetting";
export const getHotKeyword = {
  url: "/api/gethotkeyword",
  timeout,
  response: () => {
    return Mock.mock({
      "list|10": ["@ctitle"],
    })
  }
};
