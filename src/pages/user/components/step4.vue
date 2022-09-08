<script setup lang="ts">
import { $sessionStorage } from "@utils/pluginKey";
import type { Rule } from "ant-design-vue/es/form";
import { inject, readonly, ref } from "vue";

import { resetPassword } from "@api/resetPassword";

interface resetPasswordSessionType {
  acctNo: string;
  retrieveType: string;
  verifiationCode: string;
}

interface formModelType {
  newPassword: string;
  confirmPassword: string;
}

// 接收缓存方法
const Fsession = inject($sessionStorage);

// 获取会话缓存数据
const resetPasswordSession = readonly(
  Fsession?.get("reset-password-info") as resetPasswordSessionType
);

// 定义抛出事件类型
const emits = defineEmits<{
  (e: "setSpinning", status: boolean): void;
  (e: "next"): void;
}>();

/**
 * 表单数据
 */
const formModel = ref<formModelType>({
  newPassword: "",
  confirmPassword: "",
});

// 表单校验规则
const formRules: Record<string, Rule[]> = {
  newPassword: [
    {
      required: true,
      message: "请输入密码",
    },
    {
      pattern: new RegExp(/^(?=.*[0-9])(?=.*[a-zA-Z])(.{6,15})$/),
      message: "密码必须为6-15位，且包含数字、大小写字母",
    },
    {
      validator: async (_rule: Rule, value: string) => {
        if (value != formModel.value.newPassword) {
          return Promise.reject("两次密码输入不一致");
        }
      },
    },
  ],
};

/**
 * 表单提交
 * @param values
 * 验证通过时抛出账号状态
 */
function onFinish(values: formModelType): void {
  emits("setSpinning", true);
  resetPassword({
    accountNumber: resetPasswordSession.acctNo,
    retrieveType: resetPasswordSession.retrieveType,
    verifiationCode: resetPasswordSession.verifiationCode,
    newPassword: values.newPassword,
    confirmPassword: values.confirmPassword,
  })
    .then(() => {
      emits("next");
    })
    .finally(() => {
      emits("setSpinning", false);
    });
}
</script>

<template>
  <div>
    <p class="title">请重置您的密码？</p>
    <p class="subTitle">重置后您的旧密码将无法使用</p>
  </div>
  <a-form
    name="step4"
    :model="formModel"
    validateTrigger="blur"
    @finish="onFinish"
  >
    <a-form-item name="newPassword" :rules="formRules.newPassword">
      <a-input-password
        v-model:value="formModel.newPassword"
        placeholder="请输入新密码"
        :maxlength="15"
      />
    </a-form-item>

    <a-form-item name="confirmPassword" :rules="formRules.newPassword">
      <a-input-password
        v-model:value="formModel.confirmPassword"
        placeholder="请确认新密码"
        :maxlength="15"
      />
    </a-form-item>

    <a-form-item>
      <a-button type="primary" size="large" block html-type="submit"
        >提交</a-button
      >
    </a-form-item>
  </a-form>
</template>

<style lang="less" scoped>
.title {
  font-size: 1.5rem;
  font-weight: bolder;
  margin-bottom: 0;
}
.form-item-extra {
  a {
    text-decoration: underline;
  }
}
</style>
