import Mock from "mockjs";
export const getMessageNumber = {
  url: "/api/getmessagenumber",
  response: () => {
    return Mock.mock({
      "total|0-99": 1,
    })
  },
};
