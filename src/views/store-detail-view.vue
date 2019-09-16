<template>
  <div class="main">
    <div class="store-detail">
      <img class="store-img" :src="storeItem.pic" alt="">
      <div class="store-detail-content">
        <p class="f16 store-name">{{storeItem.merchants_name}}</p>
        <div class="store-discount">
          <p class="store-address f14">
            <img style="height: 17px;" src="../../static/img/ic_yhq@2x.png" alt="">
            <span class="store-address-item">嘻格格会员在本店消费，可享至少20积分抵扣</span>
          </p>
          <!-- <p class="store-address f14">
            <span class="store-address-item">共2张，查看抢购</span>
            <img style="margin-right: 0;width: 6px;height: 11px; margin-left: 12px;" src="../../static/img/ic_yhq_arrow@2x.png" alt="">
          </p> -->
        </div>
        <p class="store-address f14">
          <img src="../../static/img/ic_dz02@2x.png" alt="">
          <span class="store-address-item"> {{storeItem.address}}</span>
        </p>
        <div class="line"></div>
        <div class="name-price">
          <p class="store-address f14" style="">
            <img src="../../static/img/mobile@2x.png" alt="">
            <span class="store-address-item">{{storeItem.phone}}</span>
          </p>
          <a :href="`tel:${storeItem.phone}`" class="mobile"></a>
        </div>
      </div>
    </div>
    <div class="content-detail" v-html="storeItem.content">
    <!-- < img v-for="(item, index) in picList" :key="index" :src="item.photo" alt=""> -->
    </div>
    <div v-show="storeList.length > 0" class="div-title f16">
      <p style="color: #222222;font-weight: 600;padding-top: 11px;padding-left: 20px;">店铺活动</p>
      <div v-for="item in storeList" :key="item.id" class="store-activity">
        <img class="store-activity-img" :src="item.cover" alt="">
        <div class="store-right f16">
          {{item.goods_name}}
          <img v-if="item.goods_status==1" src="../../static/img/ing@2x.png" alt="">
          <img v-if="item.goods_status==2" src="../../static/img/yjs@2x.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
  },
  computed: {
    // ...mapGetters([])
  },
  name: "HomePage",
  data() {
    return {
      storeList: [],
      storeItem: {},
      id: 0,
      picList: []
    };
  },
  methods: {
    ...mapActions(['storeDetails']),
    handleQuery() {
      const params = {
        merchants_id: this.$route.query.id
      }
      this.storeDetails(params).then(res=>{
        if(res.StatusInfo.success) {
          this.storeItem = res.merchantsInfo
          this.picList = res.photoList.map(item=>{
            item.img = item.photo
            return item
          })
          this.storeList = res.activityList
        } else {
          this.toastShow(res.StatusInfo.ErrorDetailCode)
        }
      })
    }
  },
  computed: {
    
  },
  beforeDestroy() {
    
  },
  created() {
    
  },
  mounted() {
    this.id = this.$route.query.id
    this.handleQuery()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  height: 100%;
  position: relative;
}
.store-detail {
  width: 100%;
  background: #ffffff;
  padding: 10px;
}
.store-detail .store-img {
  width: 100%;
  height: 160px;
  border-radius: 15px;
}
.f16 {
  font-size: 16px;
}
.f13 {
  font-size: 13px;
}
.f14 {
  font-size: 14px;
}
.store-name {
  padding: 16px 0 25px 5px;
  font-weight: 600;
  color: #000000;
}
.store-discount {
  display: flex;
  justify-content: space-between;
  background: #FFF3DE;
  margin: 0 -10px;
  width: 375px;
  padding: 0 15px;
}
.store-address {
  /* padding: 0px 0 15px 5px; */
  color: #666666;
  display: flex;
  align-items: center;
  height: 50px; 
}
.store-address-item {
  width: 90%;
  text-overflow: -o-ellipsis-lastline; 
  overflow: hidden; 
  text-overflow: ellipsis; 
  display: -webkit-box; 
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.line {
  border-top: 1px solid #E6E6E6;
}
.mobile {
  width: 99px;
  height: 44px;
  background: url('../../static/img/btn_lxsj@2x.png') center no-repeat;
  background-size: 99px 44px;
}
p img {
  width: 12px;
  height: 12px;
  display: inline-block;
  margin-right: 12px;
  vertical-align: middle;
}
.name-price {
  display: flex;
  justify-content: space-between;
}
.content-detail {
  width: 100%;
  margin-top: 10px;
}
.content-detail img {
  width: 100%;
}
.div-title {
  width: 100%;
  background: #ffffff;
  margin-top: 10px;
}
.store-activity-img {
  width: 90px;
  height: 90px;
  border-radius: 11px;
}
.store-right {
  margin-left: 10px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  color: #323643
}
.store-right img {
  width: 54px;
  height: 22px;
  margin-top: 10px;
}
.store-activity {
  margin: 10px;
  border-radius: 5px;
  background-color: #ffffff;
  height: 120px;
  padding: 15px 10px;
  display: flex;
  box-shadow: 0 -2px 14px rgba(0,0,0,0.06)
}
</style>
