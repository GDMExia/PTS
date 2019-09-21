<template>
  <div class="main">
    <div style="display: flex;justify-content: center;align-items: center;flex-direction:column;font-size: 16px;color: #ccc;" v-if="activityListData.length==0">
      <img style="width: 40px; margin: 65% 0px; height: 40px;margin-bottom: 16px;" src="../../static/img/icon/no_data.png"/>
      <span> 暂无数据 </span>
    </div>
    <scroller style="height: 100%;" v-if="activityListData.length" lock-x @on-scroll-bottom="onScrollBottom" ref="scrollerBottomView">
      <div class="box" v-for="(item, index) in activityListData" :key="index">
        <p class="box-name f15 color-333">{{item.real_name}}</p>
        <div class="box-phone" style="margin-top: 12px">
            <img class="view-phone" src="../../static/img/ic_iphone@2x.png" alt="">
            <span class="f12 color-666" style="margin-left: 2%;">手机号</span>
            <p class="f12 color-333 phone-num">{{item.phone}}</p>
        </div>
        <div class="box-phone" style="margin-top: 5px">
            <img class="view-eye" src="../../static/img/ic_ll@2x.png" alt="">
            <span class="f12 color-666" style="margin-left: 1.45%;">浏览次数</span>
            <p class="f12 color-333 view-num">{{item.look_num}}次</p>
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
      activityListData: [
          // { name: '张三', phone: '13333333333', viewNum: 123 },
          // { name: '张三', phone: '13333333333', viewNum: 123 },
          // { name: '张三', phone: '13333333333', viewNum: 123 },
      ],
      pageNum: 1,
      totalPage: 0,
      onFetching: false, // 请求控制
      loadDataDone: false, //页面加载器
    };
  },
  methods: {
    ...mapActions(['shareUserList']),
    handleQuery() {
      const params = {
        page: this.pageNum,
        pageSize: 5,
        token: this.$store.state.token,
        article_id: this.$route.query.id
      }
      this.shareUserList(params).then(res=>{
        if(res.StatusInfo.success) {
          this.activityListData = res.articleList?this.activityListData.concat(res.articleList):[]
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
    width: 92%;
    background: #ffffff;
    margin: 12px auto 0 auto;
    padding-left: 5.8%;
    padding-top: 12px;
    padding-bottom: 13px;
}
.f15 {
    font-size: 15px;
}
.f12 {
    font-size: 12px;
}
.color-333 {
    color: #333333;
}
.color-666 {
    color: #666666;
}
.box-phone {
    display: flex;
    height: 17px;
    line-height: 17px;
    align-items: center;
}
.view-phone {
    width: 12px;
    height: 12px;
    display: inline;
}
.view-eye {
  width: 14px;
  height: 9px;
  display: inline;
}
.view-num {
  margin-left: 5.5%;
}
.phone-num {
  margin-left: 9%;
}
</style>
