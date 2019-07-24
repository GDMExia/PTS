<template>
  <div style="height:100%;">
    <div class="banner">
      <swiper loop auto :list="banner_list" dots-position="center"></swiper>
      <img src="/src/assets/radian@2x.png" alt="">
    </div>
    <div class="container">
      <div class="contain-activity">
        <img slot="icon" @click="$router.push('/homes/activity')" src="/src/assets/home_activity_share@2x.png">
        <img slot="icon" @click="$router.push('/homes/guide')" src="/src/assets/home_guide@2x.png">
      </div>
      <div class="local-life contain-activity">
        <span class="local-life-text">本地生活</span>
        <span class="local-life-more" @click="$router.push('/homes/store')">MORE</span>
      </div>
      <div>
        <div>
          <div>
            <p>私房菜 咖啡馆</p>
            <p>美食DIY</p>
          </div>
          <div>
            <p>定制旅游</p>
            <p>精品度假酒店</p>
          </div>
          <div>
            <p>亲子 教育</p>
            <p>妈妈部落</p>
          </div>
          <div>
            <p>美容 健身</p>
            <p>健康</p>
          </div>
          <div>
            <p>家居饰品 宠物</p>
            <p>设计师的店</p>
          </div>
          <div>
            <p>文艺 书房</p>
            <p>美好空间</p>
          </div>
        </div>
      </div>
      <div class="local-life">
        <span class="local-life-text">精品推荐</span>
      </div>
      <div>
        <div>
          <img src="" alt="">
          <p>品酒,会让你更</p>
        </div>
      </div>
    </div>
    <tabbarComponent :tabIndex=0></tabbarComponent>
    <home-provider></home-provider>
    
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
import { Swiper } from 'vux'
import TabbarComponent from "@/components/TabbarComponent.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    TabbarComponent,
    Swiper,
  },
  computed: {
    // ...mapGetters([])
  },
  name: "HomePage",
  data() {
    return {
      banner_list: [
        {
        "url": "javascript:",
        "img": "/src/assets/icon/no_data.png",
        "title": "送你一朵fua"
      }, {
        "url": "javascript:",
        "img": "/src/assets/icon/no_data.png",
        "title": "送你一辆车"
      }
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
  .banner {
    width: 100%;
    height: 2.12rem;
  }
  .banner img {
    width: 100%;
  }
  .container {
    background-color:#81D8D0;
    padding: 15px;
    margin-top: 54px;
  }
  .contain-activity {
    display: flex;
    justify-content: space-between;
  }
  .contain-activity img {
    width: 170px;
  }
  .local-life {
    margin-top: 41px;
  }
  .local-life-text {
    color: #333333;
    font-size: 16px;
    font-weight: 600;
  }
  .local-life-more {
    color: #ffffff;
    font-size: 12px;
  }
</style>
