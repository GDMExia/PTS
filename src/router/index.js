import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/HomePage'
import HomesPage from '@/pages/HomesPage'
import TourPage from '@/pages/TourPage'
import ToursPage from '@/pages/ToursPage'
import SchoolPage from '@/pages/SchoolPage'
import SchoolsPage from '@/pages/SchoolsPage'
import OwnerPage from '@/pages/OwnerPage'
import OwnersPage from '@/pages/OwnersPage'

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
    {
      path: '/tour',
      name: '旅游',
      component: TourPage
    },
    {
      path: '/tours',
      name: '旅游',
      component: ToursPage
    },
    {
      path: '/activity',
      name: '活动',
      component: ActivityPage
    },
    {
      path: '/activities',
      name: '活动',
      component: ActivitiesPage
    },
    {
      path: '/school',
      name: '学院',
      component: SchoolPage
    },
    {
      path: '/school',
      name: '学院',
      component: SchoolsPage
    },
    {
      path: '/owner',
      name: '我的',
      component: OwnerPage
    },
    {
      path: '/owners',
      name: '我的',
      component: OwnersPage
    },
  ]
})
