import { login,login_smscode,register,user_info,logout } from '@/api'
import { getToken, setToken } from '@/utils/auth'
import storage from '@/utils/storage'

const token = getToken();

const defaultAvatar = 'static/images/user.png'

const user = {
  state: {
    token,
    isLogin:!!token,
    user:storage.get('user','json') || {},
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      setToken(token)
      state.token = token
      state.isLogin = !!token
    },
    set_state_and_storage(state, payload) {
      for(let key in payload){
        state[key] = payload[key]
        storage.set(key, payload[key])
      }
    },
  },
  actions: {
    //获取用户信息
    get_user_info({commit,getters}){
      if(!getters.isLogin) return Promise.reject('未登录')

      return user_info().then(res=>{

        if(!res.avatar) res.avatar = defaultAvatar
        commit('set_state_and_storage',{user:res})
        return res
      })
    },
    // 用户名登录
    async LoginByPassword({ commit,dispatch }, payload) {
      const token = await login(payload)
      commit('SET_TOKEN', token)
      dispatch('get_user_info').catch(res=>{
        Toast.info('获取用户信息失败')
      })
      bind_push_message()
      return true
    },
    // 用户名登录
    async LoginBySmscode({ commit,dispatch }, payload) {
      const token = await login_smscode(payload)
      commit('SET_TOKEN', token)
      dispatch('get_user_info').catch(res=>{
        Toast.info('获取用户信息失败')
      })
      bind_push_message()
      return true
    },
    register({ commit,dispatch }, payload){
      return register(payload).then(res=>{
        commit('SET_TOKEN', res)
        dispatch('get_user_info')
        bind_push_message()
      })
    },
    // 登出
    async LogOut({ dispatch }) {
      return logout().then(()=>{
        dispatch('FedLogOut')
        stopPosition()
        return true
      })
    },
    // 前端 登出
    FedLogOut({ commit,state }) {
      commit('SET_TOKEN',null)
    },
  }
}

export default user
