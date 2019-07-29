<template>
    <div class="main">
        <div class="orderitem">
            <div class="name">从品酒来了解酒窖文化从品酒来了解酒窖文化</div>
            <div class="time">
                <img src="../../static/img/icon_time@2x.png" alt=""><p>参与时间：2019/05/10 18:00</p>
            </div>
            <div class="status"></div>
            <div class="num">*2</div>
            <div class="handlebutton">
                <div class="unsubscribe" @click="$router.push('/owners/unsubscribedetail')">退订</div>
                <div class="view" @click="$router.push('/owners/orderdetail')">查看</div>
            </div>
        </div>
        <div class="orderitem">
            <div class="name">从品酒来了解酒窖文化从品酒来了解酒窖文化</div>
            <div class="time">
                <img src="../../static/img/icon_time@2x.png" alt=""><p>参与时间：2019/05/10 18:00</p>
            </div>
            <div class="status"></div>
            <div class="num">*2</div>
            <div class="handlebutton">
                <div class="unsubscribe">退订</div>
                <div class="view">查看</div>
            </div>
        </div>
        <div class="orderitem">
            <div class="name">从品酒来了解酒窖文化从品酒来了解酒窖文化</div>
            <div class="time">
                <img src="../../static/img/icon_time@2x.png" alt=""><p>参与时间：2019/05/10 18:00</p>
            </div>
            <div class="status"></div>
            <div class="num">*2</div>
            <div class="handlebutton">
                <div class="unsubscribe">退订</div>
                <div class="view">查看</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.main{width:100%}
.orderitem{width:92%;margin-left:4%;height:158px;position: relative;background-color: #fff;border-radius: 12px;margin-top:10px}
.orderitem .name{font-size: 15px;color: #333;width:71%;position: absolute;left:5.6%;top:19px;}
.orderitem .time{font-size: 12px;color:#666;position: absolute;left:5.6%;top:74px;width:60%;}
.orderitem .time p{vertical-align: top;display: inline-block;vertical-align: top}
.orderitem .time img{width:12px;height:12px;display: inline-block}
.orderitem .status{width:54px;height:21px;background: url('../../static/img/icon/waiting@2x.png') center no-repeat;background-size: 54px 21px;position: absolute;right:0;top:9px}
.orderitem .num{position: absolute;top:54px;right:4%;font-size: 15px;color:#333;}
.orderitem .handlebutton{height:57px;width:94%;margin-left:6%;border-top: 1px solid #F0F0F0;position: absolute;bottom:0;}
.orderitem .handlebutton .unsubscribe{width:27%;height:34px;text-align: center;line-height: 34px;margin-top:10px;color:#06D5DE;border-radius: 20px;border: 1px solid #06D5DE;font-size: 14px;display: inline-block;position: absolute;right:36%}
.orderitem .handlebutton .view{width:27%;height:34px;text-align: center;line-height: 34px;margin-top:10px;color:#fff;border-radius: 20px;border: 1px solid #06D5DE;background-color: #06D5DE;font-size: 14px;display: inline-block;position: absolute;right:5.6%}
</style>
