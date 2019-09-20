<template>
    <div style="background-color:#F5F5F7;touch-action: none;">
      <div style="background: url('../../static/img/icon/yp_bg@2x.png') no-repeat center;background-size: 100% 85px;width: 95%;height: 85px;margin-left: 2.5%;position: relative;margin-top:12px">
        <img src="../../static/img/icon/yp_bg@2x.png" style="width:100%;height: 85px"/>
        <img src="../../static/img/icon/yp_ic@2x.png" style="width: 56px;height: 56px;position: absolute;left:1.5%;top:15px"/>
        <p style="position: absolute;left:18%;top:28px;font-size: 20px;color: #fff;">上海诚狐科技有限公司</p>
      </div>
      <group style="marginTop:12px">
        <XInput :title='`<span style="color:#666666;font-size:14px">会员名称</span>`' v-model="merchants_name" text-align="right" disabled></XInput>
        <XInput :title='`<span style="color:#666666;font-size:14px">会员当前积分</span>`' v-model="merchants_name" text-align="right" disabled></XInput>
      </group>
      <group style="marginTop:12px">
        <XInput :title='`<span style="color:#666666;font-size:14px">本次消费</span>`' v-model="merchants_name" text-align="right" placeholder="请输入本次消费"></XInput>
        <XInput :title='`<span style="color:#666666;font-size:14px">本次积分抵扣</span>`' v-model="merchants_name" text-align="right" placeholder="请输入本次积分抵扣"></XInput>
        <XInput :title='`<span style="color:#666666;font-size:14px">本次实际支付</span>`' v-model="merchants_name" text-align="right"></XInput>
      </group>

      <div style="display: flex;width:100%;justify-content:space-around;margin-top:83px">
        <div style="flex: 1;background-color:rgba(6, 213, 222, 0.5);color:#fff;text-align: center;width:40%;height:40px;border-radius: 20px;margin:10px 5%;padding-top:9px">确认并返回</div>
        <div style="flex: 1;background-color:rgba(6, 213, 222, 0.5);color:#fff;text-align: center;width:40%;height:40px;border-radius: 20px;margin:10px 5%;padding-top:9px">确认并继续</div>
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
            date:'',
            phone:'',
            phone_code:'',
            codeshow:'获取验证码',
            clickable:true,
            interval:'',
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
        getDate(){
            let date=new Date();
            let year=date.getFullYear();
            let month=(date.getMonth()+1)<10?('0'+(date.getMonth()+1)):(date.getMonth()+1)
            let day=date.getDate()<10?('0'+date.getDate()):date.getDate()
            this.date=year+'/'+month+'/'+day
            console.log(this.date)
        },
        scan(){
            console.log(11111)
            this.$wechat.scanQRCode({
                needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                }
            });
        }
    },
    mounted(){
        console.log(this.$route.query.data)
        console.log(this.data)
        this.getDate()
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
  .scan{width:100%;height:218px;background: url('../../static/img/icon/scan@2x.png') no-repeat center ;background-size: 218px 218px;margin-top:18px}
.background{background: url('../../static/img/icon/background@2x.png') no-repeat center;width:100%;height:276px;padding-top: 96px;background-size:100% 100% }
.background div{color: #fff;text-align: center}
.button{background: url('../../static/img/icon/login@2x.png') no-repeat center;width:46%;margin-left:27%;height:70px;margin-top:124px}
.vux-x-icon {
  fill: #E5E5E5;
}
</style>
