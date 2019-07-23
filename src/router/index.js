import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/HomePage'
import HomesPage from '@/pages/HomesPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: '首页',
      component: HomePage
    },
    {
      path: '/homes',
      name: '首页',
      component: HomesPage
    },
  ]
})
