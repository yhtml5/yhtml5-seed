<template>
  <div class="weui-search-bar" :class="{'weui-search-bar_focusing':isActive}">
    <form class="weui-search-bar__form">
      <div class="weui-search-bar__box" @click="focus">
        <i class="weui-icon-search"></i>
        <input type="search" class="weui-search-bar__input" placeholder="搜索" required="">
        <a href="javascript:" class="weui-icon-clear" id="searchClear"></a>
      </div>
      <label class="weui-search-bar__label" id="searchText">
        <i class="weui-icon-search"></i>
        <span>{{title}}</span>
      </label>
    </form>
    <a href="javascript:" class="weui-search-bar__cancel-btn" @click="cancel">取消</a>
  </div>
</template>
<script>
  export default {
    props: ['title'],
    data: function () {
      return {isActive: true}
    },
    computed: {
      normalizedSize: function () {
        return this.size.trim().toLowerCase()
      }
    },
    methods: {
      cancel () {
        this.isActive = false
        this.$emit('cancel')
        console.log('cancel')
      },
      focus () {
        this.isActive = true
        this.$emit('focus')
        console.log('focus')
      }
    }
  }
</script>

<style>
  div {

  }
</style>
