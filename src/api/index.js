import axios from '@/utils/request'

/** 发送短信 */
export const send_smscode = (params) =>  axios.post('/common/smscode',params)
/** 服务价格接口 */
export const service_price = (params) =>  axios.post('/common/service_price',params)

/** 密码登陆 */
export const login = (params) =>  axios.post(prefix+'/login',params)
/**短信登录*/
export const login_smscode = (params) =>  axios.post(prefix+'/login_smscode',params)
/** 退出登陆 */
export const logout = (params) =>  axios.post(prefix+'/logout',params)
/**注册*/
export const register = (params) =>  axios.post(prefix+'/register',params)
/**设置密码*/
export const user_set_password = (params) =>  axios.post(prefix+'/user/set_password',params)
/**忘记密码*/
export const changepassword = (params) =>  axios.post(prefix+'/changepassword',params)

export const user_info = (params) =>  axios.post(prefix+'/changepassword',params)