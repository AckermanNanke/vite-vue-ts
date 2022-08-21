import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log(command, mode, 343434);
  return {
    // root: "",
    base: "/",
    plugins: [vue()],
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
});
