<template>
  <div style="height:100%;">
    <home-provider></home-provider>
    <div>
      <confirm 
        v-model="show"
        title="有验证码才可查看哦"
        confirm-text="确定"
        cancel-text="返回"
        @on-cancel="onCancel"
        @on-confirm="onConfirm"
        :show-input="true"
        :placeholder="'请输入验证码'"
        :content="'有验证码才可查看哦'"
      >
      </confirm>
    </div>
    <div class="main">
        <div class="title">
            <div class="name">{{goodsInfo.title}}</div>
            <div class="publisher">
                <div class="image"><img src="../../static/img/icon/icon_wode_s@2x.png" alt=""></div>
                <div class="publishername">发布者：PTS俱乐部</div>
            </div>
            <!-- <div class="origin">
              <p class="originfrom">分享来自</p>
              <img :src="goodsInfo.cover" alt="">
              <p class="originname">我的名字叫雪梨</p>
            </div> -->
        </div>
        <div class="video" v-for="(item,index) of videoList" :key="index">
          <video :src="item.file_path" style="width:100%;height:100%" controls="controls"></video>
        </div>
        <div class="menu">
          <div class="content" v-html="goodsInfo.content"></div>
        </div>
        <div class="otherlink">
          <p class="title">相关文章</p>
          <div class="linklist">
            <div class="link" v-for="(item,index) of goodsCateTree" @click="item.is_code!=1?goToArticleDetail({article_id:item.article_id}):confirmToArticleDetail({article_id:item.article_id,cid:item.cid})">
              <div class="image">
                <img :src="item.cover" alt="">
              </div>
              <div class="linkname">{{item.title}}</div>
            </div>
          </div>
        </div>
        <div class="homebutton"  @click="$router.push('/school')">
          <img src="../../static/img/icon/ic_btn_home@2x.png" alt="">
        </div>
    </div>
  </div>
</template>

<script>
import { Confirm } from 'vux'
export default {
  components: {
    Confirm
  },
  name: "HomePage",
  data() {
    return {
      article_id:this.$router.currentRoute.query.article_id,
      code_name:this.$router.currentRoute.query.code_name||'',
      goodsInfo:'',
      goodsCateTree:[],
      videoList:[],
      gocode_name:'',
      cid:'',
      show:false,
      goarticle_id:''
    };
  },
  methods: {
    getdetail(){
      this.$http.get(`${this.rootPath}/Index/getArticleView?article_id=${this.article_id}&code_name=${this.code_name}`).then(res=>{
      console.log(res)
      if(res.data.StatusInfo.ReturnCode==200){
          this.$nextTick(()=>{
            this.goodsInfo=res.data.goodsInfo
            this.goodsCateTree=res.data.goodsCateTree
            this.videoList=res.data.videoList
          })
      }
      })
    },
    goToArticleDetail(val){
      this.$router.push({path:'/schools/detail',query:{article_id:val.article_id}})
    },
    confirmToArticleDetail(val){
      this.show=true
      this.cid=val.cid
      this.goarticle_id=val.article_id
      // this.$router.push({path:'/schools/detail',query:{article_id:item.article_id,code_name:item.article_id}})
    },
    confirmcode(){
      this.$http.get(`${this.rootPath}/Index/checkArticleCode?code_name=${this.gocode_name}&cid=${this.cid}`).then(res=>{
        console.log(res)
        if(res.data.StatusInfo.success){
          // this.$router.push({path:'/schools/detail',query:{article_id:this.goarticle_id,code_name:this.gocode_name}})
          this.article_id=this.goarticle_id,
          this.code_name=this.gocode_name
          this.getdetail()
        }else{
          this.$vux.toast.text(`${res.data.StatusInfo.ErrorDetailCode}`, 'top')
        }
      })
    },
    onCancel(){
      this.cid=''
      this.article_id=''
    },
    // 输入验证码后确认
    onConfirm(val) {
      console.log(val)
      if(val){
        this.gocode_name=val
        this.confirmcode()
      }else{
        this.$vux.toast.text('请填写验证码', 'top')
      }
      // this.$router.push({path:'/schools/detail',query:{article_id:item.article_id,code_name:val}})
      // this.$router.push('/owners/getvip')
    },
  },
  computed: {
    
  },
  beforeDestroy() {
    
  },
  created() {
    this.getdetail()
  },
  mounted() {
    this.$bus.emit("onTabBarEvent", {});
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{padding:0;margin:0;touch-action: none;}
.main{position: relative;background-color: #F9F9F9}
.title{width:100%;height:117px;background-color: #fff;padding-top: 11px;box-sizing: border-box}
.title .name{font-size: 16px;color:#222222;width:92%;margin-left:4%;}
.title .publisher{margin-left:4%;margin-top:12px;height: 17px;position: relative;}
.title .publisher .image{width:12px;height:12px;display: inline-block;position: absolute;top:3px}
.title .publisher .image img {width:12px;height:12px}
.title .publisher .publishername{font-size:12px;color:#666666;display: inline-block;position: absolute;left:5%}
.title .origin{border: 1px solid #06D5DE;color:#06D5DE;border-radius: 20px 0 0 20px;height:28px;line-height: 28px;position: absolute;right: 0;top:59px;font-size: 10px;}
.title .origin img{background-color: #06D5DE;border-radius: 50%;width:20px;height:20px;display: inline-block;margin-top:4px}
.title .origin p{display: inline-block}
.title .origin .originfrom{width: 70px;text-align: center;vertical-align: top;font-size: 10px;}
.title .origin .originname{padding-right: 10px;vertical-align: top;font-size: 10px;}

.video{width: 100%;}
.video div{width: 100%;background-color: #06D5DE;height:211px;margin-top: 10px}

.homebutton{width:44px;height:44px;position: fixed;right:6.4%;bottom:128px}
.homebutton img{width:44px;height:44px;}

.menu{width:100%;margin-top:10px;background-color: #fff;padding-top:23px;padding-bottom: 17px}
.menu .content{width:89%;margin-left: 5.5%;font-size: 15px;color:#494949}

.otherlink{width:100%;background-color:#F9F9F9;margin-top:19px;}
.otherlink .title{font-size: 16px;color:#222222;font-weight: bold;width:64px;height:22px;line-height: 22px;margin-left:5%;background-color:#F9F9F9;display: inline-block}
.otherlink .linklist{margin-top:12px;width:95%;margin-left: 2.5%}
.otherlink .linklist .link{background-color: #fff;border-radius: 10px;}
.otherlink .linklist .link div{display: inline-block}
.otherlink .linklist .link .image{width:90px;height: 90px;margin-left: 10px;margin-top:15px;background-color: #06D5DE;border-radius: 10px }
.otherlink .linklist .link .image img{width:90px;height: 90px;}
.otherlink .linklist .link .linkname{color:#323643;font-size: 16px;vertical-align: top;margin-top:49px;height:22px;line-height: 22px}
</style>
