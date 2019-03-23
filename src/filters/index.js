/* 数字 格式化*/
export function number(number, places, symbol, thousand, decimal) {
  number = number || 0;
  places = !isNaN(places = Math.abs(places)) ? places : 2;
  symbol = symbol !== undefined ? symbol : "";
  thousand = thousand || ",";
  decimal = decimal || ".";
  var negative = number < 0 ? "-" : "",
    i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
  return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
}

// To set it up as a global function:
export function phone(str) {
  return str ?　str.substr(0,3) + '****' + str.substr(7) : ''
}
export function card(str){
  return str ? '**** **** **** ' + str.substr(str.length-4):''
}

export function last(str,num){
  return str ? str.substr(str.length-num):''
}

export function time(time,formart,isZ) {

  if('custom'===formart){
    let ss = Math.floor((new Date().getTime()-time)/1000);
    let hh = Math.floor(ss/(60*60))
    if(hh > 0 ){
      return hh+'小时之前'
    }
    let mm = Math.floor(ss/60)
    if(mm > 0 ){
      return mm+'分钟之前'
    }
    return '刚刚'
  }

  time = Math.floor(time/1000)

  if(/mm/.test(formart)){
    let unit = 60
    let mm = Math.floor(time/unit)
    time -= mm * unit
    formart = formart.replace(/mm/g,isZ && mm<10?'0'+mm : mm)
  }
  if(/ss/.test(formart)){
    let ss = Math.floor(time)
    time -= ss
    formart = formart.replace(/ss/g,isZ && ss<10?'0'+ss : ss)
  }
  return formart
}

export function date (date,fmt)   {  
  if(!isNaN(date)) date= +date
  date = new Date(date);
  var o = {   
    "M+" : date.getMonth()+1,                 //月份   
    "d+" : date.getDate(),                    //日   
    "h+" : date.getHours(),                   //小时   
    "m+" : date.getMinutes(),                 //分   
    "s+" : date.getSeconds(),                 //秒   
    "q+" : Math.floor((date.getMonth()+3)/3), //季度   
    "S"  : date.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}  

export function distance(value) {
  if(value>1000){
    return (value/1000).toFixed(1) +'公里'
  }else{
    return value +'米'
  }
}

export function distance2(value) {
  return (value/1000).toFixed(1)
}

export function ellipsis(str,len,rp = '...') {
  if(!str || str.length<=len) return str

  return str.substr(0,len) + rp;
}


export function toThousandslsFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}
