import * as types from './types'
import { setLocalStore, getLocalStore } from '@/utils/storage.js'

const state = {
  userId: '', //用户userId
  userInfo: {},  //用户信息
  deliveryList: '',  //交易提货数据
  currentBankMess: {}, //当前银行信息
  currentOrder: {}, //当前订单信息
  addOrder: {},  //新增订单信息
}

const actions = {
  setUserId ({ commit }, boo) {
		commit(types.SET_USER_ID, boo)
  },
  setUserInfo ({ commit }, boo) {
		commit(types.SET_USER_INFO, boo)
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
  setAddOrder ( { commit }, boo) {
    commit(types.SET_ADD_ORDER, boo)
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
  getUserInfo: state => {
    let status = getLocalStore('USER_INFO')
    if (status) {
      state.userInfo = status
    }
    return state.userInfo
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
  getAddOrder: state => {
    return state.addOrder
  },
}

const mutations = {
  //userId存储
  ['SET_USER_ID'] (state, boo) {
    state.userID = boo
    setLocalStore('USER_ID', boo)
  },
  //存储用户信息
  ['SET_USER_INFO'] (state, boo) {
    state.userINFO = boo
    setLocalStore('USER_INFO', boo)
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
  //新增订单信息
  ['SET_ADD_ORDER'] (state, boo) {
    state.addOrder = boo
  },
}

export default {
  state,
  actions,
  getters,
  mutations
}
