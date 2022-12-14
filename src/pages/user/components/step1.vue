<script setup lang="ts">
import { verifyAccountNumber } from "@api/verifyAccountNumber";
import { Rule } from "ant-design-vue/es/form";
import { ref } from "vue";

// 定义抛出事件类型
interface resetPasswordSessionType {
  acctNo: string;
  retrieveType: string;
}
const emits = defineEmits<{
  (e: "setSpinning", status: boolean): void;
  (e: "next", params: resetPasswordSessionType): void;
}>();

const formModel = ref({
  accountNumber: "",
});

// 表单校验规则
const regExp = new RegExp(
  /(^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$)|(\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)/
);
const formRules: Record<string, Rule[]> = {
  accountNumber: [
    {
      required: true,
      message: "账号不能为空",
    },
    {
      pattern: regExp,
      message: "请输入注册时使用的邮箱或者手机号",
    },
  ],
};

/**
 * 表单提交
 * @param values
 * 验证通过时抛出账号状态
 */
function onFinish(values: { accountNumber: string }): void {
  emits("setSpinning", true);
  /**
   * 正则判断接受值类型，默认找回类型为邮箱，
   */
  let retrieveType = "1";
  if (
    /(^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$)/.test(
      values.accountNumber
    )
  ) {
    retrieveType = "2";
  }
  verifyAccountNumber(values)
    .then(() => {
      emits("next", {
        acctNo: values.accountNumber,
        retrieveType,
      });
    })
    .finally(() => {
      emits("setSpinning", false);
    });
}
</script>

<template>
  <div>
    <p class="title">请输入注册时使用的邮箱或者手机号</p>
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
        placeholder="请输入注册时使用的邮箱或者手机号"
        v-model:value="formModel.accountNumber"
        :maxlength="32"
      />
    </a-form-item>
    <a-form-item>
      <div class="form-item-extra">
        <router-link to="/register" replace>还未创建账号？创建一个</router-link>
      </div>
    </a-form-item>

    <a-form-item>
      <a-button type="primary" size="large" block html-type="submit"
        >继续</a-button
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
