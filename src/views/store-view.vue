<template>
  <div style="height:100%;">
    <div class="store-type">
      <div class="store-type-item">家居饰品</div>
      <div class="store-type-item active">宠物</div>
      <div class="store-type-item">设计师的店</div>
    </div>
    <div class="images-slide">
      <swiper loop auto :list="imageList" dots-position="center"></swiper>
    </div>
    <div v-for="item in storeList" :key="item.id" @click="$router.push('/homes/storeDetail')" class="store">
      <img class="store-img" :src="item.img" alt="">
      <div class="store-right">
        <p class="store-name">{{item.name}}
        <img class="activity-enable" src="/src/assets/ic_hdbq@2x.png" alt="">
        </p>
        <p class="store-address mt12"><img src="/src/assets/ic_dz02@2x.png" alt="">{{item.address}}</p>
        <p class="store-address mt10"><img src="/src/assets/ic_owner@2x.png" alt="">{{item.shopowner}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { Swiper } from 'vux'
export default {
  components: {
    Swiper
  },
  computed: {
    // ...mapGetters([])
  },
  name: "HomePage",
  data() {
    return {
      imageList: [
        {
        "url": "javascript:",
        "img": "'http://iph.href.lu/355x120'",
        "title": ""
        }, {
          "url": "javascript:",
          "img": "'http://iph.href.lu/355x120'",
          "title": ""
        }
      ],
      storeList: [
        {id: 1, img:'http://iph.href.lu/90x90', name: '玛雅水景工作室', status: true,address: '上海市长宁路1018号 龙之梦购物中心6F',shopowner: 'Shy', created: '2019/07/24'},
        {id: 2, img:'http://iph.href.lu/90x90', name: '玛雅水景工作室',status: false, address: '上海市长宁路1018号 龙之梦购物中心6F',shopowner: 'Shy', created: '2019/07/24'},
        {id: 3, img:'http://iph.href.lu/90x90', name: '玛雅水景工作室',status: false, address: '上海市长宁路1018号 龙之梦购物中心6F',shopowner: 'Shy', created: '2019/07/24'},
        
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
.store {
  margin: 10px;
  border-radius: 5px;
  background-color: #ffffff;
  height: 120px;
  padding: 15px 10px;
  display: flex;
}
.store-type {
  display: flex;
  margin: 10px;
}
.store-type-item {
  color: #06D5DE;
  background: #ffffff;
  padding: 10px 15px 9px;
  font-size: 15px;
  border-radius: 20px;
  min-width: 71px;
  text-align: center;
  margin-right: 10px;
}
.images-slide {
  margin: 10px;
  max-width: 355px;
  height: 120px;
}
.store-type .active {
  background: rgba(6, 213, 222, 10%);;
}
.store-img {
  width: 90px;
  height: 90px;
}
.store-right {
  margin-left: 10px;
}
.store-name {
  color: #000000;
  font-size: 16px;
  font-weight: 600;
}
.store-address {
  color: #666666;
  font-size: 11px;
  display: flex;
}
p img {
  width: 12px;
  height: 12px;
  display: inline-block;
  margin-right: 5px;
  vertical-align: middle;
}
.mt12 {
  margin-top: 12px;
}
.mt10 {
  margin-top: 10px;
}
.activity-enable {

}
</style>
