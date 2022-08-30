<script setup lang="ts"></script>

<template>
  <keep-alive v-if="$route.meta.keepAlive">
    <router-view />
  </keep-alive>
  <router-view v-else />
</template>
<style lang="less">
@import url("/src/assets/style/style.less");
</style>
