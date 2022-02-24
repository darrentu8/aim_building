// 部落格 數據
<template lang="pug">
  .store-service-item-box.page-box
    .banner-img
      img(:src="res[0].image", alt)
      //- img(src="../../assets/img/storeService-img.png", alt)
    .page-body
      .store-service-content
        .store-service-head
          .store-service-title {{res[0].name}}
          p(v-if="res[0].content[0].time[0].price != undefined") 時薪 {{res[0].content[0].time[0].price}} 元
        .store-service-txt
          | {{res[0].info}}

      .white-bg.price-box
        .white-bg-head
          h2.title 此服務預約費用計算
        .price-list
          .price-item
            span.num(v-if="res[0].content[0].time[0].price != undefined") {{res[0].content[0].time[0].price}}
            p 時薪費用
          .price-item
            span.num {{res[0].copies}}
            p 可預約數量
          .price-item
            span.num(v-if="res[0].content[0].time[0].time != undefined") {{res[0].content[0].time[0].time}}
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


