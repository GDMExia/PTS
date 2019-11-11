<template>
    <div class="main">
        <p>请选择充值金额</p>
        <div class="selectmode">
            <div class="button" :class="btn==item.package_id?'selected':''" @click="change(item.package_id)" v-for="(item,index) of vipList" :key="index" v-if="item.package_name!='100元'">
                <p class="price">{{item.package_name}}</p>
                <p class="detail">得{{item.package_integral}}积分</p>
            </div>
            <!-- <div class="button" :class="btn==1?'selected':''" @click="change(1)">
                <p class="price">300元</p>
                <p class="detail">得800积分</p>
            </div>
            <div class="button" :class="btn==2?'selected':''" @click="change(2)">
                <p class="price">500元</p>
                <p class="detail">得1500积分</p>
            </div> -->
<!--            <div class="placehold"></div>-->
        </div>
        <div class="more1">
            <p>充值说明</p>
            <ul>
                <li>1积分=1元</li>
                <li>积分充值成功后无法退款，不可提现</li>
                <li>如存在无法充值、充值失败等问题，可在【我的】-【联系客服】中进行咨询</li>
                <li>积分可在活动支付时按该活动要求进行抵扣</li>
            </ul>
        </div>
        <div class="handle">
            <div class="button" @click="pay">立即支付</div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            btn:1,
            vipList:[]
        }
    },
    methods:{
        change(val){
            this.btn=val
        },
        getPaylist(){
            this.$http.get(`${this.rootPath}/Index/getOrderPackage`).then(res=>{
                console.log(res)
                if(res.data.StatusInfo.ReturnCode==200){
                    this.vipList=res.data.packageList
                }
            })
        },
        pay(){
            this.$http({
            method: 'post',
            url: `${this.rootPath}/User/createPackageOrder?token=${this.$store.state.token}`,
            header: {
                'Content-Type':'multipart/form-data'
            },
            params: {token:this.$store.state.token,package_id:this.btn}
            }).then(res=>{
                console.log(res)
                if(res.data.StatusInfo.ReturnCode==200){
                    // this.$vux.toast.text('充值成功', 'top')
                    // this.$router.push('/owner')
                    let orderNo=res.data.order_no
                    if(res.data.StatusInfo.success){
                        // this.$router.push('/owner')
                        location.href=this.rootPath+'/Pay/packageOrderPay?order_no='+orderNo
                    }
                }else{
                    this.$vux.toast.text('充值失败', 'top')
                }
            })
        },
    },
    created(){
        this.getPaylist()
    }
}
</script>

<style scoped>
.main{width: 100%;background-color: #F8F8F8}
p{font-size: 16px;color: #222;display: inline-block;margin: 12px 0 0 4%;font-weight: bold}
.selectmode{width: 100%;display: flex;flex-wrap: wrap}
.selectmode .button{flex: 1;width:180px;height: 105px;background: url('../../static/img/icon/pay@2x.png') center no-repeat;background-size: 180px 105px;display:inline-block;flex-basis: 180px;display: flex;flex-direction: column;align-items: space-around}
.selectmode .button.selected{background: url('../../static/img/icon/payselected@2x.png') center no-repeat;background-size: 180px 105px;}
.selectmode .button .price{text-align: center;font-size: 18px;color: #222;display: block;margin-top: 21px}
.selectmode .button .detail{text-align: center;font-size: 15px;color: #999;display: block;}
.placehold{flex: 1;width:180px;height: 105px;display:inline-block;flex-basis: 180px;}
ul,li{list-style: disc!important;list-style-position: inside!important;font-size: 15px;color:#494949;width: 88%;margin-left:4%}
.handle{height:83px;width:100%;background-color: #fff;position: fixed;bottom:-2px;box-sizing: border-box;padding-top: 10px}
.more1 {margin-top:119px;width:100%;padding-left:2.5%;margin-left: 1%}

.handle .button{width:84%;margin-left:8%;height:40px;line-height: 40px;border-radius: 20px;background-color: #06D5DE;text-align: center;color: #fff;font-size: 15px}
</style>
