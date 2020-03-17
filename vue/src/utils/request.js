import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/cookie'
import IsEmpty from '@/utils/IsEmpty'
import global from '@/utils/global'

// 创建axios实例
const service = axios.create({
  baseURL: '/tabycore', // api的base_url
  timeout: 1800000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
    // Do something before request is sent
  if (store.getters.token) {
    config.headers['jssessionid'] = getToken()
  }
  if (global.isLogin !== localStorage.getItem('userId') && !IsEmpty(localStorage.getItem('userId')) && global.isLogin) {
    console.log(global.isLogin)
    console.log(localStorage.getItem('userId'))
    localStorage.setItem('userId', '')
    global.isLogin = 0
    window.location.href = '/tabycore/login'
  }
  let lastTime = store.getters.operateTimeChange
  let operateTime = new Date().getTime()
  if ((parseInt(operateTime) - parseInt(lastTime)) > 1800000) {
    Message({
      message: '登录超时，请重新登录',
      type: 'error',
      duration: 2000
    })
    setTimeout(function () {
      window.location.href = '/tabycore/login'
    }, 2000)
    return
  }
  store.commit('CHANGE_OPERATE_TIME', operateTime)
  return config
}, error => {
    // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
    response => response,
    error => {
      console.log('err' + error) // for debug
      // Message({
      //   message: error.message,
      //   type: 'error',
      //   duration: 5 * 1000
      // })
      return Promise.reject(error)
    })

export default service
