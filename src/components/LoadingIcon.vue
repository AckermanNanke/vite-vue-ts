<script setup lang="ts">
import { onMounted } from "vue";
const props = defineProps<{
  name: string
}>()
onMounted(() => { })
</script>
<template>
  <div class="f-loading-icon">
    <i :class="'loading-' + props.name"></i>
  </div>
</template>

<style lang="less" scoped>
.f-loading-icon {
  >i {
    display: block;
  }

  .loading-circle-plain {
    margin: 0 auto;
    position: relative;
    width: 30px;
    height: 30px;
    border: 3px solid #000;
    border-top-color: rgba(0, 0, 0, 0.2);
    border-right-color: rgba(0, 0, 0, 0.2);
    border-bottom-color: rgba(0, 0, 0, 0.2);
    border-radius: 100%;
    animation: circle-plain infinite 0.75s linear;
  }
}

@keyframes circle-plain {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>