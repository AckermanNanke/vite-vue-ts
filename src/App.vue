<script setup lang="ts">
import { getUserInfo } from "@api/getUserInfo";
import { getHotKeyword } from "@api/getHotKeyword";

getUserInfo({
  userID: "23234swrfwerwerfsf",
});
getHotKeyword();
</script>

<template>
  <!-- <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive> -->
  <router-view />
</template>
<style lang="less">
@import url("/src/assets/style/style.less");
</style>
