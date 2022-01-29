// 部落格
<template>
  <div class="store-service-box">
    <BasePageBack  ref="BasePageBack" >
      <!-- <div slot="back-btn"><img src="../../assets/img/icon-back-white.png"/></div> -->
      <div slot="back-btn">
         <img src="../../assets/img/icon-back-white.png"/>
      </div>
      <div slot="page-title">Alice lu 模特兒店</div>
      <div slot="content">
        <StoreServiceItem />
      </div>
    </BasePageBack>
  </div>
</template>

<script>
  import StoreService from './StoreService.vue.js';
  export default {
    ...StoreService
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "StoreService.vue.styl";
</style>


