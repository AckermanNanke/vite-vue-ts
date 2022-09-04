<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter()
/**
 * 加载状态
 */
const spinning = ref(false);
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
const percent = ref(0);

/**
 * 返回上一步并且步骤条减一
 */
function goPrev(){
  router.back()
  current.value--
}
/**
 * 进入下一步并且步骤条加一
 */
function goNext(){
  router.push(`/reset-password/step${current.value + 1}`)
  current.value++
}

</script>

<template>
  <a-steps :percent="percent" :status="status" :current="current">
    <a-step title="Finished" description="This is a description." />
    <a-step title="In Progress" sub-title="Left 00:00:08" description="This is a description." />
    <a-step title="Waiting" description="This is a description." />
  </a-steps>
  <section>
    <a-spin size="large" :spinning="spinning">
      <keep-alive>
        <router-view />
      </keep-alive>
      <a-row justify="center">
        <a-col :span="4">
          <a-button type="primary" shape="round" block @click="goPrev">返回</a-button>
        </a-col>
        <a-col :span="4" :offset="1">
          <a-button type="primary" shape="round" block @click="goNext">继续</a-button>
        </a-col>
      </a-row>
    </a-spin>
  </section>
</template>