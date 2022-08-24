import Mock from "mockjs";
export const login = {
  url: "/api/login",
  response: () => {
    return {
      code: 200,
      message: "ok",
      data: Mock.mock({
        userID: "@uuid",
        userphone: "@cname",
        userEmail: "@county(true)",
        username: "@id",
      }),
    };
  },
};
