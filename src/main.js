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
import { ToastPlugin , WechatPlugin } from 'vux'

Vue.prototype.GLOBAL = global

Vue.use(VueRouter)
Vue.use(VueAxios, Axios)
Vue.use(VueBus)
Vue.use(WechatPlugin)
console.log(Vue.wechat)
Vue.use(Providers)

Vue.use(require('vue-wechat-title'))

Vue.mixin(mixin)
Vue.use(ToastPlugin)

// 全局路由守卫
router.beforeEach((to, from, next) => {
  const token = store.state.token
  // const refuse = store.state.refuse
  console.log(to.fullPath)
  var reg = new RegExp("(^|&)token=([^&]*)(&|$)");
  const search = location.search.substr(1).match(reg)
  if(location.href.indexOf('from=singlemessage&isappinstalled=0')>0) {
    location.href = location.href.replace('from=singlemessage&isappinstalled=0', '')
  }
  if(to.fullPath.indexOf('merchantLogin')>=0||to.fullPath.indexOf('merchantHome')>=0||to.fullPath.indexOf('merchantCheck')>=0){
    next();
  }else if(to.fullPath.indexOf('merchantpaytw')>=0){
    next();
  }else if(to.fullPath.indexOf('merchantpayth')>=0&&token!==''){
    next();
  }else if(to.fullPath.indexOf('merchantpayth')>=0&&token===''){
    if(search){
      store.commit('setToken', search[2])
      next()
    }else{
      location.href = `http://pts.suoqoo.com/home.php/WechatLogin/merchantsAccountPayLogin`
    }
  }else if(to.fullPath.indexOf('merchant')>=0&&token !== ''){
    next()
  }else if(to.fullPath.indexOf('merchant')>=0&& token === ''){
    if(search){
      store.commit('setToken', search[2])
      next()
    }else{
      location.href = `http://pts.suoqoo.com/home.php/WechatLogin/merchantsAccountLogin`
    }
  }else if(token === '') {
    if(search){
      // store.commit('setToken', unescape(search[2]))
      store.commit('setToken', search[2])
      next()
      // router.push(`${to.fullPath}`)
    }else{
      // location.href = `http://pts.suoqoo.com/home.php/WechatLogin/accountLogin?callback_url=http://172.20.10.6:8080/#${to.fullPath}`
      // location.href = `http://pts.suoqoo.com/home.php/WechatLogin/accountLogin?callback_url=http://192.168.0.103:8080/#${to.fullPath}`
      location.href = `http://pts.suoqoo.com/home.php/WechatLogin/accountLogin?callback_url=http://pts.suoqoo.com/nh5/#${to.fullPath}`
      // store.commit('setRefuse', true)
      // next()
      // router.push(`${to.fullPath}`)
    }
        // setTimeout(() => {
          // location.href = `http://pts.suoqoo.com/home.php/WechatLogin/accountLogin?callback_url=http://192.168.31.144:8080/#${to.fullPath}`
        // location.href = `http://pts.suoqoo.com/home.php/WechatLogin/accountLogin?callback_url=http://192.168.31.238:8081/#${to.fullPath}`
        // }, 1000);
    // console.log(`http://pts.suoqoo.com/home.php/WechatLogin/accountLogin?callback_url=http://192.168.31.144:8080/#${to.fullPath}`)

  } else {
    // if(token===""){
    //   store.commit('setRefuse', false)
    // }
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
