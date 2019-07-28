<template>
    <div style="width:100%;backgroundColor:#F8F8F8">
        <div class="personinfo">
            <group style="marginTop:12px">
                <XInput title="姓名" v-model="name" required text-align="right"></XInput>
                <XInput title="手机号" is-type="china-mobile" v-model="phone" required text-align="right" placeholder="请输入手机号" placeholder-align="right"></XInput>
            </group>
                <p>退订理由</p>
            <group margin-top:>
                <x-textarea title="" v-model="value" placeholder="请输入内容"></x-textarea>
            </group>
        </div>
        <div class="handle">
            <div class="button">提交</div>
        </div>
    </div>
</template>

<script>
import { Group , XInput , XTextarea } from 'vux'

export default {
    components:{
        Group,
        XInput,
        XTextarea
    }
}
</script>

<style scoped>
p{font-size: 16px;color:#222;font-weight: bold;margin-left: 15px;margin-top: 15px}
.handle{height:83px;width:100%;background-color: #fff;position: fixed;bottom:0;box-sizing: border-box;padding-top: 10px}
.handle .button{width:84%;margin-left:8%;height:40px;line-height: 40px;border-radius: 20px;background-color: #06D5DE;text-align: center;color: #fff;font-size: 15px}
</style>
