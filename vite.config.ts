import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import { viteMockServe } from "vite-plugin-mock";
// https://vitejs.dev/config/
/**
 * @param { String } command serve | build
 * @param { String } mode .env文件后缀
 */
export default defineConfig(({ command, mode }) => {
  let defineConfig = {
    // root: "",
    base: mode === "production" ? "/" : "/",
    plugins: [
      vue(),
      viteMockServe({
        mockPath: "/src/mock/",
        localEnabled: mode === "mock",
      }),
      Components({
        resolvers: [AntDesignVueResolver()],
      }),
    ],
    resolve: {
      alias: {
        "@config": "/src/config",
        "@api": "/src/api",
        "@utils": "/src/utils",
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            javascriptEnabled: true,
            hack: `true;@import "/src/assets/style/base.less"`,
          },
        },
      },
    },
  };
  return defineConfig;
});
