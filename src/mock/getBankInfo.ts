import Mock from "mockjs";
export const getBankInfo = {
  url: "/api/getBankInfo",
  response: () => {
    return Mock.mock({
      bankNo: "@id",
      bankName: "@cname",
      BankHeadOfficeNo: "@county(true)",
      BankHeadOfficeName: "@county(true)",
    })
  },
};
