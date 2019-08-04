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
</script>

<style src="./styles/resets.css">

body {
  background-color: #fbf9fe;
}
</style>
