<template>
    <div class="main">
        <div class="vipinfo">
            <div class="vipimg">
                <img src="../../static/img/icon/icon_vip_small@2x.png" alt="">
            </div>
            <div class="vipname">VIP会员</div>
            <div class="expiretime"><p>到期日</p> <p style="color:#06D5DE;">{{overTime}}</p></div>
            <div class="price">{{vipPrice}}元/年</div>
        </div>
        <div class="form">
        <group>
            <XInput title="昵称" v-model="nickname" text-align="right"></XInput>
            <Selector title="性别" v-model="sex" :options="sexlist" direction="rtl"></Selector>
            <Datetime title="生日" v-model="age" text-align="right" placeholder="请选择出生日期" :min-year="1930" :max-year="nowYear" placeholder-align="right" disable-future></Datetime>
<!--            <Calendar title="生日" v-model="age" text-align="right" placeholder="请输入年龄" placeholder-align="right"></Calendar>-->
            <XInput title="手机号" is-type="china-mobile" v-model="phone" text-align="right" placeholder="请输入手机号" placeholder-align="right"></XInput>
            <XInput title="验证码" v-model="phone_code" text-align="right" placeholder="请输入验证码" placeholder-align="right" :show-clear="false" @on-blur="fixScroll"><div slot="right" style="color:#06D5DE;borderLeft:1px solid #F0F0F0" @click="getcode">{{codeshow}}</div></XInput>
        </group>
        </div>
        <div class="handle">
            <div class="button" @click="getvip">立即支付</div>
        </div>
    </div>
</template>

<script>
import { Group , Selector , XInput , Calendar, Datetime } from 'vux'
import { setInterval, clearInterval } from 'timers';

export default {
    components:{
        Group,
        Selector,
        XInput,
        Calendar,
        Datetime
    },
    data(){
        return{
            sexlist:['女','男'],
            nickname:'',
            sex:'',
            age:'',
            phone:'',
            phone_code:'',
            codeshow:'获取验证码',
            clickable:true,
            interval:'',
            overTime:'',
            vipPrice:'',
            nowYear: ''
        }
    },
    created() {
    // this.$http.get('http://pts.suoqoo.com/home.php/WechatLogin/accountLogin').then(res=>{console.log(res)})
    console.log(this.$store.state.token)
    // this.$http.get('http://pts.suoqoo.com/home.php/User/getUserInfo?token='+this.$store.state.token).then(res=>{
        this.getvipinfo()
        this.getinfo()
        let date = new Date()
        this.nowYear = date.getFullYear()
    },
    methods:{
        getvipinfo(){
            this.$http.get(`${this.rootPath}/User/previewMember?token=${this.$store.state.token}`).then(res=>{
            console.log(res)
            if(res.data.StatusInfo.ReturnCode==200){
                this.$nextTick(()=>{
                this.nickname=res.data.nickname
                this.overTime=res.data.overTime
                this.vipPrice=res.data.vipPrice
                })
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
            this.sex=res.data.userInfo.sex==1?'男':'女'
            this.phone=res.data.userInfo.phone
            this.age=res.data.userInfo.age
            })
        }else{
            if(res.data.StatusInfo.ReturnCode==603){
            this.$store.commit('setToken','')
            }
        }
        // console.log(this.$store.state.isMember)
        })
        },
        fixScroll(){
            window.scrollTo(0,0)
        },
        vip(){
            return this.$http({
            method: 'post',
            url: `${this.rootPath}/User/createMember?token=${this.$store.state.token}`,
            header: {
                'Content-Type':'multipart/form-data'
            },
            params: {token:this.$store.state.token,nickname:this.nickname,sex:this.sex=='男'?'1':'0',phone:this.phone,phone_code:this.phone_code,age:this.age}
            });
        },
        getvip(){
            console.log(this.nickname,this.sex,/^1[3456789]\d{9}$/.test(this.phone),this.phone_code)
            if(this.nickname&&this.sex&&/^1[3456789]\d{9}$/.test(this.phone)&&this.phone_code){
            // this.$http.post('http://pts.suoqoo.com/home.php/User/createMember?token=c1599f283f6bce195a98a3f3d9c3f10865891753',{nickname:this.nickname,sex:this.sex=='男'?'1':'0',phone:this.phone,phone_code:this.phone_code}).then(res=>{
            this.vip().then(res=>{
                console.log(res)
                let orderNo=res.data.order_no
                if(res.data.StatusInfo.success){
                    // this.$router.push('/owner')
                    location.href=this.rootPath+'/Pay/orderPay?order_no='+orderNo
                }
            })
            }else{
                this.$vux.toast.text('请填写所有信息', 'top')
            }
        },
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
                    }
                })
            }
            }else{
                this.$vux.toast.text('请输入正确手机号', 'top')
            }
        }
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
.main{width: 100%;padding-top: 10px;background-color: #F8F8F8;touch-action: none;}
.vipinfo{width: 92%;margin-left: 4%;height:80px;background-color: #fff;padding-top: 15px;box-sizing: border-box;position: relative;}
.vipinfo .vipimg{width:50px;height: 50px;margin-left: 6%;}
.vipinfo .vipimg img{width:50px;height: 50px}
.vipinfo .vipname{font-size: 15px;color: #333333;position: absolute;top:19px;left:26.5%}
.vipinfo .expiretime{font-size: 12px;color:#999;position: absolute;top:46px;left:26.5%;width: 41%}
.vipinfo .expiretime p{display: inline-block}
.vipinfo .price{color:#DE1E06;font-size: 18px;position: absolute;top:28px;right:3.4%}

.form{width:92%;margin-left:4%;border-radius: 10px;overflow: hidden}
.handle{height:83px;width:100%;background-color: #fff;position: fixed;bottom:0;box-sizing: border-box;padding-top: 10px}
.handle .button{width:84%;margin-left:8%;height:40px;line-height: 40px;border-radius: 20px;background-color: #06D5DE;text-align: center;color: #fff;font-size: 15px}

</style>
