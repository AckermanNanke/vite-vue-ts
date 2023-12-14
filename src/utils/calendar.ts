/**
 * 类构造后日历数据类型
 */
type calendarDataType = {
  year: string;
  month: string;
  date: string;
  data: any[];
};
/**
 * 周名称类型
 */
type weekType = {
  zhI: String;
  zhSI: String;
  enI: String;
  enSI: String;
};
/**
 * 月名称类型
 */
type monthType = {
  enNanme: String;
  zhNanme: String;
  zhLunarNanme: String;
};
/**
 * 日历类组件
 */
export class calendar {
  /**
   * 日历周数组
   */
  week: Array<weekType> = [{ zhI: "", zhSI: "", enI: "", enSI: "" }];
  /**
   * 日历列表
   */
  calendarData: calendarDataType = {
    year: "",
    month: "",
    date: "",
    data: [],
  };
  /**
   * 周的所有星期名称列表 周日结尾 | 周一结尾
   */
  weekArr: Array<weekType> = [
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
  monthArr: Array<monthType> = [
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
  // 平年，闰年月份天数
  monthsArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  /**
   *  初始化类，调用日历渲染函数
   * @param dateStr 渲染日历用日期字符串，如果使用传参的话年月日必须同时传
   */
  constructor(options: { dateStr?: string }) {
    this.renderCalendar(options);
  }

  /**
   * 判断是否闰年
   * @param year 年份
   * @returns { Boolean }
   */
  getLeapTwelveyears(year: number): boolean {
    const leapTwelveyears =
      (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    this.monthsArr[1] = leapTwelveyears ? 29 : 28;
    return leapTwelveyears;
  }

  /**
   * 获取月的信息
   * @param { Number } type  上个月还是下个月   0-上个月 | 1-当月 | 2-下个月
   * @param { String } param.year 年
   * @param { String } param.month 月
   * @param { String } param.year 日
   */
  getMonthInfo(type = 0, { year = "", month = "", date = "" }) {
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
        intMonth = 1;
        intYear += 1;
      } else {
        intMonth += 1;
      }
    }
    // 判断是否闰年
    const isRYear = this.getLeapTwelveyears(intYear);
    // 获取当前年对应月份天数
    const currentMonths = this.monthsArr;
    // 获取当月1号是星期几
    const firstweekDay =
      new Date(
        `${intYear}-${intMonth > 10 ? month : "0" + month}-01`
      ).getDay() || 7;
    // 获取当月有多少天
    const monthDays = currentMonths[intMonth - 1];
    return {
      Date: `${year}-${month}-${date}`,
      year,
      month,
      date,
      isRYear,
      currentMonths,
      firstweekDay,
      monthDays,
    };
  }

  /**
   * 渲染日历
   * @param type 日历类型 1 周一在前面 | 0 周末在前面
   * @param dateStr 渲染日历用日期字符串，如果使用传参的话年月日必须同时传
   */
  renderCalendar(options: { dateStr?: string }) {
    if (options.dateStr) {
      if (typeof options.dateStr !== "string") {
        throw new Error(`参数必须为字符串格式`);
      } else if (options.dateStr.length <= 10) {
        throw new Error(`参数格式必须是一个表示某个日期的字符串`);
      } else if (isNaN(Date.parse(options.dateStr))) {
        throw new Error(`参数必须包含年月日，当前传参为${options.dateStr} `);
      }
    }

    /**
     * 获取当前年，月，日
     */
    const nowDate = new Date();

    const year =
      options.dateStr!.substring(0, 4) || nowDate.toJSON().substring(0, 4);
    const month =
      options.dateStr!.substring(5, 7) || nowDate.toJSON().substring(5, 7);
    const date =
      options.dateStr!.substring(8) || nowDate.toJSON().substring(8, 10);

    // 获取当月信息
    const currentInfo = this.getMonthInfo(2, {
      year,
      month,
      date,
    });
    // 获取上一个月信息
    const prevInfo = this.getMonthInfo(0, {
      year,
      month,
      date,
    });
    // 星期排布方式
    this.week = this.weekArr.slice(1, 8);

    // 初始化日历日期
    let dateArr: any[] = new Array(42).fill({
      date: 0,
      numI: 0,
      zhI: "",
      zhSI: "",
      enI: "",
      enSI: "",
      disabled: true,
    });

    dateArr.forEach((el, i) => {
      dateArr[i] = {
        date: 0,
        numI: (i % 7) + 1,
        zhI: this.week[i % 7].zhI,
        zhSI: this.week[i % 7].zhSI,
        enI: this.week[i % 7].enI,
        enSI: this.week[i % 7].enSI,
        disabled: true,
      };
    });

    // 切换当前日历
    dateArr.forEach((el, i) => {
      if (i < currentInfo.firstweekDay - 1) {
        el.date = prevInfo.monthDays - (currentInfo.firstweekDay - 2 - i);
      } else if (
        i >= currentInfo.firstweekDay - 1 &&
        i < currentInfo.monthDays + currentInfo.firstweekDay - 1
      ) {
        // 补全当前月日期
        el.date = i - (currentInfo.firstweekDay - 2);
        el.disabled = false;
      } else {
        el.date =
          dateArr.length -
          (currentInfo.monthDays + currentInfo.firstweekDay - 1) -
          (dateArr.length - i) +
          1;
      }
    });
    this.calendarData = {
      year: year.toString(),
      month: month as string,
      date: date as string,
      data: dateArr,
    };
    console.log("class_calendarData");
    console.log(this.calendarData);
    console.log("class_calendarData");
  }

  /**
   * 改变月份
   * @param { Number } type 0 上月 | 1 下月
   */
  changeMonth(type: number) {
    const { year, month, date } = this.calendarData;
    const { Date } = this.getMonthInfo(type, { year, month, date });
    this.renderCalendar({ dateStr: Date });
  }
}
