// 部落格 數據
<template lang="pug">
  .store-service-item-box.page-box
    .banner-img
      img(src="../../assets/img/storeService-img.png", alt)
    .page-body
      .store-service-content
        .store-service-head
          .store-service-title 網拍
          p 時薪 800 元
        .store-service-txt
          | 不怕鏡頭的商品攝影素人模特兒
          br
          | 不限外型或經驗，兼職、學生打工皆可
          br
          | 優先考慮可長期配合者，「沒有」品牌、直播合作經驗者
          br
          br
          | 每次配合前會說明拍攝內容
          br
          | 有意願再約拍攝時間 (平日周一至周五白天)

      .white-bg.price-box
        .white-bg-head
          h2.title 此服務預約費用計算
        .price-list
          .price-item
            span.num 800
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


