<template>
    <div>
      <toast
        v-model="chooseToast"
        type="text"
        :time="800"
        width="20em"
        :text="title"
        position=""></toast>
    </div>
</template>


<script>
import { Toast } from 'vux'
import {mapGetters, mapActions} from 'vuex'
import TabBar from '@/mock/TabBar.json'
export default {
  name: 'HomeProvider',
  mounted () {
    //获取tabbar
    this.$bus.once('onTabBarEvent', () => {
      setTimeout(() => { this.$bus.emit('onTabBarResultEvent', TabBar) }, 0)
    })
    
  },
  beforeDestroy () {
  },
  computed: {
    
  },
  components: {
    Toast
  },
  data() {
    return {
      chooseToast: false,
      title: ""
    }
  },
  methods: {
    
  }
}
</script>
