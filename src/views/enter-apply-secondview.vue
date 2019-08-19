<template>
    <div style="background-color:#F5F5F7">
        <div style="width:100%;text-align:center;color:#06D5DE;font-size:16px;margin-top:24px;margin-bottom:20px">请如实完善以下信息</div> 
        
        <span style="color:#666666;font-size:14px">请上传店铺实景图片（最多9张）</span>
        
        <group style="margin-bottom:20px">
        <div style="width: 80px;height: 80px; position: relative;cursor:pointer;display:inline-block">
            <div style="position:absolute;left:0;top:0;width:80px;height:80px">
                <x-icon type="ios-plus-empty" size="80"></x-icon>
            </div>
            <div style="position:absolute;left:0;top:0;width:80px;height:80px">
                <input type="file" id="upload" @change="uploadshop_picture" style="width:80px;height:80px;opacity:0;" multiple :disabled="shop_picture.length>=9"/>
            </div>
            <!-- <div v-for="(item.index) of document_pic">{{item}}</div> -->
        </div>
        <div v-for="(item,index) of shop_picture1" :key="index">{{item.name}}<InlineLoading v-if="loadingshop_picture"></InlineLoading></div>
        <!-- <p style="position:absolute;right:0;top:15px;display:inline-block;width:60%;height:80px;color:#999999;font-size:14px">请上传营业执照及食品安全认证、有机食品认证、品牌授权书等行业相关证书或证件的图片</p> -->
        </group>
        <span style="color:#666666;font-size:14px">请上传产品图片，可含价目表、菜单等（最多20种）</span>
        <div v-for="(item,index) of goods_list" :key="index">
            <group>
            <div style="width: 80px;height: 80px; position: relative;cursor:pointer;display:inline-block">
                <div style="position:absolute;left:0;top:0;width:80px;height:80px">
                    <x-icon type="ios-plus-empty" size="80" v-if="goods_list1[index]!=''"></x-icon>
                    <!-- <img :src="goods_list1[index]" alt=""  style="position:absolute;left:0;top:0;width:80px;height:80px"> -->
                </div>
                <div style="position:absolute;left:0;top:0;width:80px;height:80px">
                    <input type="file" id="upload" @change="uploadgoods_list" style="width:80px;height:80px;opacity:0;" multiple :disabled="goods_list.length>=20"/>
                </div>
                
                <!-- <div v-for="(item.index) of document_pic">{{item}}</div> -->
            </div>
            <div>{{goods_list1[index]}}<InlineLoading v-if="loadinggoods_list"></InlineLoading></div>
            <p style="position:absolute;right:0;top:15px;display:inline-block;width:60%;height:80px;color:#999999;font-size:14px">请上传第{{index+1}}种产品图片</p>
            </group>
            <group style="margin-bottom:20px">
                <XTextarea title="" style="font-size:14px" v-model="item.content" required text-align="right" :placeholder="`请完善第${index+1}种产品信息，包含产品名称、价格、产品描述等`"></XTextarea>
            </group>
        </div>
        <div class="button" @click="submit"></div>
    </div>
</template>

<script>
import { Group , XInput , XTextarea , Checklist , DatetimeRange , InlineLoading } from 'vux'

import { mapActions } from 'vuex'
export default {
    components:{
        Group,
        XInput,
        XTextarea,
        Checklist,
        DatetimeRange,
        InlineLoading
    },
    data(){
        return{
            shop_picture:[],
            goods_list:[{file_id:'',content:''}],
            shop_picture1:[],
            goods_list1:[],
            data:JSON.parse(this.$route.query.data),
            paylist:[{name:'现金',value:1},{name:'银行卡',value:2},{name:'微信支付',value:3},{name:'支付宝',value:4}],
            loadingshop_picture:'',
            loadinggoods_list:'',
        }
    },
    methods:{
        uploadgoods_list(event){
            this.loadinggoods_list=true
            console.log(event.target.files)
            // let data=new FormData()
            // data.append('file_image',event.target.files)
            let length=event.target.files.length
            for(let i=0;i<length;i++){
            this.upload(event.target.files[i]).then(res=>{
                console.log(res)
                if(res.data.StatusInfo.success){
                    this.goods_list[i].file_id=res.data.fileId
                    this.goods_list1.push(event.target.files[i].name)
                    this.goods_list.push({file_id:'',content:''})
                }
                if(i==length-1){
                    this.loadinggoods_list=false
                }
                console.log(this.goods_list1)
            })
            }
        },
        uploadshop_picture(event){
            this.loadingshop_picture=true
            console.log(event.target.files.length)
            let length=event.target.files.length
            for(let i=0;i<length;i++){
            this.upload(event.target.files[i]).then(res=>{
                console.log(res)
                if(res.data.StatusInfo.success){
                    this.shop_picture.push(res.data.fileId)
                    this.shop_picture1.push(event.target.files[i])
                }
                if(i==length-1){
                    this.loadingshop_picture=false
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
        submit(){
            let data=Object.assign(this.data,{goods_list:this.goods_list,shop_picture:this.shop_picture})
            console.log(data)
            // data.document_pic=JSON.stringify(data.document_pic)
            // data.goods_list.pop()
            data.goods_list=JSON.stringify(data.goods_list)
            let array=[]
            data.payment.forEach(el=>{
                this.paylist.forEach(em=>{
                    if(el==em.name){
                        array.push(em.value)
                    }
                })
            })
            data.payment=array
            // data.photo=JSON.stringify(data.photo)
            // data.shop_picture=JSON.stringify(data.shop_picture)
            console.log(data)
            let dat=new FormData()
            for(let key in data){
                dat.append(key,data[key])
            }
            this.$http({
            method: 'post',
            url: `${this.rootPath}/Merchants/createForm`,
            header: {
                'Content-Type':'multipart/form-data'  
            },
            data: dat
            }).then(res=>{
                console.log(res)
                if(res.data.StatusInfo.success){
                    this.$router.push({path:'/merchant'})
                    this.$vux.toast.text('提交成功，审核结果将在线下沟通', 'top')
                }else{
                    this.$vux.toast.text(res.data.StatusInfo.ErrorDetailCode, 'top')
                }
            })
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
.background{background: url('../../static/img/icon/background@2x.png') no-repeat center;width:100%;height:276px}
.button{background: url('../../static/img/icon/submit@2x.png') no-repeat center;width:46%;margin-left:27%;height:70px;margin-top:124px}
.add{background: url('../../static/img/icon/next@2x.png') no-repeat center;}
.vux-x-icon {
  fill: #E5E5E5;
}
</style>
