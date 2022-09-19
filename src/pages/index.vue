<script setup lang="ts">
import { food, snake } from "@utils/snake";
import { onMounted, ref } from "vue";
// 定义实例化食物类变量
const foodEl = ref<food | null>(null);
// 定义实例化蛇类变量
const sankeEl = ref<snake | null>(null);

//画板宽度
const artboardW = ref(0);
//画板高度
const artboardH = ref(0);

// 蛇头宽高
const snakeHeadW = ref(0);

function moveSnake(event: MouseEvent) {
  let mouseCurrentInfo = event;
  let currentX = mouseCurrentInfo.offsetX;
  let currentY = mouseCurrentInfo.offsetY;
  /**
   * 获取蛇头DOM元素
   * 获取蛇头位置
   */
  let snakeHeadElement: HTMLElement = document.querySelector("#snake > div")!;
  let snakeHeadX = snakeHeadElement.offsetLeft;
  let snakeHeadY = snakeHeadElement.offsetTop;
  console.log(
    event,
    currentY,
    currentX,
    foodEl.value,
    sankeEl.value,
    snakeHeadX,
    snakeHeadY
  );
  if (currentX > snakeHeadX) {
    if (currentY > snakeHeadY) {
      sankeEl.value?.move({ moveX: snakeHeadW.value, moveY: snakeHeadW.value });
    } else if (currentY === snakeHeadY) {
      sankeEl.value?.move({ moveX: snakeHeadW.value });
    } else {
      sankeEl.value?.move({
        moveX: snakeHeadW.value,
        moveY: -snakeHeadW.value,
      });
    }
  } else if (currentX === snakeHeadX) {
    if (currentY > snakeHeadY) {
      sankeEl.value?.move({ moveY: snakeHeadW.value });
    } else if (currentY < snakeHeadY) {
      sankeEl.value?.move({ moveY: -snakeHeadW.value });
    }
  } else {
    if (currentY > snakeHeadY) {
      sankeEl.value?.move({
        moveX: -snakeHeadW.value,
        moveY: snakeHeadW.value,
      });
    } else if (currentY === snakeHeadY) {
      sankeEl.value?.move({ moveX: -snakeHeadW.value });
    } else {
      sankeEl.value?.move({
        moveX: -snakeHeadW.value,
        moveY: -snakeHeadW.value,
      });
    }
  }
  // 如果蛇头位置超出边界责视为撞墙
  let artboard = document.getElementById("artboard")!;
  // this.artboardW = Number(artboard.clientWidth || 0) - 20
  // this.artboardH = Number(artboard.clientHeight || 0) - 20
  // if (
  //   this.head.offsetLeft < 10 ||
  //   this.head.offsetLeft > this.artboardW ||
  //   this.head.offsetTop < 10 ||
  //   this.head.offsetTop > this.artboardH
  // ) {
  //   alert("您的蛇已死亡");
  //   this.snake.innerHTML = `<div></div>`;
  //   return true;
  // }
}
onMounted(() => {
  // 实例化食物类
  foodEl.value = new food();
  // 实例化蛇类
  sankeEl.value = new snake();

  /**
   * 查找画板DOM并获取相对高度
   * 查找蛇DOM并获取相对高度
   */
  let artboardElement = document.getElementById("artboard")!;
  let snakeHeadElement = document.querySelector("#snake > div")!;
  snakeHeadW.value = snakeHeadElement.clientWidth;
  artboardW.value = Number(artboardElement.clientWidth || 0) - snakeHeadW.value;
  artboardH.value =
    Number(artboardElement.clientHeight || 0) - snakeHeadW.value;
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
  background: @theme;
  #snake > div {
    position: absolute;
    left: 10px;
    top: 10px;
    width: 10px;
    height: 10px;
    background: @white;
  }
  #food {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 10px;
    height: 10px;
    background: @black;
  }
}
</style>
