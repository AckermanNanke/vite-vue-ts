<script setup lang="ts">
import { sceneValue } from "@config/data/globalConst";
import type { ResultStatusType } from "ant-design-vue/es/result";
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
/**
 * 页面接收参数
 */

interface resultInfoType {
  type: string;
  status: ResultStatusType;
  countDown?: number;
  title?: string;
  subTitle?: string;
}

/**
 * 成功页面信息
 * @param { ResultStatusType } status 页面状态 403 | 404 | 500 | '403' | '404' | '500' | "success" | "info" | "error" | "warning"
 * @param { string } title 页面标题
 * @param { string } subTitle  页面描述
 * @param { number | undefined } countDown  页面描述
 */
const resultInfo = ref<resultInfoType>({
  type: "",
  status: "success",
});

/**
 * 计时器
 */
const Timer = ref<NodeJS.Timer | null>(null);

/**
 *
 */
function setTimer() {
  Timer.value = setInterval(() => {
    if (resultInfo.value.countDown != undefined) {
      if (resultInfo.value.countDown && resultInfo.value.countDown <= 0) {
        clearInterval(Number(Timer.value));
      } else {
        resultInfo.value.countDown--;
      }
    }
  }, 100);
}

/**
 *
 * @param  { resultInfoType } route.params
 * @return  { resultInfoType }
 */
function setResultInfo(data: resultInfoType) {
  resultInfo.value = data;
  if (resultInfo.value.countDown != undefined) {
    Timer.value = setInterval(() => {
      if (resultInfo.value.countDown && resultInfo.value.countDown <= 0) {
        clearInterval(Number(Timer.value));
      } else {
        resultInfo.value.countDown && resultInfo.value.countDown--;
      }
    }, 100);
  }
  if (data.type === sceneValue["0"]) {
    data.title = "密码重置成功";
    data.title = "密码重置成功";
  }
  return data;
}

onBeforeMount(() => {
  setResultInfo(route.params as unknown as resultInfoType);
});
</script>
<template>
  <a-result
    :status="(resultInfo.status as ResultStatusType)"
    :title="resultInfo.title"
    :sub-title="resultInfo.subTitle"
  >
    <template #extra>
      <a-button type="primary">Go Console</a-button>
      <a-button type="primary" ghost>Buy Again</a-button>
    </template>
  </a-result>
</template>
