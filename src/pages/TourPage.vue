<template>
  <div style="height:100%;">
    <div class="tour-search">
      <img src="../../static/img/icon_search@2x.png" alt="">
        <x-input placeholder="输入目的地/关键词" placeholder-align="left" v-model="value" @on-enter="handleSearch"></x-input>
      <!-- <input type="search" v-model="value" placeholder="输入目的地/关键词"> -->
    </div>
    <!-- <list-pull-loading :options="options" ref="listPullLoading"> -->
    <div class="ofy_auto flx_1" style="padding-bottom: 83px;">
        <div class="container" @click="$router.push(`/tours/tourDetail?id=${item.tourism_id}`)" v-for="(item, index) in activityList" :key="index">
          <img class="activity-img" :src="item.pic" alt="">
          <div class="activity-title">
            <div class="name-price">
              <span class="title-text">{{item.goods_name}}</span>
              <div>
                <p class="price">¥ {{item.goods_price}}</p>
                <p class="num">抵{{item.discount_point}}积分</p>
              </div>
            </div>
            <p class="time">
              <img src="../../static/img/icon_time@2x.png" alt="">
              {{item.start_time}}~{{item.end_time}}
            </p>
          </div>
        </div>
    </div>
    <!-- </list-pull-loading> -->
    <tabbarComponent :tabIndex=1></tabbarComponent>
    <home-provider></home-provider>
    
  </div>
</template>

<script>
import {listPullLoading} from 'list-pull-loading'
import "list-pull-loading/dist/list-pull-loading.css"
import TabbarComponent from "@/components/TabbarComponent.vue";
import {mapActions,mapGetters} from 'vuex'
import { XInput } from 'vux'
export default {
  components: {
    TabbarComponent,
    XInput,
    listPullLoading
  },
  name: "HomePage",
  data() {
    return {
      results: [],
      list: [
        {id: 1, img:'http://iph.href.lu/355x177', title: '马来西亚、吉隆坡城市遗址、 洞穴与缆车马来西亚', created: '2019/07/24'},
        {id: 2, img:'http://iph.href.lu/355x177', title: '马来西亚、吉隆坡城市遗址、 洞穴与缆车马来西亚', created: '2019/07/24'},
        {id: 3, img:'http://iph.href.lu/355x177', title: '马来西亚、吉隆坡城市遗址、 洞穴与缆车马来西亚', created: '2019/07/24'},
      ],
      options: {
        auto: true,
        parameters: {typeId: null},
        down: {
          offset: 50
        },
        api: this.queryList
      },
      value: '',
      pageNum: 0,
      totalPage: 0,
      activityList: [
        // {id: 1, img:'http://iph.href.lu/355x177', title: '马来西亚、吉隆坡城市遗址、 洞穴与缆车马来西亚', created: '2019/07/24'},
        // {id: 2, img:'http://iph.href.lu/355x177', title: '马来西亚、吉隆坡城市遗址、 洞穴与缆车马来西亚', created: '2019/07/24'},
        // {id: 3, img:'http://iph.href.lu/355x177', title: '马来西亚、吉隆坡城市遗址、 洞穴与缆车马来西亚', created: '2019/07/24'},
      ]
    };
  },
  methods: {
    ...mapActions(['tourList']),
    queryList(parameters, isLoadingMore){
      var _this = this;
      
    },
    handleTourList() {
      const params = {
        page: this.pageNum,
        pageSize: 5,
        token: this.getToken,
        keywords: this.value
      }
      this.tourList(params).then(res=>{
        if(res.StatusInfo.success) {
          this.activityList = res.newsList
          this.totalPage = res.PageInfo.TotalPages
        } else {
          this.toastShow(res.StatusInfo.ErrorDetailCode)
        }
      })
    },
    handleSearch() {
      // this.$bus.emit('searchParams', {type: 0, search: this.value})
      this.$router.push(`/tours/search?type=0&search=${this.value}`)
    },
  },
  computed: {
    ...mapGetters(['getToken'])
  },
  beforeDestroy() {
    
  },
  created() {
    
  },
  mounted() {
    this.$bus.emit("onTabBarEvent", {});
    this.handleTourList()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tour-search {
  max-width: 89%;
  height: 55px;
  margin: 5.5% 15px 17px 25px;
  position: relative;
  display: flex;
  background: #fff;
  border-radius: 28px;
  padding: 0px 20px;
  box-shadow: 0 5px 10px rgba(0,0,0,0.05);
  -ms-touch-action: none;
  touch-action: none;
}
.tour-search img {
    width: 16px;
    height: 16px;
    margin-top: 20px;
    margin-right: 10px;
    touch-action: none;
}
.container {
  margin: 4% 10px;
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
.name-price {
  display: flex;
  justify-content: space-between;
}
.name-price .price {
  color: #DE1E06;
  font-size: 22px;
}
.name-price .num {
  color: #989898;
  font-size: 10px;
}
.title-text {
  color: #323643;
  font-size: 16px;
  font-weight: 600;
  max-width: 211px;
}
.time {
  color: #666666;
  font-size: 12px;
}
p img {
  width: 12px;
  height: 12px;
  display: inline-block;
  vertical-align: middle;
}
</style>
