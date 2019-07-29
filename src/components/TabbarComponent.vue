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
import home from '../../static/img/icon/ic_home@2x.png'
import homes from '../../static/img/icon/ic_home_s@2x.png'
import lvyou from '../../static/img/icon/ic_lvyou@2x.png'
import lvyous from '../../static/img/icon/ic_lvyou_s@2x.png'
import huodong from '../../static/img/icon/icon_huodong@2x.png'
import huodongs from '../../static/img/icon/icon_huodong_s@2x.png'
import xueyuan from '../../static/img/icon/icon_xueyuan@2x.png'
import xueyuans from '../../static/img/icon/icon_xueyuan_s@2x.png'
import wode from '../../static/img/icon/icon_wode@2x.png'
import wodes from '../../static/img/icon/icon_wode_s@2x.png'
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
      tabBarList: [
        {"link": "/home", "icon": home, "active": homes, "label": "首页"},
        {"link": "/tour", "icon": lvyou, "active": lvyous, "label": "旅游"},
        {"link": "/activity", "icon": huodong, "active": huodongs, "label": "活动"},
        {"link": "/school", "icon": xueyuan, "active": xueyuans, "label": "学院"},
        {"link": "/owner", "icon": wode, "active": wodes, "label": "我的"}
      ]
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
      // this.tabBarList = data.data
    })
  }
}
</script>

<style>
</style>
