<template>
  <div style="height:100%;">
    <div class="banner">
      <swiper loop auto :list="banner_list" dots-position="center" @swiper-indicator-active-color="'#76F7FC'" height="160px" :dotsClass="'dotsbottom'"></swiper>
      <!-- <img src="../../static/img/radian@2x.png" alt=""> -->
    </div>
    <!-- <div class="container"> -->
      <div class="contain-activity">
        <div>
          <img src="../../static/img/home_ic_xstj@2x.png" alt="">
          <p>心水推荐</p>
        </div>
        <div @click="$router.push('/homes/activity')">
          <img src="../../static/img/home_ic_hdfx@2x.png" alt="">
          <p>活动分享</p>
        </div>
        <div @click="$router.push('/homes/guide')">
          <img src="../../static/img/home_ic_syzn@2x.png" alt="">
          <p>使用指南</p>
        </div>
      </div>
      <div class="items-box" style="margin-top: 14px;padding: 0 2.67%;padding-bottom: 18px;">
        <div class="local-life m5">
          <span class="local-life-text">本地生活</span>
          <!-- <span class="local-life-more" @click="$router.push(`/homes/store`)">MORE</span> -->
          <img class="local-life-more" src="../../static/img/bt_ic_more@2x.png" @click="$router.push(`/homes/store`)" alt="">
        </div>
        <div class="local-life-body">
          <!-- <div class="local-life-menu"> -->
            <div class="local-lift-item" @click="$router.push(`/homes/store?group_id=${item.group_id}&cate_id=${item.cate_id}`)" v-for="(item, index) in local_list" :key="index" >
              <img :src="item.group_pic" alt="">
            </div>
          <!-- </div> -->
        </div>
      </div>
      <div class="items-box" style="margin-top: 10px; padding: 5.1% 3.2% 0;">
        <div class="local-life" v-show="recomend_list.length>0">
          <span class="local-life-text">精品推荐</span>
        </div>
        <div class="getmore" v-show="recomend_list.length>0">
          <div class="moreitem" v-for="(item, index) in recomend_list" :key="index" @click="$router.push(`/activities/activityDetail?id=${item.goods_id}`)">
            <div class="image">
              <img :src="item.banner" alt="">
            </div>
            <p>{{item.goods_name}}</p>
            <img class="activity-type" v-if="item.pid==2" src="../../static/img/ic_guanfang@2x.png" alt="">
            <img class="activity-type" v-if="item.pid==1" src="../../static/img/ic_shangjia@2x.png" alt="">
          </div>
        </div>
      </div>
      <div class="placeholder"></div>
    <!-- </div> -->
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
    ...mapGetters(['getToken'])
  },
  name: "HomePage",
  data() {
    return {
      banner_list: [],
      recomend_list: [],
      local_list: [],
      userInfo: {
        is_member: 0
      }
    };
  },
  methods: {
    ...mapActions(['bannerList', 'recomendList', 'userDetail','accountLogin', 'localLife']),
    handleBanner() {
      this.bannerList().then(res=>{
        if(res.StatusInfo.success) {
          this.banner_list = res.Banner.map(item=>{
            // 1活动页面;2外链页面;3签到页面;4旅游
            if(item.jump_type == '1') {
              item.url = `/activities/activityDetail?id=${item.link_url}`
            } else if (item.jump_type == '2') {
              item.url = `${item.link_url}`
            } else if (item.jump_type == '3') {
              item.url = `/owners/sign`
            } else if (item.jump_type == '4') {
              item.url = `/tours/tourDetail?id=${item.link_url}`
            } else if (item.jump_type == '5') {
              item.url = `/homes/storeDetail?id=${item.link_url}`
            } else {
              item.url = "javascript;"
            }
            item.img = item.bannerCover
            return item
          })
          if(this.userInfo.is_member==0) {
            this.banner_list = this.banner_list.filter(item=>{
              return item.jump_type != '3'&&item.jump_type != '4'
            })
          }
          console.log(this.banner_list)
        } else {
          this.toastShow(res.StatusInfo.ErrorDetailCode)
        }
      })
    },
    handleRecomend() {
      this.recomendList().then(res=>{
        if(res.StatusInfo.success) {
          this.recomend_list = res.goodsInfo
        } else {
          this.toastShow(res.StatusInfo.ErrorDetailCode)
        }
      })
    },
    handleLocal() {
      this.localLife().then(res=>{
        if(res.StatusInfo.success) {
          this.local_list = res.cateTree
        } else {
          this.toastShow(res.StatusInfo.ErrorDetailCode)
        }
      })
    },
    handleUser() {
      const token = this.$store.state.token
      let params = {
        token: token
      }
      let that = this
      if(token!='') {
        that.userDetail(params).then(res=>{
          if(res.StatusInfo.success) {
            that.userInfo = res.userInfo
            that.handleBanner()
          } else {
            if(res.StatusInfo.ReturnCode==603){
              that.handleBanner()
              this.$store.commit('setToken','')
              this.$router.go(0)
            }else{
              that.toastShow(res.StatusInfo.ErrorDetailCode)
            }
          }
        })
      } else {
        this.handleBanner()
      }
    },
    handleToken(){
      this.accountLogin(this.GetQueryString('token'))
    },
  },
  computed: {
    
  },
  beforeDestroy() {
    
  },
  created() {
    this.handleUser()
    this.handleLocal()
    this.handleRecomend()
    this.handleToken()
  },
  mounted() {
    this.$bus.emit("onTabBarEvent", {});
    this.$store.commit('setRefuse',true)
    // console.log(this.$store.state.token)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .banner {
    width: 100%;
    /* height: 2.12rem; */
    height:199px;
    position: relative;
    background: url('../../static/img/home_bg@2x.png') center no-repeat;
    background-size: 100% 199px;
  }
  .banner img {
    width: 100%;
    position: absolute;
    bottom:14px
  }
  .vux-slider{
    height:160px!important;    
    padding-top: 10px;
    left: 2.7%;
    overflow: visible;
    position: static;
    width: 94.6%;
    margin-left: 2.7%;}
  .dotsbottom.vux-indicator.vux-indicator-center {
    top: 168px;
  }
  .dotsbottom{top:168px!important;z-index:1000}
  .container {
    background-color:#81D8D0;
    width:100%;
    /* padding-left: 11px;
    padding-right: 11px;
    padding-top: 29px; */
    /* padding-bottom: 83px; */
  }
  .contain-activity {
    display: flex;
    justify-content: space-around;
    width: 94.6%;
    background: #fff;
    height: 87px;
    border-radius: 10px;
    margin-left: 2.7%;
    align-items: center;
  }
  .contain-activity img {
    width: 50px;
    height: 50px;
  }
  .contain-activity p {
    color: #303030;
    font-size: 12px;
  }
  .local-life {
    display: flex;
    text-align: center;
    justify-content: space-between;
    align-items: center;
    clear: both;
    overflow: hidden
  }
  .m5 {
    margin: 5px;
  }
  .local-life-text {
    color: #333333;
    font-size: 16px;
    font-weight: 600;
  }
  .items-box {
    width: 100%;
    background: #fff;
  }
  .local-life-more {
    width: 78px;
    height: 46px;
  }
  .local-life-body{
    display: flex;
    width: 100%;
    flex-flow: row wrap;
    justify-content: space-around;
    height: 170px;
  }
  .local-life-menu{width:100%;display: flex;align-content: center;margin-bottom: 24px}
  .local-lift-item{
    /* flex:1; */
    width:32.4%;
    height:81px;
    font-size: 14px;
    color:#333;
    display: inline-block;
    /* margin-right: 1.4%; */
  }
  .local-lift-item img {
    width: 100%;
    height: 100%;
  }
  .local-lift-item1{background-size: 32.7% 74px;}
  .local-lift-item2{background: url('../../static/img/icon/block1@2x(1).png') center no-repeat;background-size: 116px 74px;}
  .local-lift-item3{background: url('../../static/img/icon/block1@2x(2).png') center no-repeat;background-size: 116px 74px;}
  .local-lift-item4{background: url('../../static/img/icon/block1@2x(3).png') center no-repeat;background-size: 116px 74px;}
  .local-lift-item5{background: url('../../static/img/icon/block1@2x(4).png') center no-repeat;background-size: 116px 74px;}
  .local-lift-item6{background: url('../../static/img/icon/block1@2x(5).png') center no-repeat;background-size: 116px 74px;}

  .getmore{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 18px;
    justify-content: space-between;
  }
  .getmore .moreitem{
    /* height: 170px; */
    width: 48.4%;
    /* margin-right: 20px; */
    display: inline-block;
    /* -webkit-box-flex: 1; */
    /* flex: 1 1 0%; */
    /* width: 50%; */
    overflow: hidden;
    position: relative;
  }
  .getmore .moreitem .image{
    width:100%;
    height:100;
    border-radius: 10px;
    background-color: #fff;
    position: relative;
    padding-top: 100%;
  }
  .activity-type {
    width: 36px;
    height: 36px;
    position: absolute;
    top: 9px;
    right: 9px;
  }
  .getmore .moreitem .image img{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: auto;
    border-radius: 10px;
  }
  .getmore .moreitem p{
    width: 100%;
    /* white-space: nowrap; */
    font-size: 14px;
    color: #303030;
    margin-top: 8px;
    margin-bottom: 12px;
    text-overflow: -o-ellipsis-lastline; 
    overflow: hidden; 
    text-overflow: ellipsis; 
    display: -webkit-box; 
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .placeholder{height:70px}
</style>
