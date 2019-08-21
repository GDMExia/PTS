<template>
  <div id="app">
    <router-view v-wechat-title="$route.name"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
  },
  mounted() {
    
  }
}
// function onBridgeReady(){
//    WeixinJSBridge.call('hideToolbar');
// }

// if (typeof WeixinJSBridge == "undefined"){
//     if( document.addEventListener ){
//         document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
//     }else if (document.attachEvent){
//         document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
//         document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
//     }
// }else{
//     onBridgeReady();
// }
// document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() { 
//     WeixinJSBridge.call('hideToolbar'); 
//     WeixinJSBridge.call('hideOptionMenu'); 
// }); 
</script>

<style src="./styles/resets.css">

body {
  background-color: #fbf9fe;
}
</style>
