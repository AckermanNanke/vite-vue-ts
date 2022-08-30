import Mock from "mockjs";
export const getUserInfo = {
  url: "/api/getuserinfo",
  response: () => {
    return Mock.mock({
      userID: "@uuid",
      name: "@cname",
      address: "@county(true)",
      certID: "@id",
    })
  },
};
