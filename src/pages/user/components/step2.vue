<script setup lang="ts">
import { onUpdated, ref } from "vue";

// 组件接收参数
const props = defineProps<{
  retrieveType: string; //找回类型
  acctNo: string; //找回账号
}>();

// 定义抛出事件类型
const emits = defineEmits<{
  (e: "next", type: string): void;
  (e: "prev"): void;
}>();

// 单选数据
const radioInfo = ref({
  tip: "",
  value: "",
  placeholder: "",
});

// 表单数据
const formModel = ref({
  verifiationCode: "",
});

// 表单校验规则
const formRules = {
  verifiationCode: [
    { required: true, message: "请输入验证码" },
    {
      pattern: /^[\d]{6}$/,
      message: "验证码必须为6位数字",
    },
  ],
};

// 展示帮助弹窗
function showModal() {}

// 提交表单
function onFinish(values: { verifiationCode: string }): void {
  console.log(values);

  emits("next", String(values.verifiationCode));
}

// 返回上一步
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
  radioInfo.value.value = props.retrieveType;
  if (props.retrieveType === "1") {
    radioInfo.value.tip = "验证码已发送到您的邮箱";
    radioInfo.value.placeholder = "请输入验证码";
  } else {
    radioInfo.value.tip = "短信验证码已发送到您的手机号";
    radioInfo.value.placeholder = "请输入短信验证码";
  }

  console.log(props);
});
</script>

<template>
  <div>
    <p class="title">我们需要验证您的身份</p>
    <p class="subTitle"></p>
  </div>
  <a-form
    name="step1"
    :model="formModel"
    validateTrigger="blur"
    @finish="onFinish"
  >
    <a-form-item>
      <a-radio-group>
        <a-radio
          :value="radioInfo.value"
          :style="{ display: 'flex', lineHeight: '1.6rem' }"
          >{{ radioInfo.tip }}</a-radio
        >
      </a-radio-group>
    </a-form-item>

    <a-form-item name="verifiationCode" :rules="formRules.verifiationCode">
      <a-input
        :placeholder="radioInfo.placeholder"
        v-model:value="formModel.verifiationCode"
        :maxlength="6"
      />
      <template #extra>
        <div class="form-item-extra">
          <a @click="showModal">未收到验证码？</a>
        </div>
      </template>
    </a-form-item>

    <a-row justify="space-between">
      <a-col :span="11">
        <a-button type="primary" shape="round" size="large" block @click="prev"
          >返回</a-button
        ></a-col
      >
      <a-col :span="11">
        <a-button
          type="primary"
          shape="round"
          size="large"
          block
          html-type="submit"
          >继续</a-button
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
  a {
    text-decoration: underline;
  }
}
</style>
