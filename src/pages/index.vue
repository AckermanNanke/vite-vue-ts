<script setup lang="ts">
import { ref } from "@vue/runtime-core";
const arr = ref<number[]>([]);
function pullUp(el: { [propName: string]: () => void }) {
  setTimeout(() => {
    arr.value!.push(1);
    el.loadEnd();
  }, 2000);
}
function pullDown(el: { [propName: string]: () => void }) {
  console.log(el);
  setTimeout(() => {
    el.loadEnd();
  }, 0);
}
</script>

<template>
  <div style="height: 100vh; display: flex; flex-direction: column">
    <section style="width: 100%; flex: 1; max-height: 60vh;background:#ffffff;">
      <InfitiniteScroll :distance="20" :delay="0" @pullUp="pullUp" @pullDown="pullDown">
        <div class="scroll" v-for="item in arr" :key="item"></div>
      </InfitiniteScroll>
    </section>
  </div>
</template>
<style lang="less">
body {
  background: #000000;
}

.scroll {
  height: 50vh;
  width: 100%;
  background: #999999;
}

.scroll:nth-child(2n + 1) {
  background: #c6fcd9;
}
</style>
