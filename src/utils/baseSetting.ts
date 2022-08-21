import type { App } from "vue";
import Request from "@utils/request";
function setHttp(app: App<Element>) {
  app.config.globalProperties.$http = Request.instance;
}

export { setHttp };
