<script setup lang="ts">
import { toRegister } from "@utils/utils";
import type { Rule } from "ant-design-vue/es/form";
import { ref } from "vue";
import { useRouter } from "vue-router";

import Captcha from "../../components/captcha.vue";

// 依赖注入
const router = useRouter();

// 表单数据
const formModel = ref({
  accountNumber: "",
  password: "",
  passwordConfirm: "",
  phone: "",
  captcha: "",
  smsVerifiationCode: "",
});
// 表单校验规则
const formRules = {
  accountNumber: [
    { required: true, message: "账号不能为空" },
    {
      pattern: new RegExp(
        /(^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$)|(\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)/
      ),
      message: "账号需为邮箱或者手机号",
    },
  ],
  password: [
    {
      required: true,
      message: "密码不能为空",
    },
    {
      pattern: new RegExp(/^(?=.*[0-9])(?=.*[a-zA-Z])(.{6,15})$/),
      message: "密码必须为6-15位，且包含数字、大小写字母",
    },
  ],
  passwordConfirm: [
    {
      required: true,
      message: "请再次输入密码",
    },
    {
      pattern: new RegExp(/^(?=.*[0-9])(?=.*[a-zA-Z])(.{6,15})$/),
      message: "密码必须为6-15位，且包含数字、大小写字母",
    },
    {
      validator: async (_rule: Rule, value: string) => {
        if (formModel.value.password != value) {
          return Promise.reject("两次输入密码不一致");
        } else {
          return Promise.resolve();
        }
      },
    },
  ],
  phone: [
    {
      required: true,
      message: "手机号不能为空",
    },
    {
      pattern: new RegExp(
        /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
      ),
      message: "手机号格式不正确",
    },
  ],
  captcha: [
    {
      required: true,
      message: "图形验证码不能为空",
    },
    {
      pattern: new RegExp(/^[\d|a-z|A-Z]{4}$/),
      message: "图形验证码不正确",
    },
  ],
  smsVerifiationCode: [],
};

// 加载状态
const spinning = ref(false);

// 注册提交
function onFinish(values: typeof formModel.value) {
  toRegister(values);
}
</script>

<template>
  <a-spin size="large" :spinning="spinning">
    <div id="register" class="register">
      <section class="register-body position-fixed-center box-shadow border-radius">
        <div class="logo">
          <a-avatar src="/src/assets/images/logo.jpg" :size="80" />
        </div>
        <a-form name="basic" :model="formModel" validateTrigger="blur" @finish="onFinish">
          <a-form-item name="accountNumber" :rules="formRules.accountNumber">
            <a-input placeholder="请输入账号" v-model:value="formModel.accountNumber" :bordered="false" :maxlength="32" />
          </a-form-item>

          <a-form-item name="password" :rules="formRules.password">
            <a-input-password placeholder="请输入密码" v-model:value="formModel.password" :maxlength="15" />
          </a-form-item>
          <a-form-item name="passwordConfirm" :rules="formRules.passwordConfirm">
            <a-input-password placeholder="请再次输入密码" v-model:value="formModel.passwordConfirm" :maxlength="15" />
          </a-form-item>
          <a-form-item name="phone" :rules="formRules.phone">
            <a-input placeholder="请输入手机号" v-model:value="formModel.phone" :maxlength="16" />
          </a-form-item>

          <a-form-item name="captcha" :rules="formRules.captcha">
            <a-row>
              <a-col :span="12">
                <a-input placeholder="请输入图形验证码" v-model:value="formModel.captcha" :maxlength="4" />
              </a-col>
              <a-col :span="8" :offset="4">
                <Captcha captchaType="dot" captchaCode="qrwe" :width="112" :height="32" :colorMax="50" :colorMin="0"
                  :backgroundMax="240" :backgroundMin="180" :disturbColorMax="0" :disturbColorMin="255" />
              </a-col>
            </a-row>
          </a-form-item>

          <a-form-item name="smsVerifiationCode" label="短信验证码" :wrapperCol="{ span: 12, offset: 7 }"
            :rules="formRules.smsVerifiationCode">
            <a-input placeholder="请输入短信验证码" v-model:value="formModel.smsVerifiationCode" :maxlength="4" />
          </a-form-item>

          <a-form-item>
            <a-button type="primary" shape="round" size="large" html-type="submit" block>注册</a-button>
          </a-form-item>
        </a-form>
      </section>
    </div>
  </a-spin>
</template>

<style lang="less" scoped>
.register {
  height: 100vh;
  width: 100vw;
  background: linear-gradient(70deg,
      @black 30%,
      #101010 30%,
      #101010 50%,
      @black 50%);

  .logo {
    margin: 0 auto 40px;
    overflow: hidden;
    text-align: center;
  }

  &-body {
    box-sizing: border-box;
    padding: 40px;
    width: 26%;
    background: @theme-yello;

    &-forgot {
      float: right;

      .spacer {
        padding: 0 4px;
      }
    }
  }
}
</style>
