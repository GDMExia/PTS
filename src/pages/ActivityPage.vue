<template>
  <div class="main">
    <div class="flex f15">
      <div @click="changeTab(1)" :class="[type==1?'active':'','flex-tab']">进行中</div>
      <div @click="changeTab(2)" :class="[type==2?'active':'','flex-tab']">历史</div>
    </div>
    <div v-if="type==1">
      <flexbox style="margin: 0 11px 20px 4%;width: 92%;">
        <flexbox-item v-for="(item, index) in typeList" :key="index" :class="[typeId==item.cid?'header-active':'','header_btn']">
          <div @click="changeType(item.cid)">{{item.cate_name}}</div>
        </flexbox-item>
      </flexbox>
    </div>
    <div>
      <div style="display: flex; ;padding:50% 0;justify-content: center;align-items: center;flex-direction:column;font-size: 16px;color: #ccc;" v-if="activityListData.length==0">
        <img style="width: 40px; height: 40px;margin-bottom: 16px;" src="../../static/img/icon/no_data.png"/>
        <span> 暂无数据 </span>
      </div>
      <scroller v-if="activityListData.length" lock-x @on-scroll-bottom="onScrollBottom" :height="type==1?'-192':'152'" ref="scrollerBottom">
        <div class="ofy_auto flx_1" style="margin-top: -10px;">
          <div v-for="item in activityListData" :key="item.goods_id" class="main-content" @click="$router.push(`/activities/activityDetail?id=${item.goods_id}`)">
            <div class="image">
              <img :src="item.cover" alt="">
            </div>
            <img v-if="item.pid==2" class="activity-type" src="../../static/img/ic_guanfang@2x.png" alt="">
            <img v-if="item.pid==1" class="activity-type" src="../../static/img/ic_shangjia@2x.png" alt="">
            <div class="name-price">
              <div class="content-left">
                <p class="title f16 content-left">
                  {{item.goods_name}}
                </p>
                <p class="time mt12">
                  <img src="../../static/img/icon_time@2x.png" alt="">
                  截止时间：{{item.registration_time}}
                </p>
              </div>
              <div style="text-align: right;">
                <p class="price">{{"¥"+item.goods_price}}</p>
                <p class="num">抵{{item.discount_price}}积分</p>
              </div>
            </div>
          </div>
        </div>
        <!-- <load-more v-show="pageNum > totalPage" :show-loading="false" :tip="'暂无数据'" background-color="#fbf9fe"></load-more> -->
      </scroller>
    </div>
    <tabbarComponent :tabIndex=2></tabbarComponent>
    <home-provider></home-provider>

  </div>
</template>

<script>
import {listPullLoading} from 'list-pull-loading'
import "list-pull-loading/dist/list-pull-loading.css"
import TabbarComponent from "@/components/TabbarComponent.vue";
import { Flexbox, FlexboxItem,Scroller,LoadMore, } from 'vux'
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    TabbarComponent,
    Flexbox,
    FlexboxItem,
    Scroller,
    LoadMore,
    listPullLoading
  },
  name: "HomePage",
  data() {
    return {
      type: 1,
      typeId: '',
      typeList: [],
      activityListData: [],
      pageNum: 1,
      totalPage: 0,
      onFetching: false, // 请求控制
      loadDataDone: false, //页面加载器
    };
  },
  methods: {
    ...mapActions(['activityType', 'activityList']),
    changeTab(type) {
      if(this.type!=type) {
        this.activityListData = []
        this.type = type
        this.pageNum = 1
        this.handleQuery()
      }
    },
    handleQuery() {
      const params = {
        cid: this.typeId,
        pageSize: 100,
        page: this.pageNum,
        goods_status: this.type
      }
      this.activityList(params).then(res=>{
        if(res.StatusInfo.success) {
          this.activityListData = res.goodsList?this.activityListData.concat(res.goodsList):this.activityListData
            this.$nextTick(() => {
                this.$refs.scrollerBottom.reset()
            })
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
    changeType(id) {
      if(this.typeId!=id) {
        this.activityListData = []
        this.typeId = id
        this.pageNum = 1
        this.handleQuery()
      }
    },
    handleActivityType() {
      this.activityType().then(res=>{
        if(res.StatusInfo.success) {
          this.typeList = res.cateTree.reverse()
          this.typeId = this.typeList[0].cid
          this.handleQuery()
        } else {
          this.toastShow(res.StatusInfo.ErrorDetailCode)
        }
        this.loadDataDone = true; // 请求成功 控制空数据显示
        this.onFetching = false; // 防止重复请求
      })
    },
  },
  computed: {

  },
  beforeDestroy() {

  },
  created() {

  },
  mounted() {
    // this.$nextTick(() => {
    //   this.$refs.scrollerBottom.reset({top: 0})
    // })
    this.$bus.emit("onTabBarEvent", {});
    this.handleActivityType()
    window.scrollTo(0,0)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  height: 100%;
  position: relative;
}
.flex {
  display: flex;
  margin:  20px;
  background: #ffffff;
  height: 40px;
  color: #333333;
  text-align: center;
  border-radius: 30px;
}
.f15 {
  font-size: 15px;
}
.flex-tab {
  width: 46%;
  flex: 1;
  height: 100%;
  line-height: 40px;
  cursor: pointer;
}
.active {
  background:#38DDE5;
  border-radius: 30px;
  color: #ffffff;
  -moz-box-shadow:0px 6px 9px rgba(56, 221, 229, 0.3);
  -webkit-box-shadow:0px 6px 9px rgba(56, 221, 229, 0.3);
  box-shadow:0px 6px 9px rgba(56, 221, 229, 0.3);
}
.header_btn{
  max-width:100px;
  height:40px;
  background-size: 80px 40px;
  text-align: center;
  color:#38DDE5;
  padding-top: 10px;
  font-size: 15px;
  background: #ffffff;
  border-radius: 30px;
}
.header-active {
  color: #ffffff;
  background: #38DDE5;
}
.main-content {
  min-height:257px;
  width: 92%;
  margin-left:4%;
  border-radius: 20px;
  background-color: #fff;
  margin-top:10px;
  position: relative;
}
.main-content .image img{
  width:100%;
  height:177px;
  border-radius: 20px 20px 0 0
}
.activity-type {
  width: 36px;
  height: 36px;
  position: absolute;
  top: 9px;
  right: 9px;
}
.name-price {
  display: flex;
  justify-content: space-between;
  padding: 14px 21px 11px 20px;
}
.name-price .content-left {
  max-width: 227px;
  /*white-space: nowrap;*/
  overflow: hidden;
  /*text-overflow: ellipsis*/
}
.name-price .price {
  color: #DE1E06;
  font-size: 22px;
}
.name-price .num {
  color: #454545;
  font-size: 12px;
  margin-top: 2px;
}
.f16 {
  font-size: 16px;
  color: #323643;
  font-weight: 600;
}
.time {
  color: #666666;
  font-size: 12px;
}
.mt12 {
  margin-top: 12px;
}
p img {
  width: 12px;
  height: 12px;
  display: inline-block;
}
</style>
