import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import './permission'

import './assets/styles/vant.scss';
// import 'vant/lib/index.less';
import './assets/styles/index.scss'


import './utils/rem'

import './directives' // global directives
import * as filters from './filters' // global filters
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

//移除移动端点击延迟
import FastClick from 'fastclick'
// document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body); 
// }, false);


// import 'mint-ui/lib/style.css'
// import MintUI from 'mint-ui'
// Vue.use(MintUI)

import Vant from './components/vant'

// import Vant from 'vant'
Vue.use(Vant);

import { Lazyload } from 'vant';
// options 为可选参数，无则不传
Vue.use(Lazyload);

// 使用复制插件
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)


Vue.config.productionTip = false
Vue.prototype.$axios = axios

import MyComponents from './components/index'
Vue.use(MyComponents)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
