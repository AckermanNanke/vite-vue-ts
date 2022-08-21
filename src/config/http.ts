import type { App } from "vue";
import Request from "/src/utils/request";
import { AxiosInstance } from "axios";
declare module "@vue/runtime-core" {
  export interface CommponentCustomPropperties {
    $http: AxiosInstance;
  }
}
export function setHttp(app: App<Element>): void {
  app.config.globalProperties.$http = Request.instance;
}
