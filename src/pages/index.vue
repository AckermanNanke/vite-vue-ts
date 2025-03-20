<script setup lang="ts">
import { onMounted, ref } from "@vue/runtime-core";
const btnList = ref([
  {
    name: "calendar",
    description: "日历组件",
  },
  {
    name: "infiniteScroll",
    description: "无限滚动组件",
  },
  {
    name: "faceH5",
    description: "视频录制",
  },
  {
    name: "webGL",
    description: "数据可视化",
  },
]);

onMounted(() => {});
</script>

<template>
  <button v-for="item in btnList" @click="$router.push({ name: item.name })">
    {{ item.description }}
  </button>
</template>
<style lang="less" scoped></style>
