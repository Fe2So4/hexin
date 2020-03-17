import axios from 'axios'
import { Notification } from 'element-ui'
import qs from 'qs'
import MD5 from 'md5.js'
import Cookies from 'js-cookie'
import { getToken } from '@/util/auth'
import { keysSort } from '../util'

axios.defaults.timeout = 6000
// axios.defaults.baseURL = process.env.BASE_API
axios.defaults.baseURL = Cookies.get('baseUrl')
const secretKey = 'a93ca04f-fe88-4204-ab65-1b5a5583802f'

async function getBeseUrl (method, param) {
  await axios.get('/static/config.json').then(r => {
    if (r.data.api) {
      Cookies.set('baseUrl', r.data.api)
      axios.defaults.baseURL = r.data.api
    } else {
      return console.log(r)
    }
  }).catch(error => {
    console.log(error)
  })
  return new Promise((resolve, reject) => {
    request(method, param).then(r => {
      resolve(r)
    })
  })
}

/**
 * @description 获取数据
 * @param {String} method  需要请求数据的接口地址
 * @param {Object} param 提交的参数
 * */
export function request (method, param) {
  if (typeof axios.defaults.baseURL === 'undefined') {
    return getBeseUrl(method, param)
  }
  const md5stream = new MD5()
  let md5Param = {}
  param.method = method
  param.token = getToken() || new Date().getTime()
  param.appKey = 'web-admin'
  // param.service = 'sunhome.scm.admin'
  param = keysSort(param)

  md5Param = keysSort(param)
  md5Param.secretKey = secretKey
  md5stream.end(qs.stringify(md5Param, { encode: false }))

  param.signature = md5stream.read().toString('hex')

  param = qs.stringify(param)

  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      data: param,
      responseType: 'json',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(response => {
      if (response.data.result === 0 || response.data.result === 26) {
        resolve(response.data)
        // callback(response.data)
      } else {
        reject(response.data)
        console.log('【接口' + method + '提示：】' + response.data.detail)
        Notification.error({
          title: '错误',
          message: response.data.detail,
          duration: 5 * 1000
        })
      }
    }).catch(error => {
      console.log(method + '【AJAX:ERR】-|error.message:' + error.message)
      if (error.message.includes('timeout')) {
        Notification.error({
          title: '错误',
          message: '网络超时，请检查网络',
          duration: 5 * 1000
        })
      }
    })
  })
}

export default request
