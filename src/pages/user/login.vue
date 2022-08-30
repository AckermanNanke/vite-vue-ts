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
const message = inject($message);
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
  console.log(values);
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
      message?.error({
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
    // 获取银行信息并缓存到本地
    getBankInfo(urlOptions.value).then((res) => {
      Fsession.set("bankInfo", res.data);
    });
  });
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

          <a-form-item>
            <a-form-item name="remember" no-style>
              <a-checkbox v-model:checked="formModel.isRemember"
                >记住密码</a-checkbox
              >
            </a-form-item>
            <div class="login-body-forgot">
              <router-link to="/reset-password">忘记密码？</router-link>
              <span class="spacer">|</span>
              <router-link to="/index">注册</router-link>
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
      </section>
    </div>
  </a-spin>
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
  .logo {
    margin: 0 auto 40px;
    overflow: hidden;
    text-align: center;
  }
  &-body {
    box-sizing: border-box;
    padding: 40px;
    width: 30%;
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
