<template>
    <div style="background-color:#F5F5F7;touch-action: none;">
      <div style="background-color:#fff;height: 130px;width:95%;margin-left:2.5%;border-radius: 10px;padding-top:45px;box-sizing: border-box">
        <div style="width:40px;height: 40px;margin-left:5%;display: inline-block;">
          <img src="../../static/img/icon/sj_ic_user@2x.png" style="width:40px;height: 40px"/>
        </div>
        <div style="position: relative;display: inline-block;width: 79%;float:right;height:130px;margin-top:-45px">
          <div style="position: absolute;top:27px;font-size: 18px;color:#333">{{real_name}}</div>
          <div style="position: absolute;top:62px;font-size: 12px;color:#333">{{phone}}</div>
          <div style="position: absolute;top:83px;font-size: 12px;color:#333">{{merchants_name}}</div>
          <div style="width:20%;height:30px;position: absolute;top:50px;right:11%;background-color:#F5F5F7;border-radius: 20px;text-align: center;" @click="$router.replace('/merchantLogin')"><p style="margin-top:5px;vertical-align:middle;font-size: 12px">退出</p></div>
        </div>
      </div>
      <div style="background-color:#fff;height: 325px;width:95%;margin-left:2.5%;border-radius: 10px;margin-top:10px;padding-top:28px;box-sizing: border-box">
        <div style="color:#666;font-size:16px;text-align: center;">{{date}}</div>
        <div class="scan" @click="qrcode"></div>
      </div>
<!--        <div class="background">-->
<!--            <div style="font-size:20px;">嘻格格商家版</div>-->
<!--            <div style="font-size:16px;margin-top:14px">- 仅商家使用 -</div>-->
<!--        </div>-->
<!--        <div style="background-color:#fff;height:50px;width:83%;margin-left:8.5%;border-radius:50px;margin-top:-16px;overflow: hidden">-->
<!--            <div style="width:24px;height:50px;display:inline-block;margin-left:4%" >-->
<!--                <img src="../../static/img/icon/phone@2x.png" style="width:24px;height:24px;display:inline-block;margin-left:4%;margin-top:13px" alt="">-->
<!--            </div>-->
<!--            <input type="text" v-model="phone" placeholder="请输入店主或联系人手机号码" @blur="fixScroll" style="width:24px;height:24px;background-color:#fff;height:50px;width:83%;display:inline-block;margin-top:-13px"/>-->
<!--        </div>-->
<!--        <div style="background-color:#fff;height:50px;width:83%;margin-left:8.5%;border-radius:50px;margin-top:10px;overflow: hidden">-->
<!--            <div style="width:24px;height:50px;display:inline-block;margin-left:4%" >-->
<!--                <img src="../../static/img/icon/pcode@2x.png" style="width:24px;height:24px;display:inline-block;margin-left:4%;margin-top:13px" alt="">-->
<!--            </div>-->
<!--            <input type="text" v-model="phone_code" placeholder="请输入验证码" @blur="fixScroll" style="width:24px;height:24px;background-color:#fff;height:50px;width:50%;display:inline-block;margin-top:-13px"/>-->
<!--            <div style="float:right;color:#06D5DE;font-size:14px;margin-top:15px;width:30%" @click="getcode">{{codeshow}}</div>-->
<!--        </div>-->
<!--        <div class="button" @click="submit"></div>-->
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    components:{

    },
    data(){
        return{
            date:'',
            token:this.$route.query.token,
            real_name:'',
            phone:'',
            merchants_name:''
        }
    },
    methods:{
        getDate(){
            let date=new Date();
            let year=date.getFullYear();
            let month=(date.getMonth()+1)<10?('0'+(date.getMonth()+1)):(date.getMonth()+1)
            let day=date.getDate()<10?('0'+date.getDate()):date.getDate()
            this.date=year+'/'+month+'/'+day
            console.log(this.date)
        },
        getData(){
            console.log(this.phone)
            this.$http.post(`${this.rootPath}/Merchants/getUserWorkInfo?token=${this.token}`).then(res=> {
                console.log(res)
                this.real_name=res.data.userInfo.real_name
                this.phone=res.data.userInfo.phone
                this.merchants_name=res.data.userInfo.merchants_name
            })
            // /Merchants/getUserWorkInfo
        },
        scan(){
            // /Merchants/scanCode
            console.log(location.href)

            let data=new FormData()
            data.append('token',this.token)
            data.append('scan_url',location.href)
            // data.append('token',this.$store.state.token)
            this.$http({
                method: 'post',
                url: `${this.rootPath}/Merchants/scanCode`,
                header: {
                    'Content-Type':'multipart/form-data'
                },
                data: data
            }).then(res=>{
                console.log(res)
                const data={
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: res.data.signPackage.appid, // 必填，公众号的唯一标识
                    timestamp: res.data.signPackage.timestamp, // 必填，生成签名的时间戳
                    nonceStr: res.data.signPackage.noncestr, // 必填，生成签名的随机串
                    signature: res.data.signPackage.signature,// 必填，签名
                    jsApiList:['scanQRCode']
                }
                this.$wechat.config(data)
            })
        },
        qrcode(){
            // this.$wechat.ready(()=>{
            //     this.$wechat.checkJsApi({
            //         jsApiList: ['scanQRCode'],
            //         success: function (res) {
            //             console.log(res)
            //         }
            //     });
            //
            //     this.$wechat.scanQRCode({
            //         needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            //         scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
            //         success: function (res) {
            //             var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            //         }
            //     });
            // })
            var that=this
            this.$wechat.scanQRCode({
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                    console.log(res.resultStr.uid)
                    // alert(res.resultStr)
                    that.$vux.toast.text(res.resultStr, 'top')
                    let uid = JSON.parse(res.resultStr).uid; // 当needResult 为 1 时，扫码返回的结果
                    if(uid) {
                        that.$router.push({path: '/merchantCheck', query: {uid: uid, token: that.token}})
                    }
                    let order_no=JSON.parse(res.resultStr).order_no
                    that.$router.push({path: '/merchantCheck', query: {order_no: order_no, token: that.token}})
                }
            });
        }
    },
    mounted(){
        console.log(this.$route.query.token)
        this.getDate()
        this.getData()
        this.scan()
    },
    watch:{
        token:{
            handler:function(val){
                console.log(val)
            }
        }
    }
}
</script>

<style scoped>
  .scan{width:100%;height:218px;background: url('../../static/img/icon/scan@2x.png') no-repeat center ;background-size: 218px 218px;margin-top:18px}
.background{background: url('../../static/img/icon/background@2x.png') no-repeat center;width:100%;height:276px;padding-top: 96px;background-size:100% 100% }
.background div{color: #fff;text-align: center}
.button{background: url('../../static/img/icon/login@2x.png') no-repeat center;width:46%;margin-left:27%;height:70px;margin-top:124px}
.vux-x-icon {
  fill: #E5E5E5;
}
</style>
