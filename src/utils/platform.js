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
  }
}
