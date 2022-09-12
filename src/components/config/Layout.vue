<script setup lang="ts">
import { ref } from "vue";
import { menu } from "@config/data/globalConst";
import SubMenu from "@components/config/SubMenu.vue";

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
  <a-layout has-sider>
    <a-layout-sider
      :style="{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }"
      v-model:collapsed="collapsed"
    >
      <div class="logo" />
      <a-button type="primary" @click="toggleCollapsed"> 展开 </a-button>
      <a-menu
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        theme="dark"
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
    <a-layout :style="{ marginLeft: '200px' }">
      <a-layout-header :style="{ background: '#fff', padding: 0 }" />
      <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
        <div
          :style="{
            padding: '24px',
            background: '#fff',
            textAlign: 'center',
            height: '2000px',
          }"
        ></div>
      </a-layout-content>
      <a-layout-footer :style="{ textAlign: 'center' }">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
