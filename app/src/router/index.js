import Vue from 'vue'
import VueRouter from 'vue-router'

// 0. 如果使用模块化机制编程，導入Vue和VueRouter，要调用 vue.use(vuerouter)
Vue.use(VueRouter)
// 1. 定义（路由）组件。
// 可以从其他文件 import 进来
const Bar = {
  template: '<div>bar</div>'
}
const Baz = {
  template: '<div>baz</div>'
}
const Foo = {
  template: '<div>foo</div>'
}
const Index = {
  template: '<div>index</div>'
}
const Details = {
  template: '<div>Details</div>'
}
const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `
}
const NotFind = {
  template: `<div>404, goBackHome</div>`
}
const UserHome = {template: '<div>Home</div>'}
const UserProfile = {template: '<div>Profile</div>'}
const UserPosts = {template: '<div>Posts</div>'}

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。我们晚点再讨论嵌套路由。
// 动态路径参数 以冒号开头
// The matching uses path-to-regexp, which is the matching engine used
// by express as well, so the same matching rules apply.
// For detailed rules, see https://github.com/pillarjs/path-to-regexp
export default new VueRouter({
  mode: 'history',
  routes: [
    {path: '/', component: Index},
    {path: '/foo', component: Foo},
    {path: '/bar', component: Bar},
    {
      path: '/details/:detailsId',
      name: 'detailsName',
      component: Details
    },
    {
      path: '/user/:id',
      component: User,
      children: [
        // UserHome will be rendered inside User's <router-view>
        // when /user/:id is matched
        {path: '', component: UserHome},
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        {path: 'profile', component: UserProfile},
        // UserPosts will be rendered inside User's <router-view>
        // when /user/:id/posts is matched
        {path: 'posts', component: UserPosts}
      ]
    },
    {
      path: '/bars',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    },
    {path: '*', component: NotFind}
  ]
})
