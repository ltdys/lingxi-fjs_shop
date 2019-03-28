import axios from '@/utils/request'

/** 发送短信 */
export const send_smscode = (params) =>  axios.post('/common/smscode',params)
/** 服务价格接口 */
export const service_price = (params) =>  axios.post('/common/service_price',params)

/** 密码登陆 */
export const login = (queryParams, params) =>  axios.post('/login' + queryParams, params)
/**短信登录*/
export const login_smscode = (params) =>  axios.post(prefix+'/login_smscode',params)
/** 退出登陆 */
export const logout = (params) =>  axios.post(prefix+'/logout',params)
/**注册*/
export const register = (queryParams ,params) => axios.post('/register' + queryParams, params)
/**设置密码*/
export const user_set_password = (params) =>  axios.post(prefix+'/user/set_password',params)
/**忘记密码*/
export const changepassword = (params) =>  axios.post(prefix+'/changepassword',params)

export const user_info = (params) =>  axios.post(prefix+'/changepassword',params)

/* 获取商品 */
export const getHot = () => axios.post('/Home/GetHot')

/* 获取商品详情 */
export const shopInfo = (queryParams ,params) => axios.post('/Shop/ShopInfo' + queryParams, params)

/* 获取用户信息 */
export const getUserInfo = (queryParams ,params) => axios.post('/UserInfo' + queryParams, params)
// export const getUserInfo = (params) => axios.post('/UserInfo' , params)

/* 根据用户id获取交易商品 */
export const getTrade = (queryParams, params) => axios.post('/Trade/GetTrade' + queryParams, params)

/* 根据用户id获取商品变动明细 */
export const getTradeRecord = (queryParams, params) => axios.post('/Trade/GetTradeRecord' + queryParams, params)

/* 提货 */
export const pickGoods = (queryParams, params) => axios.post('/Trade/PickGoods' + queryParams, params)

/* 根据用户ID获取我的订单 */
export const getMyOrder = (queryParams, params) => axios.post('/My/GetMyOrder' + queryParams, params)

/* 根据订单iD获取订单详情 */
export const getOrderInfo = (queryParams, params) => axios.post('/My/GetOrderInfo' + queryParams, params)

/* 支付商品订单 */
export const paymentOrder = (queryParams, params) => axios.post('/My/PaymentOrder' + queryParams, params)

/* 团队 */
/* 根据用户id获取团队dc明细 */
export const getMyDcMx = (queryParams, params) => axios.post('/Team/GetMyDcMx' + queryParams, params)

/* 根据用户id获取我的团队信息 */
export const getMyTeam = (queryParams, params) => axios.post('/Team/GetMyTeam' + queryParams, params)

/* 根据用户id获取子团队信息 */
export const getMyTeamSon = (queryParams, params) => axios.post('/Team/GetMyTeamSon' + queryParams, params)

/* 根据用户id获取团队信息 */
export const getTeam = (queryParams, params) => axios.post('/Team/GetTeam' + queryParams, params)

/* 余额充值 */
export const setYECZ = (queryParams, params) => axios.post('/My/YECZ' + queryParams, params)

/* 根据手机号获取用户信息 */
export const getUserByPhone = (queryParams, params) => axios.post('/GetUserByPhone' + queryParams, params)

/* 转账 */
export const balanceTransfe = (queryParams, params) => axios.post('/My/BalanceTransfe' + queryParams, params)