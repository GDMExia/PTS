<template>
  <div>
    <tabbar @on-index-change="indexChange" style="position:fixed;bottom:0;height:83px">
      <tabbar-item v-for="(item, index) in tabBarList" :key="index" :link="item.link" :selected="index==tabIndex">
        <img slot="icon" :src="item.icon">
        <img slot="icon-active" :src="item.active">
        <span slot="label">{{item.label}}</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>

import { Tabbar, TabbarItem } from 'vux'
export default {
  components: {
    Tabbar,
    TabbarItem
  },
  props: {
    tabIndex: 0
  },
  data () {
    return {
      tabBarList: []
    }
  },
  methods: {
    indexChange (idx) {
      console.log(idx)
    }
  },
  created () {
    
  },
  mounted () {
    this.$bus.once('onTabBarResultEvent', data => {
      this.tabBarList = data.data
    })
  }
}
</script>

<style>
</style>
