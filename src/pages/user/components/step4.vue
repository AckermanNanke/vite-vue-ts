<script setup lang="ts">
import { $sessionStorage } from "@utils/pluginKey";
import { inject, ref } from "vue";

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
const resetPasswordSession = Fsession?.get(
  "reset-password-info"
) as resetPasswordSessionType;

// 定义抛出事件类型
const emits = defineEmits<{
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
const formRules = {
  newPassword: [
    {
      required: true,
      message: "请输入密码",
    },
    {
      pattern: new RegExp(/^(?=.*[0-9])(?=.*[a-zA-Z])(.{6,15})$/),
      message: "密码必须为6-15位，且包含数字、大小写字母",
    },
  ],
};

/**
 * 表单提交
 * @param values
 * 验证通过时抛出账号状态
 */
function onFinish(values: { verifiationCode: string }): void {
  // verifyAccountCode({
  //   accountNumber: formModel.value.acctNo,
  //   retrieveType: formModel.value.retrieveType,
  //   verifiationCode: values.verifiationCode,
  // }).then(() => {
  emits("next");
  // });
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
      <a-input
        placeholder="请输入新密码"
        v-model:value="formModel.newPassword"
        :maxlength="15"
      />
    </a-form-item>

    <a-form-item name="confirmPassword" :rules="formRules.newPassword">
      <a-input
        placeholder="请确认新密码"
        v-model:value="formModel.confirmPassword"
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
