<script setup lang="ts">
import { ref } from "vue";

// 表单数据
const formModel = ref({
  verfiyCode: "",
});

// 表单校验规则
const formRules = {
  verfiyCode: [
    { required: true, message: "验证码不能为空" },
    {
      pattern: new RegExp(/[\d]{6}/),
      message: "验证码为6位数字",
    },
  ],
};

function onFinish(values: any): void {}
</script>

<template>
  <a-form
    name="step1"
    :model="formModel"
    validateTrigger="blur"
    @finish="onFinish"
  >
    <a-form-item name="accountNumber" :rules="formRules.verfiyCode">
      <a-input
        placeholder="请输入6位数字验证码"
        v-model:value="formModel.verfiyCode"
        :maxlength="32"
      />
    </a-form-item>

    <a-form-item>
      <a-button type="link" @click="prev">未收到验证码？</a-button>
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
