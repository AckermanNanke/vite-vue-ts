<script setup lang="ts">
import { verifyAccountNumber } from "@api/verifyAccountNumber";
import { onUpdated, ref } from "vue";

// 组件接收参数
const props = defineProps<{
  retrieveType?: string; //找回类型
}>();

// 定义抛出事件类型
const emits = defineEmits<{
  (e: "next", acctNo?: string): void;
  (e: "prev"): void;
}>();

// 表单数据
interface formModelType {
  accountNumber: string;
}
const formModel = ref<formModelType>({
  accountNumber: "",
});

// 水印信息
const placeholder = ref("");

// 表单校验规则
const formRules = {
  accountNumber: [
    {
      required: true,
      message: `请输入${placeholder.value}`,
    },
    {
      pattern: new RegExp(
        /(^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$)|(\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)/
      ),
      message: `请输入${placeholder.value}`,
    },
  ],
};

/**
 * 表单提交
 * @param values
 * 验证通过时抛出账号状态
 */
function onFinish(values: formModelType): void {
  verifyAccountNumber(values).then(() => {
    emits("next", formModel.value.accountNumber);
  });
}

function prev() {
  emits("prev");
}
/**
 * 因为父组件动态路由传参不会再次触发 onMounted 钩子
 * 所以更新组件参数时使用onUpdated钩子
 * 接收参数时也要使用 onUpdated 钩子
 * 无法在初始化赋值数据时更新
 */
onUpdated(() => {
  console.log(props.retrieveType, props.retrieveType === "1");
  placeholder.value = props.retrieveType === "1" ? "邮箱" : "手机号";
});
</script>

<template>
  <div>
    <p class="title">请输入注册时使用的{{ placeholder }}</p>
    <p class="subTitle"></p>
  </div>
  <a-form
    name="step1"
    :model="formModel"
    validateTrigger="blur"
    @finish="onFinish"
  >
    <a-form-item name="accountNumber" :rules="formRules.accountNumber">
      <a-input
        :placeholder="'请输入' + placeholder"
        v-model:value="formModel.accountNumber"
        :maxlength="32"
      />
    </a-form-item>
    <a-form-item>
      <a-row justify="space-between">
        <a-col :span="11">
          <a-button
            type="primary"
            shape="round"
            size="large"
            block
            @click="prev"
            >返回</a-button
          >
        </a-col>
        <a-col :span="11">
          <a-button
            type="primary"
            shape="round"
            size="large"
            block
            html-type="submit"
            >继续</a-button
          >
        </a-col>
      </a-row>
    </a-form-item>
  </a-form>
</template>

<style lang="less" scoped>
.title {
  font-size: 1.5rem;
  font-weight: bolder;
  margin-bottom: 0;
}
</style>
