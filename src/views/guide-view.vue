<template>
  <div style="height:100%;">
    <group class="guide">
      <cell v-for="item in guide_list" :key="item.id" :title="item.title" :link="'https://www.baidu.com'"></cell>
    </group>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {Cell,Group, } from 'vux'
export default {
  components: {
      Cell,
      Group
  },
  computed: {
    // ...mapGetters([])
  },
  name: "HomePage",
  data() {
    return {
      guide_list: [
        {id: 1, title: '如何正确使用积分'},
        {id: 2, title: '如何成为VIP会员'},
        {id: 3, title: '活动是所有人都可以参加的吗？'}
      ]
    };
  },
  methods: {
    // ...mapActions(),
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
<style>
.guide .weui-cells {
    margin-top: 0!important;
}
</style>
