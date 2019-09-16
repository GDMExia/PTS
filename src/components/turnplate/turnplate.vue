<template>
<div>
  <div class="turnplate">
    <div class="mask">
      <img class="plate" src="../../../static/img/turnplate/turnplate@2x.png" />
      <img class="pointer" src="../../../static/img/turnplate/turnplate-pointer@2x.png" v-turn/>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    offset: Number
  },
  data () {
    return {
      speed: [0.2, 0.4, 0.6, 0.8, 1, 1, 1.2, 1.4, 1.6, 1.8,
                1.8, 1.6, 1.4, 1.2, 1, 1, 0.8, 0.6, 0.4, 0.2],
      stangle: 0,
      deg: 0,
      total:0
    }
  },
  methods: {
     rotate(plate){
      this.deg = 0
	  this.total = 0
	  this.stangle = 18 - (0.225 * this.offset) + 0.1
	  for(let i=0;i<200;i++){
		setTimeout(()=>{
		  this.deg =  this.stangle * this.speed[parseInt(i/10)]
		  this.total = this.total +  this.deg
		  plate.style.transform=`rotate(${this.total}deg)`
		  if(i==199){
			this.total = 0
			this.$emit('handlePlate')
		  }
		},i*50)           
	  }

     }
   },
    directives: {
      turn(el, binding, vnodel) {   
        el.onclick= () => {
          if(vnodel.context.total>0) return
          const plate = document.querySelector('.plate')
          vnodel.context.rotate(plate)    
        }
      }
    }
}
</script>

<style lang="less" scoped>
.turnplate {
  width: 330px;
  height: 330px;
  display: flex;
  position: relative;
}

.mask {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.plate {
  width: 100%;
  // height: 360px;
}

.pointer {
  position: absolute;
  width: 39.3%;
  // height: 90px;
  cursor: pointer;
  z-index: 1000;
}
</style>