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

/* 修改个人信息 */
export const updInfo = (queryParams, params) => axios.post('/UpdInfo' + queryParams, params)

/* 修改手机号 */
export const updatePhone = (queryParams, params) => axios.post('/UpdatePhone' + queryParams, params)

/* 修改密码 */
export const updatePwd = (queryParams, params) => axios.post('/UpdatePwd' + queryParams, params)

/* 转账 */
export const balanceTransfer = (queryParams, params) => axios.post('/My/BalanceTransfer' + queryParams, params)

/* 提现 */
export const cashWithdrawal = (queryParams, params) => axios.post('/My/CashWithdrawal' + queryParams, params)

/* 查看我的银行页 */
export const getMyBank = (queryParams, params) => axios.post('/My/MyBank' + queryParams, params)

/* 添加我的银行 */
export const setAddBank = (queryParams, params) => axios.post('/My/AddBank' + queryParams, params)

/* 查看我的地址页 */
export const getMyAddress = (queryParams, params) => axios.post('/My/MyAddress' + queryParams, params)

/* 添加我的地址 */
export const setAddAddress = (queryParams, params) => axios.post('/My/AddAddress' + queryParams, params)

/* 下商品订单 */
export const placeShop = (queryParams, params) => axios.post('/Shop/PlaceShop' + queryParams, params)

/* 根据用户ID获取余额充值明细 */
export const getMyYECZMx = (queryParams, params) => axios.post('/My/GetMyYECZMx' + queryParams, params)

/* 查看我的提现记录 */
export const selectCashWithdrawal = (queryParams, params) => axios.post('/My/SelectCashWithdrawal' + queryParams, params)

/* 根据用户ID获取余额明细 */
export const getMyYEMx = (queryParams, params) => axios.post('/My/GetMyYEMx' + queryParams, params)

/* 获取消息 */
export const getMsg = () => axios.post('/Home/getMsg')

/* 获取消息列表 */
export const getMsgInfo = (queryParams, params) => axios.post('/Home/GetMsgInfo' + queryParams, params)

/* 获取我的消息详情 */
export const getMyMsgList = (queryParams, params) => axios.post('/Home/GetMyMsgList' + queryParams, params)

