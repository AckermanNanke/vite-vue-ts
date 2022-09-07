import Mock from "mockjs";
export const getEmailCode = {
  url: "/api/getemailcode",
  response: () => {
    return Mock.mock({
      smsVerifiationCode: "123456",
    })
  },
};
