import Mock from "mockjs";
import { timeout } from "./defaultSetting";
export const getMessageNumber = {
  url: "/api/getmessagenumber",
  timeout,
  response: () => {
    return Mock.mock({
      "total|0-99": 1,
    })
  },
};
