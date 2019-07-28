<template>
  <div style="height:100%;">
    <div class="tour-search">
      <img src="/src/assets/icon_search@2x.png" alt="">
        <x-input placeholder="输入目的地/关键词" placeholder-align="left" v-model="value" @on-enter="handleSearch"></x-input>
      <!-- <input type="search" v-model="value" placeholder="输入目的地/关键词"> -->
    </div>
    <div style="padding-bottom: 83px;">
      <pull-to :bottom-load-method="loadmore" :distance-index="distanceIdx" :bottom-config="configBtm">
        <div class="container" @click="$router.push('/tours/tourDetail')" v-for="item in activityList" :key="item.id">
          <img class="activity-img" :src="item.img" alt="">
          <div class="activity-title">
            <div class="name-price">
              <span class="title-text">{{item.title}}</span>
              <div>
                <p class="price">¥ 2050</p>
                <p class="num">抵500积分</p>
              </div>
            </div>
            <p class="time">
              <img src="/src/assets/icon_time@2x.png" alt="">
              {{item.created}}
            </p>
          </div>
        </div>
      </pull-to>
    </div>
    <tabbarComponent :tabIndex=1></tabbarComponent>
    <home-provider></home-provider>
    
  </div>
</template>

<script>
import PullTo from 'vue-pull-to';
import TabbarComponent from "@/components/TabbarComponent.vue";
import {mapActions,mapGetters} from 'vuex'
import { XInput } from 'vux'
export default {
  components: {
    TabbarComponent,
    XInput,
    PullTo
  },
  name: "HomePage",
  data() {
    return {
      results: [],
      value: '',
      pageNum: 0,
      distanceIdx: 3,
      configBtm: {
        pullText: '下拉刷新', // 下拉时显示的文字
        triggerText: '释放更新', // 下拉到触发距离时显示的文字
        loadingText: '加载中...', // 加载中的文字
        doneText: '加载完成', // 加载完成的文字
        failText: '无数据', // 加载失败的文字
        loadedStayTime: 500, // 加载完后停留的时间ms
        stayDistance: 50, // 触发刷新后停留的距离
        triggerDistance: 40 // 下拉刷新触发的距离
      },
      activityList: [
        {id: 1, img:'http://iph.href.lu/355x177', title: '【回顾】送给妈妈装满爱的花篮', created: '2019/07/24'},
        {id: 2, img:'http://iph.href.lu/355x177', title: '【回顾】送给妈妈装满爱的花篮', created: '2019/07/24'},
        {id: 3, img:'http://iph.href.lu/355x177', title: '【回顾】送给妈妈装满爱的花篮', created: '2019/07/24'},
      ]
    };
  },
  methods: {
    ...mapActions(['tourList']),
    //下拉刷新加载更多
    loadmore(loaded) {
        this.pageNum++;
        this.handleTourList(loaded)
    },
    handleTourList(loaded) {
      const params = {
        page: this.pageNum,
        pageSize: 5,
        token: this.getToken,
        keywords: ''
      }
      this.tourList(params).then(res=>{
        if(res.StatusInfo.success) {

        } else {
          this.toastShow(res.StatusInfo.ErrorDetailCode)
        }
        // if (loaded) {
        //   if (res.data.length === 0) {
        //     loaded("finish")
        //   } else {
        //     loaded("done")
        //   }
        // }
      })
    },
    handleSearch() {
      this.$router.push('/tours/search')
    },
    resultClick (item) {
      window.alert('you click the result item: ' + JSON.stringify(item))
    },
    getResult (val) {
      console.log('on-change', val)
      this.results = val ? getResult(this.value) : []
    },
    onSubmit () {
      this.$refs.search.setBlur()
      this.$vux.toast.show({
        type: 'text',
        position: 'top',
        text: 'on submit'
      })
    },
    onFocus () {
      console.log('on focus')
    },
    onCancel () {
      console.log('on cancel')
    }
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
    // this.handleTourList(0)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tour-search {
  max-width: 335px;
  height: 55px;
  margin: 12px 15px 17px 25px;
  position: relative;
  display: flex;
  background: #fff;
  border-radius: 28px;
  padding: 0px 20px;
  box-shadow: 0 5px 10px rgba(0,0,0,0.05);
}
.tour-search img {
    width: 16px;
    height: 16px;
    margin-top: 20px;
    margin-right: 10px;
}
.container {
  margin: 10px;
  height: 272px;
  border-radius: 15px;
}
.activity-img {
  max-width: 355px;
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
