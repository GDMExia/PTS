import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Axios from 'axios'
import qs from 'qs'
// import { stat } from 'fs';


Vue.use(Vuex)

const types = {
  TOUR_LIST: 'TOUR_LIST',
  TOKEN: 'TOKEN',
  BNNER_LIST: 'BANNER_LIST',
  RECOMEND_LIST: 'RECOMEND_LIST',
  ACTIVITY_TYPE: 'ACTIVITY_TYPE',
  ACTIVITY_LIST: 'ACTIVITY_LIST',
  ACTIVITY_DETAILS: 'ACTIVITY_DETAILS',
  TOUR_DETAILS: 'TOUR_DETAILS',
  IS_MEMBER:'IS_MEMBER'
}

const state = {
  tourList: [],
  // token: 'cef10909ef1ea4da1969f2812da24fa921ff98aa',
  token:'c1599f283f6bce195a98a3f3d9c3f10865891753',
  virtualNumber:'3453167517',
  bannerList: [],
  recomendList: [],
  activityType: [],
  activityList: [],
  activityDetail: {},
  tourDetail: {},
  isMember:''
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
  getIsMenber(state) {
    return state.getIsMenber
  }
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
      `/User/goodsTourismView?${params}`, 
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
  // 个人信息
  getUserInfo({commit},playload){
    let params = qs.stringify(playload)
    return Axios.get(
      `/User/getUserInfo?${params}`
    ).then(res => {
      if (res.data.StatusInfo.success) {
        commit(types.IS_MEMBER, res.data.userInfo.is_member)
      }
      return new Promise(resolve=>{resolve(res.data)})
    })
  }
}

const mutations = {
  [types.TOUR_LIST](state, playload) {
    state.tourList = playload
  },
  [types.TOKEN](state, playload) {
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
  [types.IS_MEMBER](state, playload) {
    state.isMember = playload
  }
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