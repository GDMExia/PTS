<template>
    <div style="background-color:#F5F5F7">
        <div style="width:100%;text-align:center;color:#06D5DE;font-size:16px;margin-top:24px">请如实完善以下信息</div> 
        <group style="marginTop:12px">
            <XInput :title='`<span style="color:#666666;font-size:14px">商户名称</span>`' v-model="merchants_name" required text-align="right"></XInput>
            <XInput :title='`<span style="color:#666666;font-size:14px">推介人姓名</span>`' v-model="recommended_real_name" text-align="right"></XInput>
            <XInput :title='`<span style="color:#666666;font-size:14px">推介人手机号码</span>`' is-type="china-mobile" v-model="recommended_phone" text-align="right"></XInput>
            <XInput :title='`<span style="color:#666666;font-size:14px">商户申请人姓名</span>`' v-model="merchant_applicant" required text-align="right"></XInput>
            <XInput :title='`<span style="color:#666666;font-size:14px;white-space: nowrap">商户申请人手机号码</span>`' is-type="china-mobile" v-model="merchant_applicant_phone" required text-align="right"></XInput>
            <XInput :title='click1?`<span style="color:#666666;font-size:14px;white-space: nowrap">请在此输入短信验证码</span>`:""' v-model="phone_code" text-align="right" required placeholder="" placeholder-align="right" :show-clear="false"><div slot="right" style="color:#06D5DE;borderLeft:1px solid #F0F0F0" @click="getcode">{{codeshow}}</div></XInput>
        </group>
        <group style="marginTop:12px;margin-bottom:20px">
            <XInput :title='`<span style="color:#666666;font-size:14px">商户地址</span>`' v-model="address" required text-align="right" placeholder="省-市-区-门牌号码"></XInput>
            <XInput :title='`<span style="color:#666666;font-size:14px">服务热线</span>`' v-model="hotline_phone" text-align="right"></XInput>
            <XInput :title='`<span style="color:#666666;font-size:14px">营业时间段</span>`' v-model="hours_time" text-align="right"></XInput>
            <XInput :title='`<span style="color:#666666;font-size:14px"></span>`' v-model="ttt" text-align="right" disabled></XInput>
            <Checklist title='支付方式（可多选）' v-model="payment" :options="options" style="font-size:14px"></Checklist>
        </group>
        <span style="color:#666666;font-size:14px;">商户简介（限100字）</span>
        <group style="margin-bottom:20px">
            <XTextarea title="" v-model="merchants_content" required text-align="right"></XTextarea>
        </group>
        <span style="color:#666666;font-size:14px">请上传资质文件图片（最多5张）</span>
        
        <group style="margin-bottom:20px">
        <div style="width: 80px;height: 80px; position: relative;cursor:pointer;display:inline-block">
            <div style="position:absolute;left:0;top:0;width:80px;height:80px">
                <x-icon type="ios-plus-empty" size="80"></x-icon>
            </div>
            <div style="position:absolute;left:0;top:0;width:80px;height:80px">
                <input type="file" id="upload" @change="uploaddocument_pic" style="width:80px;height:80px;opacity:0;" multiple :disabled="document_pic.length>=5"/>
            </div>
            
        </div>
        <p style="position:absolute;right:0;top:15px;display:inline-block;width:60%;height:80px;color:#999999;font-size:14px">请上传营业执照及食品安全认证、有机食品认证、品牌授权书等行业相关证书或证件的图片</p>
        <div v-for="(item,index) of document_pic1" :key="index">{{item.name}}</div>
        </group>
        <span style="color:#666666;font-size:14px">创始人或实际经营人简介（限200字）</span>
        
        <group style="margin-bottom:20px">
            <XTextarea title="" v-model="operator_content" required text-align="right" placeholder="相关从业经历、个人荣誉、经营理念等" style="font-size:14px"></XTextarea>
        </group>
        <span style="color:#666666;font-size:14px">请上传个人形象照及个人相关证书图片（最多5张）</span>
        
        <group style="margin-bottom:20px">
        <div style="width: 80px;height: 80px; position: relative;cursor:pointer;display:inline-block">
            <div style="position:absolute;left:0;top:0;width:80px;height:80px">
                <x-icon type="ios-plus-empty" size="80"></x-icon>
            </div>
            <div style="position:absolute;left:0;top:0;width:80px;height:80px">
                <input type="file" id="upload" @change="uploadphoto" style="width:80px;height:80px;opacity:0;" multiple :disabled="photo.length>=5"/>
            </div>
            <!-- <div v-for="(item.index) of document_pic">{{item}}</div> -->
        </div>
        <p style="position:absolute;right:0;top:15px;display:inline-block;width:60%;height:80px;color:#999999;font-size:14px">请上传创始人或实际经营者的个人形象照及个人相关荣誉证书、资质证书、聘书等</p>
        <div v-for="(item,index) of photo1" :key="index">{{item.name}}</div>
        </group>
        <div class="button" @click="confirm"></div>
    </div>
</template>

<script>
import { Group , XInput , XTextarea , Checklist , DatetimeRange } from 'vux'

import { mapActions } from 'vuex'
export default {
    components:{
        Group,
        XInput,
        XTextarea,
        Checklist,
        DatetimeRange
    },
    data(){
        return{
            options:['现金','银行卡','微信支付','支付宝'],
            phone_code:'',
            codeshow:'获取验证码',
            clickable:true,
            click1:true,
            ttt:'',
            interval:'',
            document_pic:[],
            photo:[],
            document_pic1:[],
            photo1:[],
            merchants_name:'',
            recommended_real_name:'',
            recommended_phone:'',
            merchant_applicant:'',
            merchant_applicant_phone:'',
            address:'',
            hotline_phone:'',
            hours_time:'',
            payment:[],
            merchants_content:'',
            operator_content:'',
        }
    },
    methods:{
        uploaddocument_pic(event){ 
            console.log(event.target.files)
            // let data=new FormData()
            // data.append('file_image',event.target.files)
            let length=event.target.files.length
            for(let i=0;i<length;i++){
            this.upload(event.target.files[i]).then(res=>{
                console.log(res)
                if(res.data.StatusInfo.success){
                    this.document_pic.push(res.data.fileId)
                    this.document_pic1.push(event.target.files[i])
                }
            })
            }
        },
        uploadphoto(event){ 
            console.log(event.target.files.length)
            let length=event.target.files.length
            for(let i=0;i<length;i++){
            this.upload(event.target.files[i]).then(res=>{
                console.log(res)
                if(res.data.StatusInfo.success){
                    this.photo.push(res.data.fileId)
                    this.photo1.push(event.target.files[i])
                }
            })
            }
        },
        upload(file){
            console.log(file)
            let data=new FormData()
            data.append('file_image',file)
            return this.$http({
            method: 'post',
            url: `${this.rootPath}/File/uploadsImage`,
            header: {
                'Content-Type':'multipart/form-data'  
            },
            data: data
            })
        },
        getcode(){
            console.log(111)
            if(/^1[3456789]\d{9}$/.test(this.merchant_applicant_phone)){
            if(this.clickable){
                this.click1=false
                this.clickable=false
                this.codeshow=30
                this.interval=setInterval(()=>{
                    this.codeshow--;
                },1000)
                this.$http.post(`${this.rootPath}/Sms/pushPhoneCode?phone=${this.merchant_applicant_phone}`).then(res=>{
                    console.log(res)
                    if(res.data.StatusInfo.ReturnCode!=200){
                        clearInterval(this.interval)
                        this.clickable=true
                        this.codeshow='重新获取'
                        this.$vux.toast.text('请输入正确手机号', 'top')
                    }
                })
            }
            }else{
                this.$vux.toast.text('请输入正确手机号', 'top')
            }
        },
        confirm(){
            if(this.merchants_name&&this.merchant_applicant&&/^1[3456789]\d{9}$/.test(this.merchant_applicant_phone)&&this.address&&this.document_pic&&this.phone_code){
                let data={
                    document_pic:this.document_pic,
                    photo:this.photo,
                    merchants_name:this.merchants_name,
                    recommended_real_name:this.recommended_real_name,
                    recommended_phone:this.recommended_phone,
                    merchant_applicant:this.merchant_applicant,
                    merchant_applicant_phone:this.merchant_applicant_phone,
                    address:this.address,
                    hotline_phone:this.hotline_phone,
                    hours_time:this.hours_time,
                    payment:this.payment,
                    merchants_content:this.merchants_content,
                    operator_content:this.operator_content,
                    phone_code:this.phone_code
                }
                console.log(data)
                this.$router.push({path:'/merchantapplysecond',query:{data:JSON.stringify(data)}})
            }else{
                this.$vux.toast.text('请填写必填项', 'top')
            }
        },
    },
    mounted(){
        
    },
    watch:{
        codeshow:{
            handler:function(val){
                console.log(val)
                if(val<=0){
                    clearInterval(this.interval)
                    this.clickable=true
                    this.codeshow='重新获取'
                }
            }
        }
    }
}
</script>

<style scoped>
.background{background: url('../../static/img/icon/background@2x.png') no-repeat center;width:100%;height:276px}
.button{background: url('../../static/img/icon/next@2x.png') no-repeat center;width:40%;margin-left:30%;height:50px;margin-top:44px}
/* .add{background: url('../../static/img/icon/next@2x.png') no-repeat center;} */
.vux-x-icon {
  fill: #E5E5E5;
}
</style>
