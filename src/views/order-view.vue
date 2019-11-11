<template>
    <div class="main">
        <div class="orderitem" v-for="(item,index) of orderList" :key="index">
            <div class="name">{{item.goods_name}}</div>
            <div class="time">
                <img src="../../static/img/icon_time@2x.png" alt="" style="vertical-align: middle;margin-bottom: 2px"><p style="vertical-align: baseline">活动时间：{{item.create_time}}</p>
            </div>
            <!-- 0=待支付 ;1=待使用 ;2=已完成;3=退订 审核中;4=已退订; -->
            <div class="status" :class="item.order_status==0?'waitingforpay':item.order_status==1?'waiting':item.order_status==2?'finished':item.order_status==3?'checking':item.order_status==4?'unsubscribe':item.order_status==5?'cancelled':'ended'"></div>
            <div class="num">*{{item.goods_number}}</div>
            <div class="handlebutton">
              <div class="unsubscribebtn2" @click="cancelpay(item.order_no)" v-if="item.order_status==0">取消支付</div>
              <div class="unsubscribebtn" v-if="item.order_status!=3&&item.order_status!=4&&item.order_status!=5&&item.order_status!=6" @click="item.order_status==0?pay(item.order_no):item.order_status==1?$router.push({path:'/owners/unsubscribe',query:{order_no:item.order_no}}):item.order_status==2?(item.is_evaluation==0?$router.push({path:'/owners/advice',query:{order_no:item.order_no}}):$router.push({path:'/owners/adviced',query:{order_no:item.order_no}})):''">{{item.order_status==0?'继续支付':item.order_status==1?'退订':item.order_status==2?(item.is_evaluation==0?'评价':'我的评价'):item.order_status==3?'退订情况':item.order_status==4?'退订情况':''}}</div>
                <div class="view" @click="$router.push({path:'/owners/orderdetail',query:{order_no:item.order_no}})">查看</div>
            </div>
        </div>
      <Confirm
        v-model="confirm"
        :title="'积分不足，请前往充值积分'"
        :ref="'sure'"
        :name="'sure'"
        @on-cancel="onCancel"
        @on-confirm="onConfirm" >
      </Confirm>
      <Confirm
        v-model="cancelconfirm"
        :title="'确认取消订单？取消后订单将被删除'"
        :ref="'cancel'"
        :name="'cancel'"
        @on-cancel="onCancelCancel"
        @on-confirm="onCancelConfirm" >
      </Confirm>
    </div>
</template>

<script>
import { Confirm } from 'vux'
export default {
    components:{
        Confirm
    },
    data(){
        return {
            orderList:[],
            confirm:false,
            cancelconfirm:false,
            order_no:''
        }
    },
    methods:{
        getOrderlist(){
            this.$http.get(`${this.rootPath}/User/getOrder?token=${this.$store.state.token}&pageSize=1000&page=1`).then(res=>{
                console.log(res)
                if(res.data.StatusInfo.ReturnCode==200){
                    this.orderList=res.data.orderList
                }
            })
        },
        cancelpay(order_no){
            this.cancelconfirm=true
            console.log(1111111)
            this.order_no=order_no
        },
        pay(order_no){
            let dat={
                order_no:order_no,
                token:this.$store.state.token
            }
            console.log(dat)
            this.$http({
                method: 'post',
                url: `${this.rootPath}/User/checkAccountPrice?token=${this.$store.state.token}&order_no=${order_no}`,
                header: {
                    'Content-Type':'multipart/form-data'
                },
                data: dat
            }).then(ret=>{
                // this.$http.post(`${this.rootPath}/User/checkAccountPrice`,{order_no=res.order_no}).then(res=>{
                console.log(ret)
                if(ret.data.StatusInfo.ReturnCode==200){
                    if(ret.data.is_pay===1){
                        // this.$http.get(`${this.rootPath}/Pay/orderGoodsPay?order_no=${res.order_no}`).then(res=>{
                        //     console.log(res)
                        // })
                        location.href=`${this.rootPath}/Pay/orderGoodsPay?order_no=${order_no}`
                    }else{
                        this.confirm=true
                    }
                }
            })
        },
        onCancel(){
            if(this.formItem.perNum>1){
                this.formItem.perNum--;
                this.useAccount();
            }
        },
        onConfirm(){
            this.$router.push('/owners/pay')
        },
        onCancelCancel(){
            this.order_no=''
        },
        onCancelConfirm(){
            this.$http({
                method: 'post',
                url: `${this.rootPath}/User/cancelGoodsOrder?token=${this.$store.state.token}&order_no=${this.order_no}`,
                header: {
                    'Content-Type':'multipart/form-data'
                },
            }).then(res=>{
                console.log(res)
                if(res.data.StatusInfo.ReturnCode==200){
                    this.$vux.toast.text('取消成功', 'top')
                    this.getOrderlist()
                }else{
                    this.$vux.toast.text('取消失败', 'top')
                }
            })
        }
    },
    created(){
        this.getOrderlist()
    }
}
</script>

<style scoped>
.main{width:100%}
.orderitem{width:92%;margin-left:4%;height:158px;position: relative;background-color: #fff;border-radius: 12px;margin-top:10px}
.orderitem .name{font-size: 15px;color: #333;width:71%;position: absolute;left:5.6%;top:19px;}
.orderitem .time{font-size: 12px;color:#666;position: absolute;left:5.6%;top:74px;width:60%;}
.orderitem .time p{vertical-align: top;display: inline-block;vertical-align: top}
.orderitem .time img{width:12px;height:12px;display: inline-block}
.orderitem .status{width:54px;height:21px;position: absolute;right:0;top:9px}
.waiting{background: url('../../static/img/icon/waiting@2x.png') center no-repeat;background-size: 54px 21px;}
.finished{background: url('../../static/img/icon/finished@2x.png') center no-repeat;background-size: 54px 21px;}
.checking{background: url('../../static/img/icon/checking@2x.png') center no-repeat;background-size: 54px 21px;}
.unsubscribe{background: url('../../static/img/icon/unsubscribe@2x.png') center no-repeat;background-size: 54px 21px;}
.waitingforpay{background: url('../../static/img/icon/waitingForPay@2x.png') center no-repeat;background-size: 54px 21px;}
.cancelled{background: url('../../static/img/icon/cancelled@2x.png') center no-repeat;background-size: 54px 21px;}
.ended{background: url('../../static/img/icon/ended@2x-2.png') center no-repeat;background-size: 54px 21px;}
.orderitem .num{position: absolute;top:54px;right:4%;font-size: 15px;color:#333;}
.orderitem .handlebutton{height:57px;width:94%;margin-left:6%;border-top: 1px solid #F0F0F0;position: absolute;bottom:0;}
.orderitem .handlebutton .unsubscribebtn{width:27%;height:34px;text-align: center;line-height: 34px;margin-top:10px;color:#06D5DE;border-radius: 20px;border: 1px solid #06D5DE;font-size: 14px;display: inline-block;position: absolute;right:36%}
.orderitem .handlebutton .unsubscribebtn2{width:27%;height:34px;text-align: center;line-height: 34px;margin-top:10px;color:#06D5DE;border-radius: 20px;border: 1px solid #06D5DE;font-size: 14px;display: inline-block;position: absolute;right:66%}
.orderitem .handlebutton .view{width:27%;height:34px;text-align: center;line-height: 34px;margin-top:10px;color:#fff;border-radius: 20px;border: 1px solid #06D5DE;background-color: #06D5DE;font-size: 14px;display: inline-block;position: absolute;right:5.6%}
</style>
