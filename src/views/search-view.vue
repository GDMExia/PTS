<template>
    <div class="main">
        <div class="top">
            <div class="search">
                <input placeholder="搜索文章关键词" type="text">
                <img style="width: 15px; height: 15px;margin-top: 3px;" src="../../static/img/sousuo_icon_search@2x.png" alt="">
            </div>
            <div>
                <tab :line-width="1" custom-bar-width="22px">
                    <tab-item selected>旅游</tab-item>
                    <tab-item>学院</tab-item>
                </tab>
            </div>
        </div>
        <div style="padding-bottom: 83px;">
            <pull-to :bottom-load-method="loadmore" :distance-index="distanceIdx" :bottom-config="configBtm">
                <div class="container" @click="$router.push('/tours/tourDetail')" v-for="item in activityList" :key="item.id">
                <img class="activity-img" :src="item.img" alt="">
                <div class="activity-title">
                    <div class="name-price">
                    <span class="title-text">{{item.title}}</span>
                    <div>
                        <p class="price">¥ 2050</p>
                        <p class="num">抵500积分</p>
                    </div>
                    </div>
                    <p class="time">
                    <img src="../../static/img/icon_time@2x.png" alt="">
                    {{item.created}}
                    </p>
                </div>
                </div>
            </pull-to>
        </div>
    </div>
</template>
<script>
import PullTo from 'vue-pull-to';
import { Tab, TabItem } from 'vux'
export default {
    components: {
        PullTo,
        Tab,
        TabItem
    },
    data() {
        return {
            pageNum: 0,
            distanceIdx: 3,
            configBtm: {
                pullText: '下拉刷新', // 下拉时显示的文字
                triggerText: '释放更新', // 下拉到触发距离时显示的文字
                loadingText: '加载中...', // 加载中的文字
                doneText: '加载完成', // 加载完成的文字
                failText: '无数据', // 加载失败的文字
                loadedStayTime: 500, // 加载完后停留的时间ms
                stayDistance: 50, // 触发刷新后停留的距离
                triggerDistance: 40 // 下拉刷新触发的距离
            },
            activityList: [
                {id: 1, img:'http://iph.href.lu/355x177', title: '【回顾】送给妈妈装满爱的花篮', created: '2019/07/24'},
                {id: 2, img:'http://iph.href.lu/355x177', title: '【回顾】送给妈妈装满爱的花篮', created: '2019/07/24'},
                {id: 3, img:'http://iph.href.lu/355x177', title: '【回顾】送给妈妈装满爱的花篮', created: '2019/07/24'},
            ]
        }
    },
    methods: {
        loadmore() {},
    }
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
  max-width: 92%;
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
  max-width: 211px;
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
</style>


