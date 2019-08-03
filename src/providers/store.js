import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Axios from 'axios'
import qs from 'qs'
// import { stat } from 'fs';


Vue.use(Vuex)

const types = {
  TOUR_LIST: 'TOUR_LIST',
  BNNER_LIST: 'BANNER_LIST',
  RECOMEND_LIST: 'RECOMEND_LIST',
  ACTIVITY_TYPE: 'ACTIVITY_TYPE',
  ACTIVITY_LIST: 'ACTIVITY_LIST',
  ACTIVITY_DETAILS: 'ACTIVITY_DETAILS',
  TOUR_DETAILS: 'TOUR_DETAILS',
  CHANGE_USER: 'CHANGE_USER',
  ARTICLE_LIST: 'ARTICLE_LIST',
  ARTICLE_DETAIL: 'ARTICLE_DETAIL',
  USER_INFO: 'USER_INFO',
  USER_VIP: 'USER_VIP',
  USER_SIGN: 'USER_SIGN',
}

const state = {
  tourList: [],
  // token: '',
  token:'c1599f283f6bce195a98a3f3d9c3f10865891753',
  virtualNumber:'3453167517',
  bannerList: [],
  recomendList: [],
  activityType: [],
  activityList: [],
  activityDetail: {},
  tourDetail: {},
  changeUser: {},
  articleList: [],
  articleDetail: {},
  userInfo: {},
  userVIP: {},
  userSign: {},
}

const getters = {
  getTourList(state) {
    return state.tourList
  },
  getToken(state) {
    return state.token
  },
  getBannerList(state) {
    return state.bannerList
  },
  getRecomend(state) {
    return state.recomendList
  },
  getActivityType(state) {
    return state.activityType
  },
  getActivity(state) {
    return state.activityList
  },
  getActivityDetail(state) {
    return state.activityDetail
  },
  getTourDetail(state) {
    return state.tourDetail
  },
  getChangeUser(state) {
    return state.changeUser
  },
  getArticleList(state) {
    return state.articleList
  },
  getArticleDetail(state) {
    return state.articleDetail
  },
  getUserInfo(state) {
    return state.userInfo
  },
  getUserVIP(state) {
    return state.userVIP
  },
  getUserSign(state) {
    return state.userSign
  },
}

const actions = {
  // 旅游列表
  tourList({ commit, state }, playload) {
    console.log(playload)
    let params =  qs.stringify(playload)
    return Axios.get(
      `/User/getGoodsTourism?${params}`,
    ).then(res => {
      if (res.data.StatusInfo.success) {
        commit(types.TOUR_LIST, res.data)
      }
      return new Promise(resolve=>{resolve(res.data)})
    })
  },
  // 首页banner
  bannerList({ commit, state }, playload) {
    return Axios.get(
      `/Banner/index`,
    ).then(res => {
      if (res.data.StatusInfo.success) {
        commit(types.BNNER_LIST, res.data)
      }
      return new Promise(resolve=>{resolve(res.data)})
    })
  },
  // 精选推荐
  recomendList({ commit, state }, playload) {
    return Axios.get(
      `/Index/goodsRecommended`,
    ).then(res => {
      if (res.data.StatusInfo.success) {
        commit(types.RECOMEND_LIST, res.data)
      }
      return new Promise(resolve=>{resolve(res.data)})
    })
  },
  // 活动分类
  activityType({ commit, state }, playload) {
    return Axios.get(
      `/Index/getCateTree`,
    ).then(res => {
      if (res.data.StatusInfo.success) {
        commit(types.ACTIVITY_TYPE, res.data)
      }
      return new Promise(resolve=>{resolve(res.data)})
    })
  },
  // 活动列表
  activityList({ commit, state }, playload) {
    let params =  qs.stringify(playload)
    return Axios.get(
      `/Index/getGoods?${params}`,
    ).then(res => {
      if (res.data.StatusInfo.success) {
        commit(types.ACTIVITY_LIST, res.data)
      }
      return new Promise(resolve=>{resolve(res.data)})
    })
  },
  // 活动详情
  activityDetails({commit}, playload) {
    let params = qs.stringify(playload)
    return Axios.get(
      `/Index/goodsView?${params}`, 
    ).then(res => {
      if (res.data.StatusInfo.success) {
        commit(types.ACTIVITY_DETAILS, res.data)
      }
      return new Promise(resolve=>{resolve(res.data)})
    })
  },
  // 旅游详情
  tourDetails({commit}, playload) {
    let params = qs.stringify(playload)
    return Axios.get(
      `/User/goodsTourismView?${params}`
    ).then(res => {
      if (res.data.StatusInfo.success) {
        commit(types.TOUR_DETAILS, res.data)
      }
      return new Promise(resolve=>{resolve(res.data)})
    })
  },
  // 换成我的
  changeUser({commit}, playload) {
    let params = qs.stringify(playload)
    return Axios.get(
      `/User/changeNickName?${params}`
    ).then(res => {
      if (res.data.StatusInfo.success) {
        commit(types.CHANGE_USER, res.data)
      }
      return new Promise(resolve=>{resolve(res.data)})
    })
  },
  // 活动分享/指南列表
  articleList({commit}, playload) {
    let params = qs.stringify(playload)
    return Axios.get(
      `/Index/getNews?${params}`
    ).then(res => {
      if (res.data.StatusInfo.success) {
        commit(types.ARTICLE_LIST, res.data)
      }
      return new Promise(resolve=>{resolve(res.data)})
    })
  },
  // 活动分享/指南详情
  articleDetail({commit}, playload) {
    let params = qs.stringify(playload)
    return Axios.get(
      `/Index/getNewsView?${params}`
    ).then(res => {
      if (res.data.StatusInfo.success) {
        commit(types.ARTICLE_DETAIL, res.data)
      }
      return new Promise(resolve=>{resolve(res.data)})
    })
  },
  // 个人信息
  userDetail({commit}, playload) {
    let params = qs.stringify(playload)
    return Axios.get(
      `/User/getUserInfo?${params}`
    ).then(res => {
      if (res.data.StatusInfo.success) {
        commit(types.USER_INFO, res.data)
      }
      return new Promise(resolve=>{resolve(res.data)})
    })
  },
  // VIP价格
  getVIP({commit}, playload) {
    let params = qs.stringify(playload)
    return Axios.get(
      `/User/previewMember?${params}`
    ).then(res => {
      if (res.data.StatusInfo.success) {
        commit(types.USER_VIP, res.data)
      }
      return new Promise(resolve=>{resolve(res.data)})
    })
  },
  // 立即报名
  signUp({commit}, playload) {
    let params = qs.stringify(playload)
    return Axios.post(
      `/User/createGoodsOrder?${params}`
    ).then(res => {
      if (res.data.StatusInfo.success) {
        commit(types.USER_SIGN, res.data)
      }
      return new Promise(resolve=>{resolve(res.data)})
    })
  },
  // 报名实际支付
  paymentAmount({commit}, playload) {
    let params = qs.stringify(playload)
    return Axios.post(
      `/User/getOrderPrice?${params}`
    ).then(res => {
      // if (res.data.StatusInfo.success) {
      //   commit(types.USER_SIGN, res.data)
      // }
      return new Promise(resolve=>{resolve(res.data)})
    })
  },
}

const mutations = {
  [types.TOUR_LIST](state, playload) {
    state.tourList = playload
  },
  setToken(state, playload) {
    state.token = playload
  },
  [types.BNNER_LIST](state, playload) {
    state.bannerList = playload
  },
  [types.RECOMEND_LIST](state, playload) {
    state.recomendList = playload
  },
  [types.ACTIVITY_TYPE](state, playload) {
    state.activityType = playload
  },
  [types.ACTIVITY_LIST](state, playload) {
    state.activityList = playload
  },
  [types.ACTIVITY_DETAILS](state, playload) {
    state.activityDetail = playload
  },
  [types.TOUR_DETAILS](state, playload) {
    state.tourDetail = playload
  },
  [types.CHANGE_USER](state, playload) {
    state.changeUser = playload
  },
  [types.ARTICLE_LIST](state, playload) {
    state.articleList = playload
  },
  [types.ARTICLE_DETAIL](state, playload) {
    state.articleDetail = playload
  },
  [types.USER_INFO](state, playload) {
    state.userInfo = playload
  },
  [types.USER_VIP](state, playload) {
    state.userVIP = playload
  },
  [types.USER_SIGN](state, playload) {
    state.userSign = playload
  },
}

const middlewares = store => {
    store.subscribe((mutation, state) => {
  
    })
  }
  
  const module = {
    state,
    getters,
    actions,
    mutations,
    plugins: [createPersistedState(), middlewares]
  }
  const store = new Vuex.Store(module)
  export default store