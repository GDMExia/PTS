<template>
    <div style="background-color:#F5F5F7">
        <div class="background">
            <div style="font-size:20px;">嘻格格商家版</div>
            <div style="font-size:16px;margin-top:14px">- 仅商家使用 -</div>
        </div>
        <div style="background-color:#fff;height:50px;width:83%;margin-left:8.5%;border-radius:50px;margin-top:-16px;overflow: hidden">
            <div style="width:24px;height:50px;display:inline-block;margin-left:4%" >
                <img src="../../static/img/icon/phone@2x.png" style="width:24px;height:24px;display:inline-block;margin-left:4%;margin-top:13px" alt="">
            </div>
            <input type="text" v-model="phone" placeholder="请输入店主或联系人手机号码" @blur="fixScroll" style="width:24px;height:24px;background-color:#fff;height:50px;width:83%;display:inline-block;margin-top:-13px"/>
        </div>
        <div style="background-color:#fff;height:50px;width:83%;margin-left:8.5%;border-radius:50px;margin-top:10px;overflow: hidden">
            <div style="width:24px;height:50px;display:inline-block;margin-left:4%" >
                <img src="../../static/img/icon/pcode@2x.png" style="width:24px;height:24px;display:inline-block;margin-left:4%;margin-top:13px" alt="">
            </div>
            <input type="text" v-model="phone_code" placeholder="请输入验证码" @blur="fixScroll" style="width:24px;height:24px;background-color:#fff;height:50px;width:50%;display:inline-block;margin-top:-13px"/>
            <div style="float:right;color:#06D5DE;font-size:14px;margin-top:15px;width:30%" @click="getcode">{{codeshow}}</div>
        </div>
        <div class="button" @click="submit"></div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    components:{

    },
    data(){
        return{
           phone:'',
           phone_code:'',
           codeshow:'获取验证码',
           clickable:true,
           interval:'',
        }
    },
    methods:{
        getcode(){
            console.log(111)
            if(/^1[3456789]\d{9}$/.test(this.phone)){
            if(this.clickable){
                this.clickable=false
                this.codeshow=60
                this.interval=setInterval(()=>{
                    this.codeshow--;
                },1000)
                this.$http.post(`${this.rootPath}/Sms/pushPhoneCode?phone=${this.phone}`).then(res=>{
                    console.log(res)
                    if(res.data.StatusInfo.ReturnCode!=200){
                        clearInterval(this.interval)
                        this.clickable=true
                        this.codeshow='重新获取'
                        this.$vux.toast.text('请输入正确手机号', 'top')
                    }
                })
            }
            }else{
                this.$vux.toast.text('请输入正确手机号', 'top')
            }
        },
        fixScroll() {
            window.scrollTo(0, 0);
        },
        submit(){
            // this.$router.push({path:'/merchantHome'})
            if(this.phone&&this.phone_code){
                // let token=this.GetQueryString('token')
                let data=new FormData()
                data.append('phone',this.phone)
                data.append('phone_code',this.phone_code)
                data.append('token',this.$store.state.token)
                this.$http({
                method: 'post',
                url: `${this.rootPath}/Merchants/loginCancel`,
                header: {
                    'Content-Type':'multipart/form-data'
                },
                data: data
                }).then(res=>{
                    console.log(res)
                    if(res.data.StatusInfo.success){
                        this.$vux.toast.text('登录成功', 'top')
                        this.$router.push({path:'/merchantHome',query:{token:res.data.token}})
                    }else{
                        this.$vux.toast.text(res.data.StatusInfo.ErrorDetailCode, 'top')
                    }
                })
            }
        }
    },
    mounted(){
        console.log(this.$route.query.data)
        console.log(this.data)
    },
    watch:{
        codeshow:{
            handler:function(val){
                console.log(val)
                if(val<=0){
                    clearInterval(this.interval)
                    this.clickable=true
                    this.codeshow='重新获取'
                }
            }
        }
    }
}
</script>

<style scoped>
.background{background: url('../../static/img/icon/background@2x.png') no-repeat center;width:100%;height:276px;padding-top: 96px;background-size:100% 100% }
.background div{color: #fff;text-align: center}
.button{background: url('../../static/img/icon/login@2x.png') no-repeat center;width:46%;margin-left:27%;height:70px;margin-top:124px}
.vux-x-icon {
  fill: #E5E5E5;
}
</style>
