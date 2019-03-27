import * as types from './types'
import { setLocalStore, getLocalStore } from '@/utils/storage.js'

const state = {
  userId: '', //用户userId
  deliveryList: '',  //交易提货数据
}

const actions = {
  setUserId ({ commit }, boo) {
		commit(types.SET_USER_ID, boo)
  },
  setDeliveryList ( { commit }, boo) {
    commit(types.SET_DELIVERY_LIST, boo)
  }
}

const getters = {
  getUserId: state => {
    let status = getLocalStore('USER_ID')
    if (status) {
      state.userId = status
    }
    return state.userId
  },
  getDeliveryList: state => {
    return state.deliveryList
  }
}

const mutations = {
  //userId存储
  ['SET_USER_ID'] (state, boo) {
    state.userID = boo
    setLocalStore('USER_ID', boo)
  },
  //交易提货数据存储
  ['SET_DELIVERY_LIST'] (state, boo) {
    state.deliveryList = boo
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
