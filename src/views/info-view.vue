<template>
    <div>
        <div class="form">
        <group>
            <XInput title="昵称" v-model="nickname" disabled text-align="right"></XInput>
            <Selector title="性别" v-model="sex" :options="sexlist" direction="rtl"></Selector>
            <XInput title="年龄" v-model="old" required text-align="right" placeholder="请输入年龄" placeholder-align="right"></XInput>
            <XInput title="手机号" is-type="china-mobile" v-model="phone" required text-align="right" placeholder="请输入手机号" placeholder-align="right"></XInput>
            <XInput title="验证码" v-model="code" required text-align="right" placeholder="请输入验证码" placeholder-align="right"><div slot="right" style="color:#06D5DE;borderLeft:1px solid #F0F0F0">获取验证码</div></XInput>
        </group>
        </div>
        <div class="handle">
            <div class="button">提交</div>
        </div>
    </div>
</template>

<script>
import { Group , Selector , XInput } from 'vux'

export default {
    components:{
        Group,
        Selector,
        XInput
    },
    data(){
        return{
            sexlist:[{value:'女',label:'女'},{value:'男',label:'男'}],
            nickname:'我的名字叫雪梨',
            sex:'0',
            old:'',
            phone:'',
            code:''
        }
    }
}
</script>

<style>
.form{width:92%;margin-left:4%;border-radius: 10px;overflow: hidden}
.handle{height:83px;width:100%;background-color: #fff;position: fixed;bottom:0;box-sizing: border-box;padding-top: 10px}
.handle .button{width:84%;margin-left:8%;height:40px;line-height: 40px;border-radius: 20px;background-color: #06D5DE;text-align: center;color: #fff;font-size: 15px}
</style>
