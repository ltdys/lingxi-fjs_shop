import * as types from './types'
import { setLocalStore, getLocalStore } from '@/utils/storage.js'

const state = {
  userId: '', //用户userId
  deliveryList: '',  //交易提货数据
  currentBankMess: {}, //当前银行信息
  currentOrder: {}, //当前订单信息
  currentAddress: {}, //当前地址信息
}

const actions = {
  setUserId ({ commit }, boo) {
		commit(types.SET_USER_ID, boo)
  },
  setDeliveryList ( { commit }, boo) {
    commit(types.SET_DELIVERY_LIST, boo)
  },
  setCurrentBankMess ( { commit }, boo) {
    commit(types.SET_CURRENT_BANK_MESS, boo)
  },
  setCurrentOrder ( { commit }, boo) {
    commit(types.SET_CURRENT_ORDER, boo)
  },
  setCurrentAddress ( { commit }, boo) {
    commit(types.SET_CURRENT_ADDRESS, boo)
  },
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
  },
  getCurrentBankMess: state => {
    return state.currentBankMess
  },
  getCurrentOrder: state => {
    return state.currentOrder
  },
  getCurrentAddress: state => {
    return state.currentAddress
  },
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
  },
  //当前银行信息
  ['SET_CURRENT_BANK_MESS'] (state, boo) {
    state.currentBankMess = boo
  },
  //当前银行信息
  ['SET_CURRENT_ORDER'] (state, boo) {
    state.currentOrder = boo
  },
  //当前地址信息
  ['SET_CURRENT_ADDRESS'] (state, boo) {
    state.currentAddress = boo
  },
}

export default {
  state,
  actions,
  getters,
  mutations
}
