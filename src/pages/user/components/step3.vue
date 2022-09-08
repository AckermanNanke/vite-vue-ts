<script setup lang="ts">
import { verifyAccountCode } from "@api/verifyAccountCode";
import { $sessionStorage } from "@utils/pluginKey";
import { Rule } from "ant-design-vue/es/form";
import { inject, readonly, ref } from "vue";

interface resetPasswordSessionType {
  acctNo: string;
  retrieveType: string;
}

interface formModelType {
  acctNo: string;
  retrieveType: string;
  verifiationCode: string;
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
  (
    e: "next",
    params: {
      verifiationCode: string;
    }
  ): void;
  (e: "prev"): void;
  (e: "prevFirst"): void;
}>();

/**
 * 表单数据
 */
const formModel = ref<formModelType>({
  acctNo: resetPasswordSession.acctNo,
  retrieveType: resetPasswordSession.retrieveType,
  verifiationCode: "",
});

// 提示语
const placeholder = ref(
  `请输入我们发送至 ${resetPasswordSession.acctNo} 的验证码。`
);

// 表单校验规则
const formRules: Record<string, Rule[]> = {
  verifiationCode: [
    {
      required: true,
      message: "验证码不能为空",
    },
    {
      pattern: new RegExp(/^[\d]{6}$/),
      message: "验证码须为6位数字",
    },
  ],
};

// 返回第一步
function prevFirst() {
  emits("prevFirst");
}

// 返回上一步
function prev() {
  emits("prev");
}

/**
 * 表单提交
 * @param values
 * 验证通过时抛出账号状态
 */
function onFinish(values: { verifiationCode: string }): void {
  emits("setSpinning", true);
  verifyAccountCode({
    accountNumber: formModel.value.acctNo,
    retrieveType: formModel.value.retrieveType,
    verifiationCode: values.verifiationCode,
  })
    .then(() => {
      emits("next", { verifiationCode: values.verifiationCode });
    })
    .finally(() => {
      emits("setSpinning", false);
    });
}
</script>

<template>
  <div>
    <p class="title">验证您的身份</p>
    <p class="subTitle">输入我们发送至 {{ formModel.acctNo }} 的验证码。</p>
  </div>
  <a-form
    name="step3"
    :model="formModel"
    validateTrigger="blur"
    @finish="onFinish"
  >
    <a-form-item name="verifiationCode" :rules="formRules.verifiationCode">
      <a-input
        :placeholder="placeholder"
        v-model:value="formModel.verifiationCode"
        :maxlength="6"
      />
    </a-form-item>
    <a-form-item>
      <div class="form-item-extra">
        <a @click="prevFirst">使用其他验证方式</a>
      </div>
    </a-form-item>

    <a-form-item>
      <a-row justify="space-between">
        <a-col :span="11">
          <a-button type="primary" size="large" block @click="prev"
            >返回</a-button
          ></a-col
        >
        <a-col :span="11">
          <a-button type="primary" size="large" block html-type="submit"
            >提交</a-button
          ></a-col
        >
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
.form-item-extra {
  a {
    text-decoration: underline;
  }
}
</style>
