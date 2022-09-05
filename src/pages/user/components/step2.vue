<script setup lang="ts">
import { ref } from "vue";

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
      message: "账号需为邮箱或者手机号",
    },
  ],
};

function onFinish(values:any):void{

}
</script>
  
  <template>
  <a-form name="step1" :model="formModel" validateTrigger="blur" @finish="onFinish">
    <a-form-item name="accountNumber" :rules="formRules.accountNumber">
      <a-input placeholder="请输入账号" v-model:value="formModel.accountNumber" :maxlength="32" />
      <template #help>
        账号为邮箱或者手机号
      </template>
    </a-form-item>
  </a-form>
</template>
  