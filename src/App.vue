<template>
  <div id="app">
    <transition name="slide">
      <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        transitionName: ''
      }
    },
    watch: {
      // 使用watch 监听$router的变化
      $route (to, from) {
      }
    }
  }
</script>

// 动画
<style  >
  .slide-enter-active,.slide-leave-active{
    transition: all 0.2s;
  }
  .slide-enter,.slide-leave-to{
    /*transform: translate3d(100%,100%,0);*/
    transform: rotate3d(1,0,0,90deg)
  }
</style>

<style>

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;
    color: #2c3e50;
    margin-top: 60px;*/
  }
</style>
