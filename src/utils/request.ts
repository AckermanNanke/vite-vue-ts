import { ACCESS_TOKEN } from "@config/data/globalConst";
import { Fsession } from "@utils/baseUtils";
import { notification } from "ant-design-vue";
import Axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from "axios";
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
        console.log(config.url, "请求头开始=========sart");
        console.log(config);
        console.log("请求头结束=========end");
        /**
         * 如果缓存中有用户token则在请求头中添加
         */
        let accessToken = Fsession.get(ACCESS_TOKEN)
        if (accessToken) {
          config.headers = Object.assign({}, config.headers, {
            [ACCESS_TOKEN]: accessToken
          })
        }
        return config;
      },
      (error: AxiosError): Promise<AxiosError> => {
        // 对请求错误做些什么
        Request.errorHandler(error);
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
          console.log(response);
          console.log("返回数据接口=========end");
          return response;
        } else {
          // Request.errorHandler(response);
          return Promise.reject(response);
        }
      },
      (error: AxiosError): Promise<AxiosError> => {
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
  private static errorHandler(error: AxiosError) {
    console.log("错误信息================start");
    console.log(error);
    console.log("错误信息================end");
    let key = error.config.url;
    switch (error.response?.status) {
      case 404:
        notification.error({
          message: "接口不存在",
        });
        break;
      default:
        // const handleError: never = error.status;
        // return handleError;
        break;
    }
  }
}
const request = new Request();
export default request;
