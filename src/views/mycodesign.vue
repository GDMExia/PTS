<template>
	<div style="width: 100%;">
		<div v-if="!loadPicture" style="opacity:0">
			<div
				style="width: 100%;background-color:#fff;border-radius: 20px"
				ref="certificateShareImg"
			>
<!--				<img-->
<!--					:src="img"-->
<!--					alt=""-->
<!--					style="width:100%"-->
<!--          v-if="img!=''"-->
<!--				>-->
        <img
          :src="img"
          alt=""
          style="width:100%"
          v-if="img"
        >
        <img
          src="../../static/img/icon/signcard@2x.png"
          alt=""
          style="width:100%"
          v-else
        >
				<div style="height:200px;width:100%;position: relative">
					<div style="width:57px;height: 57px;border-radius: 50%;overflow: hidden;margin-top: 22px;margin-left: 5%;display: inline-block">
						<img
							:src="header_pic"
							alt=""
							style="width:57px;height: 57px"
						>
					</div>
					<div style="display: inline-block;color: #333333;font-size: 14px;position: absolute;top:22px;margin-left: 12px;">{{nickname}}</div>
					<div style="display: inline-block;color: #454545;font-size: 18px;position:absolute;top:47px;margin-left: 12px;" v-html="textInfo"></div>
					<div style="display: inline-block;color: #454545;font-size: 12px;width:60%;text-align:center;position:absolute;bottom:44px">本页发送好友，<br>加入我们，开启格调人生。</div>
					<img
						:src="promoteCodeImgUrl"
						alt=""
						style="width: 84px;height: 84px;position: absolute;right: 10px;bottom: 23px;z-index:999"
					>
				</div>
			</div>
		</div>
		<img :src="loadPicture" v-else alt="" style="width:100%">
    <loading
      :show="show1"
      :text="text1"
    ></loading>
	</div>
</template>

<script>
import wx from 'weixin-js-sdk'
import html2canvas from "html2canvas";
import {Loading} from 'vux'
// import { XInput, Scroller, LoadMore, Confirm, Loading } from "vux";

import { mapGetters, mapActions } from "vuex";
export default {
	name: "mycode",
    components:{
        Loading
    },
	data() {
		return {
			nickname: "",
			header_pic: "",
			promoteCodeImgUrl: "",
			loadPicture:'',
			textInfo:'',
      signInfo: {},
        img: '',
        show1: true,
        text1: '图片合成中'
		};
	},
	methods: {
		...mapActions(["uploadsImageBase64", "updateUserCard","getCardShareInfo","getSignIndex","getSigninBase"]),
		getPixelRatio(context) {
			let backingStore =
				context.backingStorePixelRatio ||
				context.webkitBackingStorePixelRatio ||
				context.mozBackingStorePixelRatio ||
				context.msBackingStorePixelRatio ||
				context.oBackingStorePixelRatio ||
				context.backingStorePixelRatio ||
				1;
			return (window.devicePixelRatio || 1) / backingStore;
		},
		//绘制dom 元素，生成截图canvas
		startHtml2canvas() {
		    // setTimeout(()=>{
			let shareContent = this.$refs.certificateShareImg; //需要截图的包裹的（原生的）DOM 对象;// 需要绘制的部分的 (原生）dom 对象 ，注意容器的宽度不要使用百分比，使用固定宽度，避免缩放问题
			let width = shareContent.clientWidth; // 获取(原生）dom 宽度
			let height = shareContent.clientHeight; // 获取(原生）dom 高
			let canvas = document.createElement("canvas"); //创建canvas 对象
			let context2 = canvas.getContext("2d");
			let scaleBy = 2; //获取像素密度的方法 (也可以采用自定义缩放比例)
			canvas.width = width * 2; //这里 由于绘制的dom 为固定宽度，居中，所以没有偏移
			canvas.height = height * 2; // 注意高度问题，由于顶部有个距离所以要加上顶部的距离，解决图像高度偏移问题
			context2.scale(scaleBy, scaleBy);
			let opts = {
				useCORS: true,
        allowTaint:true,
        imageTimeout: 5000,
				width: width, //dom 原始宽度
				height: height //dom 原始高度
			};
			html2canvas(shareContent, opts).then(res => {
				// let body = document.getElementsByTagName("body");
				// body[0].appendChild(res);
				// let imgUrl = res.toDataURL("image/jpeg");
        // this.loadPicture=imgUrl
          let imgUrl = res.toDataURL();

          this.uploadsImageBase64({
					file_image: imgUrl
				})
					.then(res => {
						return res.data;
					})
					.then(pic => {
						this.loadPicture = pic.file_image_url;
              this.show1=false

              return this.updateUserCard({
							token: this.$store.state.token,
							cid: 1,
							pic: pic.file_image_url
						});
					}).then(share=>{
						return this.getCardShareInfo({
							token: this.$store.state.token,
							cid: 1,
							share_url:window.location.href
						})
					}).then(shareInfo=>{
						this.shareWx(shareInfo)
					})
			});
        // },6000)
		},
		shareWx(data) {
			let that = this;
			let title = data.shareInfo.title;
			let links = data.shareInfo.link;
			let imgUrl = data.shareInfo.img;
			let desc = data.shareInfo.desc;
			wx.config({
				debug: false,
				appId: data.signPackage.appid,
				timestamp: data.signPackage.timestamp,
				nonceStr: data.signPackage.noncestr,
				signature: data.signPackage.signature,
				jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"]
			});
			wx.ready(function() {
				//分享到朋友圈
				wx.onMenuShareTimeline({
					title: title, // 分享标题
					link: links, // 分享链接
					imgUrl: imgUrl,
					success: function() {
						// 用户点击了分享后执行的回调函数
						console.log("分享到朋友圈成功");
					}
				});
				wx.onMenuShareAppMessage({
					title: title, // 分享标题
					desc: desc,
					link: links,
					imgUrl: imgUrl, // 分享图标
					type: "", // 分享类型,music、video或link，不填默认为link
					dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
					success: function() {
						// 用户点击了分享后执行的回调函数
						console.log("分享到朋友成功");
					}
				});
			});
		},
		getImg() {
			this.$http
				.get(
					`${this.rootPath}/User/getShareInfoPic?token=${this.$store.state.token}`
				)
				.then(res => {
					console.log(res);
					this.signInfo=res.data.signinData
				});
		},
		getinfo() {
			this.$http
				.get(
					`${this.rootPath}/User/getUserInfo?token=${this.$store.state.token}`
				)
				.then(res => {
					// this.userDetail({token: 'c1599f283f6bce195a98a3f3d9c3f10865891753'}).then(res=>{})
					if (res.data.StatusInfo.ReturnCode == 200) {
						this.nickname = res.data.userInfo.nickname;
						this.header_pic = res.data.userInfo.header_pic;
						this.uid_number = res.data.userInfo.uid_number;
              // this.promoteCodeImgUrl = res.data.userInfo.codeImgUrl;
              this.promoteCodeImgUrl = res.data.userInfo.promoteCodeImgUrl;
							//区分是打卡的还是名片的
							let flag = this.$route.query.flag;
							console.log(flag)
							if(flag === 'sign'){

								this.getSigninBase().then(res=>{
                    // this.textInfo = res.baseInfo.content;
                    this.textInfo = `今日打卡${this.signInfo.signin_time}<br>已经打卡${this.signInfo.siginContinuousCount}天`;
                    this.img=this.signInfo.pic
                    this.$nextTick(res=>{

                      this.startHtml2canvas();
                    })
								})
							}else{

                this.$http.get(`${this.rootPath}/Index/getSigninBase?id=2`).then(res=>{
                    console.log(res)
                    if(res.data.StatusInfo.success){
                        this.textInfo = res.data.baseInfo.content.replace(/，/g,'，<br>')
                        this.$nextTick(res=>{

                            this.startHtml2canvas();
                        })
                    }else{
                        this.textInfo = '用心做好每一件小事，<br>祝嘻格格越来越好。'
                        this.$nextTick(res=>{

                            this.startHtml2canvas();
                        })
                    }
                })

							}

					} else {
						if (res.data.StatusInfo.ReturnCode == 603) {
							this.$store.commit("setToken", "");
						}
					}
					// console.log(this.$store.state.isMember)
				});
		}
	},
	mounted() {
		this.getImg();
		this.getinfo();
		this.$nextTick(() => {
			this.$wechat.hideOptionMenu();
		});
	}
};
</script>

<style scoped>
#certificateShareImg img {
	width: 100%;
}
</style>
