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
    ...mapActions(['articleDetail']),
    handleDetail() {
      const params = {
        news_id: this.id
      }
      this.articleDetail(params).then(res=>{
        if(res.StatusInfo.success) {
          this.article = res.goodsInfo
        } else {
          this.toastShow(res.StatusInfo.ErrorDetailCode)
        }
      })
    }
  },
  computed: {
    
  },
  beforeDestroy() {
    
  },
  created() {
    
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
