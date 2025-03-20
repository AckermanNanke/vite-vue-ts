<script setup lang="ts">
import { faceH5 } from "@utils/faceH5";
import { onMounted, ref } from "vue";

const faceDemo = ref<faceH5>();
const faceEl = ref<HTMLVideoElement>();

/**
 * 开始录制
 */
function start() {
  faceDemo.value!.startRecord();
}
/**
 * 结束录制
 */
function stop() {
  faceDemo.value!.stopRecord().then((res) => {
    console.log(res);
  });
}

onMounted(() => {
  faceDemo.value = new faceH5({ videoEl: faceEl.value! });
});
</script>
<template>
  <video ref="faceEl" class="face"></video>
  <button @click="start">开始录制</button>
  <button @click="stop">停止录制</button>
</template>

<style lang="less" scoped>
.face {
  margin: 20px auto 0;
  display: block;
  width: 80vw;
  height: 40vh;
  background: @text-tip;
}
</style>
