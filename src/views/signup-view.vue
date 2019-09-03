<template>
    <div style="height:100%;">
        <div class="activity-detail">
            <img class="activity-image" :src="goodsInfo.cover" alt="">
            <div class="activity-right">
                <p class="f16 title-text">{{goodsInfo.goods_name}}</p>
                <p class="time">
                    <img src="../../static/img/icon_time@2x.png" alt="">
                    参与日期：{{goodsInfo.join_time}}
                </p>
            </div>
        </div>
        <div class="persons">
            <div class="sign f15">
                <x-number title="报名人数" width="44px" v-model="formItem.perNum" :min="1" :max="maxNum" @on-change="useAccount"></x-number>
            </div>
            <div class="sign f15">
                <x-input title="联系人" placeholder="请输入" v-model="userInfo.nickname" placeholder-align="right"></x-input>
            </div>
            <div class="sign f15" style="border: 0">
                <x-input title="联系电话" name="mobile" v-model="userInfo.phone" placeholder="请输入" placeholder-align="right" keyboard="number" is-type="china-mobile"></x-input>
            </div>
        </div>
        <div class="persons" style="margin-top: 12px;">
            <!-- <div class="sign f16 center">
                <span>应支付</span>
                <span>￥{{amount}}</span>
            </div> -->
            <div class="sign f16 center">
                <span>积分余额</span>
                <span>{{userInfo.account_price}}</span>
            </div>
            <div class="sign f16 center" style="border: 0">
                <div>
                    <span>积分抵扣</span>
                    <span class="f12 color45">(每人可抵扣{{goodsInfo.discount_price}}）</span>
                </div>
                <img v-if="accountCheck" style="width: 16px; height: 16px;" src="../../static/img/check out_s@2x.png" alt="">
                <!-- <img v-if="!accountCheck" @click="usediscount()" style="width: 16px; height: 16px;" src="../../static/img/icon/icon_danxuan@2x.png" alt=""> -->
            </div>
        </div>
        <div class="tips f0">
            <span class="f12 color666">提交支付，视为阅读并同意</span>
            <span class="f12 color05DE">《PTS平台退订协议》</span>
        </div>
        <div class="bottom">
            <div class="f0" style="height: 48px;display: flex;align-items: center;">
                <span class="f12 color49">线下须支付</span>
                <span class="f20 colorred">¥ {{payAmount}}</span>
            </div>
            <div class="pay-submit f15" @click="handleSign">
                支付
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { Group, Cell, XNumber, XInput } from 'vux'
export default {
  components: {
    Group,
    Cell,
    XNumber,
    XInput
  },
  computed: {
    ...mapGetters(['getToken', 'getActivityDetail', 'getUserInfo'])
  },
  name: "HomePage",
  data() {
    return {
        goodsInfo: {},
        userInfo: {},
        formItem: {
            perNum: 1,
        },
        discount_price: '',
        amount: 0,
        payAmount: 0,
        accountCheck: true,
        maxNum: 1
    };
  },
  methods: {
    ...mapActions(['signUp', 'paymentAmount']),
    usediscount() {
        this.accountCheck = !this.accountCheck
        this.useAccount()
    },
    useAccount() {
        let params = {
            token: this.$store.state.token,
            goods_id: this.goodsInfo.goods_id,
            goods_number: this.formItem.perNum,
        }
        this.paymentAmount(params).then(res=>{
            if(res.StatusInfo.success) {
               if(this.accountCheck) {
                    this.payAmount = res.orderPrice
                    this.amount = res.totalPrice
                } else {
                    this.payAmount = res.totalPrice
                    this.amount = res.totalPrice
                } 
            } else {
                this.toastShow(res.StatusInfo.ErrorDetailCode)
            }
            
        })
    },
    // 立即报名
    handleSign() {
        if(!this.userInfo.nickname) {
            this.toastShow('请输入联系人')
            return
        }
        if(!this.userInfo.phone) {
            this.toastShow('请输入联系电话')
            return
        }
        let params = {
            token: this.$store.state.token,
            goods_id: this.goodsInfo.goods_id,
            goods_number: this.formItem.perNum,
            real_name: this.userInfo.nickname,
            phone: this.userInfo.phone,
            // discount_price: this.discount_price,
        }
        this.signUp(params).then(res=>{
            if(res.StatusInfo.success) {
                this.$router.push({path:'/owners/orderdetail',query:{order_no:res.order_no}})
            } else {
                this.toastShow(res.StatusInfo.ErrorDetailCode)
            }
        })
    }
  },
  beforeDestroy() {
    
  },
  created() {
    
  },
  mounted() {
    this.goodsInfo = this.getActivityDetail.goodsInfo
    this.userInfo = this.getUserInfo.userInfo
    this.maxNum = Math.floor(this.userInfo.account_price/this.goodsInfo.discount_price)
    this.useAccount()
    // this.payAmount = this.amount = this.goodsInfo.goods_price
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.activity-detail {
  width: 92%;
  height: 150px;
  margin: 12px 4% 17px 4%;
  background: #ffffff;
  padding: 15px 16px 15px 10px;
  display: flex;
  box-shadow: 0 -2px 14px rgba(0,0,0,0.06);
  border-radius: 5px;
}
.activity-detail .activity-image {
    width: 120px;
    height: 120px;
    border-radius: 5px;
}
.f16 {
    font-size: 16px;
    color: #333333;
}
.f12 {
    font-size: 12px;
}
.f20 {
    font-size: 20px;
    margin-left: 6px;
}
.colorred {
    color: #FF0000;
}
.color666 {
    color: #666666;
}
.color45 {
    color: #454545;
}
.color49 {
    color: #494949
}
.color05DE {
    color: #06D5DE;
}
.activity-right {
    margin-left: 12px;
}
.name-price {
  display: flex;
  justify-content: space-between;
}
.title-text {
  color: #323643;
  font-weight: 600;
  max-width: 197px;
}
.time {
  color: #666666;
  font-size: 12px;
  padding-top: 21px;
}
p img {
  width: 12px;
  height: 12px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 5px;
}
.f15 {
    font-size: 15px;
}
.persons {
    width: 100%;
    background: #ffffff;
}
.persons .sign {
   margin-left: 15px;
   height: 50px;
   border-bottom: 1px solid #F0F0F0;
}
.persons .sign .weui-cell {
    height: 100%;
    padding: 0;
    padding-right: 20px;
}
.weui-cell .vux-cell-primary input {
    height: 24px!important;
    font-size: 14px!important;
    background: #F6F6F6!important;
    width: 44px!important;
    color: #323643!important;
    -webkit-appearance: none;
    appearance: none;
    border: 0!important;
}
.center {
    line-height: 50px;
    display: flex;
    justify-content: space-between;
    padding-right: 20px;
    align-items: center;
}
.tips {
    margin: 36px 36px 30px 36px;  
}
.f0 {
    font-size: 0;
}
.bottom {
    display: flex;
    background: #fff;
    height: 83px;
    padding: 7px 16px 28px 20px;
    justify-content: space-between;
}
.pay-submit {
    background:#38DDE5;
    border-radius: 30px;
    color: #ffffff;
    -moz-box-shadow:0px 6px 9px rgba(56, 221, 229, 0.3); 
    -webkit-box-shadow:0px 6px 9px rgba(56, 221, 229, 0.3); 
    box-shadow:0px 6px 9px rgba(56, 221, 229, 0.3);
    width: 160px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    margin-top: 6px;
}
</style>
