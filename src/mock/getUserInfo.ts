import Mock from "mockjs";
const url = "/api/getuserinfo";
export const getUserInfo = Mock.mock(url, {
  apiUrl: url,
  userID: "@uuid",
  name: "@cname",
  address: "@county(true)",
  certID: "@id",
});
