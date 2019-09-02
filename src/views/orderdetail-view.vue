<template>
    <div style="width:100%;backgroundColor:#F8F8F8">
        <div class="productinfo">
            <div class="image">
                <img :src="goods_pic" alt="">
            </div>
            <div class="name">{{goods_name}}</div>
            <div class="time">
                <img src="../../static/img/icon_time@2x.png" alt=""><p>参与时间：{{create_time}}</p>
            </div>
        </div>
        <div class="personinfo">
            <group>
                <XInput title="报名人数" v-model="goods_number" disabled text-align="right"></XInput>
                <XInput title="联系人" v-model="real_name" disabled text-align="right" placeholder="请输入年龄" placeholder-align="right"></XInput>
                <XInput title="手机号" v-model="phone" disabled text-align="right" placeholder="请输入手机号" placeholder-align="right"></XInput>
            </group>
        </div>
        <div class="priceinfo">
            <group>
                <XInput title="线下须支付" v-model="total_price" disabled text-align="right"></XInput>
                <XInput title="积分抵扣" v-model="deduction_price" disabled text-align="right" placeholder="请输入年龄" placeholder-align="right"></XInput>
                <XInput title="实际支付" v-model="order_price" disabled text-align="right" placeholder="请输入手机号" placeholder-align="right"></XInput>
            </group>
        </div>
        <div class="moreinfo">
            <img src="../../static/img/icon/icon_ddxq_tishi@2x.png" alt=""><p>如需退订，可在待使用状态下点击【退订】按钮，提交基本信息，我们将进行线下退款</p>
        </div>
        <div class="placeholder"></div>
        <div class="handle">
            <div class="button" :class="orderstatus!='1'?'unsubscribe':''" @click="orderstatus==1?$router.push({path:'/owners/unsubscribe',query:{order_no:order_no}}):''">{{orderstatus==1?'退订':orderstatus==2?'评价':orderstatus==3?'退订情况':orderstatus==4?'退订情况':''}}</div>
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
        return {
            order_no:this.$router.currentRoute.query.order_no,
            goods_name:'',
            real_name:'',
            phone:'',
            goods_number:'',
            goods_pic:'',
            create_time:'',
            order_price:'',
            deduction_price:'',
            total_price:'',
            orderstatus:''
        }
    },
    methods:{
        getDetail(){
            this.$http.get(`${this.rootPath}/User/orderView?token=${this.$store.state.token}&order_no=${this.order_no}`).then(res=>{
                console.log(res)
                if(res.data.StatusInfo.ReturnCode==200){
                    this.goods_name=res.data.orderInfo.goods_name
                    this.real_name=res.data.orderInfo.real_name
                    this.phone=res.data.orderInfo.phone
                    this.goods_number=res.data.orderInfo.goods_number
                    this.goods_pic=res.data.orderInfo.goods_pic
                    this.create_time=res.data.orderInfo.create_time
                    this.order_price=res.data.orderInfo.order_price
                    this.deduction_price=res.data.orderInfo.deduction_price
                    this.total_price=res.data.orderInfo.total_price
                    this.orderstatus=res.data.orderInfo.order_status
                }
            })
        }
    },
    created(){
        this.getDetail()
    },
    mounted(){
        console.log(this.$router.currentRoute)
    }
}
</script>

<style scoped>
.productinfo{width:92%;margin-left: 4%;height: 150px;border-radius: 20px;position: relative;background-color: #fff;padding-top: 15px;margin-top: 12px}
.productinfo .image{width:120px;height:120px;margin-left: 3%;border-radius: 20px;background-color:aqua;}
.productinfo .image img{width:120px;height:120px;}
.productinfo .name{width:55.5%;font-size: 16px;color:#323643;font-weight: bold;position: absolute;top:15px;left:45%;}
.productinfo .time{font-size: 12px;color:#666;position: absolute;left:45%;top:102px;width:50%;}
.productinfo .time p{vertical-align: top;display: inline-block;vertical-align: top}
.productinfo .time img{width:12px;height:12px;display: inline-block}
.moreinfo{width:87%;margin-left: 6.5%;margin-top:10px;overflow: hidden}
.moreinfo img{width:16px;height:16px;display: inline-block;float: left}
.moreinfo p{display: inline-block;font-size: 12px;color:#999;width:90%;vertical-align: bottom;float: right;}
.handle{height:83px;width:100%;background-color: #fff;position: fixed;bottom:0;box-sizing: border-box;padding-top: 10px}
.handle .button{width:84%;margin-left:8%;height:40px;line-height: 40px;border-radius: 20px;background-color: #06D5DE;text-align: center;color: #fff;font-size: 15px}
.unsubscribe{background-color: #666!important;}
.placeholder{height:83px}
</style>
