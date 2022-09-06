<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute()

const urlOptions = ref({
  accountNumber: ""
})
// 单选数据
const radioArr = ref([
  {
    value: 1,
    name: `将验证码发送到您的邮箱${urlOptions.value.accountNumber}`
  },
  {
    value: 2,
    name: "手机验证码找回"
  }
])

// 表单数据
interface formModelType {
  retrieveType: number
}
const formModel = ref({
  retrieveType: 1,
});

// 表单校验规则
const formRules = {
  retrieveType: [
    { required: true, message: "请选择找回方式" },
  ],
};

function onFinish(values: formModelType): void {

}

/**
 * 进入页面时获取上个页面传入的账号
 */
onMounted(() => {
  console.log("route.params");
  console.log(route.params);

  urlOptions.value.accountNumber = route.params.acctNo as string
})
</script>
  
  <template>
  <div>
    <p class="title">我们需要验证您的身份</p>
    <p class="subTitle">请选择找回方式</p>
  </div>
  <a-form name="step1" :model="formModel" validateTrigger="blur" @finish="onFinish">
    <a-form-item name="retrieveType" :rules="formRules.retrieveType">
      <a-radio-group v-model:value="formModel.retrieveType">
        <a-radio v-for="item in radioArr" :key="item.value" :value="item.value"
          :style="{ display: 'flex', lineHeight: '1.6rem' }">{{
    item.name
          }}</a-radio>
      </a-radio-group>
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