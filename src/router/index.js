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
import signUpView from '@/views/signup-view'
import OrderView from '@/views/order-view'
import OrderdetailView from '@/views/orderdetail-view'
import UnsubscribeView from '@/views/unsubscribe-view'
import UnsubscribedetailView from '@/views/unsubscribedetail-view'
import AdvicelView from '@/views/advice-view'
import MyAdvicelView from '@/views/myadvice-view'
import SignView from '@/views/sign-view'
import EnterView from '@/views/enter-view'
import EnterapplyView from '@/views/enter-apply-view'
import EnteragreementView from '@/views/enter-agreement-view'
import AgreementSignView from '@/views/agreement-sign'
import checkingView from '@/views/checking'
import checkedView from '@/views/checked'
import payInView from '@/views/payinview'
import signedView from '@/views/signed'
import beforeAgreementSignView from '@/views/beforesignview'
import merchantpay200 from '@/views/merchantpay200'
import merchantpay368 from '@/views/merchantpay368'

import TourDetailView from '@/views/tour-detail-view'
import ActivityDetailView from '@/views/activity-detail-view'
import StoreDetailView from '@/views/store-detail-view'
import PayView from '@/views/pay-view'
import SearchView from '@/views/search-view'
import ActivityShareView from '@/views/activity-share-view'
import GuideDetailView from '@/views/guide-detail-view'
import CouponView from '@/views/coupon-view'
import CouponPayView from '@/views/coupon-pay-view'
import OwnerShareView from '@/views/owner-share-view'
import ShareListView from '@/views/share-list-view'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: '嘻格格·在地生活',
      component: HomePage
    },
    {
      path: '/homes',
      name: '嘻格格·本地生活',
      component: HomesPage,
      children: [
        {
          path: 'guide',
          name: '使用指南',
          component: GuideView
        },
        {
          path: 'guideDetail',
          name: '详情',
          component: GuideDetailView
        },
        {
          path: 'activity',
          name: '活动分享',
          component: ActivityView
        },
        {
          path: 'shareDetail',
          name: '详情',
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
        },
        {
          path: 'coupon',
          name: '商家优惠',
          component: CouponView
        },
        {
          path: 'couponPay',
          name: '购买优惠券',
          component: CouponPayView
        },
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
          path: 'signup',
          name: '立即报名',
          component: signUpView
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
        },
        {
          path: 'myshare',
          name: '我的分享',
          component: OwnerShareView
        },
        {
          path: 'shareList',
          name: '查看浏览用户',
          component: ShareListView
        },
        {
        path: 'pay',
        name: '充值',
        component: PayView
        },
        {
        path: 'myorder',
        name: '我的订单',
        component: OrderView
        },
        {
        path: 'orderdetail',
        name: '订单详情',
        component: OrderdetailView
        },
        {
        path: 'unsubscribe',
        name: '我要退订',
        component: UnsubscribeView
        },
        {
        path: 'unsubscribedetail',
        name: '我的退订',
        component: UnsubscribedetailView
        },
        {
        path: 'advice',
        name: '我要评价',
        component: AdvicelView
        },
        {
        path: 'myadvice',
        name: '我的评价',
        component: MyAdvicelView
        },
        {
          path: 'sign',
          name: '打卡',
          component: SignView
        }
      ]
    },
    {
      path: '/merchant',
      name: '嘻格格商户入驻流程平台',
      component: EnterView
      // del
    },
    {
      path: '/merchantagreement',
      name: '嘻格格商户入驻流程平台',
      component: EnteragreementView
      // 登录
    },
    {
      path: '/merchantapply',
      name: '嘻格格商户入驻流程平台',
      component: EnterapplyView
      // 申请
    },
    {
      path: '/merchantchecking',
      name: '嘻格格商户入驻流程平台',
      component: checkingView
      // 审核中
    },
    {
      path: '/merchantchecked',
      name: '嘻格格商户入驻流程平台',
      component: checkedView
      // 审核通过
    },
    {
      path: '/merchantbeforeagreementsign',
      name: '嘻格格商户入驻流程平台',
      component: beforeAgreementSignView
      // 签约前
    },
    {
      path: '/merchantagreementsign',
      name: '嘻格格商户入驻流程平台',
      component: AgreementSignView
      // 签约
    },
    {
      path: '/merchantpayin',
      name: '嘻格格商户入驻流程平台',
      component: payInView
      // 支付会费及设计费
    },
    {
      path: '/merchantsigned',
      name: '嘻格格商户入驻流程平台',
      component: signedView
      // 签约通过
    },
    {
      path: '/merchantpaytwhundred',
      name: '嘻格格商户入驻流程平台',
      component: merchantpay200
      // 付200
    },
    {
      path: '/merchantpaythhundred',
      name: '嘻格格商户入驻流程平台',
      component: merchantpay368
      // 付368
    },
  ]
})
