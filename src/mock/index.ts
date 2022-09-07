import { MockMethod } from "vite-plugin-mock";
import { getBankInfo } from "./getBankInfo";
import { getCaptcha } from "./getCaptcha";
import { getEmailCode } from "./getEmailCode";
import { getHotKeyword } from "./getHotKeyword";
import { getMessageNumber } from "./getMessageNumber";
import { getSmsCode } from "./getSmsCode";
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
  getEmailCode,
  getSmsCode,
] as MockMethod[];
