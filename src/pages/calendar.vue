<script setup lang="ts">
import { onMounted, ref } from "vue";

const emit = defineEmits<{
  (e: "getcurrentDays", val: number): void;
}>();

const weekArr = [
  { index: 0, zhI: '周日', zhSI: '日', enI: "Monday" },
  { index: 1, zhI: '周一', zhSI: '一', enI: "Tueday" },
  { index: 2, zhI: '周二', zhSI: '二', enI: "Wedneday" },
  { index: 3, zhI: '周三', zhSI: '三', enI: "Thurday" },
  { index: 4, zhI: '周四', zhSI: '四', enI: "Friday" },
  { index: 5, zhI: '周五', zhSI: '五', enI: "Saturday" },
  { index: 6, zhI: '周六', zhSI: '六', enI: "Sunday" }
]
const monthArr = [
  { enI: "January" },
  { enI: "February" },
  { enI: "March" },
  { enI: "April" },
  { enI: "May" },
  { enI: "June" },
  { enI: "July" },
  { enI: "August" },
  { enI: "September" },
  { enI: "October" },
  { enI: "November" },
  { enI: "December" },
];

// 获取当前 年, 月, 日
const nowDate = new Date()
const year = Number(nowDate.toJSON().substring(0, 4))
const month = Number(nowDate.toJSON().substring(5, 7))
const date = Number(nowDate.toJSON().substring(6, 9))

// 枚举月份天数
const monthsArr = ref<number[][]>([
  [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
])

function getLeapTwelveyears(year: number): boolean {
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0
}
function getCurrentMonthDays(months: number[]) {
  let days = months[month]
  emit("getcurrentDays", days)
  return days

}
function renderCalendar() {
  const isRYear = getLeapTwelveyears(year)
  // 获取当前年对应月份天数
  const currentMonthArr = monthsArr.value[Number(isRYear)]
  // 获取当月1号是星期几
  const currentWeekDay = new Date(`${year}-${month}-01`).getDay()
  if (!currentWeekDay) {

  }
}

onMounted(() => { })
</script>
<template>
  <div class="calendar">
    <section class="calendar-week">
      <div v-for="item in weekArr" :key="item.index">{{ item.zhSI }}</div>
    </section>
  </div>
</template>

<style lang="less" scoped>
.calendar {
  max-width: 400px;

  &-week {
    display: flex;
    justify-content: space-between;
  }
}
</style>