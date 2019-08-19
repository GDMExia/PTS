<template>
  <div class="main">
    <div class="store-detail">
      <img class="store-img" :src="storeItem.pic" alt="">
      <div class="store-detail-content">
        <p class="f16 store-name">{{storeItem.merchants_name}}</p>
        <p class="store-address f13">
          <img src="../../static/img/ic_dz02@2x.png" alt="">
          {{storeItem.address}}
        </p>
        <div class="name-price">
          <p class="store-address f13" style="padding-top: 13px;">
            <img src="../../static/img/mobile@2x.png" alt="">
            {{storeItem.phone}}
          </p>
          <a :href="`tel:${storeItem.phone}`" class="mobile"></a>
        </div>
      </div>
    </div>
    <div class="content-detail" v-html="storeItem.content">
    <!-- < img v-for="(item, index) in picList" :key="index" :src="item.photo" alt=""> -->
    </div>
    <div class="div-title f16">
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
          this.storeList = res.activityList.slice(-5)
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
.store-name {
  padding: 16px 0 25px 5px;
  font-weight: 600;
  color: #000000;
}
.store-address {
  padding: 0px 0 15px 5px;
  color: #666666;
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
