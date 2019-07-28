<template>
  <div style="height:100%;">
    <div class="tour-search">
      <search
      @result-click="resultClick"
      @on-change="getResult"
      :results="results"
      v-model="value"
      position="absolute"
      auto-scroll-to-top
      placeholder="输入目的地/关键词"
      @on-focus="onFocus"
      @on-cancel="onCancel"
      @on-submit="onSubmit"
      ref="search"></search>
    </div>
    <div style="padding-bottom: 83px;">
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
    </div>
    <tabbarComponent :tabIndex=1></tabbarComponent>
    <home-provider></home-provider>
    
  </div>
</template>

<script>
import TabbarComponent from "@/components/TabbarComponent.vue";
import { Search } from 'vux'
export default {
  components: {
    TabbarComponent,
    Search
  },
  name: "HomePage",
  data() {
    return {
      results: [],
      value: '',
      activityList: [
        {id: 1, img:'http://iph.href.lu/355x177', title: '【回顾】送给妈妈装满爱的花篮', created: '2019/07/24'},
        {id: 2, img:'http://iph.href.lu/355x177', title: '【回顾】送给妈妈装满爱的花篮', created: '2019/07/24'},
        {id: 3, img:'http://iph.href.lu/355x177', title: '【回顾】送给妈妈装满爱的花篮', created: '2019/07/24'},
        
      ]
    };
  },
  methods: {
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
    
  },
  beforeDestroy() {
    
  },
  created() {
    
  },
  mounted() {
    this.$bus.emit("onTabBarEvent", {});
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tour-search {
  max-width: 335px;
  height: 55px;
  margin: 12px 15px 17px 25px;
}
.tour-search .weui-search-bar {
  padding: 0;
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
