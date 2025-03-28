<script setup lang="ts">
import LoadingIcon from "@components/LoadingIcon.vue";
import { throttle } from "@utils/utils";
import { computed, onMounted, ref } from "vue";
/**
 * 组件所需参数值
 */
const props = defineProps<{
  distance: number; //触发加载的距离
  delay: number; //节流函数触发时间间隔，不传入则使用0
}>();

/**
 * 定义抛出事件类型
 * loadEnd  加载完成时调用
 */
type emitType = {
  [propName: string]: () => void;
};
const emit = defineEmits<{
  (e: "pullUp", el: emitType): void;
  (e: "pullDown", el: emitType): void;
}>();

const noMoreData = ref(false); //是否没有数据了
const upLoading = ref(false); //是否加载中
const downLoading = ref(false); //是否刷新中

const scrollEl = ref<HTMLInputElement | null>(null); //组件实例
const TSParams = ref<TouchEvent | undefined>(); //保存初始触摸位置
const TEParams = ref<TouchEvent | undefined>(); //保存结束时触摸位置

/**
 * 底部提示
 */
const UpLoadingTips = computed(() => {
  if (!upLoading.value) {
    if (noMoreData.value) {
      return "我已经到底线了";
    } else {
      return "上拉加载更多数据";
    }
  }
});

/**
 * 触摸开始事件
 */
const touchstart = throttle((e: TouchEvent) => {
  if (upLoading.value || downLoading.value) return false;
  TSParams.value = e;
}, props.delay);

/**
 * 触摸结束事件
 */
const touchend = throttle((e: TouchEvent) => {
  if (upLoading.value || downLoading.value) return false;
  TEParams.value = e;
  const Y =
    TEParams.value!.changedTouches[0]?.pageY - TSParams.value!.touches[0].pageY; // 垂直移动距离

  console.log(TEParams);
  console.log(Y);

  // 下拉刷新
  if (Y - props.distance >= 0) {
    downLoading.value = true;
    emit("pullDown", {
      loadEnd,
      completed,
    });
  }
  /**
   * 上拉加载
   * 整个元素高度-可视区域高度-滑动高度
   * 滑动距离超过指定值进行上拉加载
   */
  if (
    Math.abs(
      scrollEl.value!.scrollHeight -
        scrollEl.value!.clientHeight -
        scrollEl.value!.scrollTop
    ) < props.distance
  ) {
    if (-Y >= props.distance) {
      upLoading.value = true;
      emit("pullUp", {
        loadEnd,
        completed,
      });
    }
  }
}, props.delay);

// 触摸移动事件
function touchmove(e: TouchEvent) {
  if (upLoading.value || downLoading.value) return false;
}

/**
 * 加载完成后修改加载中状态
 */
function loadEnd() {
  upLoading.value = false;
  downLoading.value = false;
}
/**
 * 加载完成
 */
function completed() {
  noMoreData.value = true;
}

onMounted(() => {});
</script>

<template>
  <section
    class="f-infitinite-scroll"
    ref="scrollEl"
    @touchstart.passive.stop="touchstart"
    @touchend.passive.stop="touchend"
    @touchmove.passive.stop="touchmove"
  >
    <slot name="refresh">
      <div
        class="f-infitinite-scroll-loading f-flex f-align-center"
        :class="{ active: downLoading }"
      >
        <LoadingIcon name="circle-plain" v-if="downLoading" />
      </div>
    </slot>
    <slot></slot>
    <slot name="upload">
      <div class="f-infitinite-scroll-loading f-flex f-align-center active">
        <LoadingIcon name="circle-plain" v-if="upLoading" />
        {{ UpLoadingTips }}
      </div>
    </slot>
  </section>
</template>
<style lang="less" scoped>
.f-infitinite-scroll {
  touch-action: none;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;

  &-loading {
    background: #f5f5f5;

    &.active {
      height: 60px;
    }

    color: @text-tip;
    text-align: center;
    overflow: hidden;
    height: 0;
    transition: height cubic-bezier(0.18, 0.89, 0.32, 1.28) 0.4s;
  }
}
</style>
