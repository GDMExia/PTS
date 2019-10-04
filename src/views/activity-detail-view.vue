<template>
  <div class="main">
    <img class="activity-img" :src="detail.cover" alt="">
    <div class="tour-detail">
      <p class="title-text">{{detail.goods_name}}</p>
      <div class="name-price">
        <div style="padding-top: 10px">
          <p class="time">
            <img src="../../static/img/icon_time@2x.png" alt="">
            活动日期：{{detail.join_time}}
          </p>
          <p class="time mt6" @click="handleStore" style="display: inline-block">
            <img src="../../static/img/icon_fabuzhe@2x.png" alt="">
            发布者：<p style="color:#06D5DE;display:inline-block;font-size: 12px">{{detail.create_name}}</p>
<!--            <img class="arrow" src="../../static/img/icon/ic_arrow03@2x.png" alt="">-->
          </p>
          <p class="time mt6" @click="handleStore" style="display: inline-block">
            <img src="../../static/img/address@2x.png" alt="">
            地址：<p style="display:inline-block;font-size: 12px">{{detail.address}}</p>
          <!--            <img class="arrow" src="../../static/img/icon/ic_arrow03@2x.png" alt="">-->
          </p>
        </div>
        <div style="text-align: right;">
          <p class="price">{{"¥"+detail.goods_price}}</p>
          <p class="num" style="display: inline-block">最高抵扣积分<p style="font-size: 14px;color:#FF6C00;display: inline-block;vertical-align: middle">{{detail.discount_price}}</p></p>
          <p style="color:#FF7612;font-size: 10px;background-color: #FFEFE3;text-align: center;border-radius: 2px;margin-top:6px">1积分=1人民币</p>
        </div>
      </div>
    </div>
    <img class="activity-type" v-if="detail.pid==2&&!userBindInfo" src="../../static/img/ic_guanfang@2x.png" alt="">
    <img class="activity-type" v-if="detail.pid==1&&!userBindInfo" src="../../static/img/ic_shangjia@2x.png" alt="">
    <div class="tour-share f10" v-if="userBindInfo">
      <span>分享来自</span>
      <img :src="userBindInfo.header_pic" alt="">
      <span>我的名字叫{{userBindInfo.nickname}}</span>
    </div>
    <div class="tour-content" v-html="detail.content">
      <!-- <img style="width: 100%" src="../../static/img/img@2x.png" alt=""> -->
    </div>
    <div v-show="storeList.length > 0" class="local-life name-price" @click="$router.push('/activity')">
      <span class="local-life-text">相关活动</span>
      <span class="local-life-more">MORE</span>
    </div>
    <div v-for="item in storeList" :key="item.goods_id"  @click="backTop(item.goods_id)" class="store" style="position: relative">
      <img class="store-img" :src="item.cover" alt="">
      <div class="store-right f16">
        {{item.goods_name}}
      </div>
      <p class="moretime">
        <img src="../../static/img/icon_time@2x.png" alt="">
        活动日期：{{item.registration_time}}
      </p>
    </div>
    <div class="bottom" v-if="!userBindInfo">
      <div class="button disabled f15" v-if="detail.registration_time < date || detail.goods_status==2">报名已结束</div>
      <div class="button disabled f15" v-else-if="detail.registration_number==detail.join_number">该活动已报满</div>
      <div class="button disabled f15" v-else-if="detail.pid==1&&userInfo.is_member==0">成为VIP即可报名</div>
      <div class="button submit f15" v-else @click="$router.push('/activities/signup')">立即报名</div>
    </div>
    <div class="fixed-image" @click="$router.push('/home')"></div>
    <div class="bottom" v-if="userBindInfo&&userInfo.is_member==0">
      <div class="button submit f15" >在线咨询</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from 'moment'
import wx from 'weixin-js-sdk'
export default {
  components: {
  },
  computed: {
    ...mapGetters(['getToken'])
  },
  name: "HomePage",
  data() {
    return {
      storeList: [],
      detail: {},
      id: 0,
      userInfo: {},
      userBindInfo: null,
      date: moment().format("YYYY-MM-DD")
    };
  },
  methods: {
    ...mapActions(['activityDetails','userDetail','wxShare']),
    handleDetail() {
      let params = {
        goods_id: this.$route.query.id
      }
      if(location.href.includes('uid_number')) {
        params.uid_number = location.href.split('uid_number=')[1]
      }
      this.activityDetails(params).then(res=>{
        if(res.StatusInfo.success) {
          this.detail = res.goodsInfo
          this.storeList = res.goodsCateTree
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
    handleStore(merchants_id) {
      if(this.detail.pid==1) {
        this.$router.push(`/homes/storeDetail?id=${this.detail.merchants_id}`)
      }
    },
    handleUser() {
      let params = {
        token: this.$store.state.token,
      }
      this.userDetail(params).then(res=>{
        if(res.StatusInfo.success) {
          this.userInfo = res.userInfo
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
    // 点击图片回到顶部方法，加计时器是为了过渡顺滑
    backTop (id) {
      this.$router.push(`/activities/activityDetail?id=${id}`)
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
        article_cid: 3,
        article_id: this.$route.query.id,
        share_url: encodeURIComponent(location.href),
        // share_url: encodeURIComponent(`http://pts.suoqoo.com/nh5/#/activities/activityDetail?id=${this.$route.query.id}`),
        // share_hash_url: `/activities/activityDetail?id=${this.$route.query.id}`,
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
  computed: {

  },
  beforeDestroy() {

  },
  created() {
    this.handleDetail()
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
  padding-bottom: 87px;
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
  min-height: 120px;
  border-radius: 5px;
  background: #ffffff;
  position: absolute;
  margin: 0 15px;
  top: 171px;
  padding: 14px 20px 12px 4%;
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
.moretime{
  color: #666666;
  font-size: 12px;
  position:absolute;
  bottom: 20px;
  left:110px
}
.mt12 {
  margin-top: 12px;
}
.mt6 {
  margin-top: 6px;
}
p img {
  width: 12px;
  height: 12px;
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 2px;
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
  margin-top: 136px;
  padding: 0 4%;
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
  position: fixed;
  bottom:0;
  width: 100%;
  padding: 6px 4% 37px;
  background: #ffffff;
  margin-top: 20px;
}
.bottom .button {
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
.disabled {
  text-align: center;
  background: #C5C5C5;
  color: #ffffff;
}
.fixed-image {
  width: 44px;
  height: 44px;
  position:fixed;
  background: url('../../static/img/icon/ic_btn_home@2x.png') no-repeat;
  background-size: 44px 44px;
  right: 26px;
  bottom: 172px;
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
</style>
