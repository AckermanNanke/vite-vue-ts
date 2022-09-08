<script setup lang="ts">
import { ref } from "vue";

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
let Timer = ref<NodeJS.Timer | null>(null);
/**
 * 按钮是否可点击
 */
let disabled = ref(false);
/**
 * 倒计时时间
 */
let countDown = ref(props.countDown || 3);

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
</script>

<template>
  <a-button
    id="sms-btn"
    type="primary"
    :disabled="disabled"
    block
    @click="getSmscode"
    >{{ disabled ? `已发送（${countDown}）秒` : `获取验证码` }}
  </a-button>
</template>
