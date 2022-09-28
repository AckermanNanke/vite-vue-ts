<script setup lang="ts">
import Layout from "@components/config/Layout.vue";
</script>
<template>
  <router-view v-if="$route.name === 'login'" />
  <Layout v-else>
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
