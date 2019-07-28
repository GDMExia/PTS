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
            <group>
                <XInput title="提交时间" is-type="china-mobile" v-model="time" required text-align="right" placeholder="请输入手机号" placeholder-align="right"></XInput>
            </group>
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
</style>
