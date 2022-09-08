<script setup lang="ts">
import { $sessionStorage } from "@utils/pluginKey";
import { inject, onMounted, onUpdated, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import Step1 from "./components/step1.vue";
import Step2 from "./components/step2.vue";
import Step3 from "./components/step3.vue";
import Step4 from "./components/step4.vue";

const router = useRouter();
const route = useRoute();

const Fsession = inject($sessionStorage);

/**
 * 加载状态
 */
const spinning = ref(false);
/**
 * 总步骤
 */
const stepArr = ref([
  {
    index: 0,
    title: "选择找回方式",
    "sub-title": "",
    description: "您可以选择通过邮箱或手机号进行找回",
  },
  {
    index: 0,
    title: "输入账户名",
    "sub-title": "",
    description: "请输入您注册时使用的邮箱或手机号",
  },
  {
    index: 0,
    title: "输入验证码",
    "sub-title": "",
    description: "请输入您注册时使用的邮箱或手机号",
  },
]);
/**
 * 当前步骤
 */
const current = ref(0);

/**
 * 当前步骤状态
 */
const status = ref<"process" | "wait" | "error" | "finish" | undefined>(
  "process"
);

/**
 * 当前进度
 */
const percent = ref(100 / stepArr.value.length);

function setSpinning(val: boolean) {
  spinning.value = val;
}
/**
 * 返回第一步
 */
function goPprevFirst() {
  router.back();
  percent.value = 100 / stepArr.value.length;
  current.value = 0;
}
/**
 * 返回上一步并且步骤条减一
 */
function goPrev() {
  current.value--;
  percent.value -= 100 / stepArr.value.length;
  Fsession?.remove("reset-password-info");
  router.back();
}
/**
 * 进入下一步并且步骤条加一
 */
function goNext(val: unknown) {
  console.log(current.value, 777);
  if (current.value === 3) {
    Fsession?.remove("reset-password-info");
    router.back();
    return false;
  }
  current.value++;
  percent.value += 100 / stepArr.value.length;
  // 抛出事件带参数的时候存入会话缓存
  if (val) {
    let resetPasswordSession = Fsession?.get("reset-password-info");
    val = Object.assign({}, resetPasswordSession, val);
    Fsession?.set("reset-password-info", val);
  }
  router.replace({
    name: "reset-password",
    params: {
      id: current.value + 1,
    },
  });
}

onMounted(() => {
  current.value = Number(route.params.id) - 1;
  percent.value = (Number(route.params.id) / stepArr.value.length) * 100;
});

/**
 * 因为动态路由传参不会再次触发onMounted钩子
 * 所以更新组件参数时使用onUpdated钩子
 */
onUpdated(() => {
  current.value = Number(route.params.id) - 1;
  percent.value = (Number(route.params.id) / stepArr.value.length) * 100;
});
</script>

<template>
  <div id="reset-password" class="reset-password">
    <div
      class="reset-password-body position-fixed-center box-shadow border-radius"
    >
      <a-steps :percent="percent" :status="status" :current="current">
        <a-step
          v-for="item in stepArr"
          :key="item.index"
          :title="item.title"
          :sub-title="item['sub-title']"
          :description="item.description"
        />
      </a-steps>
      <section>
        <a-spin size="large" :spinning="spinning">
          <a-row justify="center">
            <a-col :span="8">
              <div :style="{ padding: '3rem 0 0' }">
                <Step1
                  v-if="$route.params.id === '1'"
                  @next="goNext"
                  @setSpinning="setSpinning"
                />
                <Step2
                  v-if="$route.params.id === '2'"
                  @setSpinning="setSpinning"
                  @prev="goPrev"
                  @next="goNext"
                />
                <Step3
                  v-if="$route.params.id === '3'"
                  @setSpinning="setSpinning"
                  @prevFirst="goPprevFirst"
                  @prev="goPrev"
                  @next="goNext"
                />
                <Step4
                  v-if="$route.params.id === '4'"
                  @setSpinning="setSpinning"
                  @next="goNext"
                />
              </div>
            </a-col>
          </a-row>
        </a-spin>
      </section>
    </div>
  </div>
</template>

<style lang="less" scoped>
.reset-password {
  height: 100vh;
  width: 100vw;
  background: radial-gradient(@white, @primary-color 50%);

  &-body {
    box-shadow: 0 0 1rem 0.1rem rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    padding: 40px;
    width: 60%;
    background: @white;
  }
}
</style>
