<template>
  <div style="height:100%;">
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
        @on-blur="fixScroll"
      >
      </confirm>
    </div>
    <div class="main">
      <div style="marginTop:15px;overflow-x:scroll;height:50px;width:100%" class="top" @touchstart="touchstart" @touchend="touchend" @touchmove="touchmove" ref="top">
        <div style="height:40px;width:600px">
          <div class="header_btn" :class="cid==item.cid?'selected':''" v-for="(item,index) of cateTree" :key="index"><p @click="item.is_code!=1?getmore(item.cid):getcode(item.cid)">{{item.cate_name}}</p></div>
        </div>
      </div>
      <!-- <Flexbox>
        <FlexboxItem class="header_btn" v-for="(item,index) of cateTree" :key="index" v-if="index>2"><p @click="getmore(item.cid)">{{item.cate_name}}</p></FlexboxItem>
      </Flexbox> -->
<!--      <scroller v-if="articleList" height="-80" lock-x @on-scroll-bottom="onScrollBottom" :use-pullup="true" style="marginTop:20px">-->
<!--      <div class="menu" style="margin-bottom:30px">-->
<!--        <div class="detail" @click="item.is_code!=1?goToArticleDetail({article_id:item.article_id}):confirmToArticleDetail({article_id:item.article_id,cid:item.cid})" v-for="(item,index) of articleList" :key="index">-->
<!--          <div class="image"><img :src="item.cover" alt=""></div>-->
<!--          <div class="body">-->
<!--            <div class="title">{{item.title}}</div>-->
<!--            <div class="more">{{item.cate_name}}</div>-->
<!--            <div class="clock">-->
<!--              <img src="../../static/img/icon_time@2x.png" alt="">-->
<!--            </div>-->
<!--            <div class="time">{{item.create_time}}</div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--      </scroller>-->
      <div
        class="menu"
        :style="scrollBoxStyle"
        ref="scrollBox"
        @scroll="menuScroll"
      >
        <div
          class="scrollBoxMain"
          ref="scrollBoxMain"
        >
          <div
            class="detail"
            @click="item.is_code!=1?goToArticleDetail({article_id:item.article_id}):confirmToArticleDetail({article_id:item.article_id,cid:item.cid})"
            v-for="(item,index) of articleList"
            :key="index"
          >
            <div class="image">
              <img
                :src="item.cover"
                alt=""
              ></div>
            <div class="body">
              <div class="title">{{item.title}}{{winHeight}}</div>
              <div class="more">{{item.cate_name}}</div>
              <div class="clock">
                <img
                  src="../../static/img/icon_time@2x.png"
                  alt=""
                >
              </div>
              <div class="time">{{item.create_time}}</div>
            </div>
          </div>
          <div
            class="loading"
            v-show="loading"
          >
            <img
              src="../assets/loading.png"
              class="loading-icon"
              alt=""
            >
            <span>正在加载</span>
          </div>
          <div
            class="no-result"
            v-if="noData"
          >
            <div class="no-result-text">暂无更多</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Tab, TabItem, Flexbox, FlexboxItem, Search,Confirm,Scroller } from 'vux'
import { mapGetters, mapActions } from "vuex";
import wx from 'weixin-js-sdk'
import { listPullLoading } from "list-pull-loading";
import "list-pull-loading/dist/list-pull-loading.css";
export default {
  components: {
    Tab,
    TabItem,
    Flexbox,
    FlexboxItem,
    Search,
    Confirm,
    Scroller
  },
  name: "HomePage",
  data() {
    return {
        loading: false,
        noData: false,
        canLoad: true,
        winHeight: window.innerHeight,
      pid:this.$router.currentRoute.query.pid,
      cid:'',
      show:false,
      cateTree:[],
      articleList:[],
      page:1,
      pageSize:10,
      totalPage: 0,
      show:false,
      article_id:'',
      onFetching: false, // 请求控制
      start:0,
      end:0
    };
  },
  methods: {
      ...mapActions(['wxShare']),
      menuScroll() {
          //滚动到滚动区域底部
          if (
              this.$refs.scrollBox.scrollTop +
              (this.winHeight - 50) <
              this.$refs.scrollBoxMain.clientHeight
          )
              return;
          if (!this.canLoad) return;
          this.loading = true;
          this.canLoad = false;
          this.page++;
          this.getotherArticleList();
      },
      fixScroll() {
          window.scrollTo(0, 0);
      },
      getmore(val){
      // this.show=true
      this.cid=val
      this.page=1
      this.getSchoolArticleList()
    },
      getotherArticleList() {
          this.$http
              .get(
                  `${this.rootPath}/Index/getArticle?page=${this.page}&pageSize=${this.pageSize}&order_sort=${this.btn}`
              )
              .then(res => {
                  if (res.data.StatusInfo.success) {
                      // Object.assign(this.articleList,res.data.articleList)
                      //如果到了最后一页
                      if (this.page > res.data.PageInfo.TotalPages) {
                          this.noData = true;
                          this.loading = false;
                      } else {
                          this.articleList = [
                              ...this.articleList,
                              ...res.data.articleList
                          ];
                          this.totalPage = res.data.PageInfo.TotalPages;
                          this.canLoad = true;
                      }
                  }
                  this.loadDataDone = true; // 请求成功 控制空数据显示
                  this.onFetching = false; // 防止重复请求
              });
      },
    getcode(val){
        let code_name=localStorage.getItem('code_name')
        this.cid = val
        this.page=1
        if(code_name){
            this.code_name=code_name
            this.confirmcode()
        }else{
            this.show=true
        }
    },
    getSchoolList(){
      this.$http.get(`${this.rootPath}/Index/getArticleTree?pid=${this.pid}`).then(res=>{
        console.log(res)
        if(res.data.StatusInfo.success){
          this.cateTree=res.data.cateTree
        }
      })
    },
    onScrollBottom () {
      // console.log(123)
      if (this.onFetching) return;
      this.onFetching = true;
      this.page += 1;
      if (this.page > this.totalPage) return;
      this.getMoreSchoolArticleList();
    },
    getMoreSchoolArticleList(){
      this.$http.get(`${this.rootPath}/Index/getArticle?page=${this.page}&pageSize=${this.pageSize}&pid=${this.pid}&cid=${this.cid}`).then(res=>{
        console.log(res)
        if(res.data.StatusInfo.success){
          this.articleList=this.articleList.concat(res.data.articleList)
          this.totalPage=res.data.PageInfo.TotalPages
        }
      })
    },
    getSchoolArticleList(){
      this.$http.get(`${this.rootPath}/Index/getArticle?page=${this.page}&pageSize=${this.pageSize}&pid=${this.pid}&cid=${this.cid}`).then(res=>{
        console.log(res)
        if(res.data.StatusInfo.success){
          this.articleList=res.data.articleList
          this.totalPage=res.data.PageInfo.TotalPages
        }
      })
    },
    goToArticleDetail(val){
      this.$router.push({path:'/schools/detailCode',query:{article_id:val.article_id}})
    },
    confirmToArticleDetail(val){
        let code_name=localStorage.getItem('code_name')
        this.cid=val.cid
        this.article_id=val.article_id
        if(code_name){
            this.code_name=code_name
            this.confirmcode()
        }else{
            this.show=true
        }
      // this.$router.push({path:'/schools/detail',query:{article_id:item.article_id,code_name:item.article_id}})
    },
    confirmcode(){
      this.$http.get(`${this.rootPath}/Index/checkArticleCode?code_name=${this.code_name}&cid=${this.cid}`).then(res=>{
        console.log(res)
        if(res.data.StatusInfo.success){
          if(this.article_id!=''){
            this.$router.push({path:'/schools/detailCode',query:{article_id:this.article_id,code_name:this.code_name}})
          }else{
            this.getSchoolArticleList()
          }
          this.show=false
          // this.$router.push({path:'/schools/detail',query:{article_id:this.article_id,code_name:this.code_name}})
        }else{
          this.article_id=''
          this.cid=''
          this.$vux.toast.text(`${res.data.StatusInfo.ErrorDetailCode}`, 'top')
          this.show=false
        }
      })
    },
    touchstart(e){
      // console.log(e.changedTouches[0].pageX)
      this.start=e.changedTouches[0].pageX
    },
    touchmove(e){
      console.log(e.changedTouches[0].pageX-this.start)
      // console.log(this.$refs.top.scrollLeft)

      if(this.start>e.changedTouches[0].pageX){
      this.$refs.top.scrollTo(this.end+this.start-e.changedTouches[0].pageX,0)
      }else{
        // if(this.$refs.top.scrollLeft!=0){
          this.$refs.top.scrollTo(this.end-(e.changedTouches[0].pageX-this.start),0)
        // }
      }
    },
    touchend(e){
      this.end=this.start-e.changedTouches[0].pageX
      // console.log(e.changedTouches[0].pageX)
      // console.log(e)
      // console.log(e.changedTouches[0].pageX-this.start)
      // this.$el.scrollLeft=e.changedTouches[0].pageY-this.start
      // this.$refs.top.scrollTo(this.start-e.changedTouches[0].pageX,0)
    },
    onCancel(){
      this.cid=''
      this.article_id=''
      this.show=false
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
      scrollBoxStyle() {
          return {
              height: this.winHeight - 50 + "px"
          };
      }
  },
  beforeDestroy() {

  },
  created() {
    this.getSchoolList()
    this.getSchoolArticleList()
      this.share()
      this.$wechat.hideOptionMenu()

  },
  mounted() {
    this.$bus.emit("onTabBarEvent", {});
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/**{padding:0;margin:0;touch-action: none;}*/
.main{position: relative;background-color: #F8F8F8}
.header_btn{display:inline-block;width:90px;height:40px;margin-left:8px;background-color:#fff;border-radius:30px;text-align: center;color:#06D5DE;padding-top: 10px;font-size: 15px;}
.selected{color:#fff;background-color: #06D5DE;}
.menu{width:100%;padding-top:15px;background-color: #F8F8F8;overflow-y: auto;}
.detail{min-height:257px;width: 95%;margin-left:2.5%;border-radius: 20px;background-color: #fff;margin-top:10px;overflow: hidden}
.detail .image{background-color: aqua;width:100%;height:177px;border-radius: 20px 20px 0 0 }
.detail .image img{width:100%;height:100%}
.detail .body{background-color: #fff;position: relative;border-radius:0 0 20px 20px }
.detail .body .title{max-width: 88%;color: #323643;font-size: 16px;margin-left:6%;margin-top:12px;font-weight: 600}
.detail .body .more{color:#666666;font-size: 13px;margin-left:6%;margin-top:10px;padding-bottom: 15px}
.detail .body .clock{width:12px;height: 12px;position: absolute;right:22%;bottom:16px}
.detail .body .clock img{width:12px;height: 12px}
.detail .body .time{position: absolute;bottom:15px;right: 6%;color:#999999;font-size: 12px}
.no-result,
.loading {
  text-align: center;
  padding: 15px 0;
  font-size: 13px;
  color: #999;
}

.no-result .no-result-text {
  color: #666;
}

.no-result img {
  width: 140px;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading img {
  animation: rotate linear 2s infinite;
  width: 16px;
  height: 16px;
}

.loading span {
  padding-left: 5px;
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
