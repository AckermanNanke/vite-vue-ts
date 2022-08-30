import Mock from "mockjs";
export const login = {
  url: "/api/login",
  response: () => {
    return Mock.mock({
      accessToken: "@guid",
      userID: "@guid",
      username: "马玉万",
      userphone: "17663910224",
      userEmail: "1178809645@qq.com",
    })
  },
};
