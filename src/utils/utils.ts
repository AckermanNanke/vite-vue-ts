import type { reqType as loginDatatype } from "@api/login";
import { login } from "@api/login";
import type { reqType as registerDataType } from "@api/register";
import { Fsession } from "@config/pluginImplements";

import { register } from "@api/register";
import router from "../router";

/**
 * 防抖函数
 * @param { Function } fn 传入的处理方法
 * @param { number } delay 延迟时间
 * */
export function debounce(fn: Function, delay: number = 1000): Function {
  let Timer: NodeJS.Timer | null = null;
  return function () {
    clearTimeout(Number(Timer));
    Timer = setTimeout(() => {
      fn.call(null, arguments);
    }, delay);
  };
}

/**
 * 节流函数
 * @param func 使用节流函数的方法
 * @param delay 间隔时间
 * @returns
 */
export function throttle(func: Function, delay: number): (this: any) => void {
  let preTime = 0;
  return function (this: any) {
    let now = Date.now();
    if (Date.now() - preTime > delay) {
      func.apply(this, arguments);
      preTime = now;
    }
  };
}
/**
 * 图片文件转为base64并压缩
 * @param file  文件对象
 * @param maxSize 压缩阈值
 * @param maxWidth  压缩阈值宽度
 * @param type  压缩类型
 * @param level 压缩等级
 * @returns {Promise<unknown>}
 */
export function getConpressBase64(options: {
  file: File;
  maxSize: number;
  maxWidth: number;
  type: string;
  level: number;
}): Promise<string | File> {
  options.maxSize = options.maxSize || 409600;
  options.maxWidth = options.maxWidth || 1024;
  options.level = options.level || 0.8;
  return new Promise((reslove, reject) => {
    /** * 如果文件大小小于指定值则直接返回 */
    if (options.file.size <= options.maxSize) {
      reslove(options.file);
    }
    /** * 如果未指定转换类型则类型为file文件的类型 */
    if (!options.type) {
      options.type = options.file.type;
    }
    //读取文件资源
    let render: FileReader = new FileReader();
    render.readAsDataURL(options.file);

    // 定义canvas对象
    let ctx: HTMLCanvasElement = document.createElement("canvas");
    let context: CanvasRenderingContext2D | null = ctx.getContext("2d");

    /**
     * 实例化图片对象
     */
    let img: HTMLImageElement = new Image();

    render.onload = (e) => {
      // 创建图片获取图片真实宽高
      img.src = (e.target!.result as string) || "";
      img.onload = () => {
        /**
         * 单纯压缩无法压缩图片致80kb，等比修改图片尺寸压缩
         */
        let width = img.width;
        let height = img.height;
        if (img.width > options.maxWidth) {
          width = options.maxWidth;
          height = options.maxWidth / (img.width / img.height);
        }
        /**
         * 定义画布宽度
         * 定义画布高度
         * 开始绘制
         * 转为base64
         */
        ctx.width = width;
        ctx.height = height;
        context!.drawImage(img, 0, 0, ctx.width, ctx.height);
        reslove(ctx.toDataURL(options.type, options.level));
      };
      img.onerror = (e) => {
        reject(e);
      };
    };
    render.onerror = (e) => {
      reject(e);
    };
  });
}

/**
 * base64数据转为File对象 base64 -> Blob -> File
 * @param   base64 base64数据
 * @param maxSize 压缩阈值
 * @param type  压缩类型
 * @param tyfileNamepe  压缩后文件名称
 * @returns { Promise<File> }
 */
export function getBae64ToFile(options: {
  base64: string;
  maxSize: number;
  type: string;
  fileName: string;
}): Promise<File> {
  return new Promise((reslove, reject) => {
    /**
     * base64 -> Blob -> File，为了兼容IOS需要Blob中转
     */
    let imgBlob: Blob;
    let imgFile: File;
    let arr = options.base64.split(","),
      bstr = window.atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    imgBlob = new Blob([u8arr], { type: options.type });
    imgFile = new File([imgBlob], options.fileName, {
      type: options.type,
    });
    /**
     * 压缩后进行判断是否大于指定值
     */
    if (imgFile.size > options.maxSize) {
      reject({
        message: "上传图片过大，请重新上传",
      });
    } else reslove(imgFile);
  });
}
/**
 * 注册方法封装
 * @param data 注册用参数
 */
export function toRegister(data: registerDataType) {
  return register(data)
    .then((res) => {
      Fsession.set("tokrn", res.data.token);
      router.replace({
        path: "/login",
      });
      return Promise.resolve(res.data);
    })
    .catch((err) => {
      Fsession.clear();
      return Promise.reject(err);
    });
}
/**
 * 登录方法封装
 * @param data 登录用参数
 */
export function toLogin(data: loginDatatype) {
  return login(data)
    .then((res) => {
      Fsession.set("userInfo", res.data);
      router.replace({
        path: "/index",
      });
      return Promise.resolve(res.data);
    })
    .catch((err) => {
      Fsession.clear();
      return Promise.reject(err);
    });
}
