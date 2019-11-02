<template>
  <div style="height:100%;">
    <tabbarComponent :tabIndex=3></tabbarComponent>
    <home-provider></home-provider>
    <div>
      <confirm
        v-model="show"
        title="有验证码才可查看哦"
        confirm-text="确定"
        cancel-text="返回"
        @on-cancel="onCancel"
        @on-confirm="onConfirm"
        :show-input="true"
        :placeholder="'请输入验证码'"
        :content="'有验证码才可查看哦'"
        :close-on-confirm="false"
        @on-blur="fixScroll"
      >
      </confirm>
    </div>
    <div class="main" style="background-color:#fff;padding-top:19px">
      <Flexbox>
        <FlexboxItem class="header_btn" v-for="(item,index) of cateTree" :key="index"><div @click="$router.push({path:'/schools/cause',query:{pid:item.cid}})"><p>{{item.cate_name}}</p></div></FlexboxItem>
        <FlexboxItem class="header_btn"><div @click="$router.push({path:'/tour'})"><p>套餐查询</p></div></FlexboxItem>
      </Flexbox>
      <div class="searchbar">
        <input type="search" placeholder="搜索文章关键词" v-model="value" @search="search" @click="search"/>
        <img src="../../static/img/icon_search@2x.png" style="position: absolute;right:30px;top:24px" alt="">

        <tab default-color="#333333" :active-color="'#06D5DE'" custom-bar-width="32px">
          <tab-item @on-item-click="handler" selected>最新</tab-item>
          <tab-item @on-item-click="handler">最热</tab-item>
          <tab-item @on-item-click="handler">推荐</tab-item>
        </tab>
      </div>
      <scroller v-if="articleList" height="-225" lock-x @on-pullup-loading="onScrollBottom" :use-pullup="true" style="marginTop:20px;">
      <div class="menu">
        <div class="detail" @click="item.is_code!=1?goToArticleDetail({article_id:item.article_id}):confirmToArticleDetail({article_id:item.article_id,cid:item.cid})" v-for="(item,index) of articleList" :key="index">
          <div class="image"><img :src="item.cover" alt=""></div>
          <div class="body">
            <div class="title">{{item.title}}</div>
            <div class="more">{{item.cate_name}}</div>
            <div class="clock">
              <img src="../../static/img/icon_time@2x.png" alt="">
            </div>
            <div class="time">{{item.create_time}}</div>
          </div>
        </div>
      </div>
      </scroller>
    </div>
  </div>
</template>

<script>
import TabbarComponent from "@/components/TabbarComponent.vue";
import { mapGetters, mapActions } from "vuex";
import wx from 'weixin-js-sdk'
import {listPullLoading} from 'list-pull-loading'
import "list-pull-loading/dist/list-pull-loading.css"
import { Tab, TabItem, Flexbox, FlexboxItem, Search, Scroller,Confirm  } from 'vux'
export default {
  components: {
    TabbarComponent,
    Tab,
    TabItem,
    Flexbox,
    FlexboxItem,
    Search,
    Scroller,
    Confirm,
  },
  name: "HomePage",
  data() {
    return {
      cateTree:[],
      articleList:[],
      page:1,
      pageSize:100,
      totalPage: 0,
      pid:'',
      cid:'',
      article_id:'',
      btn:0,
      show:false,
      loadDataDone: false, //页面加载器
      onFetching: false, // 请求控制
      code_name:'',
      value:''
      // show: false,
      // maskShow: false,
    };
  },
  methods: {
      ...mapActions(['wxShare']),
      click(){
      console.log(111)
    },
    fixScroll() {
      window.scrollTo(0, 0);
    },
    search(){
      this.$router.push(`/tours/search?type=1`)
    },
    handler(val){
      this.btn=val
      this.page=1;
      this.getotherArticleList()
    },
    getSchoolList(){
      this.$http.get(`${this.rootPath}/Index/getArticleTree`).then(res=>{
        console.log(res)
        if(res.data.StatusInfo.success){
          this.cateTree=res.data.cateTree
        }
      })
    },
    getotherArticleList(){
      this.$http.get(`${this.rootPath}/Index/getArticle?page=${this.page}&pageSize=${this.pageSize}&order_sort=${this.btn}`).then(res=>{
        console.log(res)
        if(res.data.StatusInfo.success){
          // Object.assign(this.articleList,res.data.articleList)
          this.articleList=res.data.articleList
          this.totalPage=res.data.PageInfo.TotalPages
        }
        this.loadDataDone = true; // 请求成功 控制空数据显示
        this.onFetching = false; // 防止重复请求
      })
    },
    getSchoolArticleList(){
      this.$http.get(`${this.rootPath}/Index/getArticle?page=${this.page}&pageSize=${this.pageSize}&order_sort=${this.btn}`).then(res=>{
        console.log(res)
        if(res.data.StatusInfo.success){
          // Object.assign(this.articleList,res.data.articleList)
          this.articleList=this.articleList.concat(res.data.articleList)
            this.$nextTick(() => {
                this.$refs.scrollerBottom.reset()
            })
          this.totalPage=res.data.PageInfo.TotalPages
        }
        this.loadDataDone = true; // 请求成功 控制空数据显示
        this.onFetching = false; // 防止重复请求
      })
    },
    goToArticleDetail(val){
      this.$router.push({path:'/schools/detail',query:{article_id:val.article_id}})
    },
    confirmToArticleDetail(val){
      this.show=true
      this.cid=val.cid
      this.article_id=val.article_id
      // this.$router.push({path:'/schools/detail',query:{article_id:item.article_id,code_name:item.article_id}})
    },
    onScrollBottom () {
      // console.log(123)
      if (this.onFetching) return;
      this.onFetching = true;
      this.page += 1;
      if (this.page > this.totalPage) return;
      this.getSchoolArticleList();
    },
    confirmcode(){
      this.$http.get(`${this.rootPath}/Index/checkArticleCode?code_name=${this.code_name}&cid=${this.cid}`).then(res=>{
        console.log(res)
        if(res.data.StatusInfo.success){
          this.$router.push({path:'/schools/detail',query:{article_id:this.article_id,code_name:this.code_name}})
        }else{
          this.$vux.toast.text(`${res.data.StatusInfo.ErrorDetailCode}`, 'top')
        }
      })
    },
    onCancel(){
      this.cid=''
      this.article_id=''
    },
    // 输入验证码后确认
    onConfirm(val) {
      console.log(val)
      if(val){
        this.code_name=val
        this.confirmcode()
      }else{
        this.$vux.toast.text('请填写验证码', 'top')
      }
      // this.$router.push({path:'/schools/detail',query:{article_id:item.article_id,code_name:val}})
      // this.$router.push('/owners/getvip')
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

  },
  beforeDestroy() {

  },
  created() {
    this.getSchoolList()
    this.getSchoolArticleList()
      this.share()
  },
  mounted() {
    this.$bus.emit("onTabBarEvent", {});
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{padding:0;margin:0;touch-action: none;}
.main{position: relative;background-color: #F8F8F8}
.header_btn{display:flex}
.header_btn div{flex:1}
.header_btn:first-child div{width:52px;height:87px;background:#FFF url('../../static/img/icon/ic_rmwz@2x.png') top no-repeat;background-size: 52px 52px;text-align: center;color:#fff;padding-top: 56px;font-size: 12px;color:#303030;}
.header_btn:nth-child(2) div{width:52px;height:87px;background:#FFF url('../../static/img/icon/ic_ysd@2x.png') top no-repeat;background-size: 52px 52px;text-align: center;color:#fff;padding-top: 56px;font-size: 12px;color:#303030}
.header_btn:last-child div{width:52px;height:87px;background:#FFF url('../../static/img/icon/ic_tccx@2x.png') top no-repeat;background-size: 52px 52px;text-align: center;color:#fff;padding-top: 56px;font-size: 12px;color:#303030}
.searchbar{height:114px;width:100%;background-color: #fff;position: relative;padding-top: 82px}
.searchbar input{position: absolute;top:12px;display: inline-block;width:92%;height: 55px;border-radius: 30px;background-color: #F3F3F3;text-align:center;margin-left:4%;display: inline-block}
.menu{width:100%;padding-top:23px;background-color: #F8F8F8;padding-bottom: 70px}
.detail{min-height:257px;width: 95%;margin-left:2.5%;border-radius: 20px;background-color: #fff;margin-top:10px;overflow: hidden}
.detail .image{background-color: aqua;width:100%;height:177px;border-radius: 20px 20px 0 0 }
.detail .image img{width:100%;height:100%}
.detail .body{background-color: #fff;position: relative;border-radius:0 0 20px 20px }
.detail .body .title{max-width: 88%;color: #323643;font-size: 16px;margin-left:6%;margin-top:12px;font-weight: 600}
.detail .body .more{color:#666666;font-size: 13px;margin-left:6%;margin-top:10px;padding-bottom: 15px}
.detail .body .clock{width:12px;height: 12px;position: absolute;right:22%;bottom:16px}
.detail .body .clock img{width:12px;height: 12px}
.detail .body .time{position: absolute;bottom:15px;right: 6%;color:#999999;font-size: 12px}
</style>
