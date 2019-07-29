<template>
  <div style="height:100%;">
    <tabbarComponent :tabIndex=3></tabbarComponent>
    <home-provider></home-provider>
    <div class="main">
      <Flexbox style="marginTop:12px">
        <FlexboxItem class="header_btn" @click="click()"><p @click="$router.push('/schools/cause')">事业学习</p></FlexboxItem>
        <FlexboxItem class="header_btn" @click="$router.push('/schools/data')">资料分享</FlexboxItem>
        <FlexboxItem class="header_btn" @click="$router.push('/schools/hot')">热门文章</FlexboxItem>
      </Flexbox>
      <div class="searchbar">
        <input type="search" placeholder="搜索文章关键词"/>
        <tab default-color="#333333" :active-color="'#06D5DE'" custom-bar-width="32px">
          <tab-item @on-item-click="handler">最新</tab-item>
          <tab-item @on-item-click="handler">最热</tab-item>
          <tab-item @on-item-click="handler">推荐</tab-item>
        </tab>
      </div>
      <div class="menu">
        <div class="detail" @click="$router.push('/schools/detail')">
          <div class="image"><img src="" alt=""></div>
          <div class="body">
            <div class="title">5分钟读懂Dream Trip俱乐部的卖点和优势5 5分钟读懂Dream Trip俱乐部</div>
            <div class="more">所属二级分类名称</div>
            <div class="clock">
              <img src="../../static/img/icon_time@2x.png" alt="">
            </div>
            <div class="time">2019/05/10</div>
          </div>
        </div>
        <div class="detail">
          <div class="image"><img src="" alt=""></div>
          <div class="body">
            <div class="title">5分钟读懂Dream Trip俱乐部的卖点和优势5 5分钟读懂Dream Trip俱乐部</div>
            <div class="more">所属二级分类名称</div>
            <div class="clock">
              <img src="../../static/img/icon_time@2x.png" alt="">
            </div>
            <div class="time">2019/05/10</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TabbarComponent from "@/components/TabbarComponent.vue";
import { Tab, TabItem, Flexbox, FlexboxItem, Search } from 'vux'
export default {
  components: {
    TabbarComponent,
    Tab,
    TabItem,
    Flexbox,
    FlexboxItem,
    Search
  },
  name: "HomePage",
  data() {
    return {
      
    };
  },
  methods: {
    click(){
      console.log(111)
    },
    handler(){}
  },
  computed: {
    
  },
  beforeDestroy() {
    
  },
  created() {
    
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
.menu{width:100%;padding-top:23px;background-color: #F8F8F8;padding-bottom: 83px}
.detail{min-height:257px;width: 95%;margin-left:2.5%;border-radius: 20px;background-color: #fff;margin-top:10px}
.detail .image{background-color: aqua;width:100%;height:177px;border-radius: 20px 20px 0 0 }
.detail .body{background-color: #fff;position: relative;border-radius:0 0 20px 20px }
.detail .body .title{max-width: 88%;color: #323643;font-size: 16px;margin-left:6%;margin-top:12px}
.detail .body .more{color:#666666;font-size: 13px;margin-left:6%;margin-top:10px;padding-bottom: 15px}
.detail .body .clock{width:12px;height: 12px;position: absolute;right:26.5%;bottom:17px}
.detail .body .clock img{width:12px;height: 12px}
.detail .body .time{position: absolute;bottom:15px;right: 6%;color:#999999;font-size: 12px}
</style>
