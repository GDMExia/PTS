<template>
  <div class="main">
    <h2 class="title">
      {{article.title}}
    </h2>
    <div class="content-detail" v-html="article.content">

    </div>
    <div class="fixed-image" @click="$router.push('/home')"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import wx from 'weixin-js-sdk'
export default {
  components: {
  },
  computed: {
    // ...mapGetters([])
  },
  name: "HomePage",
  data() {
    return {
      id: 0,
      article: {}
    };
  },
  methods: {
    ...mapActions(['articleDetail', 'wxShare']),
    handleDetail() {
      const params = {
        news_id: this.$route.query.id
      }
      this.articleDetail(params).then(res=>{
        if(res.StatusInfo.success) {
          this.article = res.goodsInfo
        } else {
          this.toastShow(res.StatusInfo.ErrorDetailCode)
        }
      })
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
      this.share()
  },
  mounted() {
    this.id = this.$route.query.id
    this.handleDetail()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  height: 100%;
  position: relative;
  background: #ffffff;
  padding: 0 20px;
}
.title {
  color: #222222;
  font-size: 20px;
  padding-top: 11px;
}
.fixed-image {
    width: 54px;
    height: 54px;
    position: fixed;
    background: url(../../static/img/icon/ic_btn_home@2x.png) no-repeat;
    background-size: 54px 54px;
    right: 19px;
    bottom: 94px;
}
.content-detail {
  width: 100%%;
  margin-top: 13px;
}
.content-detail img {
  width: 100%;
}
</style>
