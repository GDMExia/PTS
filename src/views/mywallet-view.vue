<template>
    <div class="main">
        <div class="info">
            <div class="expiretime">
                <p style="color:#999999">会员到期日</p> <p style="color:#333333">{{over_time}}</p>
            </div>
            <div class="integral">
                <p style="color:#999999">当前积分</p><img src="../../static/img/icon/icon_tishi@2x.png" alt=""> <p style="color:#333333">{{account_price}}</p>
            </div>
            <div class="paybutton" @click="$router.push('/owners/pay')"></div>
        </div>
        <div class="change">
            <div class="useintegral" :class="btn==1?'select':''" @click="change(1)">消费积分记录</div>
            <div class="getintegral" :class="btn==2?'select':''" @click="change(2)">获取积分记录</div>
        </div>
        <div class="usedetail" v-if="btn==1&&paymentList">
            <div class="detail" v-for="(item,index) of paymentList" :key="index">
                <div class="name">{{item.note}}</div>
                <div class="time">{{item.create_time}}</div>
                <div class="changenum">-{{item.order_price}}</div>
            </div>
        </div>
        <div class="getdetail" v-if="btn==2&&paymentList.length>0">
            <div class="detail" v-for="(item,index) of paymentList" :key="index">
                <div class="name">{{item.note}}</div>
                <div class="time">{{item.create_time}}</div>
                <div class="changenum">+{{item.order_price}}</div>
            </div>
        </div>
        <div style="width:100%;text-align:center;margin-top:20px;color:#999" v-else>暂无数据</div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            btn:1,
            paymentList:[],
            over_time:'',
            account_price:''
        }
    },
    methods:{
        change(val){
            this.btn=val
            this.paymentList=[]
            this.getDetaillist()
        },
        getDetaillist(){
            this.$http.get(`${this.rootPath}/User/getPaymentLog?token=${this.$store.state.token}&payment_type=${this.btn}&pageSize=1000&page=1`).then(res=>{
                console.log(res)
                if(res.data.StatusInfo.ReturnCode==200){
                    this.paymentList=res.data.paymentList
                }
            })
        },
        getinfo(){
        this.$http.get(`${this.rootPath}/User/getUserInfo?token=${this.$store.state.token}`).then(res=>{
        // this.userDetail({token: 'c1599f283f6bce195a98a3f3d9c3f10865891753'}).then(res=>{})
        console.log(res)
        if(res.data.StatusInfo.ReturnCode==200){
            this.$nextTick(()=>{
            this.over_time=res.data.userInfo.over_time
            this.account_price=res.data.userInfo.account_price
            })
        }
        // console.log(this.$store.state.isMember)
        })
    }
    },
    created(){
        this.getDetaillist()
        this.getinfo()
    }
}
</script>

<style scoped>
.main{width: 100%;background-color: #F8F8F8}
.info{width: 92%;height:100px;margin-left: 4%;border-radius: 10px;background-color: #fff;margin-top: 10px;position: relative;}
.info .expiretime{font-size: 15px;position: absolute;top: 24px;left: 6.2%;width: 50%}
.info .expiretime p{display: inline-block}
.info .integral{font-size: 15px;position: absolute;top: 60px;left: 6.2%;width: 50%}
.info .integral p{display: inline-block;vertical-align: top}
.info .integral img{width: 16px;height: 16px;display: inline-block;margin-top:2px}
.info .paybutton{width:118px;height:58px;background: #fff url('../../static/img/icon/btn_wycz@2x.png') center no-repeat;background-size: 118px 58px;position: absolute;top:22px;right:1.5%}

.change{background-color: #fff;width: 90%;margin-left:5%;height:40px;border-radius: 20px;overflow: hidden;position: relative;margin-top:31px}
.change div{display:inline-block;width:50%;font-size: 15px;height:40px;line-height: 40px;text-align: center;position: absolute;}
.change .useintegral{left:0}
.change .getintegral{right:0}
.change div.select{background-color: #06D5DE;border-radius: 20px;color:#fff}

.usedetail{width:100%;background-color: #fff;position: relative;margin-top:20px}
.usedetail .detail{width:95%;margin-left:5%;border-bottom: 1px solid #F0F0F0;height:80px;position: relative;}
.usedetail .detail .name{color:#333333;font-size: 15px;width: 76%;white-space: nowrap;text-overflow: ellipsis;overflow:hidden;position: absolute;left:0;top:21px;display: inline-block}
.usedetail .detail .time{color:#999;position: absolute;font-size: 12px;left:0;top:48px;display: inline-block}
.usedetail .detail .changenum{color:#0BB900;font-size: 18px;position: absolute;top:28px;right:5.6%;display: inline-block}

.getdetail{width:100%;background-color: #fff;position: relative;margin-top:20px}
.getdetail .detail{width:95%;margin-left:5%;border-bottom: 1px solid #F0F0F0;height:80px;position: relative;}
.getdetail .detail .name{color:#333333;font-size: 15px;width: 76%;white-space: nowrap;text-overflow: ellipsis;overflow:hidden;position: absolute;left:0;top:21px;display: inline-block}
.getdetail .detail .time{color:#999;position: absolute;font-size: 12px;left:0;top:48px;display: inline-block}
.getdetail .detail .changenum{color:#DE1E06;font-size: 18px;position: absolute;top:28px;right:5.6%;display: inline-block}
</style>
