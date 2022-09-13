<script setup lang="ts">
import { MenuFoldOutlined } from "@ant-design/icons-vue";
import SubMenu from "@components/config/SubMenu.vue";
import { menu } from "@config/data/globalConst";
import { ref } from "vue";
const collapsed = ref(false);
const openKeys = ref<string[]>(["1"]);
const selectedKeys = ref<string[]>(["11"]);
const menuList = ref(menu);

/**
 * 展开收起菜单
 */
function toggleCollapsed() {
  collapsed.value = !collapsed.value;
}
</script>
<template>
  <a-layout class="layout-100vw">
    <a-layout-sider
      v-model:collapsed="collapsed"
      collapsed-width="40"
      theme="light"
    >
      <div class="f-flex f-justify-between sider-logo">
        <div v-if="!collapsed">
          <img src="/vite.svg" alt="" />
        </div>
        <menu-fold-outlined @click="toggleCollapsed" />
      </div>
      <a-menu
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        mode="inline"
      >
        <template v-for="item in menuList" :key="item.id">
          <template v-if="!item.children">
            <a-menu-item :key="item.id">
              <template #icon> </template>
              {{ item.name }}
            </a-menu-item>
          </template>
          <template v-else>
            <SubMenu
              :children="item.children"
              :id="item.id"
              :name="item.name"
            />
          </template>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header />
      <a-layout class="layout-content-f">
        <a-layout-content>
          <div
            :style="{
              padding: '24px',
              background: '#fff',
              textAlign: 'center',
              height: '2000px',
            }"
          ></div>
          <a-layout-footer :style="{ textAlign: 'center' }">
            Ant Design ©2018 Created by Ant UED
          </a-layout-footer>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<style lang="less" scoped>
.sider-logo {
  padding: 1rem 1.4rem;
}
</style>
