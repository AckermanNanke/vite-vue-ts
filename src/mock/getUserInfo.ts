import Mock from "mockjs";
export const getUserInfo = {
  url: "/api/getuserinfo",
  response: () => {
    return {
      code: 200,
      message: "ok",
      data: Mock.mock({
        userID: "@uuid",
        name: "@cname",
        address: "@county(true)",
        certID: "@id",
      }),
    };
  },
};
