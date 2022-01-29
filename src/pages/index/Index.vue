// 主页
<!--suppress JSUnresolvedVariable -->
<template lang="pug">
  .index-box(:style="bgclass")
    header.header.page-header#header-box
      .d-flex.align-items-center
        .page-title Alice lu 模特兒店
        .ml-auto
          button.btn.btn-primary(type="button", @click="onclickMenu")
            img.menu-btn(src="../../assets/img/icon-menu.png")
    .sorollView
      cube-scroll(ref="scroll")
        .content-box
          .profile-box.text-center
            .img
              img(src="../../assets/img/businessCardItem-proflie-defult.png", alt)
            h2.name Alice lu
            p.txt 模特兒
          .follow-info
            .follow-info-item
              span.num 102
              p 被關注人數
            .follow-info-item
              span.num 10
              p 本月已預約人數
          .white-bg
            ul.link-box.d-flex
              li
                router-link(:to="{name: 'BusinessCard'}")
                  img(src="../../assets/img/businessCardItem-icon-user.png", alt)
                  p 交換名片
              li
                a(@click="openChat()")
                  img(src="../../assets/img/businessCardItem-icon-chat.png", alt)
                  p 開啟聊天
              li
                router-link(:to="{name: 'Reservation'}")
                  img(src="../../assets/img/businessCardItem-icon-time.png", alt)
                  p 預約時間
              li
                a(v-if="shopinfo.isCollect")
                  img(src="../../assets/img/businessCardItem-icon-heart-none.png", alt)
                  p 按讚關注
                a(v-else)
                  img(style="margin-left:8px;" src="../../assets/img/businessCardItem-icon-heart.png", alt)
                  p 已關注
          .white-bg
            .white-bg-head
              h2.title 職業內容介紹
              p 模特兒
            ul.job-info
              li
                span.job-title 服務時間
                span 08:00-19:00
              li
                span.job-title 職涯年齡
                span 三年
              li
                span.job-title 服務內容
                span 網拍、業配、外景拍攝、廣告
          .white-bg.map-box
            .white-bg-head
              h2.title 職業服務地點
              p 高雄市前鎮區新光路61號 / 到府服務
              .map-iframe
                .map-cover
                iframe(src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.1671008805292!2d120.29955451496016!3d22.610234385163366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e037c25c5b457%3A0x1eae13f288f3b891!2zODA26auY6ZuE5biC5YmN6Y6u5Y2A5paw5YWJ6LevNjHomZ8!5e0!3m2!1szh-TW!2stw!4v1630720625488!5m2!1szh-TW!2stw", style="border:0;", ref="iframe")
          .white-bg.service-box
            .white-bg-head
              h2.title 服務內容(價格)
              p 模特兒
            .service-list
              .service-item
                router-link(:to="{name: 'StoreService'}")
                  .service-info
                    .service-txt
                      h3.service-title 網拍
                      p 不怕鏡頭的商品攝影素人模特兒不限外型或經驗，兼職學生打工皆可
                    .service-img
                      img(src="../../assets/img/reservation-img1.png", alt)
                  .price 時薪 800 元
              .service-item
                router-link(:to="{name: 'StoreService'}")
                  .service-info
                    .service-txt
                      h3.service-title 網拍
                      p 不怕鏡頭的商品攝影素人模特兒不限外型或經驗，兼職學生打工皆可
                    .service-img
                      img(src="../../assets/img/reservation-img2.png", alt)
                  .price 時薪 800 元
              .service-item
                router-link(:to="{name: 'StoreService'}")
                  .service-info
                    .service-txt
                      h3.service-title 網拍
                      p 不怕鏡頭的商品攝影素人模特兒不限外型或經驗，兼職學生打工皆可
                    .service-img
                      img(src="../../assets/img/reservation-img3.png", alt)
                  .price 時薪 800 元
              .service-item
                router-link(:to="{name: 'StoreService'}")
                  .service-info
                    .service-txt
                      h3.service-title 網拍
                      p 不怕鏡頭的商品攝影素人模特兒不限外型或經驗，兼職學生打工皆可
                    .service-img
                      img(src="../../assets/img/reservation-img4.png", alt)
                  .price 時薪 800 元
    Menu(ref="menu")
</template>
<script>
  import index from './Index.vue.js';
  export default {
    ...index
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "Index.vue.styl";
</style>


