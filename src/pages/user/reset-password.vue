<script setup lang="ts">
import { onMounted, onUpdated, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import Step1 from "./components/step1.vue";
import Step2 from "./components/step2.vue";

const router = useRouter();
const route = useRoute();

/**
 * 接收参数
 */
const urlQuery = ref<{ retrieveType?: string; acctNo?: string }>({});

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

/**
 * 返回上一步并且步骤条减一
 */
function goPrev() {
  current.value--;
  percent.value -= 100 / stepArr.value.length;
  router.back();
}
/**
 * 进入下一步并且步骤条加一
 */
function goNext(val: string | undefined) {
  if (val) {
    current.value++;
    percent.value += 100 / stepArr.value.length;
    let query: {
      acctNo?: string;
      retrieveType?: string;
    } = {};
    if (current.value === 1) {
      query.retrieveType = val;
    } else if (current.value === 2) {
      query.acctNo = val;
    }
    router.push({
      name: "reset-password",
      params: {
        id: current.value + 1,
      },
      query,
    });
  }
}

onMounted(() => {
  current.value = Number(route.params.id) - 1;
});

onUpdated(() => {
  if (route.query.acctNo) {
    urlQuery.value.acctNo = route.query.acctNo as string;
  }
  if (route.query.retrieveType) {
    urlQuery.value.retrieveType = route.query.retrieveType as string;
  }
  console.log(route.query, urlQuery.value);
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
                <Step1 v-if="$route.params.id === '1'" @next="goNext" />
                <Step2
                  v-if="$route.params.id === '2'"
                  :retrieveType="urlQuery.retrieveType"
                  @prev="goPrev"
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
  background: linear-gradient(
    70deg,
    @black 30%,
    #101010 30%,
    #101010 50%,
    @black 50%
  );

  &-body {
    box-sizing: border-box;
    padding: 40px;
    width: 60%;
    background: @theme-yello;
  }
}
</style>
