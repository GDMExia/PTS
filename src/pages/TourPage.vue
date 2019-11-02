<template>
  <div style="height:100%;">
    <div class="tour-search">
        <x-input placeholder="输入目的地/关键词" placeholder-align="left" v-model="value" @on-enter="handleSearch" @on-focus="handleSearch"></x-input>
      <img src="../../static/img/icon_search@2x.png" alt="">
      <!-- <input type="search" v-model="value" placeholder="输入目的地/关键词"> -->
    </div>
      <div style=" height: 100%">
        <div style="display: flex;padding: 55% 0;justify-content: center;align-items: center;flex-direction:column;font-size: 16px;color: #ccc;" v-if="activityList.length==0">
            <img style="width: 40px; height: 40px;margin-bottom: 16px;" src="../../static/img/icon/no_data.png"/>
            <span> 暂无数据 </span>
        </div>
        <scroller v-if="activityList.length" height="-87" :bounce="false" :scrollbar-y="true" :use-pullup="true"  lock-x @on-pullup-loading="onScrollBottom" ref="scrollerBottom" @on-scroll="handleSC">
          <div class="ofy_auto flx_1" style="margin-top: -15px;">
            <div class="container" @click="handleDetail(item.tourism_id)" v-for="(item, index) in activityList" :key="index">
              <img class="activity-img" :src="item.pic" alt="">
              <div class="activity-title">
                <div class="name-price">
                  <span class="title-text">{{item.goods_name}}</span>
                  <div style="text-align: right;">
                    <p class="price">{{item.goods_price}}</p>
                    <p class="num">抵{{item.discount_point}}积分</p>
                  </div>
                </div>
                <p class="time">
                  <img src="../../static/img/icon_time@2x.png" alt="">
                  {{item.start_time}}～{{item.end_time}}
                </p>
              </div>
            </div>
          </div>
          <!-- <load-more v-show="pageNum > totalPage" :show-loading="false" :tip="'暂无数据'" background-color="#fbf9fe"></load-more> -->
        </scroller>
      </div>

      <div>
        <div v-show="maskShow" class="modal_confirm_mask"></div>
        <confirm v-model="show"
          title="提醒"
          confirm-text="升级VIP"
          cancel-text="返回"
          @on-cancel="onCancel"
          @on-confirm="onConfirm">
            <p style="text-align:left;">
<!--              开通VIP后转发文章可带自己的名片信息-->
<!--              可浏览更多旅游资讯-->
<!--              现在升级VIP，特惠价{{VIPprice}}元/年-->
              开通VIP后转发文章可带自己的名片信息
              并可浏览更多旅游资讯
              现在成为终身会员 只需{{VIPprice}}元
              还可得到400消费积分（1积分=1元）
            </p>
          </confirm>
      </div>
    <loading :show="show1" :text="text1"></loading>
    <tabbarComponent :tabIndex=1></tabbarComponent>
    <home-provider></home-provider>

  </div>
</template>

<script>
import moment from 'moment'
import {listPullLoading} from 'list-pull-loading'
import "list-pull-loading/dist/list-pull-loading.css"
import TabbarComponent from "@/components/TabbarComponent.vue";
import {mapActions,mapGetters} from 'vuex'
import wx from 'weixin-js-sdk'
import { XInput, Scroller,LoadMore,Confirm,Loading } from 'vux'
export default {
  components: {
    TabbarComponent,
    XInput,
    listPullLoading,
    Scroller,
    LoadMore,
    Confirm,
    Loading
  },
  name: "HomePage",
  data() {
    return {
      results: [],
      list: [
        {id: 1, img:'http://iph.href.lu/355x177', title: '马来西亚、吉隆坡城市遗址、 洞穴与缆车马来西亚', created: '2019/07/24'},
        {id: 2, img:'http://iph.href.lu/355x177', title: '马来西亚、吉隆坡城市遗址、 洞穴与缆车马来西亚', created: '2019/07/24'},
        {id: 3, img:'http://iph.href.lu/355x177', title: '马来西亚、吉隆坡城市遗址、 洞穴与缆车马来西亚', created: '2019/07/24'},
      ],
      value: '',
      pageNum: 1,
      totalPage: 0,
      onFetching: false, // 请求控制
      loadDataDone: false, //页面加载器
      show: false,
      maskShow: false,
      activityList: [],
      userInfo: {},
      VIPprice: 0,
      text1: 'Loading',
      show1: false
    };
  },
  methods: {
    ...mapActions(['tourList', 'userDetail', 'getVIP', 'wxShare']),
      handleSC(position){console.log(position)},
    handleTourList() {
        this.show1=true
      const params = {
        page: this.pageNum,
        pageSize: 10000,
        token: this.$store.state.token,
        keywords: this.value
      }
      this.tourList(params).then(res=>{
        if(res.StatusInfo.success) {
          this.activityList=this.activityList?(res.newsList?this.activityList.concat(res.newsList):this.activityList):(res.newsList?this.activityList.concat(res.newsList):[])
            this.$nextTick(() => {
                this.$refs.scrollerBottom.reset()
            })
          // this.activityList = res.newsList?this.activityList.push(res.newsList):this.activityList
          this.totalPage = res.PageInfo.TotalPages
            this.show1=false
        } else {
          if(res.StatusInfo.ReturnCode==603){
            this.$store.commit('setToken','')
            this.$router.go(0)
          }else{
            this.toastShow(res.StatusInfo.ErrorDetailCode)
            this.show1=false
          }
        }
        this.loadDataDone = true; // 请求成功 控制空数据显示
        this.onFetching = false; // 防止重复请求
      })
    },
    handleDetail(id) {
      if(this.userInfo.is_member == 0 || this.userInfo.over_time < moment().format("YYYY-MM-DD")) {
        this.show = true
      } else {
        this.$router.push(`/tours/tourDetail?id=${id}`)
      }
    },
    onScrollBottom () {
      if (this.onFetching) return;
      this.onFetching = true;
      this.pageNum += 1;
      if (this.pageNum > this.totalPage) return;
      this.handleTourList();
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
    handleSearch() {
      // this.$bus.emit('searchParams', {type: 0, search: this.value})
      this.$router.push(`/tours/search?type=0&search=${this.value}`)
    },
      // 分享
      share() {
          let params = {
              token: this.$store.state.token,
              article_cid: '',
              article_id: '',
              share_url: encodeURIComponent(location.href),
              // share_url: encodeURIComponent(`http://pts.suoqoo.com/nh5/#/activities/activityDetail?id=${this.$route.query.id}`),
              // share_hash_url: `/activities/activityDetail?id=${this.$route.query.id}`,
              is_article: 0
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
    ...mapGetters(['getToken'])
  },
  beforeDestroy() {

  },
  created() {
    this.handleTourList()
    this.handleVIP()
    this.handleUser()
      this.share()
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.$refs.scrollerBottom.reset({top: 0})
    // })
    this.$bus.emit("onTabBarEvent", {});
    window.scrollTo(0,0)

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tour-search {
  max-width: 89%;
  height: 55px;
  margin: 5.5% 15px 17px 25px;
  position: relative;
  display: flex;
  background: #fff;
  border-radius: 28px;
  padding: 0px 20px;
  box-shadow: 0 5px 10px rgba(0,0,0,0.05);
  -ms-touch-action: none;
  touch-action: none;
}
.tour-search img {
  width: 16px;
  height: 16px;
  margin-top: 20px;
  margin-right: 10px;
  touch-action: none;
}
.container {
  margin: 4% 10px;
  height: 272px;
  border-radius: 15px;
}
.activity-img {
  width: 100%;
  height: 177px;
  border-radius: 15px 15px 0 0;
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
}
.title-text {
  color: #323643;
  font-size: 16px;
  font-weight: 600;
  width: 72%;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.time {
  color: #666666;
  font-size: 12px;
}
p img {
  width: 12px;
  height: 12px;
  display: inline-block;
  vertical-align: middle;
}
</style>
