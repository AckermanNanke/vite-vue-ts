import Mock from "mockjs";
export const getCaptcha = {
  url: "/api/getcaptcha",
  response: () => {
    return Mock.mock({
      captcha: "@string(4)",
    })
  },
};
