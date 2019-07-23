// import Vue from 'vue'
import TestProvider from './TestProvider'
import HomeProvider from './HomeProvider'

export default Vue => {
  Vue.component('test-provider', TestProvider)
  Vue.component('home-provider', HomeProvider)
}
