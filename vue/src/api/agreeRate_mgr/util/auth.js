import Cookies from 'js-cookie'

export function getToken () {
  return Cookies.get('token')
}

export function setToken (token) {
  return Cookies.set('token', token)
}

export function removeToken () {
  return Cookies.remove('token')
}

export function getUserInfo () {
  return Cookies.get('userInfo')
}

export function setUserInfo (userInfo) {
  return Cookies.set('userInfo', userInfo)
}

export function removeUserInfo () {
  return Cookies.remove('userInfo')
}
