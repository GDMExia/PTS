<template>
    <div style="background-color:#F5F5F7;touch-action: none;">
      <div v-if="uid" style="padding-bottom: 87px">
        <div style="background: url('../../static/img/icon/yp_bg@2x.png') no-repeat center;background-size: 100% 85px;width: 95%;height: 85px;margin-left: 2.5%;position: relative;margin-top:12px">
          <img src="../../static/img/icon/yp_bg@2x.png" style="width:100%;height: 85px"/>
          <img src="../../static/img/icon/yp_ic@2x.png" style="width: 56px;height: 56px;position: absolute;left:1.5%;top:15px"/>
          <p style="position: absolute;left:18%;top:28px;font-size: 20px;color: #fff;">{{merchants_name}}</p>
        </div>
        <group style="marginTop:12px">
          <XInput :title='`<span style="color:#666666;font-size:14px">会员名称</span>`' v-model="nickname" text-align="right" disabled></XInput>
          <XInput :title='`<span style="color:#666666;font-size:14px">会员当前积分</span>`' v-model="account_price" text-align="right" disabled></XInput>
        </group>
        <group style="marginTop:12px">
          <XInput :title='`<span style="color:#666666;font-size:14px">本次消费</span>`' type="number" v-model="original_price" text-align="right" placeholder="请输入本次消费"  @blur="fixScroll"></XInput>
          <XInput :title='`<span style="color:#666666;font-size:14px">本次积分抵扣</span>`' type="number" v-model="discount_price" text-align="right" :placeholder="`${original_price?`最多抵扣${parseFloat(this.original_price)-(parseFloat(this.original_price)*(this.discount/10))}积分`:'请输入本次积分抵扣'}`"  @blur="fixScroll"></XInput>
          <XInput :title='`<span style="color:#666666;font-size:14px">本次实际支付</span>`' v-model="really_price" text-align="right" placeholder="待计算" style="color:#FF0000" @blur="fixScroll"></XInput>
        </group>

        <div style="display: flex;width:100%;justify-content:space-around;margin-top:83px;position: fixed;bottom:0;height: 87px">
  <!--        <div style="flex: 1;background-color:rgba(6, 213, 222, 0.5);color:#fff;text-align: center;width:40%;height:40px;border-radius: 20px;margin:10px 5%;padding-top:9px" @click="$router.go(-1)">确认并返回</div>-->
          <div style="flex: 1;background-color:rgba(6, 213, 222, 0.5);color:#fff;text-align: center;width:40%;height:40px;border-radius: 20px;margin:10px 5%;padding-top:9px" :class="(really_price!=''&&really_price!='待计算')?'sure':''" @click="pay">确认</div>
        </div>
      </div>
      <div v-if="order_no" style="padding-bottom: 87px">
        <div class="productinfo">
          <div class="image">
            <img :src="goods_pic" alt="">
          </div>
          <div class="name">{{goods_name}}</div>
          <div class="time">
            <p style="font-size: 18px;color:#DE1E06">¥{{order_price}}</p><p style="font-size: 14px;color:#FF6C00;vertical-align: bottom">+{{(total_price-order_price).toFixed(2)}}积分</p>
          </div>
        </div>
        <group style="marginTop:12px">
          <XInput :title='`<span style="color:#666666;font-size:14px">会员名称</span>`' v-model="nickname" text-align="right" disabled></XInput>
          <XInput :title='`<span style="color:#666666;font-size:14px">会员当前积分</span>`' v-model="account_price" text-align="right" disabled></XInput>
        </group>
        <group style="marginTop:12px">
          <XInput :title='`<span style="color:#666666;font-size:14px">报名人数</span>`' v-model="goods_number" text-align="right" disabled><span slot="right" style="font-size:14px">人</span></XInput>
          <XInput :title='`<span style="color:#666666;font-size:14px">实际人数</span>`' type="number" @on-change="changeNum" v-model="actual_number" text-align="right"><span slot="right" style="font-size:14px" @blur="fixScroll">人</span></XInput>
        </group>
        <group style="marginTop:12px">
          <XInput :title='`<span style="color:#666666;font-size:14px">本次消费</span>`' type="number" v-model="show_total_price" text-align="right" placeholder="待计算" disabled></XInput>
          <XInput :title='`<span style="color:#666666;font-size:14px">本次积分抵扣</span>`' type="number" v-model="show_discount_price" text-align="right" disabled :placeholder="'待计算'"  @blur="fixScroll"></XInput>
          <XInput :title='`<span style="color:#666666;font-size:14px">本次实际支付</span>`' v-model="actual_price" text-align="right" placeholder="待计算" disabled style="color:#FF0000;font-size:14px"></XInput>
        </group>
        <div style="display: flex;width:100%;justify-content:space-around;margin-top:83px;;position: fixed;bottom:0;height: 87px">
          <!--        <div style="flex: 1;background-color:rgba(6, 213, 222, 0.5);color:#fff;text-align: center;width:40%;height:40px;border-radius: 20px;margin:10px 5%;padding-top:9px" @click="$router.go(-1)">确认并返回</div>-->
          <div style="flex: 1;background-color:rgba(6, 213, 222, 0.5);color:#fff;text-align: center;width:40%;height:40px;border-radius: 20px;margin:10px 5%;padding-top:9px" :class="actual_number!=''?'sure':''" @click="pay">确认</div>
        </div>
      </div>
    </div>
</template>

<script>
import { Group , XInput } from 'vux'

export default {
  components:{
    Group,
    XInput
  },
    data(){
        return{
            uid: this.$route.query.uid,
            token: this.$route.query.token,
            order_no: this.$route.query.order_no,
            nickname:'',
            merchants_name:'',
            account_price:'',
            original_price:'',
            discount_price:'',
            really_price:'',
            discount:'',
            goods_pic:'',
            goods_number:'',
            actual_number:'',
            total_price:'',
            show_total_price:'',
            goods_name:'',
            order_price:'',
            show_discount_price:'',
            actual_price:''
        }
    },
    methods:{
        submit(){
            if(this.phone&&this.phone_code){
                // let token=this.GetQueryString('token')
                let data=new FormData()
                data.append('phone',this.phone)
                data.append('phone_code',this.phone_code)
                data.append('token',this.$store.state.token)
                this.$http({
                    method: 'post',
                    url: `${this.rootPath}/Merchants/login`,
                    header: {
                        'Content-Type':'multipart/form-data'
                    },
                    data: data
                }).then(res=>{
                    console.log(res)
                    if(res.data.StatusInfo.success){
                        this.$vux.toast.text('登录成功', 'top')
                        if(res.data.StatusInfo.ReturnCode==801){
                            this.$router.push({path:'/merchantapply',query:{phone:this.phone}})
                        }
                        if(res.data.StatusInfo.ReturnCode==802){
                            this.$router.push({path:'/merchantchecking'})
                        }
                        if(res.data.StatusInfo.ReturnCode==803){
                            this.$vux.toast.text('您的审核未通过，请稍后重试', 'top')
                        }
                        if(res.data.StatusInfo.ReturnCode==806){
                            this.$router.push({path:'/merchantchecked',query:{m_number:res.data.m_number}})
                        }
                        if(res.data.StatusInfo.ReturnCode==807){
                            this.$router.push({path:'/merchantbeforeagreementsign',query:{m_number:res.data.m_number}})
                        }
                        if(res.data.StatusInfo.ReturnCode==805){
                            this.$router.push({path:'/merchantsigned'})
                        }
                        // this.$router.push({path:'/merchantagreementsign',query:{data:JSON.stringify(res.data.userInfo)}})
                    }else{
                        if(res.data.StatusInfo.ReturnCode==603){
                            this.$store.commit('setToken','')
                            location.href = `http://pts.suoqoo.com/home.php/WechatLogin/merchantsAccountLogin`
                            // this.$router.push({path:'/merchantagreement'})
                        }else{
                            this.$vux.toast.text(res.data.StatusInfo.ErrorDetailCode, 'top')
                        }
                    }
                })
            }
        },
        getData(){
            // /Merchants/getConsumptionInfo
            if(this.uid) {
                this.$http.post(`${this.rootPath}/Merchants/getConsumptionInfo?token=${this.token}&uid=${this.uid}`).then(res => {
                    console.log(res)
                    if (res.data.StatusInfo.success) {
                        this.merchants_name = res.data.merchantsInfo.merchants_name
                        this.discount = res.data.merchantsInfo.discount
                        this.account_price = res.data.userMemberInfo.account_price
                        this.nickname = res.data.userMemberInfo.real_name
                    } else {
                        this.$vux.toast.text(res.data.StatusInfo.ErrorDetailCode, 'top')
                    }
                })
            }
            if(this.order_no){
                this.$http.post(`${this.rootPath}/Merchants/getGoodsInfo?token=${this.token}&order_no=${this.order_no}`).then(res => {
                      console.log(res)
                      if (res.data.StatusInfo.success) {
                          this.goods_pic = res.data.orderInfo.goods_pic
                          this.goods_name = res.data.orderInfo.goods_name
                          this.order_price = res.data.orderInfo.order_price
                          this.total_price = res.data.orderInfo.total_price
                          this.goods_number = res.data.orderInfo.goods_number
                          this.account_price = res.data.userMemberInfo.account_price
                          this.nickname = res.data.userMemberInfo.real_name
                      } else {
                          this.$vux.toast.text(res.data.StatusInfo.ErrorDetailCode, 'top')
                      }
                  })
            }
        },
        pay(){
            if(this.original_price&&this.original_price) {
                let data = new FormData()
                data.append('token', this.token)
                data.append('uid', this.uid)
                data.append('discount_price', this.discount_price)
                data.append('original_price', this.original_price)
                this.$http({
                    method: 'post',
                    url: `${this.rootPath}/Merchants/createCancelConsumption`,
                    header: {
                        'Content-Type': 'multipart/form-data'
                    },
                    data: data
                }).then(res => {
                    console.log(res)
                    if (res.data.StatusInfo.success) {
                        this.$vux.toast.text('核销成功', 'top')
                        this.$router.push({path: '/merchantHome', query: {token: this.token}})
                    } else {
                        this.$vux.toast.text(res.data.StatusInfo.ErrorDetailCode, 'top')
                    }
                })
            }
            if(this.order_no&&this.actual_number&&this.show_discount_price&&this.actual_price){
                let data = new FormData()
                data.append('token', this.token)
                data.append('order_no', this.order_no)
                data.append('actual_number', this.actual_number)
                data.append('discount_price', this.show_discount_price)
                data.append('actual_price', this.actual_price)
                this.$http({
                    method: 'post',
                    url: `${this.rootPath}/Merchants/createOrderGoods`,
                    header: {
                        'Content-Type': 'multipart/form-data'
                    },
                    data: data
                }).then(res => {
                    console.log(res)
                    if (res.data.StatusInfo.success) {
                        this.$vux.toast.text('核销成功', 'top')
                        this.$router.push({path: '/merchantHome', query: {token: this.token}})
                    } else {
                        this.$vux.toast.text(res.data.StatusInfo.ErrorDetailCode, 'top')
                    }
                })
            }
        },
        // handleOriginalPrice(val){
        //     console.log(console.log(val))
        //     if(isNaN(parseFloat(val))){
        //         this.original_price=0
        //         this.discount_price=0
        //         this.really_price='待计算'
        //     }
        //     if(!isNaN(parseFloat(val))){
        //         this.original_price=parseFloat(val)
        //         this.discount_price=0
        //         this.really_price='待计算'
        //     }else{
        //         this.original_price=0
        //         this.discount_price=0
        //         this.really_price='待计算'
        //     }
        // },
        // handleDiscountPrice(val){
        //     if(!isNaN(parseFloat(this.original_price)>0)){
        //         if(parseFloat(val)&&(parseFloat(this.original_price)*(1-(this.discount/10)))>=val&&val>0){
        //             this.discount_price=parseFloat(val)
        //             this.really_price=parseFloat(this.original_price)-parseFloat(this.discount_price)
        //         }else{
        //             this.discount_price=0
        //             this.really_price='待计算'
        //         }
        //     }else{
        //         this.discount_price=0
        //         this.really_price='待计算'
        //     }
        // }
        fixScroll() {
            window.scrollTo(0, 0);
        },
        changeNum(){
            if(!parseFloat(this.actual_number)||this.actual_number>this.goods_number){
                this.actual_number=this.goods_number
            }
            this.show_total_price=this.total_price*this.actual_number
            this.show_discount_price=(this.total_price-this.order_price)*this.actual_number
            this.actual_price=this.order_price*this.actual_number
            this.show_total_price=this.show_total_price.toFixed(2)
            this.show_discount_price=this.show_discount_price.toFixed(2)
            this.actual_price=this.actual_price.toFixed(2)
            console.log(1111)
        }
    },
    mounted(){
        console.log(this.$route.query.uid)
        console.log(this.$route.query.token)
        console.log(this.data)
        this.getData()
    },
    watch:{
        discount_price:{
            handler:function(val){
                if(parseFloat(this.original_price)>0){
                    if(parseFloat(val)&&(parseFloat(this.original_price)-(parseFloat(this.original_price)*(this.discount/10)))>=val&&val>0&&val<=parseFloat(this.account_price)){
                        this.discount_price=parseFloat(val)
                        this.really_price=parseFloat(this.original_price)-parseFloat(this.discount_price)
                    }else{
                        this.discount_price=''
                        this.really_price='待计算'
                        this.$vux.toast.text('请输入正确的抵扣积分数量', 'middle')
                    }
                }else{
                    this.discount_price=''
                    this.really_price='待计算'
                }
            }
        },
        original_price:{
            handler:function (val) {
                if(parseFloat(val)){
                    this.original_price=parseFloat(val)
                    this.discount_price=''
                    this.really_price='待计算'
                }else{
                    this.original_price=''
                    this.discount_price=''
                    this.really_price='待计算'
                }
            }
        },
        actual_number:{
            handler:function(val){
                if(val>this.goods_number){
                    this.actual_number=this.this.goods_number
                }
            }
        }
    }
}
</script>

<style scoped>
  .scan{width:100%;height:218px;background: url('../../static/img/icon/scan@2x.png') no-repeat center ;background-size: 218px 218px;margin-top:18px}
.background{background: url('../../static/img/icon/background@2x.png') no-repeat center;width:100%;height:276px;padding-top: 96px;background-size:100% 100% }
.background div{color: #fff;text-align: center}
.button{background: url('../../static/img/icon/login@2x.png') no-repeat center;width:46%;margin-left:27%;height:70px;margin-top:124px}
.vux-x-icon {
  fill: #E5E5E5;
}
  .sure{
    background-color: #06D5DE!important;
  }
  .productinfo{width:92%;margin-left: 4%;height: 150px;border-radius: 20px;position: relative;padding-top: 15px;margin-top: 12px;background-color: #fff;}
  .productinfo .image{width:120px;height:120px;margin-left: 3%;border-radius: 10px;background-color:aqua;}
  .productinfo .image img{width:120px;height:120px;border-radius: 10px;}
  .productinfo .name{width:55.5%;font-size: 16px;color:#323643;font-weight: bold;position: absolute;top:15px;left:45%;}
  .productinfo .time{font-size: 12px;color:#666;position: absolute;left:45%;top:104px;width:60%;}
  .productinfo .time p{vertical-align: top;display: inline-block;vertical-align: top}
  .productinfo .time img{width:12px;height:12px;display: inline-block}
</style>
