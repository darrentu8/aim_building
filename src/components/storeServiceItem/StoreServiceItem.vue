// 部落格 數據
<template lang="pug">
  .store-service-item-box.page-box
    .banner-img
      img(:src="good.image", alt)
      //- img(src="../../assets/img/storeService-img.png", alt)
    .page-body
      .store-service-content
        .store-service-head
          .store-service-title {{good.name}}
          p 時薪 {{good.price}} 元
        .store-service-txt
          | {{good.info}}

      .white-bg.price-box
        .white-bg-head
          h2.title 此服務預約費用計算
        .price-list
          .price-item
            span.num {{good.price}}
            p 時薪費用
          .price-item
            span.num 1
            p 預約時數
          .price-item
            span.num 8:00-19:00
            p 工作時間
        .btn-box
          router-link.btn(type="button" :to="{name: 'Reservation'}") 立即預約時間
      //  end reservation-box 
  //  end page-body 
</template>


<script>
  import StoreServiceItem from './StoreServiceItem.vue.js';
  export default {
    ...StoreServiceItem
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
   @import "StoreServiceItem.vue.styl";
</style>


