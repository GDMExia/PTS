<template>
  <div style="height:100%;">
    <div class="banner">
      <swiper loop auto :list="banner_list" dots-position="center" @swiper-indicator-active-color="'#76F7FC'" height="212px" dots-class="dotsbottom"></swiper>
      <img src="../../static/img/radian@2x.png" alt="">
    </div>
    <div class="container">
      <div class="contain-activity">
        <img slot="icon" @click="$router.push('/homes/activity')" src="../../static/img/home_activity_share@2x.png">
        <img slot="icon" @click="$router.push('/homes/guide')" src="../../static/img/home_guide@2x.png">
      </div>
      <div class="local-life">
        <span class="local-life-text">本地生活</span>
        <span class="local-life-more" @click="$router.push('/homes/store')">MORE</span>
      </div>
      <div class="local-life-body">
        <div class="local-life-menu">
          <div class="local-lift-item local-lift-item1">

          </div>
          <div class="local-lift-item local-lift-item2">

          </div>
          <div class="local-lift-item local-lift-item3">

          </div>
        </div>
        <div class="local-life-menu">
          <div class="local-lift-item local-lift-item4">

          </div>
          <div class="local-lift-item local-lift-item5">

          </div>
          <div class="local-lift-item local-lift-item6">

          </div>
        </div>
      </div>
      <div class="local-life">
        <span class="local-life-text">精品推荐</span>
      </div>
      <div class="getmore">
        <div class="moreitem">
          <div class="image">
            <img src="" alt="">
          </div>
          <p>品酒,会让你更123123123</p>
        </div>
        <div class="moreitem">
          <div class="image">
            <img src="" alt="">
          </div>
          <p>品酒,会让你更123123123</p>
        </div>
        <div class="moreitem">
          <div class="image">
            <img src="" alt="">
          </div>
          <p>品酒,会让你更123123123</p>
        </div>
        <div class="moreitem">
          <div class="image">
            <img src="" alt="">
          </div>
          <p>品酒,会让你更123123123</p>
        </div>
      </div>
      <div class="placeholder"></div>
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
      banner_list: [],
      recomend_list: [],
      userInfo: {}
    };
  },
  methods: {
    ...mapActions(['bannerList', 'recomendList', 'userDetail']),
    handleBanner() {
      this.bannerList().then(res=>{
        if(res.StatusInfo.success) {
          this.banner_list = res.Banner.map(item=>{
            // 1活动页面;2外链页面;3签到页面
            if(item.jump_type == '1') {
              item.url = `${item.link_url}`
            } else if (item.jump_type == '2') {
              item.url = `${item.link_url}`
            } else if (item.jump_type == '3') {
              item.url = ``
            } else {
              item.url = "javascript;"
            }
            item.img = item.bannerCover
            return item
          })
          if(this.userInfo.is_member==0) {
            this.banner_list = this.banner_list.filter(item=>{
              return item.jump_type != 3
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
    handleUser() {
      let params = {
        token: this.GetQueryString('token'),
      }
      this.userDetail(params).then(res=>{
        this.handleBanner()
        if(res.StatusInfo.success) {
          this.userInfo = res.userInfo
        } else {
          this.toastShow(res.StatusInfo.ErrorDetailCode)
        }
      })
    },
  },
  computed: {
    
  },
  beforeDestroy() {
    
  },
  created() {
    if(!this.$store.state.token){this.$router.push('/owners/login')}
  },
  mounted() {
    this.$bus.emit("onTabBarEvent", {});
    this.handleUser()
    this.handleRecomend()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .banner {
    width: 100%;
    /* height: 2.12rem; */
    height:227px;
    position: relative;
    background-color:#81D8D0;
  }
  .banner img {
    width: 100%;
    position: absolute;
    bottom:14px
  }
  .vux-slider{height:227px!important}
  .dotsbottom{top:170px!important;z-index:1000}
  .container {
    background-color:#81D8D0;
    width:100%;
    padding-left: 11px;
    padding-right: 11px;
    padding-top: 29px;
    padding-bottom: 83px;
  }
  .contain-activity {
    display: flex;
    justify-content: space-around;
  }
  .contain-activity img {
    width: 170px;
    height: 89px
  }
  .local-life {
    margin-top: 41px;
    clear: both;
    overflow: hidden
  }
  .local-life-text {
    color: #333333;
    font-size: 16px;
    font-weight: 600;
    float: left;
  }
  .local-life-more {
    color: #ffffff;
    font-size: 12px;
    float: right;
  }
  .local-life-body{
    margin-top:14px
  }
  .local-life-menu{width:100%;display: flex;align-content: center;margin-bottom: 24px}
  .local-lift-item{
    flex:1;
    width:116px;
    height:74px;
    font-size: 14px;
    color:#333;
    display: inline-block;
  }
  .local-lift-item1{background: url('../../static/img/icon/block1@2x.png') center no-repeat;background-size: 116px 74px;}
  .local-lift-item2{background: url('../../static/img/icon/block1@2x(1).png') center no-repeat;background-size: 116px 74px;}
  .local-lift-item3{background: url('../../static/img/icon/block1@2x(2).png') center no-repeat;background-size: 116px 74px;}
  .local-lift-item4{background: url('../../static/img/icon/block1@2x(3).png') center no-repeat;background-size: 116px 74px;}
  .local-lift-item5{background: url('../../static/img/icon/block1@2x(4).png') center no-repeat;background-size: 116px 74px;}
  .local-lift-item6{background: url('../../static/img/icon/block1@2x(5).png') center no-repeat;background-size: 116px 74px;}

  .getmore{height:200px;overflow-x: scroll;overflow-y: hidden;display: flex;margin-top: 16px;}
  .getmore .moreitem{height:200px;width:130px;margin-right:20px;display: inline-block;flex:1}
  .getmore .moreitem .image{width:130px;height:160px;border-radius: 10px;background-color: #fff;}
  .getmore .moreitem .image img{width:130px;height:160px;border-radius: 10px;}
  .getmore .moreitem p{
    width:120px;
    white-space: nowrap;
    font-size: 15px;
    color:#666;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 17px;
  }

  .placeholder{height:70px}
</style>
