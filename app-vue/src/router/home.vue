<template>
  <div id="app">
    <v-search title="Search"></v-search>

    <img src="../assets/logo.png">
    <hello></hello>
    <p>
      <!-- 使用 router-link 组件来导航. -->
      <!-- 通过传入 `to` 属性指定链接. -->
      <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
      <router-link to="/foo">Go to Foo</router-link>
      <router-link to="/bar">Go to Bar</router-link>
      <br>
      <router-link to="/user/1581">user center</router-link>
      <router-link to="/user/foo">/user/foo</router-link>
      <router-link to="/user/foo/profile">/user/foo/profile</router-link>
      <router-link to="/user/foo/posts">/user/foo/posts</router-link>
      <router-link :to="{ name: 'detailsName', params: { detailsId: 123 }}">Details</router-link>
      <router-link to="/bars">bare</router-link>
    </p>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <!--<router-view class="view one"></router-view>-->
    <router-view class="view two" name="a"></router-view>
    <router-view class="view three" name="b"></router-view>
    <router-view></router-view>
  </div>
</template>

<script>
  import Hello from '../components/Hello.vue'
  import vHeader from '../components/header.vue'
  import vSearch from '../components/search.vue'

  export default {
    name: 'app',
    components: {
      Hello,
      vHeader,
      vSearch
    }
  }
</script>
<style scoped>
  @import '../../../node_modules/weui/dist/style/weui.min.css';

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
