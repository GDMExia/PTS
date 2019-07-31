<template>
  <div style="height:100%;">
    <div style="display: flex;justify-content: center;align-items: center;flex-direction:column;font-size: 16px;color: #ccc;" v-if="activityList.length==0">
      <img style="width: 40px; margin: 65% 0px; height: 40px;margin-bottom: 16px;" src="../../static/img/icon/no_data.png"/>
      <span> 暂无数据 </span>
    </div>
    <scroller v-if="activityList.length" lock-x @on-scroll-bottom="onScrollBottom" ref="scrollerBottom">
      <div>
        <div class="container" v-for="item in activityList" :key="item.news_id" @click="$router.push(`/homes/shareDetail?id=${item.news_id}`)">`
          <img class="activity-img" :src="item.pic" alt="">
          <div class="activity-title">
            <p class="title-text">{{item.title}}</p>
            <p class="time">
              <img src="../../static/img/icon_time@2x.png" alt="">
              {{item.create_time}}
            </p>
          </div>
        </div>
      </div>
      <load-more v-show="pageNum > totalPage" :show-loading="false" :tip="'暂无数据'" background-color="#fbf9fe"></load-more>
    </scroller>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {  Scroller,LoadMore } from 'vux'
export default {
  components: {
    LoadMore,
    Scroller
  },
  computed: {
    // ...mapGetters([])
  },
  name: "HomePage",
  data() {
    return {
      activityList: [
        // {id: 1, img:'http://iph.href.lu/355x177', title: '【回顾】送给妈妈装满爱的花篮', created: '2019/07/24'},
        // {id: 2, img:'http://iph.href.lu/355x177', title: '【回顾】送给妈妈装满爱的花篮', created: '2019/07/24'},
        // {id: 3, img:'http://iph.href.lu/355x177', title: '【回顾】送给妈妈装满爱的花篮', created: '2019/07/24'},
        
      ],
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
        pageSize: 5,
        gid: 1
      }
      this.articleList(params).then(res=>{
        if(res.StatusInfo.success) {
          this.activityList = res.newsList?this.activityList.concat(res.newsList):[]
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
<style scoped>
.container {
  margin: 4%;
  height: 272px;
  border-radius: 15px;
}
.activity-img {
  width: 100%;
  height: 177px;
  border-radius: 15px 15px 0 0;
}
.activity-title {
  height: 95px;
  padding: 14px 21px 10px 20px;
  border-radius: 0 0 15px 15px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.title-text {
  color: #323643;
  font-size: 16px;
  font-weight: 600;
}
.time {
  color: #666666;
  font-size: 12px;
}
p img {
  width: 12px;
  height: 12px;
  vertical-align: middle;
  display: inline-block;
}
</style>
