<template>
    <div>
        <div class="form">
        <group>
            <XInput title="昵称" v-model="nickname" text-align="right"></XInput>
            <Selector title="性别" v-model="sex" :options="sexlist" direction="rtl"></Selector>
            <XInput title="年龄" v-model="age" text-align="right" placeholder="请输入年龄" placeholder-align="right"></XInput>
            <XInput title="手机号" is-type="china-mobile" v-model="phone" text-align="right" placeholder="请输入手机号" placeholder-align="right"></XInput>
            <XInput title="验证码" v-model="phone_code" text-align="right" placeholder="请输入验证码" placeholder-align="right" :show-clear="false" @on-blur="fixScroll"><div slot="right" style="color:#06D5DE;borderLeft:1px solid #F0F0F0" @click="getcode">{{codeshow}}</div></XInput>
        </group>
        </div>
        <div class="handle">
            <div class="button" @click="setinfo">提交</div>
        </div>
    </div>
</template>

<script>
import { Group , Selector , XInput } from 'vux'
import { mapActions } from "vuex";

export default {
    components:{
        Group,
        Selector,
        XInput
    },
    data(){
        return{
            sexlist:['女','男'],
            nickname:'',
            sex:'',
            age:'',
            phone:'',
            phone_code:'',
            clickable:true,
            codeshow:'获取验证码',
            interval:'',
        }
    },
    methods:{
    ...mapActions(['userDetail']),
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
        }
        // console.log(this.$store.state.isMember)
        })
    },
    fixScroll(e) {
    //   onBlur = (e) => {
    //     const { onBlur } = this.props;
    //     document.body && (document.body.scrollTop = document.body.scrollTop);
    //     onBlur && onBlur(e);
    console.log(111)
    window.scrollTo(0,0)
    },
    setinfo(){
        if(this.nickname&&this.sex&&/^1[3456789]\d{9}$/.test(this.phone)&&this.phone_code){
        this.$http({
        method: 'post',
        url: `${this.rootPath}/User/updateUserInfo?token=${this.$store.state.token}`,
        header: {
            'Content-Type':'multipart/form-data'  
        },
        params: {token:this.$store.state.token,nickname:this.nickname,sex:this.sex=='男'?'1':'0',phone:this.phone,phone_code:this.phone_code,age:this.age}
        }).then(res=>{
            if(res.data.StatusInfo.success){
                this.$router.push('/owner')
            }else{
                this.$vux.toast.text(res.data.ErrorDetailCode, 'top')
            }
        });
        }else{
            this.$vux.toast.text('请输入所有必填项', 'top')
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
                        this.$vux.toast.text(res.data.StatusInfo.ErrorDetailCode, 'top')
                    }
                })
            }
            }else{
                this.$vux.toast.text('请输入正确手机号', 'top')
                // this.$vux.toast.text(res.data.ErrorDetailCode, 'top')
            }
        }
    },
    created(){
        this.getinfo()
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

<style>
.form{width:92%;margin-left:4%;border-radius: 10px;overflow: hidden}
.handle{height:83px;width:100%;background-color: #fff;position: fixed;bottom:0;box-sizing: border-box;padding-top: 10px}
.handle .button{width:84%;margin-left:8%;height:40px;line-height: 40px;border-radius: 20px;background-color: #06D5DE;text-align: center;color: #fff;font-size: 15px}
</style>
