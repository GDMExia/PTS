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
      >
      </confirm>
    </div>
    <div class="main">
      <Flexbox style="marginTop:12px">
        <FlexboxItem class="header_btn" v-for="(item,index) of cateTree" :key="index"><p @click="$router.push({path:'/schools/cause',query:{pid:item.cid}})">{{item.cate_name}}</p></FlexboxItem>
      </Flexbox>
      <div class="searchbar">
        <input type="search" placeholder="搜索文章关键词" v-model="value" @search="search"/>
        <tab default-color="#333333" :active-color="'#06D5DE'" custom-bar-width="32px">
          <tab-item @on-item-click="handler" selected>最新</tab-item>
          <tab-item @on-item-click="handler">最热</tab-item>
          <tab-item @on-item-click="handler">推荐</tab-item>
        </tab>
      </div>
      <scroller v-if="articleList" height="-225" lock-x @on-scroll-bottom="onScrollBottom" :use-pullup="true" style="marginTop:20px;">
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
      pageSize:10,
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
    click(){
      console.log(111)
    },
    search(){
      this.$router.push(`/tours/search?type=1&search=${this.value}`)
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
.header_btn{width:105px;height:50px;background:#F8F8F8 url('../../static/img/icon/xueyuan_btn_small@2x.png')center no-repeat;background-size: 105px 50px;text-align: center;color:#fff;padding-top: 10px;font-size: 15px}
.searchbar{height:91px;width:100%;background-color: #fff;position: relative;padding-top: 59px}
.searchbar input{position: absolute;top:12px;display: inline-block;width:92%;height: 32px;border-radius: 20px;background-color: #F3F3F3;text-align:center;margin-left:4%;}
.menu{width:100%;padding-top:23px;background-color: #F8F8F8;padding-bottom: 70px}
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
