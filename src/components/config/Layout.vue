<script setup lang="ts">
import { MenuFoldOutlined } from "@ant-design/icons-vue";
import { getMenuList } from "@api/getMenuList";
import LayoutHeader from "@components/config/LayoutHeader.vue";
import SubMenu from "@components/config/SubMenu.vue";
import { onMounted, ref } from "vue";

// 是否展开侧边栏
const collapsed = ref(false);
// 默认选中菜单项
const selectedKeys = ref<string[]>(["11"]);
// 默认展开子菜单
const openKeys = ref<string[]>(["1"]);
// 菜单栏
const menuList = ref<dataType.menuItem[] | null>(null);
// 头部信息
const headerInfo = ref({
  userName: "用户名",
});

/**
 * 展开收起菜单
 */
function toggleCollapsed() {
  collapsed.value = !collapsed.value;
}
onMounted(() => {
  /**
   * 获取菜单列表
   */
  getMenuList({
    userLv: "",
  }).then((res) => {
    menuList.value = res.data.list;
  });
});
</script>
<template>
  <a-layout class="layout-100vw">
    <a-layout-sider
      v-model:collapsed="collapsed"
      collapsed-width="40"
      theme="light"
    >
      <div class="f-flex f-justify-between sider-top">
        <div class="f-flex f-w100">
          <div v-if="!collapsed">
            <img src="/vite.svg" alt="" />
          </div>
          <span class="sider-top-title">Free</span>
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
      <a-layout-header>
        <LayoutHeader :props="headerInfo" />
      </a-layout-header>
      <a-layout class="layout-content-f">
        <a-layout-content>
          <slot name="content" />
          <a-layout-footer :style="{ textAlign: 'center' }">
            <slot name="footer" />
          </a-layout-footer>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<style lang="less" scoped>
.sider-top {
  padding: 1rem 1.4rem;
  &-title {
    font-size: 1.4rem;
    font-weight: 600;
    padding-left: 1rem;
  }
}
</style>
