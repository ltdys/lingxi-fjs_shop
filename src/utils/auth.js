

import { setLocalStore, getLocalStore } from './storage'

const TokenKey = 'token'

export function getToken() {
  return getLocalStore(TokenKey)
}

export function setToken(token) {
  return setLocalStore(TokenKey, token)
}

