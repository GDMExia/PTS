<template>
  <div class="main">
    <div class="store-detail">
      <img class="store-img" src="http://iph.href.lu/355x160" alt="">
      <div class="store-detail-content">
        <p class="f16 store-name">玛雅水景工作室</p>
        <p class="store-address f13">
          <img src="../../static/img/ic_dz02@2x.png" alt="">
          上海市长宁路1018号 龙之梦购物中心6F
        </p>
        <div class="name-price">
          <p class="store-address f13" style="padding-top: 13px;">
            <img src="../../static/img/ic_dz02@2x.png" alt="">
            021-8899302
          </p>
          <img class="mobile" src="../../static/img/btn_lxsj@2x.png" alt="">
        </div>
      </div>
    </div>
    <div class="content-detail">
      <img src="../../static/img/img@2x.png" alt="">
    </div>
    <div class="div-title f16">
      <p style="color: #222222;font-weight: 600;padding-top: 11px;padding-left: 20px;">店铺活动</p>
      <div v-for="item in storeList" :key="item.id" class="store-activity">
        <img class="store-activity-img" :src="item.img" alt="">
        <div class="store-right f16">
          {{item.name}}
          <img v-if="item.status" src="../../static/img/ing@2x.png" alt="">
          <img v-if="!item.status" src="../../static/img/yjs@2x.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
  },
  computed: {
    // ...mapGetters([])
  },
  name: "HomePage",
  data() {
    return {
      storeList: [
        {id: 1, img:'http://iph.href.lu/90x90', name: '今天拼爹拼妈的时代，我们到底怎么帮孩子', status: true,address: '上海市长宁路1018号 龙之梦购物中心6F',shopowner: 'Shy', created: '2019/07/24'},
        {id: 2, img:'http://iph.href.lu/90x90', name: '今天拼爹拼妈的时代，我们到底怎么帮孩子',status: false, address: '上海市长宁路1018号 龙之梦购物中心6F',shopowner: 'Shy', created: '2019/07/24'},
        {id: 3, img:'http://iph.href.lu/90x90', name: '今天拼爹拼妈的时代，我们到底怎么帮孩子',status: false, address: '上海市长宁路1018号 龙之梦购物中心6F',shopowner: 'Shy', created: '2019/07/24'},
      ]
    };
  },
  methods: {
    // ...mapActions(),
  },
  computed: {
    
  },
  beforeDestroy() {
    
  },
  created() {
    
  },
  mounted() {
    this.$bus.emit("onTabBarEvent", {});
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  height: 100%;
  position: relative;
}
.store-detail {
  width: 100%;
  background: #ffffff;
  padding: 10px;
}
.store-detail .store-img {
  width: 355px;
  height: 160px;
  border-radius: 15px;
}
.f16 {
  font-size: 16px;
}
.f13 {
  font-size: 13px;
}
.store-name {
  padding: 16px 0 25px 5px;
  font-weight: 600;
  color: #000000;
}
.store-address {
  padding: 0px 0 15px 5px;
  color: #666666;
}
.mobile {
  width: 99px;
  height: 44px;
}
p img {
  width: 12px;
  height: 12px;
  display: inline-block;
  margin-right: 12px;
  vertical-align: middle;
}
.name-price {
  display: flex;
  justify-content: space-between;
}
.content-detail {
  width: 375px;
  margin-top: 10px;
}
.content-detail img {
  width: 100%;
}
.div-title {
  width: 375px;
  background: #ffffff;
  margin-top: 10px;
}
.store-activity-img {
  width: 90px;
  height: 90px;
  border-radius: 11px;
}
.store-right {
  margin-left: 10px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  color: #323643
}
.store-right img {
  width: 54px;
  height: 22px;
  margin-top: 10px;
}
.store-activity {
  margin: 10px;
  border-radius: 5px;
  background-color: #ffffff;
  height: 120px;
  padding: 15px 10px;
  display: flex;
  box-shadow: 0 -2px 14px rgba(0,0,0,0.06)
}
</style>
