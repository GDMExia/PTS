// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'

import Axios from 'axios'
import VueAxios from 'vue-axios'
import VueBus from 'vue-bus'
import Vconsole from 'vconsole'
// import $ from 'jquery'

import App from './App'
import router from './router/index.js'

import Providers from './providers/providers.js'
import store from './providers/store.js'
import mixin from './mixin'
import global from './providers/global'

import { ToastPlugin } from 'vux'

Vue.prototype.GLOBAL = global

Vue.use(VueRouter)
Vue.use(VueAxios, Axios)
Vue.use(VueBus)

Vue.use(Providers)

Vue.use(require('vue-wechat-title'))

Vue.mixin(mixin)

Vue.use(ToastPlugin)
// 全局路由守卫
router.beforeEach((to, from, next) => {
  const token = store.state.token
  const refuse = store.state.refuse
  if(token === ''  && !refuse) {
    location.href = `http://pts.suoqoo.com/home.php/WechatLogin/accountLogin?callback_url=http://192.168.31.144:8080/#${to.fullPath}`
    // location.href = `http://pts.suoqoo.com/home.php/WechatLogin/accountLogin?callback_url=http://pts.suoqoo.com/nh5/#${to.fullPath}`
    // location.href = `http://pts.suoqoo.com/home.php/WechatLogin/accountLogin?callback_url=http://192.168.31.238:8081/#${to.fullPath}`
    var reg = new RegExp("(^|&)token=([^&]*)(&|$)");
    console.log(location.search)
    const search = location.search.substr(1).match(reg)
    console.log(search[2], '3334444')
    if(search){
      store.commit('setToken', unescape(search[2]))
    }else{
      store.commit('setRefuse', true)
      router.push(`${to.fullPath}`)
    }
  } else {
    if(token===""){
      store.commit('setRefuse', false)
    }
    next()
  }
  
});

// const router = new VueRouter({
//   routes
// })

const vConsole = new Vconsole()
console.log(vConsole)

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
