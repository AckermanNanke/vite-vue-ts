<script setup lang="ts">
import { onMounted, ref } from "vue";

/**
 * 日历类型
 */
type calendarType = {
  year: number,
  month: number,
  date: number,
  data: any[]
}

const emit = defineEmits<{
  (e: "getcurrentDays", val: number): void;
}>();

// 日历表头
let week = ref<any[]>([]);
let calendarData = ref<calendarType>();


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

/**
 * 获取月的信息
 * @param type 上个月还是下个月   0-上个月 | 1-当月 | 2-下个月
 * @param param1 年月
 */
function getMonthInfo(type = 0, {
  year = NaN,
  month = NaN,
  data = NaN
}) {
  if (type) {
    if (month - 2 < 0) {
      year -= 1
      month = 12
    } else {
      month -= 2
    }
  } else if (type === 1) {
    month -= 1
  } else {
    if (month >= 12) {
      month = 1
      year += 1
    }

  }

  // 判断是否闰年
  const isRYear = getLeapTwelveyears(year)
  // 获取当前年对应月份天数
  const currentMonths = monthsArr.value[Number(isRYear)]
  // 获取当月1号是星期几
  const weekDay = new Date(`${year}-${month > 10 ? month : "0" + month}-01`).getDay() || 7
  // 获取当月有多少天
  const monthDays = currentMonths[month - 1]
  return {
    isRYear,
    currentMonths,
    weekDay,
    monthDays
  }
}

/**
 * 渲染日历
 * @param type 日历类型 1 周一在前面 | 0 周末在前面
 * @param options 渲染日历所用参数，如果使用传参的话年月日必须同时传
 */
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

  // 获取当月信息
  const currentInfo = getMonthInfo(1, { year, month })
  // 获取上一个月信息
  const prevInfo = getMonthInfo(0, { year, month })
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
      date: 0,
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
    if (i < currentInfo.weekDay - 1) {
      el.date = prevInfo.monthDays - (currentInfo.weekDay - 2 - i);
    }
    else if (i >= currentInfo.weekDay - 1 && i < currentInfo.monthDays + currentInfo.weekDay - 1) {
      // 补全当前月日期
      el.date = i - (currentInfo.weekDay - 2)
      el.disabled = false
    }
    else {
      el.date = (dateArr.length - (currentInfo.monthDays + currentInfo.weekDay - 1)) - (dateArr.length - i) + 1
    }
  })
  calendarData!.value = {
    year,
    month,
    date,
    data: dateArr,
  }
  console.log("year=" + year);
  console.log("month=" + month);
  console.log("date=" + date);
  console.log("monthDays=" + currentInfo.monthDays);
  console.log("prevInfo.monthDays=" + prevInfo.monthDays);
  console.log(dateArr);

}

onMounted(() => {
  renderCalendar()
})
</script>
<template>
  <div class="calendar">
    <section class="calendar-header">
      <div class="calendar-header-bar">
        <div class="calendar-header-bar-icon calendar-header-bar-prev">👈</div>
        <div class="calendar-header-bar-title">{{ calendarData?.year }}-{{ calendarData?.month }}</div>
        <div class="calendar-header-bar-icon  calendar-header-bar-next">👉</div>
      </div>
      <div class="calendar-header-week">
        <div class="calendar-header-week-item" v-for="item in week" :key="item.index">{{ item.zhSI }}</div>
      </div>
    </section>
    <section class="calendar-content">
      <div v-for="(item, i) in calendarData?.data" :key="i"
        :class="['calendar-content-row-item', { disabled: item.disabled }]">
        {{ item.date }}
      </div>
    </section>
  </div>
</template>

<style lang="less" scoped>
.calendar {
  max-width: 600px;
  cursor: pointer;

  &-header {
    &-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &-week {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #f2f2f2;

      &-item {
        width: 14.28571%;
      }
    }
  }

  &-content {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    &-row {
      &-item {
        width: 14.28571%;

        &.disabled {
          background: gray;
        }
      }

    }
  }
}
</style>