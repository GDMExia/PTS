<template>
    <div style="backgroundColor:#F8F8F8;width:100%;touchAction: none;paddingTop:10px">
        <div class="advicedetail" style="borderRadius:20px 20px 0 0">
            <div class="activitycontent">
                <p>活动内容</p>
                <div class="stars">
                    <div class="starselevt" v-for="(item,index) of Array(activitycontentstar)" :key="index">
                        <img src="../../static/img/icon/icon_pingjia_pre@2x.png" alt="">
                    </div>
                    <div class="star" v-for="(item,index) of activitycontent" v-if="index>activitycontentstar-1" :key="index">
                        <img src="../../static/img/icon/icon_pingjia@2x.png" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div class="advicedetail">
            <div class="servieattribute">
                <p>服务态度</p>
                <div class="stars">
                    <div class="starselevt" v-for="(item,index) of Array(servieattributestar)" :key="index">
                        <img src="../../static/img/icon/icon_pingjia_pre@2x.png" alt="">
                    </div>
                    <div class="star" v-for="(item,index) of servieattribute" v-if="index>servieattributestar-1" :key="index">
                        <img src="../../static/img/icon/icon_pingjia@2x.png" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div class="advicedetail">
            <div class="placeenvironment">
                <p>场地环境</p>
                <div class="stars">
                    <div class="starselevt" v-for="(item,index) of Array(placeenvironmentstar)" :key="index">
                        <img src="../../static/img/icon/icon_pingjia_pre@2x.png" alt="">
                    </div>
                    <div class="star" v-for="(item,index) of placeenvironment" v-if="index>placeenvironmentstar-1" :key="index">
                        <img src="../../static/img/icon/icon_pingjia@2x.png" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div class="advicedetail">
            <div class="costperformance">
                <p>性价比</p>
                <div class="stars">
                    <div class="starselevt" v-for="(item,index) of Array(costperformancestar)" :key="index">
                        <img src="../../static/img/icon/icon_pingjia_pre@2x.png" alt="">
                    </div>
                    <div class="star" v-for="(item,index) of costperformance" v-if="index>costperformancestar-1" :key="index">
                        <img src="../../static/img/icon/icon_pingjia@2x.png" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div style="width:92%;marginLeft:4%;height:133px;overflow:hidden;borderRadius:0 0 20px 20px;backgroundColor:#fff">
        <group>
            <x-textarea title="" v-model="value" placeholder="请输入内容" disabled></x-textarea>
        </group>
        </div>
        <div class="other">
            <p>是否愿意再次参加</p>
            <div class="wish" :class="wish==1?'select':''">愿意</div>
            <div class="unwish" :class="wish==0?'select':''">不愿意</div>
        </div>
<!--        <div class="handle">-->
<!--            <div class="button" @click="turnIn">提交</div>-->
<!--        </div>-->
    </div>
</template>

<script>
import { Group , XTextarea } from 'vux'
export default {
    components:{
        Group,
        XTextarea
    },
    data(){
        return {
            activitycontentstar:0,
            servieattributestar:0,
            placeenvironmentstar:0,
            costperformancestar:0,
            activitycontent:Array(5),
            servieattribute:Array(5),
            placeenvironment:Array(5),
            costperformance:Array(5),
            value:'',
            wish:1,
            order_no: this.$route.query.order_no
        }
    },
    mounted(){
        this.getAdvice()
    },
    methods:{
        change(val){
            this.wish=val
        },
        changeactivitycontent(val){
            console.log(111)
            if(this.activitycontentstar==val&&val==1){
                this.activitycontentstar=0
            }else{
                this.activitycontentstar=val
            }
        },
        changeservieattribute(val){
            if(this.servieattributestar==val&&val==1){
                this.servieattributestar=0
            }else{
                this.servieattributestar=val
            }
        },
        changeplaceenvironment(val){
            if(this.placeenvironmentstar==val&&val==1){
                this.placeenvironmentstar=0
            }else{
                this.placeenvironmentstar=val
            }
        },
        changecostperformance(val){
            if(this.costperformancestar==val&&val==1){
                this.costperformancestar=0
            }else{
                this.costperformancestar=val
            }
        },
        turnIn(){
            this.$http({
                method: 'post',
                url: `${this.rootPath}/User/createOrderEvaluation?token=${this.$store.state.token}`,
                header: {
                    'Content-Type':'multipart/form-data'
                },
                params: {token:this.$store.state.token,order_no:this.order_no,content:this.value,active_star:this.activitycontentstar,service_star:this.servieattributestar,site_star:this.placeenvironmentstar,price_star:this.costperformancestar,is_willing:this.wish}
            }).then(res=>{
                if(res.data.StatusInfo.success){
                    this.$router.push('/owners/myorder')
                    this.$vux.toast.text('评价成功', 'top')
                }else{
                    this.$vux.toast.text(res.data.ErrorDetailCode, 'top')
                }
            })
        },
        getAdvice(){
            this.$http.get(`${this.rootPath}/User/getOrderEvaluation?token=${this.$store.state.token}&order_no=${this.order_no}`).then(res=>{
                console.log(res)
                if(res.data.StatusInfo.success){
                    this.value=res.data.evaluationList[0].content
                    this.activitycontentstar=parseInt(res.data.evaluationList[0].active_star)
                    this.servieattributestar=parseInt(res.data.evaluationList[0].service_star)
                    this.placeenvironmentstar=parseInt(res.data.evaluationList[0].site_star)
                    this.costperformancestar=parseInt(res.data.evaluationList[0].price_star)
                    this.wish=res.data.evaluationList[0].is_willing
                }else{
                    this.$vux.toast.text(res.data.ErrorDetailCode, 'top')
                }
            })
        }
    }
}
</script>

<style scoped>
.advicedetail{background-color: #fff;width:92%;margin-left:4%;height: 43px;position:relative;}
.advicedetail div{width:100%;position: relative;height: 43px;}
.advicedetail p{display: inline-block;position: absolute;left:4.5%;top:10px;font-size: 16px;color:#333}
.advicedetail .stars{width:50%;display: flex;position: absolute;top:0;right:0;padding-top: 10px}
.advicedetail .stars div{width: 20px;height:20px;display: flex;position: relative;flex:1;align-content: space-around}
.advicedetail .stars div img{width: 20px;height:20px;display: inline-block;}
.other{height:106px;width:92%;margin-left:4%;border-radius: 20px}
.other p{font-size: 15px;color:#333;margin-top:15px;margin-left:4.5%}
.other div{font-size: 15px;color:#333;flex:1;display: inline-block;width: 45%;text-align: center;background: url('../../static/img/icon/icon_danxuan@2x.png') 20% no-repeat;background-size: 20px 20px;}
.other div.select{background: url('../../static/img/icon/icon_danxuan_pre@2x.png') 20% no-repeat;background-size: 20px 20px;}
.handle{height:83px;width:100%;background-color: #fff;position: fixed;bottom:0;box-sizing: border-box;padding-top: 10px}
.handle .button{width:84%;margin-left:8%;height:40px;line-height: 40px;border-radius: 20px;background-color: #06D5DE;text-align: center;color: #fff;font-size: 15px}
</style>
