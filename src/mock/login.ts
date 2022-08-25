import Mock from "mockjs";
export const login = {
  url: "/api/login",
  response: () => {
    return {
      code: 200,
      message: "ok",
      data: Mock.mock({
        userID: "@guid",
        username: "马玉万",
        userphone: "17663910224",
        userEmail: "1178809645@qq.com",
      }),
    };
  },
};
