import { MockMethod } from "vite-plugin-mock";
import { getBankInfo } from "./getBankInfo";
import { getCaptcha } from "./getCaptcha";
import { getHotKeyword } from "./getHotKeyword";
import { getMessageNumber } from "./getMessageNumber";
import { getUserInfo } from "./getUserInfo";
import { login } from "./login";
import { register } from "./register";
import { verifyAccountNumber } from "./verifyAccountNumber";

export default [
  getBankInfo,
  getUserInfo,
  getHotKeyword,
  getMessageNumber,
  login,
  register,
  getCaptcha,
  verifyAccountNumber,
] as MockMethod[];
