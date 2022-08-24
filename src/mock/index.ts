import { MockMethod } from "vite-plugin-mock";
import { getHotKeyword } from "./getHotKeyword";
import { getMessageNumber } from "./getMessageNumber";
import { getUserInfo } from "./getUserInfo";
import { login } from "./login";

export default [
  getUserInfo,
  getHotKeyword,
  getMessageNumber,
  login,
] as MockMethod[];
