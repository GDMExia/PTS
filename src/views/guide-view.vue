<template>
  <div style="height:100%;">
    <div style="display: flex;justify-content: center;align-items: center;flex-direction:column;font-size: 16px;color: #ccc;" v-if="guide_list.length==0">
      <img style="width: 40px; margin: 65% 0px; height: 40px;margin-bottom: 16px;" src="../../static/img/icon/no_data.png"/>
      <span> 暂无数据 </span>
    </div>
    <!-- <scroller v-if="guide_list.length" lock-x @on-scroll-bottom="onScrollBottom" ref="scrollerBottom"> -->
      <group class="guide">
        <cell v-for="item in guide_list" :key="item.news_id" :title="item.title" :link="`/homes/shareDetail?id=${item.news_id}`"></cell>
      </group>
      <!-- <load-more v-show="pageNum > totalPage" :show-loading="false" :tip="'暂无数据'" background-color="#fbf9fe"></load-more> -->
    <!-- </scroller> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {Cell,Group, Scroller,LoadMore } from 'vux'
export default {
  components: {
    Cell,
    Group,
    LoadMore,
    Scroller
  },
  computed: {
    // ...mapGetters([])
  },
  name: "HomePage",
  data() {
    return {
      guide_list: [],
      pageNum: 1,
      totalPage: 0,
      onFetching: false, // 请求控制
      loadDataDone: false, //页面加载器
    };
  },
  methods: {
    ...mapActions(['articleList']),
    handleQuery() {
      const params = {
        page: this.pageNum,
        pageSize: 20,
        gid: 2
      }
      this.articleList(params).then(res=>{
        if(res.StatusInfo.success) {
          this.guide_list = res.newsList?this.guide_list.concat(res.newsList):[]
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
    
  },
  mounted() {
    this.handleQuery()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.guide .weui-cells {
    margin-top: 0!important;
}
.weui-cells .vux-cell-primary {
  width: 88%!important;
}
.vux-cell-primary .vux-label {
    display: inline-block;
    word-wrap: break-word;
    word-break: break-all;
    white-space: nowrap!important;
    width: 100%!important;
    text-overflow: ellipsis!important;
    overflow: hidden!important;
}
</style>
