import Mock from "mockjs";
export const getHotKeyword = {
  url: "/api/gethotkeyword",
  response: () => {
    return Mock.mock({
      "list|10": ["@ctitle"],
    })
  }
};
