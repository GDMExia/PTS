<template>
  <div style="height:100%;">
    <tabbarComponent :tabIndex=4></tabbarComponent>
    <home-provider></home-provider>
      <div class="personnalinfo">
        <div class="flexpic">
        <div class="pic">
          <img src="" alt="">
          <div class="vip">
            <img src="/src/assets/icon/icon_vip_small@2x.png" alt="">
          </div>
        </div>
        </div>
        <div class="name">{{nickname}}</div>
        <div class="phone"></div>
        <Flexbox class="infobox">
          <FlexboxItem class="expiretime">
            <p class="num">{{overtime}}</p>
            <p class="infoname">会员到期日</p>
          </FlexboxItem>
          <FlexboxItem class="integral">
            <p class="num">38900</p>
            <p class="infoname">当前积分</p>
          </FlexboxItem>
        </Flexbox>
        <Flexbox style="marginTop:12px">
          <FlexboxItem v-if="overtime<date"><div class="header_btn header_btn1" @click="$router.push('/owners/getvip')">续费VIP</div></FlexboxItem>
          <FlexboxItem><div class="header_btn" @click="$router.push('/owners/advice')">每日打卡</div></FlexboxItem>
          <FlexboxItem><div class="header_btn" @click="$router.push('/owners/advice')">成为vip</div></FlexboxItem>
        </Flexbox>
      </div>
    <div class="mylink">
    <Group>
      <CellBox :is-link="true" class="link" link=/owners/info><span>个人信息</span></CellBox>
      <CellBox :is-link="true" class="link" link=/owners/mywallet><span>我的钱包</span></CellBox>
      <CellBox :is-link="true" class="link" link=/owners/myorder><span>我的订单</span></CellBox>
      <CellBox :is-link="true" class="link" link=/owners/myadvice><span>联系客服</span></CellBox>
    </Group>
    </div>
    <div class="placeholder"></div>
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
      nickname:'',
      overtime:'',
      vipprice:'',
      virtualNumber:'',
      date:''
    };
  },
  methods: {
    getDate(){
      let date=new Date()
      this.date=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
    }
  },
  computed: {
    
  },
  beforeDestroy() {
    
  },
  created() {
    
    this.$http.get('http://pts.suoqoo.com/home.php/WechatLogin/accountLogin').then(res=>{console.log(res)})

    this.$http.get('http://pts.suoqoo.com/home.php/User/previewMember?token='+this.$store.state.token).then(res=>{
      console.log(res)
      if(res.data.StatusInfo.ReturnCode==200){
        this.$nextTick(()=>{
          this.nickname=res.data.nickname
          this.overtime=res.data.overTime
          this.vipprice=res.data.vipPrice
          this.virtualNumber=res.data.virtualNumber
        })
      }
    })
  },
  mounted() {
    this.$bus.emit("onTabBarEvent", {});
    this.getDate()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.personnalinfo{padding-top:28px;padding-bottom: 23px;max-height: 387px;background-color: #fff;}
.personnalinfo .flexpic{display: flex;justify-content: center}
.personnalinfo .pic{width: 120px;height: 120px;background-color: aqua;border-radius: 50%;position: relative;align-content: center}
.personnalinfo .pic .vip{width:26px;height: 26px;position: absolute;right:3px;bottom:0}
.personnalinfo .pic .vip img{width:26px;height: 26px;}
.personnalinfo .name{color:#333333;font-size: 20px;font-weight: bold;width:100%;text-align: center;margin-top: 20px}
.personnalinfo .phone{color:#494949;font-size: 18px;width: 100%;text-align: center;margin-top: 12px}
.personnalinfo .infobox{width:100%;margin-top: 33px}
.personnalinfo .infobox .expiretime{border-right:solid 1px #DDD}
/* .personnalinfo .infobox .integral{} */
.personnalinfo .infobox div .num{color:#333333;font-size: 15px;width: 100%;text-align: center}
.personnalinfo .infobox div .infoname{color:#999999;font-size: 10px;width: 100%;text-align: center}
/* width:150px!important; */
.header_btn{width:42.7%;margin-left:28.6%;height:39px;border-radius:20px;background:#06D5DE;line-height: 39px;text-align: center;color:#fff;font-size: 15px;flex: 1}
/* .header_btn1{margin-left: 13.3%}
.header_btn2{margin-left: 6%} */
.mylink{width: 95%;margin-left: 2.5%}
.mylink .link{height:52px}
.placeholder{height:100px}
</style>
