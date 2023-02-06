import "@vue/runtime-core";
import { AxiosInstance } from "axios";

declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $http: AxiosInstance;
    $Fsession: AxiosInstance;
    $FLocal: AxiosInstance;
  }
}
