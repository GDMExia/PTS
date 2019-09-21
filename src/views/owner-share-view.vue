<template>
  <div class="main">
    <div style="display: flex;justify-content: center;align-items: center;flex-direction:column;font-size: 16px;color: #ccc;" v-if="activityListData.length==0">
      <img style="width: 40px; margin: 65% 0px; height: 40px;margin-bottom: 16px;" src="../../static/img/icon/no_data.png"/>
      <span> 暂无数据 </span>
    </div>
    <scroller style="height: 100%;" v-if="activityListData.length" lock-x @on-scroll-bottom="onScrollBottom" ref="scrollerBottomView">
      <div class="box" v-for="(item, index) in activityListData" :key="index">
        <img class="box-img" :src="item.img" alt="">
        <p class="f16 color-323 box-title">{{item.title}}</p>
        <div class="box-bottom">
          <span class="f10 color-98 scan-text">浏览量</span>
          <span class="f15 color-f9 num">{{item.look_num}}</span>
          <div class="f14 color-06d button view" @click="$router.push(`/owners/shareList?id=${item.article_id}`)">浏览用户</div>
          <div class="f14 color-06d button detail" @click="$router.push(item.linkUrl)">文章详情</div>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem,Scroller,LoadMore, } from 'vux'
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    Flexbox,
    FlexboxItem,
    Scroller,
    LoadMore
  },
  name: "HomePage",
  data() {
    return {
      type: 1,
      typeId: '',
      typeList: [],
      activityListData: [
        // {id: 1, img:'http://iph.href.lu/355x177', title: '马来西亚、吉隆坡城市遗址、 洞穴与缆车马来西亚', created: '2019/07/24',num: 2850},
        // {id: 2, img:'http://iph.href.lu/355x177', title: '马来西亚、吉隆坡城市遗址、 洞穴与缆车马来西亚', created: '2019/07/24',num: 2850},
        // {id: 3, img:'http://iph.href.lu/355x177', title: '马来西亚、吉隆坡城市遗址、 洞穴与缆车马来西亚', created: '2019/07/24',num: 2850},
      ],
      pageNum: 1,
      totalPage: 0,
      onFetching: false, // 请求控制
      loadDataDone: false, //页面加载器
    };
  },
  methods: {
    ...mapActions(['shareList']),
    handleQuery() {
      const params = {
        page: this.pageNum,
        pageSize: 5,
        token: this.$store.state.token
      }
      this.shareList(params).then(res=>{
        if(res.StatusInfo.success) {
          this.activityListData = res.articleList?this.activityListData.concat(res.articleList.map(item=>{
            item.linkUrl = item.article_cid ==1 ? `/tours/tourDetail?id=${item.article_id}`:
            item.article_cid == 2 ? `/schools/detail?article_id=${item.article_id}`:
            item.article_cid == 3 ? `/activities/activityDetail?id==${item.article_id}`:
            `/homes/shareDetail?id=${item.article_id}`
            return item
          })):[]
          this.totalPage = res.PageInfo.TotalPages
        } else {
          this.toastShow(res.StatusInfo.ErrorDetailCode)
        }
        this.loadDataDone = true; // 请求成功 控制空数据显示
        this.onFetching = false; // 防止重复请求 
      })
    },
    onScrollBottom () {
      if (this.onFetching) return;
      this.onFetching = true;
      this.pageNum += 1;
      if (this.pageNum > this.totalPage) return;
      this.handleQuery();
    },
  },
  computed: {
    
  },
  beforeDestroy() {
    
  },
  created() {
    this.handleQuery()
  },
  mounted() {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  height: 100%;
  position: relative;
}
.box {
  width: 94.7%;
  background: #ffffff;
  margin: 12px auto 0 auto;
  border-radius: 15px;
}
.box-img {
  width: 100%;
  height: 177px;
  border-radius: 15px 15px 0 0;
}
.f16 {
  font-size: 16px;
}
.f15 {
  font-size: 15px;
}
.f14 {
  font-size: 14px;
}
.f10 {
  font-size: 10px;
}
.color-323 {
  color: #323643;
}
.color-98 {
  color: #989898;
}
.color-f9 {
  color: #FF9917;
}
.color-06d {
  color: #06D5DE
}
.box-title {
  width: 86.8%;
  margin: 14px 7.6% 9px 5.6%;
  height: 44px;
  overflow: hidden;
  text-overflow: -o-ellipsis-lastline; 
  overflow: hidden; 
  text-overflow: ellipsis; 
  display: -webkit-box; 
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.button {
  border: 1px solid #06D5DE;
  border-radius: 18px;
  width: 25.35%;
  height: 34px;
  text-align: center;
  line-height: 32px;
} 
.box-bottom {
  display: flex;
  /* padding: 0 3.7% 17px 5.6%; */
  padding-bottom: 17px;
  align-items: center;
}
.scan-text {
  margin-left: 5.6%;
}
.num {
  margin-left: 2.8%;
}
.view {
  margin-left: 13.5%;
}
.detail {
  margin-left: 4.5%;
}
</style>
