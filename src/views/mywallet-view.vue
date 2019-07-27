<template>
    <div class="main">
        <div class="info">
            <div class="expiretime">
                <p style="color:#999999">会员到期日</p> <p style="color:#333333">2020/10/10</p>
            </div>
            <div class="integral">
                <p style="color:#999999">当前积分</p><img src="/src/assets/icon/icon_tishi@2x.png" alt=""> <p style="color:#333333">89,019</p>
            </div>
            <div class="paybutton"></div>
        </div>
        <div class="change">
            <div class="useintegral" :class="btn==0?'select':''" @click="change(0)">消费积分记录</div>
            <div class="getintegral" :class="btn==1?'select':''" @click="change(1)">获取积分记录</div>
        </div>
        <div class="usedetail" v-if="btn==0">
            <div class="detail">
                <div class="name">抵扣活动《xxxxxxxxxxxxxxx….》</div>
                <div class="time">2019-05-15 10:42</div>
                <div class="change">-200</div>
            </div>
        </div>
        <div class="getdetail" v-if="btn==1">

        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            btn:0
        }
    },
    methods:{
        change(val){
            this.btn=val
        }
    }
}
</script>

<style>
.main{width: 100%;background-color: #F8F8F8}
.info{width: 92%;height:100px;margin-left: 4%;border-radius: 10px;background-color: #fff;margin-top: 10px;position: relative;}
.info .expiretime{font-size: 15px;position: absolute;top: 24px;left: 6.2%;width: 50%}
.info .expiretime p{display: inline-block}
.info .integral{font-size: 15px;position: absolute;top: 60px;left: 6.2%;width: 50%}
.info .integral p{display: inline-block;vertical-align: top}
.info .integral img{width: 16px;height: 16px;display: inline-block;margin-top:2px}
.info .paybutton{width:118px;height:58px;background: #fff url('/src/assets/icon/btn_wycz@2x.png') center no-repeat;background-size: 118px 58px;position: absolute;top:22px;right:1.5%}

.change{background-color: #fff;width: 90%;margin-left:5%;height:40px;border-radius: 20px;overflow: hidden;position: relative;margin-top:31px}
.change div{display:inline-block;width:50%;font-size: 15px;height:40px;line-height: 40px;text-align: center;position: absolute;}
.change .useintegral{left:0}
.change .getintegral{right:0}
.change div.select{background-color: #06D5DE;border-radius: 20px;color:#fff}

.usedetail{width:100%}

</style>
