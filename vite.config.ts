import vue from "@vitejs/plugin-vue";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
import { viteMockServe } from "vite-plugin-mock";
// https://vitejs.dev/config/
/**
 * @param { String } command serve | build
 * @param { String } mode .env文件后缀
 */
export default defineConfig(({ command, mode }) => {
  return {
    server: {
      port: 8998,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8999',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      }
    },
    // root: "",
    base: command === "build" ? "/vite-vue-ts/" : "/",
    plugins: [
      vue(),
      viteMockServe({
        mockPath: "/src/mock/",
        localEnabled: mode === "mock",
      }),
      Components({
        resolvers: [AntDesignVueResolver({ importStyle: "less" })], //定制主体需要importStyle不为 true 或者css
      }),
    ],
    resolve: {
      alias: {
        "@config": "/src/config",
        "@api": "/src/api",
        "@utils": "/src/utils",
        "@components": "/src/components",
        "@assets": "/src/assets",
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {
            hack: `true;@import "/src/assets/style/base.less"`,
          },
        },
      },
    },
  };
});
