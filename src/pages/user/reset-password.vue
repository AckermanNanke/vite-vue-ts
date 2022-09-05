<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import Step1 from "./components/step1.vue";
import Step2 from "./components/step2.vue";
import Step3 from "./components/step3.vue";

const router = useRouter()
const route = useRoute()

/**
 * 加载状态
 */
const spinning = ref(false);
/**
 * 总步骤
 */
const stepArr = ref([
  {
    index:0,
    title:"输入账户名",
    'sub-title':"",
    description:"请输入您注册时使用的邮箱或手机号",
  },
  {
    index:0,
    title:"选择找回方式",
    'sub-title':"",
    description:"您可以选择短信验证码或者邮箱验证码",
  },
  {
    index:0,
    title:"输入验证码",
    'sub-title':"",
    description:"请输入您注册时使用的邮箱或手机号",
  },
])
/**
 * 当前步骤
 */
const current = ref(0);

/**
 * 当前步骤状态
 */
const status = ref<"process" | "wait" | "error" | "finish" | undefined
>("process");

/**
 * 当前进度
 */
const percent = ref((100 / stepArr.value.length));

/**
 * 返回上一步并且步骤条减一
 */
function goPrev(){
  router.back()
  current.value--
  percent.value -= (100 / stepArr.value.length);
}
/**
 * 进入下一步并且步骤条加一
 */
function goNext(){
  current.value++
  percent.value += (100 / stepArr.value.length);
  router.push({
    name:"reset-password",
    params:{
      id: current.value + 1
    }
  })
}

onBeforeMount(() => {
  current.value === Number(route.params.id) - 1
})

</script>

<template>
  <div id="reset-password" class="reset-password">
    <div class="reset-password-body position-fixed-center box-shadow border-radius">
      <a-steps :percent="percent" :status="status" :current="current">
        <a-step v-for="item in stepArr" :key="item. index" :title="item.title" :sub-title="item['sub-title']"
          :description="item.description" />
      </a-steps>
      <section>
        <a-spin size="large" :spinning="spinning">
          <a-row justify="center">
            <a-col :span="8">
              <div :style="{padding:'3rem 0 0'}">
                <Step1 v-if="$route.params.id === '1'" />
                <Step2 v-if="$route.params.id === '2'" />
                <Step3 v-if="$route.params.id === '3'" />
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
  background: linear-gradient(70deg,
      @black 30%,
      #101010 30%,
      #101010 50%,
      @black 50%);

  &-body {
    box-sizing: border-box;
    padding: 40px;
    width: 60%;
    background: @theme-yello;
  }
}
</style>