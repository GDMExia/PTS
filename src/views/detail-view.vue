<template>
  <div style="height:100%;">
    <home-provider></home-provider>
    <div class="main">
        <div class="title">
            <div class="name">马来西亚、吉隆坡城市遗址、洞穴与缆车马来西亚吉隆坡</div>
            <div class="publisher">
                <div class="image"><img src="../../static/img/icon/icon_wode_s@2x.png" alt=""></div>
                <div class="publishername">发布者：PTS俱乐部</div>
            </div>
            <div class="origin">
              <p class="originfrom">分享来自</p>
              <img src="" alt="">
              <p class="originname">我的名字叫雪梨</p>
            </div>
        </div>
        <div class="video">
          <div></div>
        </div>
        <div class="menu">
          <div class="content">
          人们不再醉心于一般的社交活动，而品酒作为一项高雅而奢华的社交活动，便悄然兴起于城市的角落。有些些社会上层人士，即使并不太懂洋酒，但是作为身份和品位的象征，也越来越多地参与到这一活动中来，流连于各式各样的品酒会之间，因此说品酒活动在中国承担着越来越重要的社交功能。 红酒品鉴这个听起来又酷又高雅的词，是否专属于富人呢？工薪阶层是否也可以搭上品鉴、收藏葡萄酒的时尚快车？ 在如今的社会，没有什么是不可能的。
          </div>
        </div>
        <div class="otherlink">
          <p class="title">相关文章</p>
          <div class="linklist">
            <div class="link">
              <div class="image">
                <img src="" alt="">
              </div>
              <div class="linkname">品酒会活动策划方案</div>
            </div>
            <div class="link">
              <div class="image">
                <img src="" alt="">
              </div>
              <div class="linkname">品酒会活动策划方案</div>
            </div>
          </div>
        </div>
        <div class="homebutton"  @click="$router.push('/school')">
          <img src="../../static/img/icon/ic_btn_home@2x.png" alt="">
        </div>
    </div>
  </div>
</template>

<script>
import {  } from 'vux'
export default {
  components: {

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
.main{position: relative;background-color: #F9F9F9}
.title{width:100%;height:117px;background-color: #fff;padding-top: 11px;box-sizing: border-box}
.title .name{font-size: 16px;color:#222222;width:92%;margin-left:4%;}
.title .publisher{margin-left:4%;margin-top:12px;height: 17px;position: relative;}
.title .publisher .image{width:12px;height:12px;display: inline-block;position: absolute;top:3px}
.title .publisher .image img {width:12px;height:12px}
.title .publisher .publishername{font-size:12px;color:#666666;display: inline-block;position: absolute;left:5%}
.title .origin{border: 1px solid #06D5DE;color:#06D5DE;border-radius: 20px 0 0 20px;height:28px;line-height: 28px;position: absolute;right: 0;top:59px;font-size: 10px;}
.title .origin img{background-color: #06D5DE;border-radius: 50%;width:20px;height:20px;display: inline-block;margin-top:4px}
.title .origin p{display: inline-block}
.title .origin .originfrom{width: 70px;text-align: center;vertical-align: top;font-size: 10px;}
.title .origin .originname{padding-right: 10px;vertical-align: top;font-size: 10px;}

.video{width: 100%;}
.video div{width: 100%;background-color: #06D5DE;height:211px;margin-top: 10px}

.homebutton{width:44px;height:44px;position: fixed;right:6.4%;bottom:128px}
.homebutton img{width:44px;height:44px;}

.menu{width:100%;margin-top:10px;background-color: #fff;padding-top:23px;padding-bottom: 17px}
.menu .content{width:89%;margin-left: 5.5%;font-size: 15px;color:#494949}

.otherlink{width:100%;background-color:#F9F9F9;margin-top:19px;}
.otherlink .title{font-size: 16px;color:#222222;font-weight: bold;width:64px;height:22px;line-height: 22px;margin-left:5%;background-color:#F9F9F9;display: inline-block}
.otherlink .linklist{margin-top:12px;width:95%;margin-left: 2.5%}
.otherlink .linklist .link{background-color: #fff;border-radius: 10px;}
.otherlink .linklist .link div{display: inline-block}
.otherlink .linklist .link .image{width:90px;height: 90px;margin-left: 10px;margin-top:15px;background-color: #06D5DE;border-radius: 10px }
.otherlink .linklist .link .image img{width:90px;height: 90px;}
.otherlink .linklist .link .linkname{color:#323643;font-size: 16px;vertical-align: top;margin-top:49px;height:22px;line-height: 22px}
</style>
