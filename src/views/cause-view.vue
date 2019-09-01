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
      >
      </confirm>
    </div>
    <div class="main">
      <div style="marginTop:15px;overflow:hidden;overflow-x:scroll;height:40px">
        <div style="overflow-y:hidden;overflow-x:scroll;height:40px;position:relative;width:200%">
          <div class="header_btn" :class="cid==item.cid?'selected':''" style="float:left" v-for="(item,index) of cateTree" :key="index"><p @click="getmore(item.cid)">{{item.cate_name}}</p></div>
        </div>
      </div>
      <!-- <Flexbox>
        <FlexboxItem class="header_btn" v-for="(item,index) of cateTree" :key="index" v-if="index>2"><p @click="getmore(item.cid)">{{item.cate_name}}</p></FlexboxItem>
      </Flexbox> -->
      <scroller v-if="articleList" height="-80" lock-x @on-scroll-bottom="onScrollBottom" :use-pullup="true" style="marginTop:20px">
      <div class="menu" style="margin-bottom:30px">
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
import { Tab, TabItem, Flexbox, FlexboxItem, Search,Confirm,Scroller } from 'vux'
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
    };
  },
  methods: {
    getmore(val){
      // this.show=true
      this.cid=val
      this.page=1
      this.getSchoolArticleList()
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
      this.$router.push({path:'/schools/detail',query:{article_id:val.article_id}})
    },
    confirmToArticleDetail(val){
      this.show=true
      this.cid=val.cid
      this.article_id=val.article_id
      // this.$router.push({path:'/schools/detail',query:{article_id:item.article_id,code_name:item.article_id}})
    },
    confirmcode(){
      this.$http.get(`${this.rootPath}/Index/checkArticleCode?code_name=${this.code_name}&cid=${this.cid}`).then(res=>{
        console.log(res)
        if(res.data.StatusInfo.success){
          if(this.article_id!=''){
            this.$router.push({path:'/schools/detail',query:{article_id:this.article_id,code_name:this.code_name}})
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
  },
  computed: {
    
  },
  beforeDestroy() {
    
  },
  created() {
    this.getSchoolList()
    this.getSchoolArticleList()
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
.header_btn{display:inline-block;width:90px;height:40px;margin-left:8px;background-color:#fff;border-radius:30px;text-align: center;color:#06D5DE;padding-top: 10px;font-size: 15px;}
.selected{color:#fff;background-color: #06D5DE;}
.menu{width:100%;padding-top:15px;background-color: #F8F8F8;padding-bottom: 100px}
.detail{min-height:257px;width: 95%;margin-left:2.5%;border-radius: 20px;background-color: #fff;margin-top:10px}
.detail .image{background-color: aqua;width:100%;height:177px;border-radius: 20px 20px 0 0 }
.detail .image img{width:100%;height:100%}
.detail .body{background-color: #fff;position: relative;border-radius:0 0 20px 20px }
.detail .body .title{max-width: 88%;color: #323643;font-size: 16px;margin-left:6%;margin-top:12px}
.detail .body .more{color:#666666;font-size: 13px;margin-left:6%;margin-top:10px;padding-bottom: 15px}
.detail .body .clock{width:12px;height: 12px;position: absolute;right:26.5%;bottom:17px}
.detail .body .clock img{width:12px;height: 12px}
.detail .body .time{position: absolute;bottom:15px;right: 6%;color:#999999;font-size: 12px}
</style>
