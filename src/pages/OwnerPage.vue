<template>
  <div style="height:100%;">
    <tabbarComponent :tabIndex=4></tabbarComponent>
    <home-provider></home-provider>
      <div class="personnalinfo">
        <div class="flexpic">
        <div class="pic">
          <img :src="header_pic" alt="">
        </div>
        <div class="vip" v-if="is_member==1">
          <img src="../../static/img/icon/vip@2x.png" alt="">
          <p style="color:#1BDBE4;font-size: 12px;position: absolute;left:32%;top:4px">{{uid_number}}</p>
        </div>
        </div>
        <div class="name">{{nickname}}</div>
        <div class="phone">{{phone}}</div>
        <div class="qrcode" v-if="is_member==1" @click="showcode"><img src="../../static/img/icon/qr@2x.png" alt=""></div>
        <Flexbox class="infobox" v-if="is_member==1">
          <FlexboxItem class="expiretime">
            <p class="num">{{over_time}}</p>
            <p class="infoname">会员到期日</p>
          </FlexboxItem>
          <FlexboxItem class="integral">
            <p class="num">{{account_price}}</p>
            <p class="infoname">当前积分</p>
          </FlexboxItem>
        </Flexbox>
        <Flexbox v-if="is_member==1" style="marginTop:12px">
          <FlexboxItem v-if="is_member==1"><div class="header_btn header_btn1" @click="getvip">续费VIP</div></FlexboxItem>
          <FlexboxItem><div class="header_btn header_btn2" @click="$router.push('/owners/sign')">每日打卡</div></FlexboxItem>
          <!-- <FlexboxItem><div class="header_btn" @click="$router.push('/owners/advice')">成为vip</div></FlexboxItem> -->
        </Flexbox>
        <div class="getvip" v-else @click="getvip">成为VIP</div>
      </div>
    <div class="mylink">
    <Group>
      <CellBox :is-link="true" class="link" link=/owners/info><span>个人信息</span></CellBox>
      <CellBox :is-link="true" class="link" link=/owners/mywallet><span>我的钱包</span></CellBox>
      <CellBox :is-link="true" class="link" link=/owners/myorder><span>我的订单</span></CellBox>
      <!-- <CellBox :is-link="true" class="link" link=/owners/mydiscount><span>我的优惠</span></CellBox> -->
      <CellBox :is-link="true" class="link" link=/owners/myshare><span>我的分享</span></CellBox>
      <CellBox :is-link="true" class="link" ><span>联系客服</span></CellBox>
      <!-- link=/merchant -->
    </Group>
    </div>
    <div class="placeholder"></div>

    <div class="Poptip" v-if="showPop">
      <img src="../../static/img/icon/mycode@2x.png" alt="" style="width: 52.8%;height:28px;margin-left:23.6%">
      <img :src="codeImgUrl" alt="" style="width:60%;height:128px;margin-top: 26px;margin-left: 20%">
      <img src="../../static/img/icon/pop_del@2x.png" alt="" style="position: absolute;bottom:-50px;width:14%;height:30px;left: 43%" @click="hidecode">
    </div>
    <div class="mask" v-if="showPop"></div>
  </div>
</template>

<script>
import TabbarComponent from "@/components/TabbarComponent.vue";
import { Flexbox, FlexboxItem , Group , CellBox } from 'vux'
import { mapActions } from "vuex";
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
      is_member:'',
      header_pic:'',
      nickname:'',
      over_time:'',
      phone:'',
      account_price:'',
      date:'',
      uid_number:'',
      showPop:false,
      codeImgUrl:''
    };
  },
  methods: {
    ...mapActions(['userDetail']),
    getDate(){
      let date=new Date()
      this.date=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
    },
    getvip(){
      this.$http.get(`${this.rootPath}/User/createMember?token=${this.$store.state.token}`).then(res=>{
        console.log(res)
        let orderNo=res.data.order_no
        if(res.data.StatusInfo.success){
          // this.$http.get(`${this.rootPath}/Pay/orderPay?order_no=${orderNo}`).then(res=>{
          //   console.log(res)
          // })
          location.href=this.rootPath+'/Pay/orderPay?order_no='+orderNo
          // this.getinfo()
        }else{
          this.$router.push('/owners/getvip')
        }
      })
    },
    getinfo(){
      this.$http.get(`${this.rootPath}/User/getUserInfo?token=${this.$store.state.token}`).then(res=>{
      // this.userDetail({token: 'c1599f283f6bce195a98a3f3d9c3f10865891753'}).then(res=>{})
      console.log(res)
      if(res.data.StatusInfo.ReturnCode==200){
        this.$nextTick(()=>{
          this.nickname=res.data.userInfo.nickname
          this.over_time=res.data.userInfo.over_time
          this.phone=res.data.userInfo.phone
          this.account_price=res.data.userInfo.account_price
          this.header_pic=res.data.userInfo.header_pic
          this.is_member=res.data.userInfo.is_member
          this.uid_number=res.data.userInfo.uid_number
          this.codeImgUrl=res.data.userInfo.codeImgUrl
        })
      }else{
        if(res.data.StatusInfo.ReturnCode==603){
          this.$store.commit('setToken','')
        }
      }
      // console.log(this.$store.state.isMember)
    })
    },
    showcode(){
      this.showPop=true
    },
    hidecode(){
      this.showPop=false
    }
  },
  computed: {

  },
  beforeDestroy() {

  },
  created() {
    this.getinfo()
  },
  mounted() {
    this.$bus.emit("onTabBarEvent", {});
    this.getDate()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.personnalinfo{padding-top:28px;padding-bottom: 23px;max-height: 387px;background-color: #fff;position: relative;}
.personnalinfo .flexpic{display: flex;justify-content: center}
.personnalinfo .pic{width: 120px;height: 120px;background-color: aqua;border-radius: 50%;position: relative;align-content: center;overflow:hidden}
.personnalinfo .vip{width:24%;height: 26px;position: absolute;left:38%;top:124px;}
.personnalinfo .vip img{width:100%;height: 26px;}
.personnalinfo .name{color:#333333;font-size: 20px;font-weight: bold;width:100%;text-align: center;margin-top: 20px}
.personnalinfo .phone{color:#494949;font-size: 18px;width: 100%;text-align: center;margin-top: 12px}
.personnalinfo .qrcode{position: absolute;right:8%;top:60px;width: 48px;height: 48px}
.personnalinfo .qrcode img{width: 48px;height: 48px}
.personnalinfo .infobox{width:100%;margin-top: 33px}
.personnalinfo .infobox .expiretime{border-right:solid 1px #DDD}
/* .personnalinfo .infobox .integral{} */
.personnalinfo .infobox div .num{color:#333333;font-size: 15px;width: 100%;text-align: center}
.personnalinfo .infobox div .infoname{color:#999999;font-size: 10px;width: 100%;text-align: center}
/* width:150px!important; */
/* 42.7% */
.getvip{width:42.7%;height:39px;margin-left:28.65%;text-align: center;background-color: #38DDE5;line-height: 39px;font-size: 15px;color:#fff;border-radius: 20px;position: absolute;bottom:-20px}
.header_btn{width:79%;margin-left:28.6%;height:39px;border-radius:20px;background:#06D5DE;line-height: 39px;text-align: center;color:#fff;font-size: 15px;flex: 1}
.header_btn1{margin-left: 13.3%}
.header_btn2{margin-left: 6%}
.mylink{width: 95%;margin-left: 2.5%;margin-top:35px}
.mylink .link{height:52px}
.placeholder{height:100px}

.Poptip{
  background-color: #fff;
  width: 57.6%;
  height: 223px;
  border-radius: 10px;
  z-index: 1001;
  position: absolute;
  left: 21.2%;
  top: 208px;
}
  .mask{
    width: 100%;
    height:100%;
    background-color: rgba(0,0,0,0.2);
    z-index: 1000;
    position: absolute;
    top:0;
    left:0;
  }
</style>
