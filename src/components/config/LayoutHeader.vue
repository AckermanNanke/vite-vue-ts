<script setup lang="ts">
import { debounce } from "@utils/utils";
import { ref } from "vue";

interface searchItem {
  id: string;
  value: string;
}
// const props = defineProps<dataType.userInfo>();
const props = ref({
  userName: "u规格",
});
// 搜索内容
const searchValue = ref("");
// 搜索loading
const searchLoading = ref(false);
// 搜索内容
const searchList = ref<Array<searchItem>>([]);

/**
 * 搜索框搜索
 * @param { string } value 搜索框输入值
 */
const onHeaderSearch = debounce((value: string) => {
  console.log(value);
});
/**
 * 搜索后选择下拉
 * @param value
 * @param option
 */
function onHeaderSelect(value: any, option: any) {
  console.log(option);
  console.log(value);
}
</script>
<template>
  <a-row align="middle" justify="space-between">
    <a-col :span="14">
      <a-select
        v-model:value="searchValue"
        placeholder="请输入搜索内容……"
        show-search
        :default-active-first-option="false"
        :show-arrow="false"
        :filter-option="false"
        :not-found-content="searchLoading ? undefined : null"
        :options="searchList"
        style="width: 100%"
        size="large"
        @search="onHeaderSearch"
        @select="onHeaderSelect"
      >
        <template v-if="searchLoading" #notFoundContent>
          <a-spin size="small" />
        </template>
      </a-select>
    </a-col>
    <a-col>
      <a-avatar size="large" src="/vite.svg"> </a-avatar>
    </a-col>
  </a-row>
</template>
