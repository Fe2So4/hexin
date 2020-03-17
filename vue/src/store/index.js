import Vue from 'vue'
import Vuex from 'vuex'

import validators from '../validators'

function importAll (r) {
  return r.keys().map(key => r(key))
}
const modulesCache = {}
const modules = importAll(require.context('./modules/', true, /\.js$/))

modules.forEach(element => {
  Object.keys(element).forEach(key => {
    if (modulesCache[key]) {
      throw new Error(key + '模块重复定义，请检查store引出名')
    }
    modulesCache[key] = element[key]
  })
})

const validatorsCache = {}

validators.forEach(element => {
  Object.keys(element).forEach(key => {
    validatorsCache[key] = element[key]
  })
})

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: modulesCache,
  getters: {
    token: state => {
      return state.login.token // 加一个随机数
    },
    operateTimeChange: state => {
      return state.login.operateTime
    },
    validators: state => {
      return validatorsCache
    }
  }
})

export default store
