/* eslint-disable */
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import App from './App'
import router from './router'
import store from './store'
import filters from './filters'
import global from '@/utils/global'
import IsEmpty from '@/utils/IsEmpty'
import { getToken } from './utils/cookie'
import VueWechatTitle from 'vue-wechat-title';
// 将filter路径下的转换函数注册到Vue中
filters.forEach(element => {
        Object.keys(element).forEach(key => {
            Vue.filter(key, element[key])
        })
    })
    // 将elementui全部组件注册到vue中，后续组件可以直接使用element的组件
Vue.use(ElementUI)
Vue.use(VueWechatTitle)
Vue.config.productionTip = false
    // 如果是开发环境则启用mock拦截请求，mock会拦截所有注册过的请求，如果需要远程联调则需要注释掉对应的mock请求
// if (process.env.NODE_ENV === 'development') {
//     require('./mock')
// }

window.addEventListener("visibilitychange",function(){ //这个方法是监测浏览器窗口发生变化的时候执行
  if (document.hidden == false && global.isLogin != localStorage.getItem('userId') && !IsEmpty(localStorage.getItem('userId')) && global.isLogin) {
    // global.isLogin = localStorage.getItem('userId') //只有当初始创建的global不等于localStorage里面的userId的时候去覆盖掉这个global
    localStorage.setItem('userId', '')
    global.isLogin = 0
    window.location.href = '/tabycore/login'
  }
  //不覆盖的话global永远都是我们设的初始值
});

require('./mock')
// 配置全局守护函数
router.beforeEach((to, from, next) => {
    console.log(from.fullPath)
    if (store.state.login.marginLeft !== 0) {
      store.state.login.marginLeft = 0
    }
    if(to.path === '/') {
        var width = document.getElementById('sideBar') ? document.getElementById('sideBar').clientWidth : 0
        store.dispatch('changeView', width ? width + 20 : width)
    }
    if (from.fullPath === '/lifeInsur_renewal/record' || from.fullPath === '/lifeInsur_renewal/super') {
        console.log(store.state.renewal.recordData)
        store.state.renewal.recordData = {policyNo: '', lifeRenewalPartyInfoVo: {}, lifeRenewalPolicyInfoVo: {}, lifeRenewalRiskInfoListVo: [], lifeRenewalPolicyChargeListVo: []}
    }
    // 非认证的路由跳转到登陆页面
    // if (!getToken() && to.path !== '/login') {
    //     next('/login')
    //     return
    // }
    next()
})

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
