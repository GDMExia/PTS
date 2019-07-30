<template>
  <div style="height:100%;">
    <home-provider></home-provider>
    <div class="main">
      <Flexbox style="marginTop:12px">
        <FlexboxItem class="header_btn">公司介绍</FlexboxItem>
        <FlexboxItem class="header_btn">新闻咨询</FlexboxItem>
        <FlexboxItem class="header_btn">事业介绍</FlexboxItem>
      </Flexbox>
      <Flexbox>
        <FlexboxItem class="header_btn">视频介绍</FlexboxItem>
        <FlexboxItem class="header_btn">会员分享</FlexboxItem>
        <FlexboxItem class="header_btn">成功榜样</FlexboxItem>
      </Flexbox>
      <div class="menu">
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
import { Tab, TabItem, Flexbox, FlexboxItem, Search } from 'vux'
export default {
  components: {
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
