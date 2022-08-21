import Mock from "mockjs";
export const getHotKeyword = Mock.mock("/api/getkeyword", {
  "list|10": ["@ctitle"],
});
