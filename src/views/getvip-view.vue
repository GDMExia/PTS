<template>
    <div class="main">
        <div class="vipinfo">
            <div class="vipimg">
                <img src="/src/assets/icon/icon_vip_small@2x.png" alt="">
            </div>
            <div class="vipname">VIP会员</div>
            <div class="expiretime"><p>到期日</p> <p style="color:#06D5DE;">2020/05/10</p></div>
            <div class="price">168元/年</div>
        </div>
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
            <div class="button">立即支付</div>
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

<style scoped>
.main{width: 100%;padding-top: 10px;background-color: #F8F8F8;}
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
