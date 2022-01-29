<template>
  <div class="basePageBack" :class="type">
    <header class="header page-header" id="header-box">
      <div class="d-flex align-items-center">
        <div class="float-left" >
          <button type="button" class="btn btn-primary page-back-btn"
              @click="back" >
              <slot name="back-btn"></slot>
            <img src="../../assets/img/icon-back.png"/>
          </button>
        </div>
        <div class="page-title">
            <slot name="page-title"></slot>
        </div>
        <div class="ml-auto">
          <button type="button" class="btn btn-primary" @click="onclickMenu">
            <img src="../../assets/img/icon-menu.png" class="menu-btn" />
          </button>
        </div>
      </div>
    </header>
    <!-- end page-header -->
    <!-- end header -->
    <div class="bg bgImage">
      <div class="sorollView">
        <cube-scroll ref="scroll">
          <div class="content-box">
            <slot name="content">
              {{content}}
            </slot>
          </div>
        </cube-scroll>
      </div>
      <slot name="scrollcontent">
        {{content}}
      </slot>
    </div>
    
    <Menu ref="menu" />
  </div>
</template>

<script>
   import basePageBack from './BasePageBack.vue.js';
   export default {
     ...basePageBack
   }
</script>
<style>
  @import '../../assets/css/app.css';
</style>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "BasePageBack.vue.styl";
</style>
