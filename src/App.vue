<script setup lang="ts">
import Layout from "@components/config/Layout.vue";
</script>
<template>
  <Layout>
    <template #content>
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view />
      </keep-alive>
      <router-view v-else />
    </template>
  </Layout>
</template>
<style lang="less">
@import url("/src/assets/style/style.less");
</style>
