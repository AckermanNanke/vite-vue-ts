<script setup lang="ts">
import { $sessionStorage } from "@utils/pluginKey";
import { inject, ref } from "vue";

import { getEmailCode } from "@api/getEmailCode";
import { getSmsCode } from "@api/getSmsCode";

// 获取会话级缓存方法
const Fsession = inject($sessionStorage);

// 定义获取的缓存对象类型
interface resetPasswordSessionType {
  acctNo: string;
  retrieveType: string;
}

// 定义抛出事件类型
const emits = defineEmits<{
  (e: "next", params: { sceneValue: string }): void;
  (e: "prev"): void;
}>();

// 定义缓存获取数据
const resetPasswordSession = Fsession?.get(
  "reset-password-info"
) as resetPasswordSessionType;

// 单选数据
const tipsInfo = ref({
  content: "",
  successTip: "我已收到验证码",
  errTip: "",
  placeholder: "",
});
if (resetPasswordSession.retrieveType === "1") {
  tipsInfo.value.content = `验证码将发送到您的邮箱`;
  tipsInfo.value.errTip = "无法接收到验证码？";
  tipsInfo.value.placeholder = "请输入验证码";
} else {
  tipsInfo.value.content = `验证码将发送到您的手机号`;
  tipsInfo.value.errTip = "手机号已弃用？";
  tipsInfo.value.placeholder = "请输入短信验证码";
}

// 表单数据
const formModel = ref({
  acctNo: resetPasswordSession.acctNo,
  retrieveType: resetPasswordSession.retrieveType,
  radioStatus: true,
});

// 表单校验规则
const formRules = {
  radioStatus: [{ required: true, message: "请选择找回方式" }],
};

// 展示帮助弹窗
function showModal() {}

/**
 * 提交表单
 * 判断为邮箱类型时请求获取验证码接口
 * 判断为手机号类型时请求获取短信验证码接口
 * @param  { formType } _values
 */
async function onFinish(_values: { radioStatus: boolean }): Promise<any> {
  let res;
  if (formModel.value.retrieveType === "1") {
    res = await getEmailCode({
      sceneValue: "reset-password",
      email: formModel.value.acctNo,
    });
  } else {
    res = await getSmsCode({
      sceneValue: "reset-password",
      phone: formModel.value.acctNo,
    });
  }

  if (res.status === 200) {
    emits("next", { sceneValue: "reset-password" });
  }
}

// 返回上一步
function prev() {
  emits("prev");
}
</script>

<template>
  <div>
    <p class="title">我们需要验证您的身份</p>
    <p class="subTitle"></p>
  </div>
  <a-form
    name="step2"
    :model="formModel"
    validateTrigger="blur"
    @finish="onFinish"
  >
    <a-form-item name="radioStatus" :rule="formRules.radioStatus">
      <a-radio v-model:checked="formModel.radioStatus"
        ><span class="radio-tips"
          >{{ tipsInfo.content }} {{ resetPasswordSession.acctNo }}</span
        >
      </a-radio>

      <template #extra>
        <a
          class="form-item-extra"
          @click="onFinish({ radioStatus: formModel.radioStatus })"
        >
          {{ tipsInfo.successTip }}
        </a>
        <router-link to="/register" class="form-item-extra" @click="showModal">
          {{ tipsInfo.errTip }}
        </router-link>
      </template>
    </a-form-item>

    <a-row justify="space-between">
      <a-col :span="11">
        <a-button type="primary" size="large" block @click="prev"
          >返回</a-button
        ></a-col
      >
      <a-col :span="11">
        <a-button type="primary" size="large" block html-type="submit"
          >获取验证码</a-button
        ></a-col
      >
    </a-row>
  </a-form>
</template>

<style lang="less" scoped>
.title {
  font-size: 1.5rem;
  font-weight: bolder;
  margin-bottom: 0;
}
.form-item-extra {
  padding-top: 0.8rem;
  display: block;
  color: @link-color;
  text-decoration: underline;
}
.radio-tips {
  font-size: 1rem;
}
</style>
