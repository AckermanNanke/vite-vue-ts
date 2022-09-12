<script setup lang="ts">
interface menuItem {
  id: string;
  name: string;
  children?: Array<menuItem>;
}
const props = defineProps<menuItem>();
</script>
<template>
  <a-sub-menu :key="props.id">
    <template #icon></template>
    <template #title>{{ props.name }}</template>
    <template v-for="item in props.children" :key="item.id">
      <template v-if="item.children">
        <SubMenu :children="item.children" :id="item.id" :name="item.name" />
      </template>
      <template v-else>
        <a-menu-item :key="item.id">
          <template #icon> </template>
          {{ item.name }}
        </a-menu-item>
      </template>
    </template>
  </a-sub-menu>
</template>
