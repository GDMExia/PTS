import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Axios from 'axios'
import qs from 'qs'
// import { stat } from 'fs';
const rootPath = process.env.NODE_ENV === 'production'?process.env.API_ROOT:''

Vue.use(Vuex)

const types = {
  TOUR_LIST: 'TOUR_LIST',
  BNNER_LIST: 'BANNER_LIST',
  RECOMEND_LIST: 'RECOMEND_LIST',
  LOCAL_LIST: 'LOCAL_LIST',
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
  STORE_LIST: 'STORE_LIST',
  STORE_DETAIL: 'STORE_DETAIL',
  SHARE_LIST: 'SHARE_LIST',
  SHARE_USER_LIST: 'SHARE_USER_LIST',
}

const state = {
  tourList: [],
  // token: '',
  token:'32b8172ee6377306fffc14bf5c26eebee741634e',
  refuse:false,
  virtualNumber:'3453167517',
  bannerList: [],
  recomendList: [],
  localList: [],
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
  storeList: [],
  storeDetail: [],
  shareList: [],
  shareUserList: [],
  uid: ''
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
  getLocal(state) {
    return state.localList
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
  getStoreList(state) {
    return state.storeList
  },
  getStoreDetail(state) {
    return state.storeDetail
  },
  getRefuse(state) {
    return state.refuse
  },
  getShareList(state) {
    return state.shareList
  },
  getShareUserList(state) {
    return state.shareUserList
  },
}

const actions = {
  // 登录授权
  auth2({ commit, state }, playload) {
    return Axios.get(
      `${rootPath}/WechatLogin/accountLogin?callback_url=${playload}`,
    ).then(res => {
      if (res.data.StatusInfo.success) {
        // commit('setToken', res.data)
      }
      return new Promise(resolve=>{resolve(res.data)})
    })
  },
  // 旅游列表
  tourList({ commit, state }, playload) {
    console.log(playload)
    let params =  qs.stringify(playload)
    return Axios.get(
      `${rootPath}/User/getGoodsTourism?${params}`,
    ).then(res => {
      console.log(res)
      if (res.data.StatusInfo.success) {
        // commit('setToken', res.data)
      }
      return new Promise(resolve=>{resolve(res.data)})
    })
  },
  // 首页banner
  bannerList({ commit, state }, playload) {
    return Axios.get(
      `${rootPath}/Banner/index`,
    ).then(res => {
      if (res.data.StatusInfo.success) {
        commit(types.BNNER_LIST, res.data)
      }
      return new Promise(resolve=>{resolve(res.data)})
    })
  },
  // 本地生活
  localLife({ commit, state }, playload) {
    return Axios.get(
      `${rootPath}/Index/getMerchantsCategoryGroup`,
    ).then(res => {
      if (res.data.StatusInfo.success) {
        commit(types.LOCAL_LIST, res.data)
      }
      return new Promise(resolve=>{resolve(res.data)})
    })
  },
  // 精选推荐
  recomendList({ commit, state }, playload) {
    return Axios.get(
      `${rootPath}/Index/goodsRecommended`,
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
      `${rootPath}/Index/getCateTree`,
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
      `${rootPath}/Index/getGoods?${params}`,
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
      `${rootPath}/Index/goodsView?${params}`,
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
      `${rootPath}/User/goodsTourismView?${params}`
    ).then(res => {
      if (res.data.StatusInfo.success) {
        commit(types.TOUR_DETAILS, res.data)
      }
      return new Promise(resolve=>{resolve(res.data)})
    })
  },
  // 旅游分享详情
  tourShareDetails({commit}, playload) {
    let params = qs.stringify(playload)
    return Axios.get(
      `${rootPath}/User/goodsTourismShareView?${params}`
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
      `${rootPath}/User/changeNickName?${params}`
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
      `${rootPath}/Index/getNews?${params}`
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
      `${rootPath}/Index/getNewsView?${params}`
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
      `${rootPath}/User/getUserInfo?${params}`
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
      `${rootPath}/User/previewMember?${params}`
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
      `${rootPath}/User/createGoodsOrder?${params}`
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
      `${rootPath}/User/getOrderPrice?${params}`
    ).then(res => {
      // if (res.data.StatusInfo.success) {
      //   commit(types.USER_SIGN, res.data)
      // }
      return new Promise(resolve=>{resolve(res.data)})
    })
  },
  // 商家列表
  storeLists({commit}, playload) {
    let params = qs.stringify(playload)
    return Axios.get(
      `${rootPath}/Merchants/index?${params}`
    ).then(res => {
      if (res.data.StatusInfo.success) {
        commit(types.STORE_LIST, res.data)
      }
      return new Promise(resolve=>{resolve(res.data)})
    })
  },
  // 商家详情
  storeDetails({commit}, playload) {
    let params = qs.stringify(playload)
    return Axios.get(
      `${rootPath}/Merchants/view?${params}`
    ).then(res => {
      if (res.data.StatusInfo.success) {
        commit(types.STORE_DETAIL, res.data)
      }
      return new Promise(resolve=>{resolve(res.data)})
    })
  },
  accountLogin({commit}, playload) {
      if (playload) {
        // commit('setToken',playload)
      }
      return playload
  },
  // 我的分享
  shareList({commit}, playload) {
    let params = qs.stringify(playload)
    return Axios.get(
      `${rootPath}/User/getUserShare?${params}`
    ).then(res => {
      if (res.data.StatusInfo.success) {
        commit(types.SHARE_LIST, res.data)
      }
      return new Promise(resolve=>{resolve(res.data)})
    })
  },
  // 查看分享浏览用户
  shareUserList({commit}, playload) {
    let params = qs.stringify(playload)
    return Axios.get(
      `${rootPath}/User/getUserShareLog?${params}`
    ).then(res => {
      if (res.data.StatusInfo.success) {
        commit(types.SHARE_USER_LIST, res.data)
      }
      return new Promise(resolve=>{resolve(res.data)})
    })
  },
  // 微信分享
  wxShare({commit}, playload) {
    let params = qs.stringify(playload)
    return Axios.get(
      `${rootPath}/User/getShareInfo?${params}`
    ).then(res => {
      return new Promise(resolve=>{resolve(res.data)})
    })
  },
  // Base64图片解析
  uploadsImageBase64({commit}, playload) {
    let params = qs.stringify(playload)
    return Axios.post(
      `${rootPath}/File/uploadsImageBase64`,params
    ).then(res => {
      return new Promise(resolve=>{resolve(res.data)})
    })
  },
  // 上传用户卡片图片
  updateUserCard({commit}, playload) {
    let params = qs.stringify(playload)
    return Axios.post(
      `${rootPath}/User/updateUserCard`,params
    ).then(res => {
      return new Promise(resolve=>{resolve(res.data)})
    })
  },
  // 卡片分享
  getCardShareInfo({commit}, playload) {
    let params = qs.stringify(playload)
    return Axios.get(
      `${rootPath}/User/getCardShareInfo?${params}`
    ).then(res => {
      return new Promise(resolve=>{resolve(res.data)})
    })
  }
}

const mutations = {
  [types.TOUR_LIST](state, playload) {
    state.tourList = playload
  },
  setToken(state, playload) {
    state.token = '32b8172ee6377306fffc14bf5c26eebee741634e'
    // state.token = playload
  },
  setRefuse(state, playload) {
    state.refuse = playload
  },
  setUid(state, playload) {
    state.uid = playload
  },
  [types.BNNER_LIST](state, playload) {
    state.bannerList = playload
  },
  [types.RECOMEND_LIST](state, playload) {
    state.recomendList = playload
  },
  [types.LOCAL_LIST](state, playload) {
    state.localList = playload
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
  [types.STORE_LIST](state, playload) {
    state.storeList = playload
  },
  [types.STORE_DETAIL](state, playload) {
    state.storeDetail = playload
  },
  [types.SHARE_LIST](state, playload) {
    state.shareList = playload
  },
  [types.SHARE_USER_LIST](state, playload) {
    state.shareUserList = playload
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
