<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";

import { getSmsCode } from "@api/getSmsCode";

/**
 * 定义组件参数类型
 */
const props = defineProps<{ phone: string; countDown?: number }>();
/**
 * 定义事件类型
 */
const emit = defineEmits<{
  (e: "click", smscode: string): void;
}>();
/**
 * 计时器
 */
const Timer = ref<NodeJS.Timer | null>(null);
/**
 * 按钮是否可点击
 */
const disabled = ref(false);
/**
 * 倒计时时间
 */
const countDown = ref(props.countDown || 3);

/**
 * 调用获取短信验证码接口
 */
function getSmscode(): void {
  getSmsCode({
    sceneValue: "register",
    phone: props.phone,
  })
    .then((res) => {
      disabled.value = true;
      Timer.value = setInterval(() => {
        if (countDown.value <= 1) {
          disabled.value = false;
          clearInterval(Number(Timer.value));
          countDown.value = props.countDown || 3;
        } else {
          disabled.value = true;
          countDown.value--;
        }
      }, 1000);
      // 请求成功返回短信验证码
      emit("click", res.data.smsVerifiationCode);
    })
    .catch((err) => {
      emit("click", "");
    });
}

onBeforeUnmount(() => {
  clearInterval(Number(Timer.value));
});
</script>

<template>
  <button id="sms-btn" :disabled="disabled" @click="getSmscode">
    {{ disabled ? `已发送（${countDown}）秒` : `获取验证码` }}
  </button>
</template>
