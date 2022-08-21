import Mock from "mockjs";
export const getHotKeyword = {
  url: "/api/gethotkeyword",
  response: () => {
    return {
      code: 200,
      message: "ok",
      data: Mock.mock({
        "list|10": ["@ctitle"],
      }),
    };
  },
};
