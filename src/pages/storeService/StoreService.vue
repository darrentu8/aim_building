// 部落格
<template>
  <div class="store-service-box">
    <BasePageBack  ref="BasePageBack" >
      <!-- <div slot="back-btn"><img src="../../assets/img/icon-back-white.png"/></div> -->
      <div slot="back-btn">
         <img src="../../assets/img/icon-back-white.png"/>
      </div>
      <div slot="page-title">{{good.shopName}} {{good.business}}</div>
      <div slot="content">
        <StoreServiceItem />
      </div>
    </BasePageBack>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import StoreService from './StoreService.vue.js';
  export default {
    ...StoreService,
    computed: {
      ...mapState(['good'])
    },
    mounted () {
      console.log('good', this.good)
    },
    methods: {
    }
  }
</script>

<style scoped lang='stylus" rel="stylesheet/stylus">
  @import "StoreService.vue.styl";
</style>


