import { AxiosInstance } from "axios";

declare module "@vue/runtime-core" {
  interface CommponentCustomPropperties {
    $http: AxiosInstance;
  }
}
