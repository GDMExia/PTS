<template>
  <div class="main">
    <h2 class="title">
      前往圣地亚哥，追逐历史长河中的多姿色彩
    </h2>
    <div class="conte">

    </div>
    <div class="fixed-image"></div>
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
}
.fixed-image {
  width: 44px;
  height: 44px;
  position:fixed;
  background: url('/src/assets/icon/ic_btn_home@2x.png') no-repeat;
  background-size: 44px 44px;
  right: 26px;
  bottom: 172px;
}
</style>
