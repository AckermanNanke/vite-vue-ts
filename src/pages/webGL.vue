<script setup lang="ts">
import { onMounted, ref } from "@vue/runtime-core";

const canvasEl = ref<HTMLCanvasElement | null>(null); //组件实例

const initwebGL = () => {
  // 初始化 WebGL 上下文
  const gl = canvasEl.value!.getContext("webgl");

  // 确认 WebGL 支持性
  if (!gl) {
    alert("无法初始化 WebGL，你的浏览器、操作系统或硬件等可能不支持 WebGL。");
    return;
  }

  // 使用完全不透明的黑色清除所有图像
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // 用上面指定的颜色清除缓冲区
  gl.clear(gl.COLOR_BUFFER_BIT);
};

onMounted(() => {
  initwebGL();
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
