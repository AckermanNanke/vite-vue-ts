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
import { resetPassword } from "./resetPassword";
import { verifyAccountCode } from "./verifyAccountCode";
import { verifyAccountNumber } from "./verifyAccountNumber";

export default [
  register,
  login,
  getBankInfo,
  getUserInfo,
  getHotKeyword,
  getMessageNumber,
  getCaptcha,
  getEmailCode,
  getSmsCode,
  verifyAccountNumber,
  verifyAccountCode,
  resetPassword,
] as MockMethod[];
