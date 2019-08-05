<template>
    <div style="width:100%;backgroundColor:#F8F8F8">
        <div class="personinfo">
            <group style="marginTop:12px">
                <XInput title="姓名" v-model="name" disabled text-align="right"></XInput>
                <XInput title="手机号" v-model="phone" disabled text-align="right"></XInput>
            </group>
                <p>退订理由</p>
            <group margin-top:>
                <x-textarea title="" disabled v-model="back_note"></x-textarea>
            </group>
            <group>
                <XInput title="提交时间" v-model="cancel_time" disabled text-align="right"></XInput>
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
    },
    data(){
        return{
            order_no:this.$router.currentRoute.query.order_no,
            back_note:'',
            cancel_time:'',
            phone:'',
            name:''
        }
    },
    methods:{
        getUnsubscribeDetail(){
            this.$http.get(`${this.rootPath}/User/cancelOrderView?token=${this.$store.state.token}&order_no=${this.order_no}`).then(res=>{
                console.log(res)
                if(res.data.StatusInfo.ReturnCode==200){
                    this.back_note=res.data.orderInfo.back_note
                    this.cancel_time=res.data.orderInfo.cancel_time
                    this.phone=res.data.orderInfo.phone
                    this.name=res.data.orderInfo.goods_number
                }
            })
        }
    },
    created(){
        this.getUnsubscribeDetail()
    }
}
</script>

<style scoped>
p{font-size: 16px;color:#222;font-weight: bold;margin-left: 15px;margin-top: 15px}
</style>
