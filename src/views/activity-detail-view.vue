<template>
  <div class="main">
    <img class="activity-img" src="http://iph.href.lu/375x227" alt="">
    <div class="tour-detail">
      <p class="title-text">马来西亚、吉隆坡城市遗址、洞穴与缆车马来西亚吉隆坡</p>
      <div class="name-price">
        <div>
          <p class="time">
            <img src="/src/assets/icon_time@2x.png" alt="">
            参与日期：2019/05/10
          </p>
          <p class="time mt12">
            <img src="/src/assets/icon_fabuzhe@2x.png" alt="">
            发布者：PTS俱乐部
            <img class="arrow" src="/src/assets/icon/ic_arrow03@2x.png" alt="">
          </p>
        </div>
        <div>
          <p class="price">¥ 2050</p>
          <p class="num">最高可抵扣500积分</p>
        </div>
      </div>
    </div>
    <img class="activity-type" src="/src/assets/ic_guanfang@2x.png" alt="">
    <div class="tour-content">
      <img style="wigth: 100%" src="/src/assets/demo.jpg" alt="">
    </div>
    <div class="local-life name-price">
      <span class="local-life-text">相关活动</span>
      <span class="local-life-more">MORE</span>
    </div>
    <div v-for="item in storeList" :key="item.id" class="store">
      <img class="store-img" :src="item.img" alt="">
      <div class="store-right f16">
        {{item.name}}
      </div>
    </div>
    <div class="bottom"> 
      <div class="button submit f15">立即报名</div>
      <!-- <div class="button disabled f15">报名已结束</div> -->
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
}
.container {
  margin: 10px;
  height: 272px;
  border-radius: 15px;
}
.activity-img {
  max-width: 375px;
  height: 227px;
  border-radius: 0 0 15px 15px;
}
.tour-detail {
  max-width: 345px;
  height: 130px;
  border-radius: 5px;
  background: #ffffff;
  position: absolute;
  margin: 0 15px;
  top: 171px;
  padding: 14px 20px 12px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.activity-title {
  height: 95px;
  padding: 14px 21px 10px 20px;
  border-radius: 0 0 15px 15px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.name-price {
  display: flex;
  justify-content: space-between;
}
.name-price .price {
  color: #DE1E06;
  font-size: 22px;
}
.name-price .num {
  color: #989898;
  font-size: 10px;
  margin-top: 2px;
}
.title-text {
  color: #323643;
  font-size: 16px;
  font-weight: 600;
}
.time {
  color: #666666;
  font-size: 12px;
}
.mt12 {
  margin-top: 12px;
}
p img {
  width: 12px;
  height: 12px;
  display: inline-block;
  vertical-align: middle;
}
.tour-vip {
  position: absolute;
  right: 0;
  width: 130px;
  height: 48px;
  margin-top: 86px;
}

.tour-vip img {
  width: 100%;
  height: 100%;
}
.tour-content {
  background-color: #ffffff;
  margin-top: 136px;
}
.content-title {
  color: #06D5DE;
}
.f16 {
  font-size: 16px;
}
.f15 {
  font-size: 15px;
}
.f12 {
  font-size: 12px;
}
.f10 {
  font-size: 10px;
}
.local-life {
  padding: 21px 20px 12px 20px;
}
.local-life-text {
  color: #333333;
  font-size: 16px;
  font-weight: 600;
}
.local-life-more {
  color: #06D5DE;
  font-size: 14px;
}
.store {
  margin: 10px;
  border-radius: 5px;
  background-color: #ffffff;
  height: 120px;
  padding: 15px 10px;
  display: flex;
}
.store-img {
  width: 90px;
  height: 90px;
}
.store-right {
  margin-left: 10px;
  align-items: center;
  display: flex;
}
.activity-type {
  width: 36px;
  height: 36px;
  position: absolute;
  top: 9px;
  right: 9px;
}
.arrow {
  width: 6px;
  height: 10px;
  margin-left: 8px;
}
.bottom {
  width: 100%;
  padding: 6px 20px 37px;
  background: #ffffff;
  margin-top: 20px;
}
.bottom .button {
  max-width: 335px;
  border-radius: 22px;
  height: 40px;
  text-align: center;
  line-height: 40px;
}
.submit {
  background: #06D5DE;
  color: #ffffff;
  -moz-box-shadow:0px 6px 9px rgba(0, 0, 0, 0.14); 
  -webkit-box-shadow:0px 6px 9px rgba(0, 0, 0, 0.14); 
  box-shadow:0px 6px 9px rgba(0, 0, 0, 0.14);
}
.disabled {
  text-align: center;
  background: #C5C5C5;
  color: #ffffff;
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
