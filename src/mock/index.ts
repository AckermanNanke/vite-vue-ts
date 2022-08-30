import { MockMethod } from "vite-plugin-mock";
import { getBankInfo } from "./getBankInfo";
import { getHotKeyword } from "./getHotKeyword";
import { getMessageNumber } from "./getMessageNumber";
import { getUserInfo } from "./getUserInfo";
import { login } from "./login";
import { register } from "./register";

export default [
  getBankInfo,
  getUserInfo,
  getHotKeyword,
  getMessageNumber,
  login,
  register,
] as MockMethod[];
