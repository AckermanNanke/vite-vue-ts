<script setup lang="ts">
import { onMounted, ref } from "vue";

/**
 * 组件所需参数值
 */
const props = defineProps<{
  distance: number; //触发加载的距离
}>();

/**
 * 定义抛出事件类型
 */
const emit = defineEmits<{
  (e: "pullUp", func: () => void): void;
  (e: "pullDown", func: () => void): void;
}>();

const upLoading = ref(false); //是否加载中
const downLoading = ref(false); //是否刷新中
const scrollEl = ref(); //组件实例
const TSParams = ref<TouchEvent | undefined>();
const TEParams = ref<TouchEvent | undefined>();

function touchstart(e: TouchEvent) {
  if (upLoading.value || downLoading.value) return false;
  TSParams.value = e;
}
async function touchend(e: TouchEvent) {
  if (upLoading.value || downLoading.value) return false;
  TEParams.value = e;
  const Y =
    TEParams.value!.changedTouches[0]?.pageY - TSParams.value!.touches[0].pageY; // 垂直移动距离
  const scrollY = scrollEl.value.scrollHeight; //可滚动区域的高度

  // 下拉刷新
  if (Y - props.distance >= 0) {
    downLoading.value = true;
    emit("pullDown", () => {
      loadEnd();
    });
  }
  /**
   * 上拉加载
   * 整个元素高度-可视区域高度-滑动高度
   * 滑动距离超过指定值进行上拉加载
   */
  if (
    Math.abs(
      scrollEl.value.scrollHeight -
        scrollEl.value.clientHeight -
        scrollEl.value.scrollTop
    ) < props.distance
  ) {
    if (-Y >= props.distance) {
      upLoading.value = true;
      emit("pullUp", () => {
        loadEnd();
      });
    }
  }
}
// 触摸移动事件
function touchmove(e: TouchEvent) {
  if (upLoading.value || downLoading.value) return false;
}
function loadEnd() {
  upLoading.value = false;
  downLoading.value = false;
}
onMounted(() => {});
</script>

<template>
  <section
    class="f-infitinite-scroll"
    ref="scrollEl"
    @touchstart="touchstart"
    @touchend="touchend"
    @touchmove="touchmove"
  >
    <slot name="no-data"> 没有数据 </slot>
    <slot name="downLoading">
      <div class="f-infitinite-scroll-loading" :class="{ active: downLoading }">
        加载中...
      </div>
    </slot>
    <slot></slot>
    <slot name="upLoading">
      <div class="f-infitinite-scroll-loading" :class="{ active: upLoading }">
        上拉加载更多数据
      </div>
    </slot>
    <slot name="no-more"> 这已经是我的底线了 </slot>
  </section>
</template>
<style lang="less">
.f-infitinite-scroll {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  &-loading {
    &.active {
      height: 60px;
    }
    line-height: 60px;
    color: @text-tip;
    text-align: center;
    overflow: hidden;
    height: 0;
    transition: height cubic-bezier(0.18, 0.89, 0.32, 1.28) 0.8s;
  }
}
</style>
