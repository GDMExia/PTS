<template>
  <div class="main">
    <h2 class="title">
      如何正确使用积分
    </h2>
    <div class="content-detail">
      <img src="../../static/img/img@2x.png" alt="">
    </div>
    <div class="fixed-image" @click="$router.push('/home')"></div>
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
        {id: 1, img:'http://iph.href.lu/90x90', name: '品酒会活动策划方案', status: true,address: '上海市长宁路1018号 龙之梦购物中心6F',shopowner: 'Shy', created: '2019/07/24'},
        {id: 2, img:'http://iph.href.lu/90x90', name: '品酒会活动策划方案',status: false, address: '上海市长宁路1018号 龙之梦购物中心6F',shopowner: 'Shy', created: '2019/07/24'},
        {id: 3, img:'http://iph.href.lu/90x90', name: '品酒会活动策划方案',status: false, address: '上海市长宁路1018号 龙之梦购物中心6F',shopowner: 'Shy', created: '2019/07/24'},
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
  background: #ffffff;
  padding: 0 20px;
}
.title {
  color: #222222;
  font-size: 20px;
  padding-top: 11px;
}
.fixed-image {
    width: 54px;
    height: 54px;
    position: fixed;
    background: url(../../static/img/icon/ic_btn_home@2x.png) no-repeat;
    background-size: 54px 54px;
    right: 19px;
    bottom: 94px;
}
.content-detail {
  width: 89%;
  margin-top: 13px;
}
.content-detail img {
  width: 100%;
}
</style>
