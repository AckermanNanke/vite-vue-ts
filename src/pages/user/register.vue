<script setup lang="ts">
import { toRegister } from "@utils/utils";
import { ref } from "vue";
import { useRouter } from "vue-router";

// 依赖注入
const router = useRouter();

// 表单数据
const formModel = ref({
  accountNumber: "",
  password: "",
  phone: "",
  smsVerifiationCode: "",
});

// 加载状态
const spinning = ref(false);

// 注册提交
function onFinish(values: any) {
  toRegister(values);
}
</script>

<template>
  <a-spin size="large" :spinning="spinning">
    <div id="login" class="login">
      <section
        class="login-body position-fixed-center box-shadow border-radius"
      >
        <div class="logo">
          <a-avatar src="/src/assets/images/logo.jpg" :size="80" />
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
                pattern: new RegExp(/^[a-z0-9]{6,15}$/i),
                message: '密码由6-15位数字字母组成',
              },
            ]"
          >
            <a-input-password
              placeholder="请输入密码"
              v-model:value="formModel.password"
              :maxlength="15"
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
                pattern: new RegExp(/^[a-z0-9]{6,15}$/i),
                message: '密码由6-15位数字字母组成',
              },
            ]"
          >
            <a-input-password
              placeholder="请输入密码"
              v-model:value="formModel.password"
              :maxlength="15"
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
                pattern: new RegExp(/^[a-z0-9]{6,15}$/i),
                message: '密码由6-15位数字字母组成',
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
      </section>
    </div>
  </a-spin>
</template>

<style scoped></style>
