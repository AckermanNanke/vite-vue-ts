<script setup lang="ts">
import { verifyAccountNumber } from "@api/verifyAccountNumber";
import { ref } from "vue";

// 定义抛出事件类型
const emit = defineEmits<{
  (e:"click", status: boolean):void
}>()

// 表单数据
const formModel = ref({
  accountNumber: "",
});

// 表单校验规则
const formRules = {
  accountNumber: [
    { required: true, message: "账号不能为空" },
    {
      pattern: new RegExp(
        /(^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$)|(\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)/
      ),
      message: "请输入邮箱或者手机号",
    },
  ],
};

// 表单提交
function onFinish(values:any):void{
  console.log(values);
  
  verifyAccountNumber(values).then(()=>{
    emit("click",true)
  }).catch(()=>{
    emit("click",false)
  })
}
</script>

<template>
  <div>
    <p class="title">请输入注册邮箱或者手机号</p>
    <p>注册账号为手机号或者邮箱</p>
  </div>
  <a-form name="step1" :model="formModel" validateTrigger="blur" @finish="onFinish">
    <a-form-item name="accountNumber" :rules="formRules.accountNumber">
      <a-input placeholder="请输入账号" v-model:value="formModel.accountNumber" :maxlength="32" />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" shape="round" size="large" block html-type="submit">继续</a-button>
    </a-form-item>
  </a-form>
</template>

<style lang="less" scoped>
.title {
  font-size: 1.5rem;
  font-weight: bolder;
  margin-bottom: 0;
}
</style>