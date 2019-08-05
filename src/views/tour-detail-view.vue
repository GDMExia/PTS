<template>
  <div class="main">
    <div>
      
    </div>
    <swiper loop auto :list="picList" dots-position="center" @swiper-indicator-active-color="'#76F7FC'" height="227px"></swiper>
    <!-- <img class="activity-img" src="http://iph.href.lu/375x227" alt=""> -->
    <div class="tour-detail">
      <p class="title-text">{{tourItem.goods_name}}</p>
      <div class="name-price">
        <div>
          <p class="time">
            <img src="../../static/img/icon_time@2x.png" alt="">
            {{tourItem.start_time}}～{{tourItem.end_time}}
          </p>
          <p class="time mt12">
            <img src="../../static/img/icon_fabuzhe@2x.png" alt="">
            发布者：{{tourItem.create_name}}
          </p>
        </div>
        <div style="text-align: right;">
          <p class="price">$ {{tourItem.goods_price}}</p>
          <p class="num">最高可抵扣{{tourItem.discount_point}}积分</p>
        </div>
      </div>
    </div>
    <div v-if="changeShow" class="tour-vip" @click="handlechangeUser">
      <img src="../../static/img/btn_qh@2x.png" alt="">
    </div>
    <!-- <div class="tour-share f10">
      <span>分享来自</span>
      <img src="http://iph.href.lu/20x20" alt="">
      <span>我的名字叫</span>
    </div> -->
    <div class="tour-content" v-html="tourItem.content">
      <!-- <img src="../../static/img/img@2x.png" alt=""> -->
    </div>
    <div class="local-life name-price" @click="$router.push('/tour')">
      <span class="local-life-text">相关套餐</span>
      <span class="local-life-more">MORE</span>
    </div>
    <div v-for="item in storeList" :key="item.tourism_id" class="store">
      <div class="store-img" :style="{backgroundImage: 'url(' + item.pic + ')'}">
      <!-- <div class="store-img" :style="'background-image: '+item.pic"> -->
        <!-- <img :src="item.pic" alt=""> -->
      </div>
      <div class="store-right f16">
        {{item.goods_name}}
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
  name: "HomePage",
  data() {
    return {
      storeList: [],
      tourItem: {},
      picList: [],
      id: 0,
      changeShow: true
    };
  },
  computed: {
    ...mapGetters(['getToken'])
  },
  methods: {
    ...mapActions(['tourDetails', 'changeUser']),
    handleDetail() {
      const params = {
        // token: this.GetQueryString('token'),
        token: this.getToken,
        tourism_id: this.id
      }
      this.tourDetails(params).then(res=>{
        if(res.StatusInfo.success) {
          this.tourItem = res.tourismInfo
          this.picList = res.picList.map(item=>{
            item.img = item.file_path
            return item
          })
          this.storeList = res.newsCateTree.slice(-5)
        } else {
          this.toastShow(res.StatusInfo.ErrorDetailCode)
          if(res.StatusInfo.ReturnCode==603){
            this.$store.commit('setToken','')
          }
        }
      })
    },
    handlechangeUser() {
      const params = {
        token: this.getToken
      }
      this.changeUser(params).then(res=>{
        if(res.StatusInfo.success) {
          this.tourItem.create_name = res.userInfo.nickname
          this.changeShow = false
        } else {
          this.toastShow(res.StatusInfo.ErrorDetailCode)
        }
      })
    }
  },
  beforeDestroy() {
    
  },
  created() {
    this.handleDetail()
  },
  mounted() {
    this.id = this.$route.query.id
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
  width: 100%;
  height: 227px;
  border-radius: 0 0 15px 15px;
}
.tour-detail {
  width: 92%;
  height: 130px;
  border-radius: 5px;
  background: #ffffff;
  position: absolute;
  margin: 0 15px;
  top: 171px;
  padding: 14px 4% 12px 4%;
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
.tour-share {
  position: absolute;
  right: 0;
  height: 28px;
  border-radius: 22pt  0pt  0pt  22pt ;
  border: 1px solid #ffffff;
  top: 12px;
  border-right: 0;
  padding: 0 15px;
  color: #ffffff;
}
.tour-share img {
  width: 20px;
  height: 20px;
  border-radius: 100%;
  display: inline-block;
}
.tour-vip img {
  width: 100%;
  height: 100%;
}
.tour-content {
  background-color: #ffffff;
  padding: 15px 22px 0 20px;
  margin-top: 130px;
  width: 100%;
}
.tour-content img {
  width: 100%;
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
  background-position: center center;    
  background-size: 100% 100%;               
  background-repeat: no-repeat;
}
.store-img img {
  width: 100%;
}
.store-right {
  margin-left: 10px;
  align-items: center;
  display: flex;
}
</style>
