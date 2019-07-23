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

import global from './providers/global'

Vue.prototype.GLOBAL = global

Vue.use(VueRouter)
Vue.use(VueAxios, Axios)
Vue.use(VueBus)

Vue.use(Providers)

Vue.use(require('vue-wechat-title'))

// 全局路由守卫
router.beforeEach((to, from, next) => {
    var token;
    const userfreeze = localStorage.getItem('userfreeze')
    if(window.localStorage.vuex) {
        token = JSON.parse(window.localStorage.vuex).token
    }
    if(to.path==='/homes/register') {
        next()
    } else {
        if(to.meta.auth && !token || to.meta.auth && userfreeze===0) {
            next({path: '/homes/register'})
        } else {
            next()
        }
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
