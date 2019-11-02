<template>
  <div style="width: 100%;background-color:#F2F2F2;margin-top: 10px">
    <div style="width: 92%;margin-left: 4%;background-color:#fff;border-radius: 20px;height: 650px;overflow: hidden">
      <img src="../../static/img/icon/signcard@2x.png" alt="" style="width: 100%;height: 450px">
      <div style="height:200px;width:100%;position: relative">
        <div style="width:57px;height: 57px;border-radius: 50%;overflow: hidden;margin-top: 22px;margin-left: 5%;display: inline-block">
          <img :src="header_pic" alt="" style="width:57px;height: 57px">
        </div>
        <div style="display: inline-block;color: #333333;font-size: 14px;position: absolute;top:22px;margin-left: 12px;">{{nickname}}</div>
        <div style="display: inline-block;color: #454545;font-size: 18px;position:absolute;top:47px;margin-left: 12px">用心做好每一件小事，<br>祝嘻格格越来越好。</div>
        <div style="display: inline-block;color: #454545;font-size: 12px;width:60%;text-align:center;position:absolute;bottom:44px">本页截屏发送好友，<br>加入我们，开启格调人生。</div>
        <img :src="promoteCodeImgUrl" alt="" style="width: 84px;height: 84px;position: absolute;right: 6.7%;bottom: 23px">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "mycode",
    data (){
      return {
          nickname: '',
          header_pic: '',
          promoteCodeImgUrl:''
      }
    },
  methods: {
    getImg () {
        this.$http.get(`${this.rootPath}/User/getShareInfoPic?token=${this.$store.state.token}`).then(res=>{
            console.log(res)
        })
    },
    getinfo(){
      this.$http.get(`${this.rootPath}/User/getUserInfo?token=${this.$store.state.token}`).then(res=>{
        // this.userDetail({token: 'c1599f283f6bce195a98a3f3d9c3f10865891753'}).then(res=>{})
        console.log(res)
        if(res.data.StatusInfo.ReturnCode==200){
          this.$nextTick(()=>{
            this.nickname=res.data.userInfo.nickname
            this.header_pic=res.data.userInfo.header_pic
            this.uid_number=res.data.userInfo.uid_number
              this.promoteCodeImgUrl=res.data.userInfo.promoteCodeImgUrl
          })
        }else{
          if(res.data.StatusInfo.ReturnCode==603){
            this.$store.commit('setToken','')
          }
        }
        // console.log(this.$store.state.isMember)
      })
    },
  },
  mounted() {
      this.getImg()
      this.getinfo()
      this.$nextTick(()=>{
        this.$wechat.hideOptionMenu()
      })
  }
}
</script>

<style scoped>

</style>
