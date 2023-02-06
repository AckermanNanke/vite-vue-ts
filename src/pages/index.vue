<script setup lang="ts">
import { ref } from "@vue/runtime-core";
const arr = ref<number[]>([]);
function pullUp(callback: () => void) {
  setTimeout(() => {
    arr.value!.push(1);
    // callback();
  }, 2000);
}
function pullDown(callback: () => void) {
  console.log(callback);
  setTimeout(() => {
    callback();
  }, 2000);
}
</script>

<template>
  <div style="height: 100vh; display: flex; flex-direction: column">
    <section style="height: 20vh; width: 100%; background: #000000"></section>
    <section style="width: 100%; flex: 1; max-height: 60vh">
      <InfitiniteScroll :distance="20" @pullUp="pullUp" @pullDown="pullDown">
        <div class="scroll" v-for="item in arr" :key="item"></div>
      </InfitiniteScroll>
    </section>
  </div>
</template>
<style lang="less">
.scroll {
  height: 50vh;
  width: 100%;
  background: #999999;
}
.scroll:nth-child(2n + 1) {
  background: #c6fcd9;
}
</style>
