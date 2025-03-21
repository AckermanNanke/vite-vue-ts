<script setup lang="ts">
import { onMounted, ref } from "@vue/runtime-core";

const canvasEl = ref<HTMLCanvasElement | null>(null); //组件实例

const initwebGL = () => {
  const canvas = canvasEl.value!;
  // 初始化 WebGL 上下文
  const gl = canvasEl.value!.getContext("webgl");

  // 确认 WebGL 支持性
  if (!gl) {
    alert("无法初始化 WebGL，你的浏览器、操作系统或硬件等可能不支持 WebGL。");
    return;
  }

  // 修改画布内渲染尺寸
  const clientWidth = canvas.clientWidth;
  const clientHeight = canvas.clientHeight;
  if (canvas.width != clientWidth || canvas.height != clientHeight) {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  }

  // 修改wegl视图尺寸
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferWidth);

  // 使用完全不透明的黑色清除所有图像
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // 用上面指定的颜色清除缓冲区
  gl.clear(gl.COLOR_BUFFER_BIT);

  //顶点着色器程序
  const VSHADER_SOURCE =
    "void main() {" +
    //设置坐标
    "gl_Position = vec4(0.0, 0.0, 0.0,1.0); " +
    //设置尺寸
    "gl_PointSize = 376.0; " +
    "} ";

  //片元着色器
  const FSHADER_SOURCE =
    "void main() {" +
    //设置颜色
    "gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);" +
    "}";

  //编译着色器
  const vertShader = gl.createShader(gl.VERTEX_SHADER)!;
  gl.shaderSource(vertShader, VSHADER_SOURCE);
  gl.compileShader(vertShader);

  const fragShader = gl.createShader(gl.FRAGMENT_SHADER)!;
  gl.shaderSource(fragShader, FSHADER_SOURCE);
  gl.compileShader(fragShader);
  //合并程序
  const shaderProgram = gl.createProgram()!;
  gl.attachShader(shaderProgram, vertShader);
  gl.attachShader(shaderProgram, fragShader);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);

  //绘制一个点
  gl.drawArrays(gl.POINTS, 0, 1);
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
