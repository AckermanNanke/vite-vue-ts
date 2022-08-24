<script setup lang="ts">
import { toLogin } from "@utils/utils";
import { onMounted, ref } from "vue";

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
  console.log(values, 123);
}
function onFinishFailed({ values }) {
  console.log(values);
}
function aaa() {
  return toLogin(formModel.value);
}
onMounted(() => {
  aaa()
    .then((res) => {
      console.log(res, 222222222222);
    })
    .catch((err) => {
      console.log(err, 333333333333);
    });
});
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
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          name="accountNumber"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="formModel.accountNumber" />
        </a-form-item>

        <a-form-item
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="formModel.password" />
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
          <a-button type="link" shape="round" size="large" block>注册</a-button>
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
