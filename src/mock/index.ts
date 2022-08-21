import { MockMethod } from "vite-plugin-mock";
import { getHotKeyword } from "./getHotKeyword";
import { getMessageNumber } from "./getMessageNumber";
import { getUserInfo } from "./getUserInfo";

export default [getUserInfo, getHotKeyword] as MockMethod[];
