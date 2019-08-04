<template>

</template>

<script>
import { mapActions } from 'vuex'
export default {
    methods:{
        ...mapActions(['accountLogin']),
        login(){
            this.accountLogin('http://pts.suoqoo.com').then(res=>{
                console.log(res)
            })
        }
    },
    mounted(){
        this.login()
    }
}
</script>

<style>

</style>
