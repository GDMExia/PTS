<template>
    <div style="background-color:#F5F5F7">
        <div class="step"></div>
        <div style="font-size:16px;width:80%;margin-left:10%;margin-top:40px;text-align:center;line-height:34px">
            感谢您成功签约入驻“嘻格格”<br>
            我们将尽快为您安排店铺上架<br>
            嘻格格期望与您合作共赢！<br>
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
.step{width:100%;height: 56px;background: url("../../static/img/icon/step5@2x.png") no-repeat center;background-size: 100% 100%}
</style>
