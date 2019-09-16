<template>
  <div style="height:100%;">
    <!-- <div style="display: flex;justify-content: center;align-items: center;flex-direction:column;font-size: 16px;color: #ccc;" v-if="activityList.length==0">
      <img style="width: 40px; margin: 65% 0px; height: 40px;margin-bottom: 16px;" src="../../static/img/icon/no_data.png"/>
      <span> 暂无数据 </span>
    </div> -->
    <scroller style="height: 100%;" lock-x @on-scroll-bottom="onScrollBottom" ref="scrollerBottomView">
      <div class="box">
        <img src="../../static/img/img_yhq@2x.png" alt="">
        <div class="box-content">
          <p class="content-price color-ed7">¥50</p>
          <div class="line"></div>
          <div class="content-body">
            <p class="f16 color-333">50元代金券</p>
            <p class="f12 color-ed7 mt6">100积分可抵扣10元</p>
            <p class="f12 color-666 mt16">2019/05/10-06/10可使用</p>
          </div>
          <div class="buy-button" @click="$router.push('/homes/couponPay')">
            <img src="../../static/img/img_ljqg@2x.png" alt="">
          </div>
        </div>
      </div>
      <div class="box">
        <img src="../../static/img/img_yhq@2x.png" alt="">
        <div class="box-content">
          <p class="content-price color-ed7">¥100</p>
          <div class="line"></div>
          <div class="content-body">
            <p class="f16 color-333">100元代金券</p>
            <p class="f12 color-ed7 mt6">200积分可抵扣10元</p>
            <p class="f12 color-666 mt16">2019/05/10-06/10可使用</p>
          </div>
          <div class="buy-button" @click="$router.push('/homes/couponPay')">
            <img src="../../static/img/img_ljqg@2x.png" alt="">
          </div>
        </div>
      </div>
      <!-- <load-more v-show="pageNum > totalPage" :show-loading="false" :tip="'暂无数据'" background-color="#fbf9fe"></load-more> -->
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
    handleQuery() {},
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
.line {
  border-left: 1px dashed #DCDCDC;
  height: 90px;
  margin: 9px 0 5px 0;
}
.box {
  width: 94.7%;
  background: #ffffff;
  margin: 12px auto 0 auto;
  border-radius: 5px;
}
.box img {
  width: 100%;
  height: 10px;
}
.box-content {
  display: flex;
  align-items: center;
  /* padding: 11px 0 15px 0; */
  /* height: 104px; */
}
.color-ed7{
  color: #ED780E;
}
.color-666{
  color: #666666;
}
.color-333{
  color: #333333;
}
.f16 {
  font-size: 16px;
}
.f12 {
  font-size: 12px;
}
.content-price {
  font-size: 24px;
  width: 27.9%;
  text-align: center;
}
.content-body {
  width: 44%;
  padding: 11px 0 15px 4%;
  height: 104px;
}
.mt6 {
  margin-top: 6px;
}
.mt16 {
  margin-top: 16px;
}
.buy-button {
  width: 28.1%;
  padding-right: 3.7%;
}
.buy-button img {
  width: 100%;
  height: 44px;
}
</style>
