<script setup lang="ts">
import { getBankInfo } from "@api/getBankInfo";
import { Fsession } from "@utils/baseUtils";
import { $message } from "@utils/pluginKey";
import { toLogin } from "@utils/utils";
import { inject, onBeforeMount, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

type formModel = {
  accountNumber: string;
  password: string;
  isRemember: boolean;
};
// 依赖注入
const Message = inject($message);
const router = useRouter();
const route = useRoute();

// 行号
const urlOptions = ref({
  bankNo: "",
});
// 表单数据
const formModel = ref<formModel>({
  accountNumber: "",
  password: "",
  isRemember: false,
});
// 加载状态
const spinning = ref(false);

// 表单提交
function onFinish(values: formModel) {
  spinning.value = true;
  toLogin(values)
    .then((res) => {
      // 记住密码
      if (formModel.value.isRemember) {
        document.cookie = "password=" + formModel.value.password;
        document.cookie = "username=" + formModel.value.accountNumber;
      }
      router?.replace({
        path: "/index",
      });
    })
    .catch((err) => {
      Message?.error({
        content: "登陆失败",
      });
    })
    .finally(() => {
      spinning.value = false;
    });
}
onBeforeMount(() => {
  urlOptions.value = {
    bankNo: route.query.bankNo as string,
  };
}),
  onMounted(() => {
    spinning.value = true;
    // 获取银行信息并缓存到本地
    getBankInfo(urlOptions.value)
      .then((res) => {
        Fsession.set("bankInfo", res.data);
      })
      .finally(() => {
        spinning.value = false;
      });
  });
</script>

<template>
  <div id="login" class="login">
    <section class="login-body position-fixed-center box-shadow border-radius">
      <a-spin size="large" :spinning="spinning">
        <div class="logo">
          <a-avatar src="/vite.svg" :size="80" />
        </div>
        <a-form
          name="basic"
          :model="formModel"
          validateTrigger="blur"
          @finish="onFinish"
        >
          <a-form-item
            name="accountNumber"
            :rules="[
              { required: true, message: '请输入账号' },
              {
                pattern: new RegExp(
                  /(^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$)|(\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)/
                ),
                message: '账号需为邮箱或者手机号',
              },
            ]"
          >
            <a-input
              placeholder="请输入账号"
              v-model:value="formModel.accountNumber"
              :maxlength="32"
            />
          </a-form-item>

          <a-form-item
            name="password"
            :rules="[
              {
                required: true,
                message: '请输入密码',
              },
              {
                pattern: new RegExp(/^(?=.*[0-9])(?=.*[a-zA-Z])(.{6,15})$/),
                message: '密码必须为6-15位，且包含数字、大小写字母',
              },
            ]"
          >
            <a-input-password
              placeholder="请输入密码"
              v-model:value="formModel.password"
              :maxlength="15"
            />
          </a-form-item>

          <a-form-item>
            <a-form-item name="remember" no-style>
              <a-checkbox v-model:checked="formModel.isRemember"
                >记住密码</a-checkbox
              >
            </a-form-item>
            <div class="login-body-forgot">
              <router-link :to="{ name: 'reset-password', params: { id: 1 } }"
                >忘记密码？</router-link
              >
              <span class="spacer">|</span>
              <router-link to="/register">注册</router-link>
            </div>
          </a-form-item>

          <a-form-item>
            <a-button
              type="primary"
              shape="round"
              size="large"
              html-type="submit"
              block
              >登录</a-button
            >
          </a-form-item>
        </a-form>
        <div class="text-center">欢迎来到Moke的个人博客</div>
      </a-spin>
    </section>
  </div>
</template>

<style lang="less" scoped>
.login {
  height: 100vh;
  width: 100vw;
  background: radial-gradient(@white, @primary-color 50%);

  .logo {
    margin: 0 auto 40px;
    overflow: hidden;
    text-align: center;
  }

  &-body {
    box-sizing: border-box;
    padding: 40px;
    width: 30%;
    background: @white;

    &-forgot {
      float: right;

      .spacer {
        padding: 0 4px;
      }
    }
  }
}
</style>
