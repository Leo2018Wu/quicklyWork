// padStart 的 polyfill，因为某些机型或情况，还无法支持es7的padStart，比如电脑版的微信小程序
// 所以这里做一个兼容polyfill的兼容处理
if (!String.prototype.padStart) {
  // 为了方便表示这里 fillString 用了ES6 的默认参数，不影响理解
  String.prototype.padStart = function (maxLength, fillString = ' ') {
    if (Object.prototype.toString.call(fillString) !== "[object String]") throw new TypeError(
      'fillString must be String')
    let str = this
    // 返回 String(str) 这里是为了使返回的值是字符串字面量，在控制台中更符合直觉
    if (str.length >= maxLength) return String(str)

    let fillLength = maxLength - str.length,
      times = Math.ceil(fillLength / fillString.length)
    while (times >>= 1) {
      fillString += fillString
      if (times === 1) {
        fillString += fillString
      }
    }
    return fillString.slice(0, fillLength) + str;
  }
}

function timeFormat(timestamp = null, fmt = 'yyyy-mm-dd') {
  // 其他更多是格式化有如下:
  // yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
  timestamp = parseInt(timestamp);
  // 如果为null,则格式化当前时间
  if (!timestamp) timestamp = Number(new Date());
  // 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
  if (timestamp.toString().length == 10) timestamp *= 1000;
  let date = new Date(timestamp);
  let ret;
  let opt = {
    "y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "h+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "s+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    };
  };
  return fmt;
}

export default timeFormat;

//方法二：
/** 
* 对Date的扩展，将 Date 转化为指定格式的String
         * 月(M)、日(d)、小时(H)、分(m)、秒(s)、 可以用 1-2 个占位符，
         * 年(y)可以用 2或4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
         * 星期(W)、上下午(N)、季度(Q)只能用一个占位符
         * 例子：
         * new Date("2020-01-01 01:19:08.879").format("yyyy-MM-dd") ==> 2020-01-01
         * new Date("2020-01-01 01:19:08.879").format("yyyy-MM-dd Q季度 W N") ==> 2020-01-01 1季度 星期三 上午
         * new Date("2020-01-01 01:19:08.879").format("HH:mm:ss") ==> 01:19:08
         * new Date("2020-01-01 01:19:08.879").format() ==> 2020-01-01 01:19:08
         * new Date("2020-01-01 01:19:08.879").format("yy-M-d H:m:s.S")  ==> 20-1-1 1:19:8.879 
         * */
Date.prototype.format = function (fmt = "yyyy-MM-dd HH:mm:ss") {
  let week = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  let res = {
    "(yy){1,2}": this.getFullYear(), // 年份
    "m{1,2}": this.getMonth() + 1, // 月份
    "d{1,2}": this.getDate(), // 当月日期
    "(h|H){1,2}": this.getHours(), // 小时（24小时制）
    "M{1,2}": this.getMinutes(), // 分钟
    "s{1,2}": this.getSeconds(), // 秒钟
    "S": this.getMilliseconds(), // 毫秒
    "W": week[this.getDay()], // 星期几
    "N": this.getHours() < 12 ? "上午" : "下午",
    "Q": Math.floor((this.getMonth()) / 3) + 1, // 季度
  }
  for (let k in res) {
    let re = new RegExp("(" + k + ")");
    if (re.test(fmt)) {
      let len = RegExp.$1.length;
      let value = "" + res[k];
      while (value.length < len) {
        value = "0" + value;
      }
      if (len > 1 && len < value.length)
        value = value.substring(value.length - 2, value.length);
      fmt = fmt.replace(RegExp.$1, value);
    }
  }
  return fmt;
}



function timeFormat(timestamp = null, fmt = 'yyyy-mm-dd') {
  // 其他更多是格式化有如下:
  // yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
  timestamp = parseInt(timestamp);
  // 如果为null,则格式化当前时间
  if (!timestamp) timestamp = Number(new Date());
  // 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
  if (timestamp.toString().length == 10) timestamp *= 1000;
  let date = new Date(timestamp);
  return date.format(fmt);
}

export default timeFormat

