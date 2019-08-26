<template>
    <div style="background-color:#F5F5F7">
        <div class="step"></div>
        <div style="font-size:16px;width:80%;margin-left:10%;margin-top:40px;line-height:34px">
            恭喜您已经成功支付商户注册费用<br>点击“下一步”<br>完成后面的签约流程吧。<br>
        </div>
        <div class="button" @click="next"></div>
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
        next(){
            this.$router.push({path:'/merchantagreementsign',query:{m_number:this.m_number}})
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
.step{width:100%;height: 56px;background: url("../../static/img/icon/step4@2x.png") no-repeat center;background-size: 100% 100%}
.button{background: url('../../static/img/icon/next@2x.png') no-repeat center;background-size:100% 100%;width:46%;margin-left:27%;height:70px;margin-top:128px}

</style>
