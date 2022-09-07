<script setup lang="ts">
import { onUpdated, ref } from "vue";

interface propsType {
  acctNo: string;
  retrieveType: string;
}

interface emitParamsType {
  acctNo: string;
  retrieveType: string;
  verifiationCode: string;
}

// 组件接收参数
const props = defineProps<propsType>();

// 定义抛出事件类型
const emits = defineEmits<{
  (e: "next", params: emitParamsType): void;
  (e: "prev"): void;
}>();

/**
 * 表单数据
 */
const formModel = ref<emitParamsType>({
  acctNo: "",
  retrieveType: "",
  verifiationCode: "",
});

// 提示语
const placeholder = ref("");

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

/**
 * 因为父组件动态路由传参不会再次触发 onMounted 钩子
 * 所以更新组件参数时使用onUpdated钩子
 * 接收参数时也要使用 onUpdated 钩子
 * 无法在初始化赋值数据时更新
 */
onUpdated(() => {
  console.log(123123);

  formModel.value.acctNo = props.acctNo;
  formModel.value.retrieveType = props.retrieveType;
  placeholder.value = `请输入我们发送至 ${props.acctNo} 的验证码。`;
});
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
        <router-link to="/register">使用其他验证方式</router-link>
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
