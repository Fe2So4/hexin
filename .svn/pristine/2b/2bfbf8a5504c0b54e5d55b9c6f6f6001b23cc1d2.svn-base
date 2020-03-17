import Cookies from 'js-cookie'

const TokenKey = 'jsessionid'
const userIdKey = 'userId'
export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function getUserId () {
  return Cookies.get(userIdKey)
}

export function setUserId (userId) {
  return Cookies.set(userIdKey, userId)
}

export function removeUserId () {
  return Cookies.remove(userIdKey)
}
