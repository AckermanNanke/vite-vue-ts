import Mock from "mockjs";
export const resetPassword = {
  url: "/api/resetpassword",
  response: () => {
    return Mock.mock({
    })
  },
};
