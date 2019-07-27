<template>
  <div style="height:100%;">
    <tabbarComponent :tabIndex=4></tabbarComponent>
    <home-provider></home-provider>
    <div class="main">
      <div class="personnalinfo">
        <div class="pic">
          <img src="" alt="">
          <div class="vip">
            <img src="/src/assets/icon/icon_vip_small@2x.png" alt="">
          </div>
        </div>
        <div class="name">我的名字叫雪梨</div>
        <div class="phone">13900000001</div>
        <Flexbox class="infobox">
          <FlexboxItem class="expiretime">
            <p class="num">2020/10/10</p>
            <p class="info">会员到期日</p>
          </FlexboxItem>
          <FlexboxItem class="integral">
            <p class="num">38900</p>
            <p class="info">当前积分</p>
          </FlexboxItem>
        </Flexbox>
        <Flexbox style="marginTop:12px">
          <FlexboxItem><div class="header_btn header_btn1" @click="$router.push('/schools/cause')">事业学习</div></FlexboxItem>
          <FlexboxItem><div class="header_btn header_btn2" @click="$router.push('/schools/cause')">事业学习</div></FlexboxItem>
        </Flexbox>
      </div>
      
    </div>
    <div class="mylink">
    <Group>
      <CellBox :is-link="true" class="link"><span>个人信息</span></CellBox>
      <CellBox :is-link="true" class="link"><span>我的钱包</span></CellBox>
      <CellBox :is-link="true" class="link"><span>我的订单</span></CellBox>
      <CellBox :is-link="true" class="link"><span>联系客服</span></CellBox>
    </Group>
    </div>
  </div>
</template>

<script>
import TabbarComponent from "@/components/TabbarComponent.vue";
import { Flexbox, FlexboxItem , Group , CellBox } from 'vux'
export default {
  components: {
    TabbarComponent,
    Flexbox,
    FlexboxItem,
    Group,
    CellBox
  },
  name: "OwnerPage",
  data() {
    return {
      
    };
  },
  methods: {
    
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
.main{width:100%;background-color: #fff;}
.personnalinfo{padding-top:28px;padding-bottom: 23px}
.personnalinfo .pic{width: 120px;height: 120px;background-color: aqua;border-radius: 50%;margin-left: 34%;position: relative;}
.personnalinfo .pic .vip{width:26px;height: 26px;position: absolute;right:3px;bottom:0}
.personnalinfo .pic .vip img{width:26px;height: 26px;}
.personnalinfo .name{color:#333333;font-size: 20px;font-weight: bold;width:100%;text-align: center;margin-top: 20px}
.personnalinfo .phone{color:#494949;font-size: 18px;width: 100%;text-align: center;margin-top: 12px}
.personnalinfo .infobox{width:100%;margin-top: 33px}
.personnalinfo .infobox .expiretime{border-right:solid 1px #DDD}
.personnalinfo .infobox .integral{}
.personnalinfo .infobox .num{color:#333333;font-size: 15px;width: 100%;text-align: center}
.personnalinfo .infobox .info{color:#999999;font-size: 10px;width: 100%;text-align: center}

.header_btn{width:150px!important;height:39px;border-radius:20px;background:#06D5DE;line-height: 39px;text-align: center;color:#fff;font-size: 15px;}
.header_btn1{margin-left: 13.3%}
.header_btn2{margin-left: 6%}
.mylink{width: 95%;margin-left: 2.5%}
.mylink .link{height:52px}
</style>
