<template>
    <div style="width:100%;backgroundColor:#F8F8F8">
        <div class="personinfo">
            <group style="marginTop:12px">
                <XInput title="姓名" v-model="name" required text-align="right"  placeholder="请输入姓名"></XInput>
                <XInput title="手机号" is-type="china-mobile" v-model="phone" required text-align="right" placeholder="请输入手机号" placeholder-align="right"></XInput>
            </group>
                <p>退订理由</p>
            <group>
                <x-textarea title="" v-model="back_note" placeholder="请输入内容"></x-textarea>
            </group>
        </div>
        <div class="handle">
            <div class="button" @click="getUnsubscribe">提交</div>
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
    },
    data(){
        return{
            order_no:this.$router.currentRoute.query.order_no,
            back_note:'',
            name:'',
            phone:''
        }
    },
    methods:{
        getUnsubscribe(){
            if(this.name&&/^1[3456789]\d{9}$/.test(this.phone)&&this.back_note){
            this.$http({
            method: 'post',
            url: `/User/cancelOrder?token=${this.$store.state.token}`,
            header: {
                'Content-Type':'multipart/form-data'  
            },
            params: {token:this.$store.state.token,order_no:this.order_no,real_name:this.name,phone:this.phone,back_note:this.back_note}
            }).then(res=>{
                console.log(res)
                if(res.data.StatusInfo.ReturnCode==200){
                    this.$vux.toast.text('申请成功', 'top')
                    this.$router.push('/owner')
                }else{
                    this.$vux.toast.text('申请失败', 'top')
                }
            })
            }else{
                this.$vux.toast.text('请填写所有必填项', 'top')
            }
        }
    },
    mounted(){
        console.log(this.$router.currentRoute.query)
    }
}
</script>

<style scoped>
p{font-size: 16px;color:#222;font-weight: bold;margin-left: 15px;margin-top: 15px}
.handle{height:83px;width:100%;background-color: #fff;position: fixed;bottom:0;box-sizing: border-box;padding-top: 10px}
.handle .button{width:84%;margin-left:8%;height:40px;line-height: 40px;border-radius: 20px;background-color: #06D5DE;text-align: center;color: #fff;font-size: 15px}
</style>
