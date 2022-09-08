<script setup lang="ts">
import type { ResultStatusType } from "ant-design-vue/es/result";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
/**
 * 页面接收参数
 */

interface urlOptionsType {
  type: string;
  countDown: number;
  status: ResultStatusType;
}
const urlOptions = route.params as unknown as urlOptionsType;

const resultInfo = ref({
  title: "密码重置成功",
  subTitle: "即将跳转到登录页面",
});
onMounted(() => {
  console.log(urlOptions);
});
</script>
<template>
  <a-result
    :status="(urlOptions.status as ResultStatusType)"
    :title="resultInfo.title"
    :sub-title="resultInfo.subTitle"
  >
    <template #extra>
      <a-button type="primary">Go Console</a-button>
      <a-button type="primary" ghost>Buy Again</a-button>
    </template>
  </a-result>
</template>
