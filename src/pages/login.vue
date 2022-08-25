<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { $message, $sessionStorage } from "@utils/pluginKey";

import { toLogin } from "@utils/utils";

const router = useRouter();
const sessionStorage = inject($sessionStorage);
const message = inject($message);

type formModel = {
  accountNumber: string;
  password: string;
  isRemember: boolean;
};

const formModel = ref<formModel>({
  accountNumber: "",
  password: "",
  isRemember: false,
});

function onFinish(values: formModel) {
  toLogin(values)
    .then((res) => {
      router.replace({
        path: "/index",
      });
    })
    .catch((err) => {
      message?.error({
        content: "登陆失败",
      });
    });
}
function goRegister(): void {
  // router.push({
  //   path: "/register",
  // });
}
onMounted(() => {});
</script>

<template>
  <div id="login" class="login">
    <section class="login-body position-fixed-center box-shadow border-radius">
      <div>
        <h1>MOKE</h1>
      </div>
      <a-form
        name="basic"
        :model="formModel"
        autocomplete="off"
        @finish="onFinish"
      >
        <a-form-item
          name="accountNumber"
          :rules="[{ required: true, message: '请输入用户名' }]"
        >
          <a-input
            placeholder="请输入用户名"
            v-model:value="formModel.accountNumber"
          />
        </a-form-item>

        <a-form-item
          name="password"
          :rules="[{ required: true, message: '请输入密码' }]"
        >
          <a-input-password
            placeholder="请输入密码"
            v-model:value="formModel.password"
          />
        </a-form-item>

        <a-form-item>
          <a-form-item name="remember" no-style>
            <a-checkbox v-model:checked="formModel.isRemember"
              >记住密码</a-checkbox
            >
          </a-form-item>
          <a class="login-body-forgot" href="">忘记密码？</a>
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
          <a-button
            type="link"
            shape="round"
            size="large"
            block
            @click="goRegister"
            >注册</a-button
          >
        </a-form-item>
      </a-form>
    </section>
  </div>
</template>

<style lang="less" scoped>
.login {
  height: 100vh;
  width: 100vw;
  background: linear-gradient(
    70deg,
    @black 30%,
    #101010 30%,
    #101010 50%,
    @black 50%
  );
  // background: @white;
  &-body {
    box-sizing: border-box;
    padding: 40px;
    width: 30%;
    // background: linear-gradient(70deg, @theme-yello 40%, @black 40%);
    // background: linear-gradient(70deg, #000 40%, #ff0 40%);
    background: @theme-yello;
    &-forgot {
      float: right;
    }
  }
}
</style>
