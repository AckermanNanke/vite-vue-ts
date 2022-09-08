import Mock from "mockjs";
import { timeout } from "./defaultSetting";
export const getBankInfo = {
  url: "/api/getBankInfo",
  timeout,
  response: () => {
    return Mock.mock({
      bankNo: "@id",
      bankName: "@cname",
      BankHeadOfficeNo: "@county(true)",
      BankHeadOfficeName: "@county(true)",
    })
  },
};
