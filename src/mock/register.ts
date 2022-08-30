import Mock from "mockjs";
export const register = {
  url: "/api/register",
  response: () => {
    return Mock.mock({
      token: "@guid",
    })
  },
};
