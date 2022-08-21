import Axios from "axios";
import { AxiosRequestConfig, AxiosResponse, AxiosInstance } from "axios";
import MOCK from "../mock";
export class Request {
  // 请求列表
  public requestList: Array<AxiosInstance> = [];
  public instance: AxiosInstance;
  constructor() {
    // 创建请求实例
    this.instance = Axios.create({
      baseURL:
        import.meta.env.MODE === "production"
          ? import.meta.env.VITE_APP_REQUEST_URL
          : "/api/", //默认请求地址
      timeout: 10000, //超时时间
    });
    this.interceptors();
  }
  // 拦截请求
  interceptors(): void {
    /**
     * 请求拦截器
     * 每次请求前，修改请求头
     */
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig): AxiosRequestConfig => {
        return config;
      },
      (error: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
        // 对请求错误做些什么
        return Promise.reject(error);
      }
    );
    /**
     * 响应拦截器
     * 每次接口响应后，修改返回数据
     */
    this.instance.interceptors.response.use(
      (response: AxiosResponse): AxiosResponse | Promise<AxiosResponse> => {
        /**
         * 只有服务器状态码为200时返回成功
         */
        if (response.status === 200) {
          console.log(response.config.url, "返回数据接口=========sart");
          console.log(response.data);
          console.log(response.config.url, "返回数据接口=========end");
          return response;
        } else {
          Request.errorHandler(response);
          return Promise.reject(response);
        }
      },
      (error: AxiosResponse): Promise<AxiosResponse> => {
        /**
         * 存在返回值的情况下
         */
        if (error) {
          Request.errorHandler(error);
          return Promise.reject(error);
        } else {
          /**
           * 不存在返回值的情况下
           */
          Request.errorHandler(error);
          // return Promise.resolve(error);
          return Promise.reject("请求失败，请稍后再试");
        }
      }
    );
  }
  // 常用错误码处理
  private static errorHandler(error: AxiosResponse) {
    console.log("error");
    console.log(error);
    console.log("error");
    let key = error.config.url;
    switch (error.status) {
      case 404:
        break;
      default:
        // const handleError: never = error;
        // return handleError;
        break;
    }
  }
}
const request = new Request();
export default request;
