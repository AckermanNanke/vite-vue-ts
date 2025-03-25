<script setup lang="ts">
import { onMounted, ref } from "@vue/runtime-core";
import { createWebGL } from "./utils";

const canvasEl = ref<HTMLCanvasElement | null>(null); //组件实例

onMounted(() => {
  createWebGL(canvasEl.value!);
});
</script>

<template>
  <canvas ref="canvasEl" id="glcanvas">
    你的浏览器似乎不支持或者禁用了 HTML5 <code>&lt;canvas&gt;</code> 元素。
  </canvas>
</template>
<style lang="less" scoped>
#glcanvas {
  display: block;
  border: none;
  width: 100vw;
  height: 100vh;
}
</style>
