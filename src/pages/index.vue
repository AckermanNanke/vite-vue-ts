<script setup lang="ts">
import { register } from "@api/register";
import { onMounted, ref } from "@vue/runtime-core";
const btnList = ref([
  {
    name: "calendar",
    description: "日历组件"
  },
  {
    name: "infiniteScroll",
    description: "无限滚动组件"
  },
  {
    name: "faceH5",
    description: "视频录制"
  }
]);

onMounted(() => {
  register({
    userName: "",
    password: "",
    phone: 1,
    smsVerifiationCode: ""
  })
})
</script>

<template>
  <button v-for="item in btnList" @click="$router.push({ name: item.name })">{{ item.description }}</button>
</template>
<style lang="less" scoped></style>

