<script setup lang="ts">
import { sceneValue } from "@config/data/globalConst";
import type { ResultStatusType } from "ant-design-vue/es/result";
import { onBeforeMount, onBeforeUnmount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
/**
 * 页面接收参数
 */

interface resultInfoType {
  type: string;
  urlName?: string;
  status: ResultStatusType;
  countDown?: number;
  title?: string;
  subTitle?: string;
}

/**
 * 页面接收参数
 */
const props = defineProps<resultInfoType>();

/**
 * 加载状态
 */
const spinning = ref(false);

/**
 * 成功页面信息
 * @param { ResultStatusType } status 页面状态 403 | 404 | 500 | '403' | '404' | '500' | "success" | "info" | "error" | "warning"
 * @param { string } title 页面标题
 * @param { string } subTitle  页面描述
 * @param { number | undefined } countDown  页面描述
 */
const resultInfo = ref<resultInfoType>({
  type: "",
  urlName: "",
  status: "success",
  countDown: NaN,
});

/**
 * 计时器
 */
const Timer = ref<NodeJS.Timer | null>(null);

/**
 * 首先把数据赋值给响应式数据 resultInfo
 * 必须修改响应式数据才能渲染到页面，修改resultInfo的传入源数据无法响应到页面
 */
function setResultInfo() {
  /**
   * 获取页面接受倒计时数据
   * 1.如果不为undefined，开始倒计时并自动调用replace方法退出到指定页面
   */
  if (
    resultInfo.value.countDown != undefined &&
    resultInfo.value.countDown != NaN
  ) {
    Timer.value = setInterval(() => {
      if (
        resultInfo.value.countDown != undefined &&
        resultInfo.value.countDown < 0
      ) {
        clearInterval(Number(Timer.value));
        resultInfo.value.countDown = 5;
        router.replace({ name: resultInfo.value.urlName });
      } else {
        switch (resultInfo.value.type) {
          // 重置密码
          case sceneValue["0"]:
            resultInfo.value.title =
              resultInfo.value.title === undefined
                ? ``
                : `密码重置成功，将${resultInfo.value.countDown}s后进入登录页面`;
            resultInfo.value.subTitle =
              resultInfo.value.subTitle === undefined
                ? ``
                : resultInfo.value.subTitle;
            break;
          default:
            resultInfo.value.title = ``;
            resultInfo.value.subTitle = ``;
        }
        resultInfo.value.countDown != undefined && resultInfo.value.countDown--;
      }
    }, 1000);
  }
  spinning.value = false;
}

onBeforeMount(() => {
  console.log(resultInfo.value, route.params, 111111111);
  resultInfo.value = Object.assign({}, resultInfo.value, props);
  spinning.value = true;
  setResultInfo();
});
onBeforeUnmount(() => {
  // 关闭页面前清除定时器
  clearInterval(Number(Timer.value));
});
</script>
<template>
  <a-spin size="large" :spinning="spinning">
    <a-result
      :status="(resultInfo.status as ResultStatusType)"
      :title="resultInfo.title"
      :sub-title="resultInfo.subTitle"
    >
      <template #extra>
        <a-button type="primary">确定</a-button>
        <a-button type="primary" ghost>返回</a-button>
      </template>
    </a-result>
  </a-spin>
</template>
