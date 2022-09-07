import Mock from "mockjs";
export const getSmsCode = {
  url: "/api/getsmscode",
  response: () => {
    return Mock.mock({
      smsVerifiationCode: "123456",
    })
  },
};
