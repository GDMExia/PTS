import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/HomePage'
import HomesPage from '@/pages/HomesPage'
import TourPage from '@/pages/TourPage'
import ToursPage from '@/pages/ToursPage'
import ActivityPage from '@/pages/ActivityPage'
import ActivitiesPage from '@/pages/ActivitiesPage'
import SchoolPage from '@/pages/SchoolPage'
import SchoolsPage from '@/pages/SchoolsPage'
import OwnerPage from '@/pages/OwnerPage'
import OwnersPage from '@/pages/OwnersPage'
import ActivityView from '@/views/activity-view'
import GuideView from '@/views/guide-view'
import StoreView from '@/views/store-view'

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
      component: HomesPage,
      children: [
        {
          path: 'guide',
          name: '使用指南',
          component: GuideView
        },
        {
          path: 'activity',
          name: '活动分享',
          component: ActivityView
        },
        {
          path: 'store',
          name: '商家列表',
          component: StoreView
        }
      ]
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
