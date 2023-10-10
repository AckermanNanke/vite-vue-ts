<script setup lang="ts">
import { onMounted, ref } from "vue";

const emit = defineEmits<{
  (e: "getcurrentDays", val: number): void;
}>();

// 日历表头
let week = ref<any[]>([]);
let calendarData = ref<any[]>([]);


const weekArr = [
  { zhI: '周日', zhSI: '日', enI: "Sunday", enSI: "Sunday" },
  { zhI: '周一', zhSI: '一', enI: "Monday", enSI: "Monday" },
  { zhI: '周二', zhSI: '二', enI: "Tueday", enSI: "Tueday" },
  { zhI: '周三', zhSI: '三', enI: "Wedneday", enSI: "Wedneday" },
  { zhI: '周四', zhSI: '四', enI: "Thurday", enSI: "Thurday" },
  { zhI: '周五', zhSI: '五', enI: "Friday", enSI: "Friday" },
  { zhI: '周六', zhSI: '六', enI: "Saturday", enSI: "Saturday" },
  { zhI: '周日', zhSI: '日', enI: "Sunday", enSI: "Sunday" },
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
const nowYear = Number(nowDate.toJSON().substring(0, 4))
const nowMonth = Number(nowDate.toJSON().substring(5, 7))
const nowDay = Number(nowDate.toJSON().substring(6, 9))

// 枚举月份天数
const monthsArr = ref<number[][]>([
  [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
])

// 判断是否闰年
function getLeapTwelveyears(year: number): boolean {
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0
}
// 获取当月有多少天
function getCurrentMonthDays(months: number[], month?: number) {
  let days = months[month || nowMonth]
  emit("getcurrentDays", days)
  return days

}

// 渲染日历
function renderCalendar(type = 1, options?: {
  year?: number,
  month?: number,
  date?: number,
}) {
  if (options && (!options?.year || !options.month || !options.date)) {
    throw new Error(`参数必须包含年月日，当前传参为${options.year}${options.month}${options.date}`)
  }

  /**
   * 获取当前年，月，日
   */
  const year = options?.year || nowYear
  // const month = options?.month || nowMonth
  const month = 1
  const date = options?.date || nowDay

  // 判断是否闰年
  const isRYear = getLeapTwelveyears(year)
  // 获取当前年对应月份天数
  const currentMonths = monthsArr.value[Number(isRYear)]
  // 获取当月1号是星期几
  const weekDay = new Date(`${year}-${month}-01`).getDay() || 7
  // 获取当月有多少天
  const monthDays = currentMonths[month - 1]
  // 获取上一个月有多少天
  const prevMonthDays = currentMonths[month - 2]
  // 获取下一个月有多少天
  const nextMonthDays = currentMonths[month]
  // 星期排布方式
  week.value = weekArr.slice(0 + type, 7 + type)


  // 初始化日历日期
  let dateArr: any[] = new Array(42).fill(
    {
      date: 0,
      numI: 0,
      zhI: "",
      zhSI: "",
      enI: "",
      enSI: "",
      disabled: true
    });

  dateArr.forEach((el, i) => {
    dateArr[i] = {
      date: i,
      numI: (i % 7) + 1,
      zhI: week.value[i % 7].zhI,
      zhSI: week.value[i % 7].zhSI,
      enI: week.value[i % 7].enI,
      enSI: week.value[i % 7].enSI,
      disabled: true
    }
  })

  // 切换当前日历
  dateArr.forEach((el, i) => {
    if (i < weekDay - 1) {
      if (!weekDay) {
        el.date = prevMonthDays - (weekDay - 2 - i)
      }
    }
    else if (i >= weekDay - 1 && i < monthDays + weekDay - 1) {
      // 补全当前月日期
      el.date = el.date - (weekDay - 2)
    }
    else {
      el.date = (dateArr.length - (monthDays + weekDay - 1)) - (dateArr.length - i) + 1
    }
  })
  calendarData.value = dateArr
  console.log(dateArr);
  console.log("monthDays=" + monthDays, "prevMonthDays=" + prevMonthDays, "weekDay=" + weekDay, "preMonth=" + (month - 1), currentMonths[8]);

}

onMounted(() => {
  renderCalendar()
})
</script>
<template>
  <div class="calendar">
    <section class="calendar-week">
      <div class="calendar-week-item" v-for="item in week" :key="item.index">{{ item.zhSI }}</div>
    </section>
    <section class="calendar-content">
      <div v-for="(item, i) in calendarData" :key="i" class="calendar-content-row-item">
        {{ item.date }}
      </div>
    </section>
  </div>
</template>

<style lang="less" scoped>
.calendar {
  max-width: 600px;

  &-week {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f2f2f2;

    &-item {
      width: 14.28571%;
    }
  }

  &-content {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    &-row {
      &-item {
        width: 14.28571%;
      }
    }
  }
}
</style>