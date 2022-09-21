<script setup lang="ts">
import { esurientSnake } from "@utils/snake";
import { onMounted, ref } from "vue";
// 定义实例化食物类变量
const snake = ref<esurientSnake | null>(null);

function moveSnake(event: MouseEvent) {
  let currentX = event.offsetX;
  let currentY = event.offsetY;
  /**
   * 获取蛇头DOM元素
   * 获取蛇头位置
   */
  console.log(event, currentY, currentX);
  snake.value?.snakeMove(currentX, currentY);
}

onMounted(() => {
  snake.value = new esurientSnake();
});
</script>

<template>
  <section id="artboard" @click="moveSnake">
    <div id="snake">
      <div></div>
    </div>
    <div id="food"></div>
  </section>
</template>

<style lang="less" scoped>
#artboard {
  width: 100%;
  height: 100%;
  position: relative;
  background: @primary-color;
  border: 10px solid @black;
  #snake > div {
    position: absolute;
    left: 10px;
    top: 10px;
    width: 10px;
    height: 10px;
    background: @black;
    transition: all 0.3s;
  }
  #food {
    position: absolute;
    left: 30px;
    top: 10px;
    width: 10px;
    height: 10px;
    background: @white;
  }
}
</style>
