<template>
    <div class="main">
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
            :close-on-confirm="false"
        >
        </confirm>
        </div>
        <div class="top">
            <div class="search">
                <x-input placeholder="搜索文章关键词" style="width: 95%;" placeholder-align="center" v-model="search"  @on-enter="handleQuery()"></x-input>
                <!-- <input placeholder="搜索文章关键词" v-model="search" type="text"> -->
                <img style="width: 15px; height: 15px;margin-top: 3px;" src="../../static/img/sousuo_icon_search@2x.png" alt="">
            </div>
            <div>
                <tab :line-width="1" custom-bar-width="22px">
                    <tab-item @on-item-click="handleQuery(0)" :selected="type==0">旅游</tab-item>
                    <tab-item @on-item-click="handleQuery(1)" :selected="type==1">学院</tab-item>
                </tab>
            </div>
        </div>
        <div>
            <div style="display: flex;padding:68% 0;justify-content: center;align-items: center;flex-direction:column;font-size: 16px;color: #ccc;" v-if="(type==0&&activityList.length==0)||(type==1&&articleList.length==0)">
                <img style="width: 40px; height: 40px;margin-bottom: 16px;" src="../../static/img/icon/no_data.png"/>
                <span> 暂无数据 </span>
            </div>
            <scroller v-if="activityList.length" lock-x height="-88"  @on-scroll-bottom="onScrollBottom" ref="scrollerBottom">
                <div class="ofy_auto flx_1">
                    <div class="container" @click="handleClick(item.tourism_id)" v-for="item in activityList" :key="item.id">
                        <img class="activity-img" :src="item.pic" alt="">
                        <div class="activity-title">
                            <div class="name-price">
                            <span class="title-text">{{item.goods_name}}</span>
                            <div>
                                <p class="price">¥ {{item.goods_price}}</p>
                                <p class="num">抵{{item.discount_point}}积分</p>
                            </div>
                            </div>
                            <p class="time">
                            <img src="../../static/img/icon_time@2x.png" alt="">
                            {{item.start_time}}~{{item.end_time}}
                            </p>
                        </div>
                    </div>
                </div>
                <!-- <load-more v-show="pageNum > totalPage" :show-loading="false" :tip="'暂无数据'" background-color="#fbf9fe"></load-more> -->
            </scroller>
            <scroller v-if="articleList.length" height="-78" lock-x @on-scroll-bottom="onScrollBottomSchool" :use-pullup="true">
                <div class="menu">
                    <div class="detail" @click="item.is_code!=1?goToArticleDetail({article_id:item.article_id}):confirmToArticleDetail({article_id:item.article_id,cid:item.cid})" v-for="(item,index) of articleList" :key="index">
                    <div class="image"><img :src="item.cover" alt=""></div>
                    <div class="body">
                        <div class="title">{{item.title}}</div>
                        <div class="more">{{item.cate_name}}</div>
                        <div class="clock">
                        <img src="../../static/img/icon_time@2x.png" alt="">
                        </div>
                        <div class="time">{{item.create_time}}</div>
                    </div>
                    </div>
                </div>
            </scroller>



        </div>
    </div>
</template>
<script>
import { Tab, TabItem, XInput,Scroller,LoadMore, } from 'vux'
import {mapActions,mapGetters} from 'vuex'
export default {
    components: {
        Tab,
        TabItem,
        Scroller,
        LoadMore,
        XInput
    },
    data() {
        return {
            activityList: [
                // {id: 1, img:'http://iph.href.lu/355x177', title: '【回顾】送给妈妈装满爱的花篮', created: '2019/07/24'},
                // {id: 2, img:'http://iph.href.lu/355x177', title: '【回顾】送给妈妈装满爱的花篮', created: '2019/07/24'},
                // {id: 3, img:'http://iph.href.lu/355x177', title: '【回顾】送给妈妈装满爱的花篮', created: '2019/07/24'},
            ],
            search: '',
            type: 0,
            pageNum: 1,
            totalPage: 0,
            articleList:[],
            page:1,
            pageSize:10,
            show:false,
            pid:'',
            cid:'',
            article_id:'',
            code_name:''
        }
    },
    computed: {
        ...mapGetters(['getToken'])
    },
    methods: {
        ...mapActions(['tourList']),
        handleQuery(val) {
            this.type = val
            console.log(this.type)
            this.page=1
            if(this.type == 0) {
                this.articleList=[]
                this.handleTour()
            }else{
                this.activityList=[]
                this.getSchoolArticleList()
            }
        },
        handleTour() {
            const params = {
                page: this.pageNum,
                pageSize: 5,
                token: this.GetQueryString('token'),
                keywords: this.search
            }
            this.tourList(params).then(res=>{
                if(res.StatusInfo.success) {
                    this.activityList = res.newsList?res.newsList:[]
                    this.totalPage = res.PageInfo.TotalPages
                } else {
                    this.toastShow(res.StatusInfo.ErrorDetailCode)
                }
            })
        },
        onScrollBottom () {
            if (this.onFetching) return;
            this.onFetching = true;
            this.pageNum += 1;
            if (this.pageNum > this.totalPage) return;
            this.handleQuery();
        },
        handleClick(id) {
            if(this.type == 0) {
                this.$router.push(`/tours/tourDetail?id=${item.tourism_id}`)
            }
        },
        getSchoolArticleList(){
            this.$http.get(`/Index/getArticle?page=${this.page}&pageSize=${this.pageSize}&keyword=${this.search}`).then(res=>{
                console.log(res)
                if(res.data.StatusInfo.success){
                // Object.assign(this.articleList,res.data.articleList)
                this.articleList=this.articleList.concat(res.data.articleList)
                this.totalPage=res.data.PageInfo.TotalPages
                }
                this.loadDataDone = true; // 请求成功 控制空数据显示
                this.onFetching = false; // 防止重复请求 
            })
        },
        onScrollBottomSchool () {
            // console.log(123)
            if (this.onFetching) return;
            this.onFetching = true;
            this.page += 1;
            if (this.page > this.totalPage) return;
            this.getSchoolArticleList();
        },
        goToArticleDetail(val){
            this.$router.push({path:'/schools/detail',query:{article_id:val.article_id}})
        },
        confirmToArticleDetail(val){
            this.show=true
            this.cid=val.cid
            this.article_id=val.article_id
            // this.$router.push({path:'/schools/detail',query:{article_id:item.article_id,code_name:item.article_id}})
        },
        confirmcode(){
            this.$http.get(`/Index/checkArticleCode?code_name=${this.code_name}&cid=${this.cid}`).then(res=>{
                console.log(res)
                if(res.data.StatusInfo.success){
                this.$router.push({path:'/schools/detail',query:{article_id:this.article_id,code_name:this.code_name}})
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
                this.code_name=val
                this.confirmcode()
            }else{
                this.$vux.toast.text('请填写验证码', 'top')
            }
            // this.$router.push({path:'/schools/detail',query:{article_id:item.article_id,code_name:val}})
            // this.$router.push('/owners/getvip')
        },
    },
    mounted() {
        console.log(this.$route.query.type)
        this.$nextTick(()=>{
            this.type = this.$route.query.type
            this.search = this.$route.query.search
        })

        this.handleQuery()
    },
}
</script>
<style scoped>
.top {
    background: #ffffff;
    padding: 12px 15px 0 15px;
    box-shadow: 0 2px 4px rgba(236, 236, 236, 0.5)
}
.top .search {
    width: 345px;
    height: 32px;
    background: rgba(243,243,243,1);
    border-radius: 16px;
    padding: 6px 9px 5px 9px;
    font-size: 15px;
    display: flex;
    justify-content: space-between;
}
.search input {
    width: 100%;
    text-align: center;
    background: rgba(243,243,243,1);
}
.container {
  margin: 10px;
  height: 272px;
  border-radius: 15px;
  box-shadow: 0 -2px 14px rgba(0,0,0,0.06);
}
.activity-img {
  width: 100%;
  height: 177px;
  border-radius: 15px 15px 0 0;
}
.activity-title {
  height: 95px;
  padding: 14px 21px 10px 20px;
  border-radius: 0 0 15px 15px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.name-price {
  display: flex;
  justify-content: space-between;
}
.name-price .price {
  color: #DE1E06;
  font-size: 22px;
}
.name-price .num {
  color: #989898;
  font-size: 10px;
}
.title-text {
  color: #323643;
  font-size: 16px;
  font-weight: 600;
  width: 56%;
  text-overflow: -o-ellipsis-lastline; 
  overflow: hidden; 
  text-overflow: ellipsis; 
  display: -webkit-box; 
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.time {
  color: #666666;
  font-size: 12px;
}
p img {
  width: 12px;
  height: 12px;
  display: inline-block;
  vertical-align: middle;
}
.menu{width:100%;padding-top:23px;background-color: #F8F8F8;padding-bottom: 70px}
.detail{min-height:257px;width: 95%;margin-left:2.5%;border-radius: 20px;background-color: #fff;margin-top:10px}
.detail .image{background-color: aqua;width:100%;height:177px;border-radius: 20px 20px 0 0 }
.detail .image img{width:100%;height:100%}
.detail .body{background-color: #fff;position: relative;border-radius:0 0 20px 20px }
.detail .body .title{max-width: 88%;color: #323643;font-size: 16px;margin-left:6%;margin-top:12px}
.detail .body .more{color:#666666;font-size: 13px;margin-left:6%;margin-top:10px;padding-bottom: 15px}
.detail .body .clock{width:12px;height: 12px;position: absolute;right:26.5%;bottom:17px}
.detail .body .clock img{width:12px;height: 12px}
.detail .body .time{position: absolute;bottom:15px;right: 6%;color:#999999;font-size: 12px}
</style>


