<script setup lang="ts">
import { throttle } from "@utils/utils";
import { onMounted, ref } from "vue";
import { esurientSnake } from "./class/esurientSnake";

const vHtml = ref(`<section id="artboard">
  <div id="snake">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
  <div id="food"></div>
</section>
<section class="button-group">
  <div>
    <p>分数<span id="score">0 </span></p>
    <p>等级<span id="lv">0 </span></p>
  </div>
  <button id="start">开始</button>
  <button id="pause">暂停</button>
  <button id="stop">停止</button>
</section>`);
// 实例化贪吃蛇对象
const snakeClass = ref<esurientSnake | null>(null);

// 定义实例化食物类变量
function snakeInit() {
  /**
   * 监听键盘
   */
  document.addEventListener(
    "keydown",
    throttle((event: KeyboardEvent) => {
      if (snakeClass.value!.isPause) {
        snakeClass.value!.snakeMove(snakeClass.value!.direction!);
      } else if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.code)
      ) {
        snakeClass.value!.snakeMove(
          event.code as "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight"
        );
      }
    }, 200)
  );
  /**
   * 开始
   */
  document.getElementById("start")!.addEventListener(
    "click",
    throttle(() => {
      if (snakeClass.value!.isPause) {
        snakeClass.value!.snakeMove(snakeClass.value!.direction!);
      } else {
        snakeClass.value!.snakeMove("ArrowRight");
      }
    }, 200)
  );
  /**
   * 暂停
   */
  document.getElementById("pause")!.addEventListener(
    "click",
    throttle(() => {
      clearInterval(Number(snakeClass.value!.Timer));
      snakeClass.value!.isPause = true;
    }, 200)
  );
  /**
   * 停止
   */
  document.getElementById("stop")!.addEventListener(
    "click",
    throttle(() => {
      snakeClass.value!.reseteSurientSnake();
    }, 200)
  );
}
onMounted(() => {
  snakeClass.value = new esurientSnake();
  snakeInit();
});
</script>

<template>
  <div v-html="vHtml"></div>
</template>

<style lang="less" scoped>
body,
html {
  overflow: hidden;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
}

#artboard {
  width: 100%;
  height: 100%;
  min-height: 1000px;
  min-width: 100px;
  position: relative;
  background: #00aeec;
  border: 10px solid black;
  box-sizing: border-box;
}

#snake > div {
  position: absolute;
  left: 40px;
  top: 10px;
  z-index: 1000;
  width: 10px;
  height: 10px;
  background: black;
}

#snake > div:nth-child(2) {
  background: rgb(255, 238, 0);
  left: 30px;
}
#snake > div:nth-child(3) {
  background: rgb(0, 255, 119);
  left: 20px;
}
#snake > div:nth-child(4) {
  background: rgb(230, 0, 255);
  left: 10px;
}

#food {
  position: absolute;
  left: 100px;
  top: 10px;
  z-index: 999;
  width: 10px;
  height: 10px;
  background: white;
}
.button-group {
  font-size: 24px;
  font-weight: 900;
  text-align: center;
  padding: 40px;
}
</style>
