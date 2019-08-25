<template>
  <div style="height:100%;">
    <div class="store-type">
      <div @click="handleQuery(item.merchants_cid)" :class="[(item.merchants_cid == merchants_cid)?'active':'' ,'store-type-item']" v-for="item in category" :key="item.merchants_cid">{{item.cate_name}}</div>
    </div>
    <div class="images-slide">
      <swiper loop auto :list="imageList" @swiper-indicator-active-color="'#76F7FC'" height="120px"  dots-position="center"></swiper>
    </div>
    <div style="display: flex;padding: 55% 0;justify-content: center;align-items: center;flex-direction:column;font-size: 16px;color: #ccc;" v-if="storeList.length==0">
      <img style="width: 40px; height: 40px;margin-bottom: 16px;" src="../../static/img/icon/no_data.png"/>
      <span> 暂无数据 </span>
    </div>
    <scroller v-if="storeList.length" height="-137" lock-x @on-scroll-bottom="onScrollBottom" ref="scrollerBottom">
      <div class="ofy_auto flx_1" style="margin-top: -15px;">
        <div v-for="item in storeList" :key="item.id" @click="$router.push(`/homes/storeDetail?id=${item.merchants_id}`)" class="store">
          <img class="store-img" :src="item.pic" alt="">
          <div class="store-right">
            <p class="store-name">{{item.merchants_name}}
            <img class="activity-enable" v-show="item.is_goods" src="../../static/img/ic_hdbq@2x.png" alt="">
            </p>
            <p class="store-address mt12"><img src="../../static/img/ic_dz02@2x.png" alt="">{{item.address}}</p>
            <p class="store-address mt10"><img src="../../static/img/ic_owner@2x.png" alt="">{{item.contact}}</p>
          </div>
        </div>
      </div>
      <!-- <load-more v-show="pageNum > totalPage" :show-loading="false" :tip="'暂无数据'" background-color="#fbf9fe"></load-more> -->
    </scroller>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { Scroller,LoadMore,Swiper } from 'vux'
export default {
  components: {
    Scroller,
    LoadMore,
    Swiper
  },
  computed: {
    ...mapGetters([])
  },
  name: "HomePage",
  data() {
    return {
      imageList: [],
      category: [],
      storeList: [],
      pageNum: 1,
      totalPage: 0,
      onFetching: false, // 请求控制
      loadDataDone: false,
      merchants_cid:''
    };
  },
  methods: {
    ...mapActions(['storeLists']),
    handleQuery(id) {
      const group_id = this.$route.query.group_id
      let params = {
        page: this.pageNum,
        pageSize: 5,
        group_id: group_id?group_id:'',
        merchants_cid: id || this.merchants_cid
      }
      this.storeLists(params).then(res=>{
        if(res.StatusInfo.success) {
          this.storeList = res.merchantsList?this.storeList.concat(res.merchantsList):[]
          this.category = res.merchantsCateTree
          this.imageList = res.Banner.map(item=>{
            item.img = item.bannerCover
            return item
          })
          this.totalPage = res.PageInfo.TotalPages
          this.merchants_cid = res.merchants_cid
        } else {
          this.toastShow(res.StatusInfo.ErrorDetailCode)
        }
        this.loadDataDone = true; // 请求成功 控制空数据显示
        this.onFetching = false;
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
    window.scrollTo(0,0)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.store {
  margin: 10px;
  border-radius: 5px;
  background-color: #ffffff;
  height: 120px;
  padding: 15px 10px;
  display: flex;
}
.store-type {
  display: flex;
  margin: 10px;
  width: 94%;
  overflow-x: auto;
  display: none;
}
.store-type-item {
  color: #06D5DE;
  background: #ffffff;
  padding: 10px 15px 9px;
  font-size: 15px;
  border-radius: 20px;
  /* min-width: 71px; */
  width: auto;
  white-space: nowrap;
  text-align: center;
  margin-right: 10px;
  height: 40px;
}
.images-slide {
  margin: 10px 4%;
  width: 92%;
  height: 120px;
}
.store-type .active {
  background: rgba(6, 213, 222, 10%);;
}
.store-img {
  width: 90px;
  height: 90px;
}
.store-right {
  margin-left: 10px;
}
.store-name {
  color: #000000;
  font-size: 16px;
  font-weight: 600;
}
.store-address {
  color: #666666;
  font-size: 11px;
  display: flex;
}
p img {
  width: 12px;
  height: 12px;
  display: inline-block;
  margin-right: 5px;
  vertical-align: middle;
}
.mt12 {
  margin-top: 12px;
}
.mt10 {
  margin-top: 10px;
}
.activity-enable {
  width: 37px;
  height: 16px;
  margin-left: 5px;
}
</style>
