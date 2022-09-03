import Mock from "mockjs";
export const getCaptcha = {
  url: "/api/getcaptcha",
  response: () => {
    return Mock.mock({
      smsVerifiationCode: "123456",
    })
  },
};
