var S=Object.defineProperty;var D=(c,e,n)=>e in c?S(c,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):c[e]=n;var o=(c,e,n)=>(D(c,typeof e!="symbol"?e+"":e,n),n);import{d as v,r as w,o as b,c as y,f as i,t as z,F as N,a as f,b as I,n as g,_}from"./index-d6c8d9c5.js";const u=class{constructor(e=void 0){o(this,"weekData",[{zhI:"",zhSI:"",enI:"",enSI:""}]);o(this,"monthlyCalendarData",[]);o(this,"year","");o(this,"month","");o(this,"date","");o(this,"dateStr","");o(this,"isRYear",!1);o(this,"firstweekDay",0);this.renderCalendar(e)}getLeapTwelveyears(e){const n=e%4===0&&e%100!==0||e%400===0;return u.monthsDays[1]=n?29:28,n}getMonthInfo(e=0,{year:n="",month:s="",date:r=""}){let t=Number(n),a=Number(s);e?e===1&&(a>=12?(t+=1,a=1):a+=1):a-1<=0?(t-=1,a=12):a-=1,s=a>=10?`${a}`:`0${a}`,n=`${t}`;const l=this.getLeapTwelveyears(t),h=new Date(`${n}-${s}-01`).getDay()||7,d=u.monthsDays[a-1];return{dateStr:`${n}-${s}-${r}`,year:`${n}`,month:`${s}`,date:r,isRYear:l,firstweekDay:h,monthDays:d}}static getMonthlyCalendarData(e,n,s){let r=new Array(42).fill({date:"",numI:0,zhI:"",zhSI:"",enI:"",enSI:""});return r.forEach((t,a)=>{r[a]={date:"",numI:a%7+1,zhI:s[a%7].zhI,zhSI:s[a%7].zhSI,enI:s[a%7].enI,enSI:s[a%7].enSI}}),r.forEach((t,a)=>{let l=r.length;a<e.firstweekDay-1?(t.date=`${n.monthDays-(e.firstweekDay-2-a)}`,t.disabled=!0):a>=e.firstweekDay-1&&a<e.monthDays+e.firstweekDay-1?t.date=`${a-(e.firstweekDay-2)}`:(t.date=`${l-(e.monthDays+e.firstweekDay-1)-(l-a)+1}`,t.disabled=!0),t.date===e.date&&(t.active=!0)}),r}renderCalendar(e=""){if(e){if(typeof e!="string")throw new Error("参数必须为字符串格式");if(e.length<10)throw new Error(`参数必须包含年月日，当前传参为${e}`);if(isNaN(Date.parse(e)))throw new Error("参数格式必须是一个表示某个日期的字符串")}const n=new Date,s=e.substring(0,4)||n.toJSON().substring(0,4),r=e.substring(5,7)||n.toJSON().substring(5,7),t=e.substring(8)||n.toJSON().substring(8,10),a=this.getMonthInfo(2,{year:s,month:r,date:t}),l=this.getMonthInfo(0,{year:s,month:r,date:t}),h=u.weekNameArr.slice(1,8),d=u.getMonthlyCalendarData(a,l,h);this.year=a.year,this.month=a.month,this.date=a.date,this.dateStr=a.dateStr,this.isRYear=a.isRYear,this.firstweekDay=a.firstweekDay,this.weekData=h,this.monthlyCalendarData=d}changeMonth(e){const{year:n,month:s,date:r}=this,{dateStr:t}=this.getMonthInfo(e,{year:n,month:s,date:r});this.renderCalendar(t)}};let m=u;o(m,"weekNameArr",[{zhI:"周日",zhSI:"日",enI:"Sunday",enSI:"Sunday"},{zhI:"周一",zhSI:"一",enI:"Monday",enSI:"Monday"},{zhI:"周二",zhSI:"二",enI:"Tueday",enSI:"Tueday"},{zhI:"周三",zhSI:"三",enI:"Wedneday",enSI:"Wedneday"},{zhI:"周四",zhSI:"四",enI:"Thurday",enSI:"Thurday"},{zhI:"周五",zhSI:"五",enI:"Friday",enSI:"Friday"},{zhI:"周六",zhSI:"六",enI:"Saturday",enSI:"Saturday"},{zhI:"周日",zhSI:"日",enI:"Sunday",enSI:"Sunday"}]),o(m,"monthNameArr",[{enNanme:"January",zhNanme:"一月",zhLunarNanme:"January"},{enNanme:"February",zhNanme:"二月",zhLunarNanme:"February"},{enNanme:"March",zhNanme:"三月",zhLunarNanme:"March"},{enNanme:"April",zhNanme:"四月",zhLunarNanme:"April"},{enNanme:"May",zhNanme:"五月",zhLunarNanme:"May"},{enNanme:"June",zhNanme:"六月",zhLunarNanme:"June"},{enNanme:"July",zhNanme:"七月",zhLunarNanme:"July"},{enNanme:"August",zhNanme:"八月",zhLunarNanme:"August"},{enNanme:"September",zhNanme:"九月",zhLunarNanme:"September"},{enNanme:"October",zhNanme:"十月",zhLunarNanme:"October"},{enNanme:"November",zhNanme:"十一月",zhLunarNanme:"November"},{enNanme:"December",zhNanme:"十二月",zhLunarNanme:"December"}]),o(m,"monthsDays",[31,28,31,30,31,30,31,31,30,31,30,31]);const p={class:"calendar"},k={class:"calendar-header"},M={class:"calendar-header-bar"},$={class:"calendar-header-bar-title"},L={class:"calendar-header-week"},C={class:"calendar-content"},J=v({__name:"calendar",setup(c){const e=w();return b(()=>{e.value=new m,console.log(e)}),(n,s)=>{var r,t,a,l;return I(),y("div",p,[i("section",k,[i("div",M,[i("div",{class:"calendar-header-bar-icon calendar-header-bar-prev",onClick:s[0]||(s[0]=h=>{var d;return(d=e.value)==null?void 0:d.changeMonth(0)})},"👈"),i("div",$,z((r=e.value)==null?void 0:r.year)+"-"+z((t=e.value)==null?void 0:t.month),1),i("div",{class:"calendar-header-bar-icon calendar-header-bar-next",onClick:s[1]||(s[1]=h=>{var d;return(d=e.value)==null?void 0:d.changeMonth(1)})},"👉")]),i("div",L,[(I(!0),y(N,null,f((a=e.value)==null?void 0:a.weekData,h=>(I(),y("div",{class:"calendar-header-week-item",key:h.enI},z(h.zhSI),1))),128))])]),i("section",C,[(I(!0),y(N,null,f(((l=e.value)==null?void 0:l.monthlyCalendarData)||[],(h,d)=>(I(),y("div",{key:d,class:g(["calendar-content-row-item",{disabled:h.disabled},{active:h.active}])},z(h.date),3))),128))])])}}});const F=_(J,[["__scopeId","data-v-5c602d4f"]]);export{F as default};