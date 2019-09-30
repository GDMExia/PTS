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
          <p class="price">{{tourItem.goods_price}}</p>
          <p class="num">最高可抵扣{{tourItem.discount_point}}积分</p>
        </div>
      </div>
    </div>
    <div v-if="changeShow" class="tour-vip" @click="handlechangeUser">
      <img src="../../static/img/btn_qh@2x.png" alt="">
    </div>
    <div class="tour-share f10" v-if="userBindInfo">
      <span>分享来自</span>
      <img :src="userBindInfo.header_pic" alt="">
      <span>我的名字叫{{userBindInfo.nickname}}</span>
    </div>
    <div class="tour-content" v-html="tourItem.content">
      <!-- <img src="../../static/img/img@2x.png" alt=""> -->
    </div>
    <div v-show="storeList.length > 0" class="local-life name-price" @click="$router.push('/tour')">
      <span class="local-life-text">相关套餐</span>
      <span class="local-life-more">MORE</span>
    </div>
    <div v-for="item in storeList" :key="item.tourism_id" @click="backTop(item.tourism_id)" class="store">
      <!-- <div class="store-img" :style="{backgroundImage: 'url(' + item.pic + ')'}"> -->
        <img class="store-activity-img" :src="item.pic" alt="">
      <!-- <div class="store-img">
        <img :src="item.pic" alt="">
      </div> -->
      <div class="store-right f16">
        {{item.goods_name}}
      </div>
    </div>
    <!-- <div class="bottom" v-if="userBindInfo">
      <div class="button submit f15" >在线咨询</div>
    </div> -->
   <div>
      <div v-show="maskShow" class="modal_confirm_mask"></div>
      <confirm v-model="show"
        title="提醒"
        confirm-text="升级VIP"
        cancel-text="返回"
        @on-cancel="onCancel"
        @on-confirm="onConfirm">
          <p style="text-align:left;">
            开通VIP后转发文章可带自己的名片信息
            可浏览更多旅游资讯
            现在升级VIP，特惠价{{VIPprice}}元/年
          </p>
        </confirm>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from 'moment'
import { Swiper,Confirm } from 'vux'
import wx from 'weixin-js-sdk'
export default {
  components: {
    Swiper,
    Confirm
  },
  name: "HomePage",
  data() {
    return {
      storeList: [],
      tourItem: {},
      picList: [],
      userBindInfo: null, // 分享者信息
      id: 0,
      changeShow: true,
      scrollTop: 0,
      show: false,
      maskShow: false,
      VIPprice: 0,
      userInfo: {}
    };
  },
  computed: {
    ...mapGetters(['getToken'])
  },
  methods: {
    ...mapActions(['tourDetails', 'changeUser','wxShare', 'userDetail', 'getVIP']),
    handleDetail() {
      let params = {
        // token: this.GetQueryString('token'),
        token: this.$store.state.token,
        tourism_id: this.$route.query.id,
        uid_number: this.GetQueryString('token')
      }
      if(location.href.includes('uid_number')) {
        params.uid_number = location.href.split('uid_number=')[1]
      }
      this.tourDetails(params).then(res=>{
        if(res.StatusInfo.success) {
          this.tourItem = res.tourismInfo
          this.picList = res.picList.map(item=>{
            item.img = item.file_path
            return item
          })
          this.storeList = res.newsCateTree
          this.userBindInfo = res.userBindInfo
        } else {
          if(res.StatusInfo.ReturnCode==603){
            this.$store.commit('setToken','')
            this.$router.go(0)
          }else{
            this.toastShow(res.StatusInfo.ErrorDetailCode)
          }
        }
      })
    },
    // 不是VIP点击取消
    onCancel() {
      this.maskShow = false
    },
    // 不是VIP点击升级VIP
    onConfirm() {
      this.$router.push('/owners/getvip')
    },
    // 查看会员预览
    handleVIP() {
      let params = {
        token: this.$store.state.token,
      }
      this.getVIP(params).then(res=>{
        if(res.StatusInfo.success) {
          this.VIPprice = res.vipPrice 
        } else {
          if(res.StatusInfo.ReturnCode==603){
            this.$store.commit('setToken','')
            this.$router.go(0)
          }else{
            this.toastShow(res.StatusInfo.ErrorDetailCode)
          }
        }
      })
    },
    // 查看是否是会员，如果是且未过期，则浏览数据，否则弹出升级VIP
    handleUser() {
      let params = {
        token: this.$store.state.token,
      }
      this.userDetail(params).then(res=>{
        if(res.StatusInfo.success) {
          this.userInfo = res.userInfo
          if(res.userInfo.is_member == 0 || res.userInfo.over_time < moment().format("YYYY-MM-DD")) {
            this.show = true
          } 
        } else {
          if(res.StatusInfo.ReturnCode==603){
            this.$store.commit('setToken','')
            this.$router.go(0)
          }else{
            this.toastShow(res.StatusInfo.ErrorDetailCode)
          }
        }
      })
    },
    handlechangeUser() {
      const params = {
        token: this.$store.state.token
      }
      this.changeUser(params).then(res=>{
        if(res.StatusInfo.success) {
          this.tourItem.create_name = res.userInfo.nickname
          this.changeShow = false
        } else {
          this.toastShow(res.StatusInfo.ErrorDetailCode)
        }
      })
    },
    // 点击图片回到顶部方法，加计时器是为了过渡顺滑
    backTop (id) {
      this.$router.push(`/tours/tourDetail?id=${id}`)
      this.handleDetail()
      const that = this
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
        if (that.scrollTop === 0) {
          clearInterval(timer)
        }
      }, 16)
    },
 
    // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
    scrollToTop () {
      const that = this
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      that.scrollTop = scrollTop
    },
    // 分享
    share() {
      let params = {
        token: this.$store.state.token,
        article_cid: 1,
        article_id: this.$route.query.id,
        share_url: encodeURIComponent(location.href),
        // share_url: encodeURIComponent(`http://pts.suoqoo.com/nh5/#/tours/tourDetail?id=${this.$route.query.id}`),
        // share_hash_url: `/tours/tourDetail?id=${this.$route.query.id}`,
        is_article: 1
      }
      this.wxShare(params).then(res=>{
        if (res.StatusInfo.success) {
          this.shareWx(res)
        }
      })
    },
    shareWx(data) {
      let that = this;
      let title = data.shareInfo.title;
      let links = data.shareInfo.link
      let imgUrl = data.shareInfo.img
      let desc = data.shareInfo.desc
      wx.config({
        debug: false,
        appId: data.signPackage.appid,
        timestamp: data.signPackage.timestamp,
        nonceStr: data.signPackage.noncestr,
        signature: data.signPackage.signature,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
      });
      wx.ready(function() {
        console.log(title, '23444')
        //分享到朋友圈
        wx.onMenuShareTimeline({
          title: title, // 分享标题
          link: links, // 分享链接
          imgUrl: imgUrl,
          success: function() {
            // 用户点击了分享后执行的回调函数
            console.log('分享到朋友圈成功')
          }
        });
        wx.onMenuShareAppMessage({
          title: title, // 分享标题
          desc: desc,
          link: links,
          imgUrl: imgUrl, // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function() {
            // 用户点击了分享后执行的回调函数
            console.log('分享到朋友成功')
          }
        });
      })
    }
  },
  beforeDestroy() {
    
  },
  created() {
    this.handleDetail()
    this.handleVIP()
    this.handleUser()
    this.share()
  },
  mounted() {
    this.id = this.$route.query.id
    window.addEventListener('scroll', this.scrollToTop)
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollToTop)
  },
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
  color: #454545;
  font-size: 12px;
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
  margin: 10px;
  border-radius: 5px;
  background-color: #ffffff;
  height: 90px;
  padding: 15px 10px;
  display: flex;
  box-shadow: 0 -2px 14px rgba(0,0,0,0.06)
}
.store-activity-img {
  width: 90px;
  height: 90px;
  border-radius: 11px;
}
.store-right {
  margin-left: 10px;
  align-items: center;
  display: flex;
}
.bottom {
  width: 100%;
  padding: 6px 4% 37px;
  background: #ffffff;
  margin-top: 20px;
}
.button {
  width: 100%;
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
</style>
