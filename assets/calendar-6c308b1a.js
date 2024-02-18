var D=Object.defineProperty;var b=(m,e,n)=>e in m?D(m,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):m[e]=n;var o=(m,e,n)=>(b(m,typeof e!="symbol"?e+"":e,n),n);import{d as v,r as w,o as _,c as I,f as c,t as N,F as f,a as S,b as z,n as g,_ as k}from"./index-df03a169.js";const y=class{constructor(e=void 0){o(this,"weekData",[{zhI:"",zhSI:"",enI:"",enSI:""}]);o(this,"monthlyCalendarData",[]);o(this,"year","");o(this,"month","");o(this,"date","");o(this,"dateStr","");o(this,"isRYear",!1);o(this,"firstweekDay",0);this.renderCalendar(e)}getLeapTwelveyears(e){const n=e%4===0&&e%100!==0||e%400===0;return y.monthsDays[1]=n?29:28,n}getMonthInfo(e=0,{year:n="",month:s="",date:r=""}){let t=Number(n),a=Number(s);e?e===1&&(a>=12?(t+=1,a=1):a+=1):a-1<=0?(t-=1,a=12):a-=1,s=a>=10?`${a}`:`0${a}`,n=`${t}`;const d=this.getLeapTwelveyears(t),i=new Date(`${n}-${s}-01`).getDay()||7,h=y.monthsDays[a-1];return{dateStr:`${n}-${s}-${r}`,year:`${n}`,month:`${s}`,date:r,isRYear:d,firstweekDay:i,monthDays:h}}static getMonthlyCalendarData(e,n,s){let r=new Array(42).fill({date:"",numI:0,zhI:"",zhSI:"",enI:"",enSI:""});return r.forEach((t,a)=>{r[a]={date:"",numI:a%7+1,zhI:s[a%7].zhI,zhSI:s[a%7].zhSI,enI:s[a%7].enI,enSI:s[a%7].enSI}}),r.forEach((t,a)=>{let d=r.length;a<e.firstweekDay-1?(t.date=`${n.monthDays-(e.firstweekDay-2-a)}`,t.disabled=!0):a>=e.firstweekDay-1&&a<e.monthDays+e.firstweekDay-1?t.date=`${a-(e.firstweekDay-2)}`:(t.date=`${d-(e.monthDays+e.firstweekDay-1)-(d-a)+1}`,t.disabled=!0),t.date===e.date&&(t.active=!0)}),r}renderCalendar(e=""){if(e){if(typeof e!="string")throw new Error("参数必须为字符串格式");if(e.length<10)throw new Error(`参数必须包含年月日，当前传参为${e}`);if(isNaN(Date.parse(e)))throw new Error("参数格式必须是一个表示某个日期的字符串")}const n=new Date,s=e.substring(0,4)||n.toJSON().substring(0,4),r=e.substring(5,7)||n.toJSON().substring(5,7),t=e.substring(8)||n.toJSON().substring(8,10),a=this.getMonthInfo(2,{year:s,month:r,date:t}),d=this.getMonthInfo(0,{year:s,month:r,date:t}),i=y.weekNameArr.slice(1,8),h=y.getMonthlyCalendarData(a,d,i);this.year=a.year,this.month=a.month,this.date=a.date,this.dateStr=a.dateStr,this.isRYear=a.isRYear,this.firstweekDay=a.firstweekDay,this.weekData=i,this.monthlyCalendarData=h}changeMonth(e){const{year:n,month:s,date:r}=this,{dateStr:t}=this.getMonthInfo(e,{year:n,month:s,date:r});this.renderCalendar(t)}};let u=y;o(u,"weekNameArr",[{zhI:"周日",zhSI:"日",enI:"Sunday",enSI:"Sunday"},{zhI:"周一",zhSI:"一",enI:"Monday",enSI:"Monday"},{zhI:"周二",zhSI:"二",enI:"Tueday",enSI:"Tueday"},{zhI:"周三",zhSI:"三",enI:"Wedneday",enSI:"Wedneday"},{zhI:"周四",zhSI:"四",enI:"Thurday",enSI:"Thurday"},{zhI:"周五",zhSI:"五",enI:"Friday",enSI:"Friday"},{zhI:"周六",zhSI:"六",enI:"Saturday",enSI:"Saturday"},{zhI:"周日",zhSI:"日",enI:"Sunday",enSI:"Sunday"}]),o(u,"monthNameArr",[{enNanme:"January",zhNanme:"一月",zhLunarNanme:"January"},{enNanme:"February",zhNanme:"二月",zhLunarNanme:"February"},{enNanme:"March",zhNanme:"三月",zhLunarNanme:"March"},{enNanme:"April",zhNanme:"四月",zhLunarNanme:"April"},{enNanme:"May",zhNanme:"五月",zhLunarNanme:"May"},{enNanme:"June",zhNanme:"六月",zhLunarNanme:"June"},{enNanme:"July",zhNanme:"七月",zhLunarNanme:"July"},{enNanme:"August",zhNanme:"八月",zhLunarNanme:"August"},{enNanme:"September",zhNanme:"九月",zhLunarNanme:"September"},{enNanme:"October",zhNanme:"十月",zhLunarNanme:"October"},{enNanme:"November",zhNanme:"十一月",zhLunarNanme:"November"},{enNanme:"December",zhNanme:"十二月",zhLunarNanme:"December"}]),o(u,"monthsDays",[31,28,31,30,31,30,31,31,30,31,30,31]);const p={class:"calendar"},M={class:"calendar-header"},$={class:"calendar-header-bar"},L={class:"calendar-header-bar-title"},C={class:"calendar-header-week"},J={class:"calendar-content"},A=["onClick"],T=v({__name:"calendar",setup(m){const e=w();function n(s){console.log(s,e.value)}return _(()=>{e.value=new u}),(s,r)=>{var t,a,d,i;return z(),I("div",p,[c("section",M,[c("div",$,[c("div",{class:"calendar-header-bar-icon calendar-header-bar-prev",onClick:r[0]||(r[0]=h=>{var l;return(l=e.value)==null?void 0:l.changeMonth(0)})},"👈"),c("div",L,N((t=e.value)==null?void 0:t.year)+"-"+N((a=e.value)==null?void 0:a.month),1),c("div",{class:"calendar-header-bar-icon calendar-header-bar-next",onClick:r[1]||(r[1]=h=>{var l;return(l=e.value)==null?void 0:l.changeMonth(1)})},"👉")]),c("div",C,[(z(!0),I(f,null,S((d=e.value)==null?void 0:d.weekData,h=>(z(),I("div",{class:"calendar-header-week-item",key:h.enI},N(h.zhSI),1))),128))])]),c("section",J,[(z(!0),I(f,null,S(((i=e.value)==null?void 0:i.monthlyCalendarData)||[],(h,l)=>(z(),I("div",{key:l,class:g(["calendar-content-row-item",{disabled:h.disabled},{active:h.active}]),onClick:E=>n(h)},N(h.date),11,A))),128))])])}}});const O=k(T,[["__scopeId","data-v-0e6b082b"]]);export{O as default};