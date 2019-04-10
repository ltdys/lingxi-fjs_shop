const userAgent = window.navigator.userAgent.toLowerCase();

export default {
  inWx() {
    return /micromessenger/.test(userAgent);
  },
  inIOS() {
    return /iphone|ipad|ipod/.test(userAgent);
  },
  inAndroid() {
    return /android/.test(userAgent);
  },
  inMobile() {
    return /mobile/.test(userAgent);
  },
  isPc () {
    var u = navigator.userAgent
    var agents = ["Android", 'iPhone', 'SymbianOs', 'Windows Phone', 'iPad', 'iPod']
    var flag = true

    for(let v = 0; v < agents.length; v++) {
      if(u.indexOf(agents[v]) > 0) {
        flag = false
        break
      }
    }
    return flag
  }
}
