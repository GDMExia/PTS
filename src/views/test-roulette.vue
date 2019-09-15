<template>
  <div class="main">
    <div class="turnplate-box">
      <turnplate :offset="offset" @handlePlate = "handlePlate" /> 
    </div>
    <div class="prize-box">
      <div class="prize-container" v-for="(item, index) in prize" :key="index">
        <div class="prize-num">
          <span class="color-fff f16 title">{{item.title}}</span>
          <span class="color-b8 f14 button">{{item.num}}</span>
        </div>
        <p class="color-fff f13 content">{{item.content}}</p>
      </div>
    </div>
  </div>

</template>

<script>
import Turnplate from '@/components/turnplate'

export default {
  name: 'roulette-pages',
  components: {
    Turnplate
  },
  data () {
    return {
      offset: 2,
      prize: [
        {id: 1, title: '一等奖', num: '价值1500元', content: '免费入住德尔塔酒店豪华客房一晚并含翌日 双人早餐+真味馆中餐厅双人点心任点任食。'},
        {id: 2, title: '二等奖', num: '价值600元', content: '德尔塔酒店-莲全日制餐厅双人自助晚餐'},
        {id: 3, title: '三等奖', num: '价值300元', content: '品牌保温杯'},
        {id: 4, title: '四等奖', num: '价值100元', content: '旅行收纳包13件套'},
        {id: 5, title: '五等奖', num: '价值40元', content: '精美书签一套'},
      ]
    }
  },
  methods: {
    handlePlate () {
      alert('损2分')
    }
  }
}

</script>
<style scoped>
.main {
  background-image: url('../../static/img/turnplate/Bitmap@2x.png');
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  background-size: 100%;
  background-repeat: no-repeat;
  flex-direction: column;
}
.turnplate-box {
  margin: 37px auto 24px auto;
}
.f13 {
  font-size: 13px;
}
.f14 {
  font-size: 14px;
}
.f16 {
  font-size: 16px
}
.color-fff {
  color: #ffffff;
}
.color-b8 {
  color: #B87602;
}
.prize-box {
  width: 81.3%;
  margin: 0 auto 46px auto;
}
.prize-container:nth-child(odd) {
  background-color: #FFA300;
  padding-left: 3.3%;
  padding-top: 9px;
  padding-bottom: 18px;
}
.prize-container:nth-child(even) {
  background-color: #FDBA20;
  padding-left: 3.3%;
  padding-top: 9px;
  padding-bottom: 18px;
}
.prize-container:first-child {
  border-radius: 8px 8px 0 0;
}
.prize-container:last-child {
  border-radius: 0 0 8px 8px;
}
.prize-num {
  display: flex;
  justify-content: space-between;
}
.button {
  width: 31.8%;
  height: 32px;
  line-height: 32px;
  background: linear-gradient(#FFE5B6, #FFFFFF);
  opacity: 0.853;
  text-align: center;
  border-radius: 100px 0 0 100px;
}
.title {
  margin-top: 6px;
}
.content {
  margin-top: 4px;
  margin-right: 6.6%;
}
</style>

