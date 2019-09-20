<template>
    <div class="main">
        <div class="box">
            <div class="store-detail">
                <img class="sj-icon" src="../../static/img/ic_sj@2x.png" alt="">
                <p class="f14 color-45 ml20">玛雅水景工作室</p>
                <img class="arrow-icon ml7" src="../../static/img/icon/ic_arrow03@2x.png" alt="">
                <img class="status-icon" src="../../static/img/icon/checking@2x.png" alt="">
            </div>
            <p class="f16 color-333 code">50元代金券</p>
            <p class="f12 color-666 time">2019/05/10~08/10可使用</p>
            <div class="bottom-button">
                <div>退订</div>
                <div>查看</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
        }
    },
    methods:{
        getOrderlist(){
            
        }
    },
    created(){
        this.getOrderlist()
    }
}
</script>

<style scoped>
.main{width:100%}
.color-45 {
    color: #454545;
}
.color-333 {
    color: #333333
}
.color-666 {
    color: #666666;
}
.f14 {
    font-size: 14px;
}
.f16 {
    font-size: 16px;
}
.f12 {
    font-size: 12px;
}
.ml20 {
    margin-left: 2.8%;
}
.ml7 {
    margin-left: 2%;
}
.box {
  width: 94.7%;
  background: #ffffff;
  margin: 12px auto 0 auto;
  border-radius: 8px;
}
.store-detail {
    display: flex;
    position: relative;
    padding-left: 2.8%;
    padding-top: 9px;
    align-items: center;
}
.sj-icon {
    width: 14px;
    height: 12px;
}
.arrow-icon {
    width: 6px;
    height: 11px;
}
.status-icon {
    height: 21px;
    position: absolute;
    right: 0;
}
.code {
    margin-left: 9.6%;
    margin-top: 14px;
    font-weight: 600;
}
.time {
    margin-left: 9.6%;
    margin-top: 6px;
}
.bottom-button {
    height: 59px;
    border-top: 1px solid #DCDCDC;
    line-height: 59px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 14px;
}
.bottom-button div {
    width: 25.35%;
    height: 34px;
    line-height: 34px;
    border: 1px solid #06D5DE;
    border-radius: 18px;
    color: #06D5DE;
    font-size: 14px;
    text-align: center;
    margin-right: 5.3%;
}
</style>
