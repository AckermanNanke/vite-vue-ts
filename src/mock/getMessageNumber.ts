import Mock from "mockjs";
const url = "/api/getmessagenumber";
export const getMessageNumber = Mock.mock(url, {
  apiurl: url,
  "total|0-99": 1,
});
