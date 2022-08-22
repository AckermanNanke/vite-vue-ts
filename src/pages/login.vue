<script setup lang="ts">
import { type } from "os";
import { ref } from "vue";

type formModel = {
  accountNumber: string;
  password: string;
  isRember: boolean;
};

defineProps<{ msg: string }>();

const formModel = ref<formModel>({
  accountNumber: "",
  password: "",
  isRember: false,
});

function onFinish(values: formModel) {
  console.log(values, 123);
}
function onFinishFailed({ values }) {
  console.log(values);
}
</script>

<template>
  <div id="login" class="login">
    <section class="login-body position-fixed-center box-shadow border-radius">
      <a-form
        name="basic"
        :model="formModel"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="Username"
          name="accountNumber"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="formModel.accountNumber" />
        </a-form-item>

        <a-form-item
          label="Password"
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="formModel.password" />
        </a-form-item>

        <a-form-item name="isRember" :wrapper-col="{ offset: 8, span: 16 }">
          <a-checkbox v-model:checked="formModel.isRember"
            >是否记住密码</a-checkbox
          >
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
      </a-form>
    </section>
  </div>
</template>

<style lang="less" scoped>
.login {
  height: 100vh;
  width: 100vw;
  // background: linear-gradient(70deg, @theme-yello 40%, @black 40%);
  background: @white;
  &-body {
    height: 80%;
    width: 30%;
    // background: linear-gradient(70deg, @theme-yello 40%, @black 40%);
    // background: linear-gradient(70deg, #000 40%, #ff0 40%);
    background: @theme-yello;
  }
}
</style>
