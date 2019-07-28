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
import CauseView from '@/views/cause-view'
import DetailView from '@/views/detail-view'
import InfoView from '@/views/info-view'
import GetvipView from '@/views/getvip-view'
import WalletView from '@/views/mywallet-view'
import TourDetailView from '@/views/tour-detail-view'
import ActivityDetailView from '@/views/activity-detail-view'
import StoreDetailView from '@/views/store-detail-view'
import PayView from '@/views/pay-view'
import SearchView from '@/views/search-view'
import ActivityShareView from '@/views/activity-share-view'

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
          path: 'shareDetail',
          name: '活动分享',
          component: ActivityShareView
        },
        {
          path: 'store',
          name: '商家列表',
          component: StoreView
        },
        {
          path: 'storeDetail',
          name: '商家详情',
          component: StoreDetailView
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
      component: ToursPage,
      children: [
        {
          path: 'tourDetail',
          name: '详情',
          component: TourDetailView
        },
        {
          path: 'search',
          name: '搜索',
          component: SearchView
        }
      ]
    },
    {
      path: '/activity',
      name: '活动',
      component: ActivityPage
    },
    {
      path: '/activities',
      name: '活动',
      component: ActivitiesPage,
      children: [
        {
          path: 'activityDetail',
          name: '详情',
          component: ActivityDetailView
        },
        {
          path: 'pay',
          name: '立即报名',
          component: PayView
        }
      ]
    },
    {
      path: '/school',
      name: '学院',
      component: SchoolPage
    },
    {
      path: '/schools',
      name: '学院',
      component: SchoolsPage,
      children: [
        {
          path: 'cause',
          name: '事业学习',
          component: CauseView
        },
        {
          path: 'activity',
          name: '资料分享',
          component: ActivityView
        },
        {
          path: 'store',
          name: '热门文章',
          component: StoreView
        },
        {
          path: 'detail',
          name: '详情',
          component: DetailView
        }
      ]
    },
    {
      path: '/owner',
      name: '我的',
      component: OwnerPage
    },
    {
      path: '/owners',
      name: '我的',
      component: OwnersPage,
      children: [
        {
          path: 'info',
          name: '个人信息',
          component: InfoView
        },
        {
          path: 'getvip',
          name: '成为VIP',
          component: GetvipView
        },
        {
        path: 'mywallet',
        name: '我的钱包',
        component: WalletView
        }
      ]
    },
  ]
})
