// 部落格 數據
<template>
  <div class="store-service-item-box page-box">
    <div class="banner-img">
      <img src="../../assets/img/storeService-img.png" alt="">
    </div>
    <div class="page-body">
      <div class="store-service-content">
        <div class="store-service-head">
          <div class="store-service-title">網拍</div>
          <p>時薪 800 元</p>
        </div>
        <div class="store-service-txt">
          不怕鏡頭的商品攝影素人模特兒<br/>
          不限外型或經驗，兼職、學生打工皆可<br/>
          優先考慮可長期配合者，「沒有」品牌、直播合作經驗者<br/><br/>

          每次配合前會說明拍攝內容<br/>
          有意願再約拍攝時間 (平日周一至周五白天)
        </div>
      </div>
      <div class="white-bg price-box">
        <div class="white-bg-head">
          <h2 class="title">此服務預約費用計算</h2>
        </div>
        <div class="price-list">
          <div class="price-item">
            <span class="num">800</span>
            <p>時薪費用</p>
          </div>
          <div class="price-item">
            <span class="num">1</span>
            <p>預約時數</p>
          </div>
          <div class="price-item">
            <span class="num">8:00-19:00</span>
            <p>工作時間</p>
          </div>
        </div>
        <div class="btn-box">
          <button class="btn">立即預約時間</button>
        </div>
      </div>
      <!-- end reservation-box -->
      </div>
    </div>
    <!-- end page-body -->
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


