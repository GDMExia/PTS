import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// import Axios from 'axios'
// import qs from 'qs'


Vue.use(Vuex)

// const types = {}

const state = {}

const getters = {}

const actions = {}

const mutations = {}

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