<template>
    <div>
        <div class="background"></div>
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

<style>
.background{background: url('../../static/img/icon/background@2x.png') no-repeat center;width:100%;height:276px}
.button{background: url('../../static/img/icon/next@2x.png') no-repeat center;width:40%;margin-left:30%;height:50px;margin-top:124px}
</style>
