<template>
    <div style="background-color:#F5F5F7">
        <div class="background">
            <div style="font-size:20px;">嘻格格商家申请入驻</div>
            <div style="font-size:14px;margin-top:10px">- 信息提交平台 -</div>
            <div style="font-size:14px;margin-top:10px">v1.0</div>
        </div>
        <div class="button" @click="$router.push({path:'/merchantapply'})"></div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    methods:{

    },
    mounted(){
    }
}
</script>

<style scoped>
.background{background: url('../../static/img/icon/background@2x.png') no-repeat center;width:100%;height:276px;padding-top: 80px;background-size:100% 100% }
.background div{color: #fff;text-align: center}
.button{background: url('../../static/img/icon/next@2x.png') no-repeat center;width:46%;margin-left:27%;height:70px;margin-top:124px}
</style>
