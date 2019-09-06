<template>
  <div class="main">
    <div class="box" v-for="(item, index) in activityListData" :key="index">
        <p class="box-name f15 color-333">{{item.name}}</p>
        <div class="box-phone">
            <p>
                <img src="../../static/img/ic_iphone@2x.png" alt="">
                <span class="f12 color-666">手机号</span>
            </p>
            <p class="f12 color-333">{{item.phone}}</p>
        </div>
        <div class="box-phone">
            <p>
                <img src="../../static/img/ic_ll@2x.png" alt="">
                <span class="f12 color-666">浏览次数</span>
            </p>
            <p class="f12 color-333">{{item.viewNum}}</p>
        </div>
    </div>
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
          { name: '张三', phone: '13333333333', viewNum: 123 },
          { name: '张三', phone: '13333333333', viewNum: 123 },
          { name: '张三', phone: '13333333333', viewNum: 123 },
      ],
      pageNum: 1,
      totalPage: 0,
      onFetching: false, // 请求控制
      loadDataDone: false, //页面加载器
    };
  },
  methods: {
    ...mapActions([]),
    handleQuery() {
      
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
}
.box-phone img {
    width: 12px;
    height: 12px;
}
</style>
