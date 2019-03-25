import * as types from './types'
import { setLocalStore, getLocalStore } from '@/utils/storage.js'

const state = {
  userId: '' //用户userId
}

const actions = {
  setUserId ({ commit }, boo) {
		commit(types.SET_USER_ID, boo)
  },
}

const getters = {
  getUserId: state => {
    let status = getLocalStore('USER_ID')
    if (status) {
      state.userId = status
    }
    return state.userId
  }
}

const mutations = {
  //userId存储
  ['SET_USER_ID'] (state, boo) {
    state.userID = boo
    setLocalStore('USER_ID', boo)
  },
}

export default {
  state,
  actions,
  getters,
  mutations
}
