import * as types from './types'
import { setLocalStore, getLocalStore, setSesStorage, getSesStore } from '@/utils/storage.js'

const state = {
  userId: '', //用户userId
  userInfo: {},  //用户信息
  deliveryList: '',  //交易提货数据
  currentBankMess: {}, //当前银行信息
  currentOrder: {}, //当前订单信息
  currentAddress: {}, //当前地址信息
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
  setCurrentAddress ( { commit }, boo) {
    commit(types.SET_CURRENT_ADDRESS, boo)
  },
  setAddOrder ( { commit }, boo) {
    commit(types.SET_ADD_ORDER, boo)
  },
  setClearAll  ( { commit }, boo) {
    commit(types.SET_CLEAR_ALL, boo)
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
    let status = JSON.parse(getSesStore('DELIVERY_LIST'))
    if (status) {
      state.deliveryList = status
    }
    return state.deliveryList
  },
  getCurrentBankMess: state => {
    let status = JSON.parse(getSesStore('CURRENT_BANK_MESS'))
    if (status) {
      state.currentBankMess = status
    }
    return state.currentBankMess
  },
  getCurrentOrder: state => {
    let status = JSON.parse(getSesStore('CURRENT_ORDER'))
    if (status) {
      state.currentOrder = status
    }
    return state.currentOrder
  },
  getCurrentAddress: state => {
    let status = JSON.parse(getSesStore('CURRENT_ADDRESS'))
    if (status) {
      state.currentAddress = status
    }
    return state.currentAddress
  },
  getAddOrder: state => {
    let status = JSON.parse(getSesStore('ADD_ORDER'))
    if (status) {
      state.addOrder = status
    }
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
    setSesStorage('DELIVERY_LIST', boo)
  },
  //当前银行信息
  ['SET_CURRENT_BANK_MESS'] (state, boo) {
    state.currentBankMess = boo
    setSesStorage('CURRENT_BANK_MESS', boo)
  },
  //当前银行信息
  ['SET_CURRENT_ORDER'] (state, boo) {
    state.currentOrder = boo
    setSesStorage('CURRENT_ORDER', boo)
  },
  //当前地址信息
  ['SET_CURRENT_ADDRESS'] (state, boo) {
    state.currentAddress = boo
    setSesStorage('CURRENT_ADDRESS', boo)
  },
  //新增订单信息
  ['SET_ADD_ORDER'] (state, boo) {
    state.addOrder = boo
    setSesStorage('ADD_ORDER', boo)
  },
  ['SET_CLEAR_ALL'] (state, boo) {
    state.userId = '' //用户userId
    state.userInfo = {}  //用户信息
    state.deliveryList = ''  //交易提货数据
    state.currentBankMess = {} //当前银行信息
    state.currentOrder = {} //当前订单信息
    state.currentAddress = {} //当前地址信息
    state.addOrder = {} //新增订单信息
  },
}

export default {
  state,
  actions,
  getters,
  mutations
}
