import Vue from 'vue'
import Router from 'vue-router'

require('../utils/polyfills')

Vue.use(Router)
const _import = require('./_import_' + process.env.NODE_ENV)
const LoginVue = _import('pages/login')
const LayOutVue = _import('pages/layout')
function importAll (r) {
  return r.keys().map(key => r(key))
}

const routesCache = []

const routes = importAll(require.context('./modules/', true, /\.js$/))

routes.forEach(element => {
  Object.keys(element).forEach(key => {
    routesCache.push(element[key])
  })
})

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'loginVue',
      component: LoginVue
    },
    {
      path: '/',
      component: LayOutVue,
      children: routesCache
    }
  ]
})
