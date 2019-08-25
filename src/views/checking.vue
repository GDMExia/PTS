<template>
    <div style="background-color:#F5F5F7">
        <div class="step"></div>
        <div style="font-size:16px;width:80%;margin-left:10%;margin-top:40px;text-align:center;line-height:34px">
            感谢您提交信息<br>
            我们需要一定的时间进行人工审核<br><br>

            除了再次进入或刷新本链接查看审核结果<br>
            我们还将以短信的方式告知您<br>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    components:{

    },
    data(){
        return{
           
        }
    },
    methods:{
        
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
.step{width:100%;height: 56px;background: url("../../static/img/icon/step2@2x.png") no-repeat center;background-size: 100% 100%}
</style>
