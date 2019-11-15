<template>
  <div style="width: 100%;">
    <div
      v-if="!loadPicture"
      style="opacity:0"
    >
      <div
        style="width:100%;background-color:#fff;border-radius: 20px"
        ref="certificateShareImg"
      >
        <img
          :src="img"
          alt=""
          style="width:100%"
          v-if="img"
          crossorigin="anonymous"
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
              crossorigin="anonymous"
            >
          </div>
          <div style="display: inline-block;color: #333333;font-size: 14px;position: absolute;top:22px;margin-left: 12px;">{{nickname}}</div>
          <div
            style="display: inline-block;color: #454545;font-size: 18px;position:absolute;top:90px;left:20px"
            :style="getWidthby"
            v-html="textInfo"
          ></div>
          <div style="display: inline-block;color: #454545;font-size: 12px;width:84px;text-align:center;position:absolute;bottom:55px;right:20px">加入嘻格格<br>开启格调人生</div>
          <div
            id="qrcode"
            ref="qrcode"
            style="width: 84px;height: 84px;position: absolute;right: 20px;top: 20px;z-index:999"
          ></div>
        </div>
      </div>
    </div>

    <img
      :src="loadPicture"
      alt=""
      v-else
      style="width:100%"
      crossorigin="anonymous"
    >
    <loading
      :show="show1"
      :text="text1"
    ></loading>
  </div>
</template>

<script>
    import wx from "weixin-js-sdk";
    import html2canvas from "html2canvas";
    import { Loading } from "vux";
    import QRCode from "qrcodejs2";
    // import { XInput, Scroller, LoadMore, Confirm, Loading } from "vux";

    import { mapGetters, mapActions } from "vuex";
    export default {
        name: "mycode",
        components: {
            Loading
        },
        data() {
            return {
                nickname: "",
                header_pic: "",
                promoteCodeImgUrl: "",
                codeImgUrl: "",
                loadPicture: "",
                textInfo: "",
                signInfo: {},
                img: "",
                show1: true,
                text1: "图片合成中",
                innerWidth:window.innerWidth
            };
        },
        methods: {
            ...mapActions([
                "uploadsImageBase64",
                "updateUserCard",
                "getCardShareInfo",
                "getSignIndex",
                "getSigninBase"
            ]),
            qrCode(url) {
                let qrcode = new QRCode("qrcode", {
                    width: 84, //图像宽度
                    height: 84, //图像高度
                    colorDark: "#000000", //前景色
                    colorLight: "#ffffff", //背景色
                    typeNumber: 4,
                    correctLevel: QRCode.CorrectLevel.H //容错级别 容错级别有：（1）QRCode.CorrectLevel.L （2）QRCode.CorrectLevel.M （3）QRCode.CorrectLevel.Q （4）QRCode.CorrectLevel.H
                });
                qrcode.clear(); //清除二维码
                qrcode.makeCode(url); //生成另一个新的二维码
            },
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
                    // allowTaint:true,
                    imageTimeout: 5000,
                    width: width, //dom 原始宽度
                    height: height //dom 原始高度
                };
                html2canvas(shareContent, opts).then(res => {
                    // let body = document.getElementsByTagName("body");
                    // body[0].appendChild(res);
                    console.log(res);
                    // let imgUrl = res.toDataURL("image/jpeg");
                    let imgUrl = res.toDataURL();
                    // this.loadPicture=imgUrl
                    this.uploadsImageBase64({
                        file_image: imgUrl
                    })
                        .then(res => {
                            return res.data;
                        })
                        .then(pic => {
                            this.loadPicture = pic.file_image_url;
                            this.show1 = false;
                            return this.updateUserCard({
                                token: this.$store.state.token,
                                cid: 1,
                                pic: pic.file_image_url
                            });
                        })
                        .then(share => {
                            return this.getCardShareInfo({
                                token: this.$store.state.token,
                                cid: 1,
                                share_url: window.location.href
                            });
                        })
                        .then(shareInfo => {
                            this.shareWx(shareInfo);
                        });
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
                        this.signInfo = res.data.signinData;
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
                            // this.promoteCodeImgUrl = res.data.userInfo.promoteCodeImgUrl;
                            this.qrCode(res.data.userInfo.promoteCodeInfo);
                            //区分是打卡的还是名片的
                            let flag = this.$route.query.flag;
                            if (flag === "sign") {
                                this.getSigninBase().then(res => {
                                    // this.textInfo = res.baseInfo.content;
                                    this.textInfo = `今日打卡${this.signInfo.signin_time}<br>已经打卡${this.signInfo.siginContinuousCount}天`;
                                    this.img = this.signInfo.pic;
                                    // new Promise((resolve, reject) => {
                                    // 	const img = new Image();
                                    // 	img.src = this.promoteCodeImgUrl;
                                    // 	img.onload = () =>
                                    // 		resolve(this.promoteCodeImgUrl);
                                    // 	img.onerror = () =>
                                    // 		reject(
                                    // 			new Error(
                                    // 				this.promoteCodeImgUrl +
                                    // 					" load error"
                                    // 			)
                                    // 		);
                                    // }).then(res => {
                                    this.$nextTick(() => {
                                        this.startHtml2canvas();
                                    });
                                    // });
                                });
                            } else {
                                this.$http
                                    .get(
                                        `${this.rootPath}/Index/getSigninBase?id=2`
                                    )
                                    .then(res => {
                                        if (res.data.StatusInfo.success) {
                                            this.textInfo = res.data.baseInfo.content
                                            // .replace(
                                            //     /，/g,
                                            //     "，<br>"
                                            // );
                                            this.img = this.signInfo.pic;
                                            // let picArr = [
                                            // 	new Promise((resolve, reject) => {
                                            // 		const img = new Image();
                                            // 		img.src = this.promoteCodeImgUrl;
                                            // 		img.onload = () =>
                                            // 			resolve(
                                            // 				this.promoteCodeImgUrl
                                            // 			);
                                            // 		img.onerror = () =>
                                            // 			reject(
                                            // 				new Error(
                                            // 					this
                                            // 						.promoteCodeImgUrl +
                                            // 						" load error"
                                            // 				)
                                            // 			);
                                            // 	}),
                                            // 	new Promise((resolve, reject) => {
                                            // 		const img = new Image();
                                            // 		img.src = this.img;
                                            // 		img.onload = () =>
                                            // 			resolve(this.img);
                                            // 		img.onerror = () =>
                                            // 			reject(
                                            // 				new Error(
                                            // 					this.img +
                                            // 						" load error"
                                            // 				)
                                            // 			);
                                            // 	})
                                            // ];
                                            // Promise.all(picArr)
                                            // 	.then(() => {
                                            this.$nextTick(res => {
                                                this.startHtml2canvas();
                                            });
                                            // })
                                            // .catch(e => {
                                            // 	console.log(e);
                                            // });
                                        } else {
                                            this.textInfo =
                                                "用心做好每一件小事，<br>祝嘻格格越来越好。";
                                            // new Promise((resolve, reject) => {
                                            // 	const img = new Image();
                                            // 	img.src = this.promoteCodeImgUrl;
                                            // 	img.onload = () =>
                                            // 		resolve(this.promoteCodeImgUrl);
                                            // 	img.onerror = () =>
                                            // 		reject(
                                            // 			new Error(
                                            // 				this.promoteCodeImgUrl +
                                            // 					" load error"
                                            // 			)
                                            // 		);
                                            // }).then(res => {
                                            this.$nextTick(() => {
                                                this.startHtml2canvas();
                                            });
                                            // });
                                        }
                                    });
                            }
                        } else {
                            if (res.data.StatusInfo.ReturnCode == 603) {
                                this.$store.commit("setToken", "");
                            }
                        }
                    });
            }
        },
        mounted() {
            this.getImg();
            this.getinfo();
            this.$nextTick(() => {
                this.$wechat.hideOptionMenu();
            });
            console.log(this.innerWidth)
        },
        computed:{
            getWidthby(){
                return {
                    width: this.innerWidth-84-10-57+'px'
                }
            }
        }
    };
</script>

<style scoped>
  #certificateShareImg img {
    width: 100%;
  }
</style>
