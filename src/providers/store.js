import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Axios from 'axios'
import qs from 'qs'


Vue.use(Vuex)

const types = {
  TOUR_LIST: 'TOUR_LIST',
  TOKEN: 'TOKEN'
}

const state = {
  tourList: [],
  // token: 'cef10909ef1ea4da1969f2812da24fa921ff98aa',
  token:'c1599f283f6bce195a98a3f3d9c3f10865891753',
  virtualNumber:'3453167517'
}

const getters = {
  getTourList(state) {
    return state.tourList
  },
  getToken(state) {
    return state.token
  }
}

const actions = {
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
}

const mutations = {
  [types.TOUR_LIST](state, playload) {
    state.tourList = playload
  },
  [types.TOKEN](state, playload) {
    state.token = playload
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