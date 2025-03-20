<script setup lang="ts">
import { onMounted, ref } from "@vue/runtime-core";
const arr = ref<number[]>([]);
function pullUp(el: { [propName: string]: () => void }) {
  setTimeout(() => {
    arr.value!.push(1);
    el.loadEnd();
  }, 500);
}
function pullDown(el: { [propName: string]: () => void }) {
  setTimeout(() => {
    el.loadEnd();
  }, 800);
}
onMounted(() => {});
</script>

<template>
  <div class="scroll-box">
    <section>
      <InfitiniteScroll
        :distance="200"
        :delay="0"
        @pullUp="pullUp"
        @pullDown="pullDown"
      >
        <div class="scroll" v-for="(item, index) in arr" :key="item">
          {{ index + 1 }}
        </div>
      </InfitiniteScroll>
    </section>
  </div>
</template>
<style lang="less" scoped>
.scroll-box {
  height: 100vh;
  background: #00aeec;
  padding: 10px;

  > section {
    height: 70%;
  }

  .scroll {
    height: 24vh;
    line-height: 24vh;
    font-size: 6rem;
    text-align: center;
    width: 100%;
    background: @theme;
  }

  .scroll:nth-child(2n + 1) {
    background: @link-color;
  }
}
</style>
