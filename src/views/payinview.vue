<template>
    <div style="background-color:#F5F5F7">
        <div class="step"></div>
        <div style="font-size:16px;width:80%;margin-left:10%;margin-top:40px;line-height:34px">
            商户入驻“嘻格格”平台，将得到平台提供的优质服务。商户需一次性支付平台注册费人民币368元，其中包含：<br> 1. 商户注册账户一个，商户操作页面及后台管理系统；<br> 2. 商户账户同时享有VIP（个人）贵宾待遇，且不可转让；<br> 3. 一次商户的展示页面免费设计。<br>
        </div>
        <div class="button" @click="pay"></div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    components:{

    },
    data(){
        return{
           m_number:this.$route.query.m_number,
        }
    },
    methods:{
        pay(){
            let data=new FormData()
                data.append('m_number',this.m_number)
                this.$http({
                method: 'post',
                url: `${this.rootPath}/Merchants/createOrderSingin`,
                header: {
                    'Content-Type':'multipart/form-data'  
                },
                data: data
                }).then(res=>{
                    console.log(res)
                    if(res.data.StatusInfo.success){
                        location.href=`${this.rootPath}/Pay/orderBindPay?order_no=${res.data.order_no}&callback_url=http://pts.suoqoo.com/nh5/#/merchantbeforeagreementsign?m_number=${this.m_number}`
                    }else{
                        this.$vux.toast.text('支付失败，请稍后重试', 'top')
                    }
                })
        }
    },
    mounted(){
        console.log(this.$route.query.data)
        console.log(this.data)
    },
    watch:{
        
    }
}
</script>

<style scoped>
.step{width:100%;height: 56px;background: url("../../static/img/icon/step3@2x.png") no-repeat center;background-size: 100% 100%}
.button{background: url('../../static/img/icon/pay368@2x.png') no-repeat center;background-size:100% 100%;width:46%;margin-left:27%;height:70px;margin-top:128px}

</style>
