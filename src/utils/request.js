import axios from 'axios'
import { getToken } from './auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // request timeout
})


// request interceptor
service.interceptors.request.use(config => {
  config.data = config.data || {}
  if (getToken()) {
    // config.headers['Auth-Token'] = getToken()
    config.data.uId = getToken()
  }
  return config
}, error => {
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过xmlhttprequest来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    let res = response.data
    if (res.status !== 0) {
      return Promise.reject(res)
    } else {
      return res.data
    }
  },
  e => {
    return Promise.reject({
      status:-1,
      message : '数据异常，请稍后重试~'
    })
  })

//转换formdata格式
axios.defaults.transformRequest.unshift((data, headers)=> {
  var key, result = [];
  for (key in data) {
    if ((data.hasOwnProperty(key) && data[key]) || data[key] === 0)
    result.push(key + "=" + data[key]);
    // result.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
  }
  // result.push('sign='+sign(result))
  return result.join("&");
});


// const key = 'lxrk2018'
// function sign(res){
//   let result = [...res]
//   result.sort((a,b)=>{
//     return a > b
//   })
//   result.push('key='+key)
//   return md5(result.join("&")).toUpperCase()
// }

export default service
