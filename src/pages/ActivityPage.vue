<template>
  <div class="main">
    <div class="flex f15">
      <div @click="changeTab" :class="[type==0?'active':'','flex-tab']">进行中</div>
      <div @click="changeTab" :class="[type==1?'active':'','flex-tab']">历史</div>
    </div>
    <div v-if="type==0">
      <flexbox style="margin: 0 11px 20px 20px;max-width: 344px;">
        <flexbox-item class="header_btn" @click="click()">官方</flexbox-item>
        <flexbox-item class="header_btn header-active" @click="$router.push('/schools/data')">私房菜</flexbox-item>
        <flexbox-item class="header_btn" @click="$router.push('/schools/hot')">咖啡馆</flexbox-item>
        <flexbox-item class="header_btn" @click="$router.push('/schools/hot')">美食DIY</flexbox-item>
      </flexbox>
    </div>
    <div style="padding-bottom: 83px;">
      <div v-for="item in activityList" :key="item.id" class="main-content" @click="$router.push('/activities/activityDetail')">
        <div class="image">
          <img src="http://iph.href.lu/355x177" alt="">
        </div>
        <img class="activity-type" src="/src/assets/ic_guanfang@2x.png" alt="">
        <div class="name-price">
          <div class="content-left">
            <p class="title f16 content-left">
              {{item.name}}
            </p>
            <p class="time mt12">
              <img src="/src/assets/icon_time@2x.png" alt="">
              截止报名时间：{{item.time}}
            </p>
          </div>
          <div>
            <p class="price">{{item.price}}</p>
            <p class="num">抵{{item.num}}积分</p>
          </div>
        </div>
      </div>
    </div>
    
    <tabbarComponent :tabIndex=2></tabbarComponent>
    <home-provider></home-provider>
    
  </div>
</template>

<script>
import TabbarComponent from "@/components/TabbarComponent.vue";
import { Flexbox, FlexboxItem, } from 'vux'
export default {
  components: {
    TabbarComponent,
    Flexbox,
    FlexboxItem
  },
  name: "HomePage",
  data() {
    return {
      type: 0,
      activityList: [
        {img: '/src/assets/icon_time@2x.png', time: '2019/05/10 19:00', name: '从品酒来了解酒窖文化',price: '¥ 2050', num: 500},
        {img: '/src/assets/icon_time@2x.png', time: '2019/05/10 19:00', name: '从品酒来了解酒窖文化',price: '¥ 2050', num: 500},
        {img: '/src/assets/icon_time@2x.png', time: '2019/05/10 19:00', name: '从品酒来了解酒窖文化',price: '¥ 2050', num: 500},
      ]
    };
  },
  methods: {
    changeTab() {
      this.type = !this.type
    }
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
.flex {
  display: flex;
  margin: 12px 20px 20px 20px;
  background: #ffffff;
  height: 40px;
  color: #333333;
  text-align: center;
  border-radius: 30px;
}
.f15 {
  font-size: 15px;
}
.flex-tab {
  width: 168px;
  flex: 1;
  height: 100%;
  line-height: 40px;
  cursor: pointer;
} 
.active {
  background:#38DDE5;
  border-radius: 30px;
  color: #ffffff;
  -moz-box-shadow:0px 6px 9px rgba(56, 221, 229, 0.3); 
  -webkit-box-shadow:0px 6px 9px rgba(56, 221, 229, 0.3); 
  box-shadow:0px 6px 9px rgba(56, 221, 229, 0.3);
}
.header_btn{
  max-width:80px;
  height:40px;
  background-size: 80px 40px;
  text-align: center;
  color:#38DDE5;
  padding-top: 10px;
  font-size: 15px;
  background: #ffffff;
  border-radius: 30px;
}
.header-active {
  color: #ffffff;
  background: #38DDE5;
}
.main-content {
  min-height:257px;
  width: 355px;
  margin-left:10px;
  border-radius: 20px;
  background-color: #fff;
  margin-top:10px;
  position: relative;
}
.main-content .image img{
  width:355px;
  height:177px;
  border-radius: 20px 20px 0 0 
}
.activity-type {
  width: 36px;
  height: 36px;
  position: absolute;
  top: 9px;
  right: 9px;
}
.name-price {
  display: flex;
  justify-content: space-between;
  padding: 14px 21px 11px 20px;
}
.name-price .content-left {
  max-width: 227px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis
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
.f16 {
  font-size: 16px;
  color: #323643;
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
}
</style>
