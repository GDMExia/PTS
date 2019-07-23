<template>
  <div style="height:100%;">
    <tabbarComponent :tabIndex=0></tabbarComponent>
    <home-provider></home-provider>
    
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
import TabbarComponent from "@/components/TabbarComponent.vue";
export default {
  components: {
    TabbarComponent
  },
  name: "HomePage",
  data() {
    return {
      
    };
  },
  methods: {
    
  },
  computed: {
    
  },
  beforeDestroy() {
    
  },
  created() {
    
  },
  mounted() {
    this.$bus.emit("onTabBarEvent", {});
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
