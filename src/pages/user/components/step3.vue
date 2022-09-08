<script setup lang="ts">
import { $sessionStorage } from "@utils/pluginKey";
import { inject, ref } from "vue";

interface step3SessionType {
  acctNo: string;
  retrieveType: string;
}

interface emitParamsType {
  acctNo: string;
  retrieveType: string;
  verifiationCode: string;
}

const Fsession = inject($sessionStorage);

// 获取会话缓存数据
const resetPasswordSession = Fsession?.get(
  "reset-password-account-info"
) as step3SessionType;

// 定义抛出事件类型
const emits = defineEmits<{
  (e: "next", params: emitParamsType): void;
  (e: "prev"): void;
}>();

/**
 * 表单数据
 */
const formModel = ref<emitParamsType>({
  acctNo: resetPasswordSession.acctNo,
  retrieveType: resetPasswordSession.retrieveType,
  verifiationCode: "",
});

// 提示语
const placeholder = ref(
  `请输入我们发送至 ${resetPasswordSession.acctNo} 的验证码。`
);

// 表单校验规则
const formRules = {
  verifiationCode: [
    {
      required: true,
      message: "验证码不能为空",
    },
    {
      pattern: /^[\d]{6}&/,
      message: "验证码须为6位数字",
    },
  ],
};

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
  /**
   * 正则判断接受值类型，默认找回类型为邮箱，
   */
  let retrieveType = "1";
  if (
    /(^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$)/.test(
      values.verifiationCode
    )
  ) {
    retrieveType = "2";
  }
  // verifyAccountNumber({}).then(() => {
  //   emits("next", {
  //     acctNo: "",
  //     retrieveType: "",
  //     verifiationCode: "",
  //   });
  // });
}
</script>

<template>
  <div>
    <p class="title">验证您的身份</p>
    <p class="subTitle">输入我们发送至 {{ formModel.acctNo }} 的验证码。</p>
  </div>
  <a-form
    name="step1"
    :model="formModel"
    validateTrigger="blur"
    @finish="onFinish"
  >
    <a-form-item name="verifiationCode" :rules="formRules.verifiationCode">
      <a-input
        :placeholder="placeholder"
        v-model:value="formModel.verifiationCode"
        :maxlength="32"
      />
    </a-form-item>
    <a-form-item>
      <div class="form-item-extra">
        <router-link :to="{ name: 'reset-password', params: { id: 1 } }" replace
          >使用其他验证方式</router-link
        >
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
