import Mock from "mockjs";
export const getMessageNumber = {
  url: "/api/getmessagenumber",
  response: () => {
    return {
      code: 200,
      message: "ok",
      data: Mock.mock({
        "total|0-99": 1,
      }),
    };
  },
};
