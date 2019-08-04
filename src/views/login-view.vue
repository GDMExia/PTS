<template>

</template>

<script>
import { mapActions } from 'vuex'
export default {
    methods:{
        ...mapActions(['accountLogin']),
        login(){
            // this.accountLogin('http://192.168.31.144:8080/#/owners/login').then(res=>{
            // // this.accountLogin('http://pts.suoqoo.com').then(res=>{
            //     console.log(res)
            // })
            console.log(111)
            this.$http.get('/WechatLogin/accountLogin?callback_url=http://192.168.31.144:8080/#/owners/login').then(res=>{console.log(res)})
        }
    },
    mounted(){
        this.login()
    }
}
</script>

<style>

</style>
