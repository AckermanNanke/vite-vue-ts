/**
 * 周名称类型
 */
type WeekItemType = {
  zhI: string;
  zhSI: string;
  enI: string;
  enSI: string;
};
/**
 * 月名称类型
 */
type MonthType = {
  enNanme: string;
  zhNanme: string;
  zhLunarNanme: string;
};
/**
 * 月历数组元素对象类型
 */
type MonthlyCalendarDataItemType = WeekItemType & {
  date: string;
  numI: number;
  disabled: boolean;
};
/**
 * 类构造后日历数据类型
 */
type MonthInfoType = {
  year: string; //年
  month: string; //月
  date: string; //日
  dateStr: string; //日期字符串 YYYY-mm-dd
  isRYear: boolean; //是否闰年
  firstweekDay: number; //当月第一天是星期几
  monthDays: number; //当月天数
};
/**
 * 日历类组件
 */
export class Calendar {
  /**
   * 周的所有星期名称列表 周日结尾 | 周一结尾
   */
  static weekNameArr: Array<WeekItemType> = [
    { zhI: "周日", zhSI: "日", enI: "Sunday", enSI: "Sunday" },
    { zhI: "周一", zhSI: "一", enI: "Monday", enSI: "Monday" },
    { zhI: "周二", zhSI: "二", enI: "Tueday", enSI: "Tueday" },
    { zhI: "周三", zhSI: "三", enI: "Wedneday", enSI: "Wedneday" },
    { zhI: "周四", zhSI: "四", enI: "Thurday", enSI: "Thurday" },
    { zhI: "周五", zhSI: "五", enI: "Friday", enSI: "Friday" },
    { zhI: "周六", zhSI: "六", enI: "Saturday", enSI: "Saturday" },
    { zhI: "周日", zhSI: "日", enI: "Sunday", enSI: "Sunday" },
  ];
  /**
   * 月份名称列表
   */
  static monthNameArr: Array<MonthType> = [
    { enNanme: "January", zhNanme: "一月", zhLunarNanme: "January" },
    { enNanme: "February", zhNanme: "二月", zhLunarNanme: "February" },
    { enNanme: "March", zhNanme: "三月", zhLunarNanme: "March" },
    { enNanme: "April", zhNanme: "四月", zhLunarNanme: "April" },
    { enNanme: "May", zhNanme: "五月", zhLunarNanme: "May" },
    { enNanme: "June", zhNanme: "六月", zhLunarNanme: "June" },
    { enNanme: "July", zhNanme: "七月", zhLunarNanme: "July" },
    { enNanme: "August", zhNanme: "八月", zhLunarNanme: "August" },
    { enNanme: "September", zhNanme: "九月", zhLunarNanme: "September" },
    { enNanme: "October", zhNanme: "十月", zhLunarNanme: "October" },
    { enNanme: "November", zhNanme: "十一月", zhLunarNanme: "November" },
    { enNanme: "December", zhNanme: "十二月", zhLunarNanme: "December" },
  ];
  /**
   * 平年，闰年月份天数
   */
  static monthsDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  weekData: Array<WeekItemType> = [{ zhI: "", zhSI: "", enI: "", enSI: "" }]; //周历数组
  monthlyCalendarData: Array<MonthlyCalendarDataItemType> = []; //月历
  year: string = ""; //年
  month: string = ""; //月
  date: string = ""; //日
  dateStr: string = ""; //日期字符串
  isRYear: boolean = false; //是否闰年
  firstweekDay: number = 0; //当月第一天是星期几

  /**
   *  初始化类，调用日历渲染函数
   * @param dateStr 渲染日历用日期字符串，如果使用传参的话年月日必须同时传
   */
  constructor(dateStr = "" || undefined) {
    this.renderCalendar(dateStr);
  }

  /**
   * 判断是否闰年
   * @param year 年份
   * @returns { Boolean }
   */
  getLeapTwelveyears(year: number): boolean {
    const leapTwelveyears =
      (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    Calendar.monthsDays[1] = leapTwelveyears ? 29 : 28;
    return leapTwelveyears;
  }

  /**
   * 获取月的信息
   * @param { Number } type  上个月还是下个月   0-上个月 | 1-当月 | 2-下个月
   * @param { String } param.year 年
   * @param { String } param.month 月
   * @param { String } param.year 日
   */
  getMonthInfo(type = 0, { year = "", month = "", date = "" }): MonthInfoType {
    let intYear = Number(year),
      intMonth = Number(month);
    if (!type) {
      if (intMonth - 1 <= 0) {
        intYear -= 1;
        intMonth = 12;
      } else {
        intMonth -= 1;
      }
    } else if (type === 1) {
      if (intMonth >= 12) {
        intYear += 1;
        intMonth = 1;
      } else {
        intMonth += 1;
      }
    }
    month = intMonth >= 10 ? `${intMonth}` : `0${intMonth}`;
    year = `${intYear}`;

    const isRYear = this.getLeapTwelveyears(intYear);
    // 获取当月1号是星期几
    const firstweekDay = new Date(`${year}-${month}-01`).getDay() || 7;
    // 获取当月有多少天
    const monthDays = Calendar.monthsDays[intMonth - 1];

    const monthInfo = {
      dateStr: `${year}-${month}-${date}`,
      year: `${year}`,
      month: `${month}`,
      date,
      isRYear,
      firstweekDay,
      monthDays,
    };
    return monthInfo;
  }

  /**
   * 填充月历数据为7*6格式
   * @param { MonthInfoType } currentInfo 当月所有信息
   * @param { MonthInfoType } prevMonthInfo 上月所有信息
   * @returns { Array<MonthlyCalendarDataItemType> }
   */
  static getMonthlyCalendarData(
    currentInfo: MonthInfoType,
    prevMonthInfo: MonthInfoType,
    weekData: Array<WeekItemType>
  ): Array<MonthlyCalendarDataItemType> {
    let monthlyCalendarData = new Array<MonthlyCalendarDataItemType>(42).fill({
      date: "",
      numI: 0,
      zhI: "",
      zhSI: "",
      enI: "",
      enSI: "",
      disabled: true,
    });
    monthlyCalendarData.forEach((_, i) => {
      monthlyCalendarData[i] = {
        date: "",
        numI: (i % 7) + 1,
        zhI: weekData[i % 7].zhI,
        zhSI: weekData[i % 7].zhSI,
        enI: weekData[i % 7].enI,
        enSI: weekData[i % 7].enSI,
        disabled: true,
      };
    });
    monthlyCalendarData.forEach((el, i) => {
      let l = monthlyCalendarData.length;
      if (i < currentInfo.firstweekDay - 1) {
        el.date = `${
          prevMonthInfo.monthDays - (currentInfo.firstweekDay - 2 - i)
        }`;
      } else if (
        i >= currentInfo.firstweekDay - 1 &&
        i < currentInfo.monthDays + currentInfo.firstweekDay - 1
      ) {
        // 补全当前月日期
        el.date = `${i - (currentInfo.firstweekDay - 2)}`;
        el.disabled = false;
      } else {
        el.date = `${
          l -
          (currentInfo.monthDays + currentInfo.firstweekDay - 1) -
          (l - i) +
          1
        }`;
      }
    });
    return monthlyCalendarData;
  }
  /**
   * 渲染日历
   * @param type 日历类型 1 周一在前面 | 0 周末在前面
   * @param dateStr 渲染日历用日期字符串，如果使用传参的话年月日必须同时传
   */
  renderCalendar(dateStr = undefined || "") {
    if (dateStr) {
      if (typeof dateStr !== "string") {
        throw new Error(`参数必须为字符串格式`);
      } else if (dateStr.length < 10) {
        throw new Error(`参数必须包含年月日，当前传参为${dateStr}`);
      } else if (isNaN(Date.parse(dateStr))) {
        throw new Error(`参数格式必须是一个表示某个日期的字符串`);
      }
    }

    /**
     * 获取当前年，月，日
     */
    const nowDate = new Date();
    const year = dateStr!.substring(0, 4) || nowDate.toJSON().substring(0, 4);
    const month = dateStr!.substring(5, 7) || nowDate.toJSON().substring(5, 7);
    const date = dateStr!.substring(8) || nowDate.toJSON().substring(8, 10);

    // 获取当月信息
    const currentMonthInfo = this.getMonthInfo(2, {
      year,
      month,
      date,
    });
    // 获取上一个月信息
    const prevMonthInfo = this.getMonthInfo(0, {
      year,
      month,
      date,
    });
    // 设置星期排布方式
    const weekData = Calendar.weekNameArr.slice(1, 8);

    // 获取7*6格式月历
    const monthlyCalendarData = Calendar.getMonthlyCalendarData(
      currentMonthInfo,
      prevMonthInfo,
      weekData
    );

    this.year = currentMonthInfo.year;
    this.month = currentMonthInfo.month;
    this.date = currentMonthInfo.date;
    this.dateStr = currentMonthInfo.dateStr;
    this.isRYear = currentMonthInfo.isRYear;
    this.firstweekDay = currentMonthInfo.firstweekDay;
    this.weekData = weekData;
    this.monthlyCalendarData = monthlyCalendarData;
  }

  /**
   * 修改日历月份
   * @param { Number } type 0 上月 | 1 下月
   */
  changeMonth(type: number) {
    const { year, month, date } = this;
    const { dateStr } = this.getMonthInfo(type, { year, month, date });
    this.renderCalendar(dateStr);
  }
}
