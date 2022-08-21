import Mock from "mockjs";
export const getUserInfo = {
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
