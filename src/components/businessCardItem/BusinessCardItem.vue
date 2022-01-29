// 部落格 數據
<template lang="pug">
  .business-card-item-box.page-box
    //  end page-head 
    .page-body
      .white-bg.profile-box
        .profile-info.text-center
          .img
            img(src="../../assets/img/businessCardItem-proflie-defult.png", alt)
          h2.name Alice lu
          p.txt 模特兒
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
        .white-bg-head
          h2.title 個人介紹
          p
            | 是位台美混血全方位模特兒
            br
            | 平面：LunaˋJP PomadeˋGo GymˋUber
            br
            | 廣告：7-11ˋHTCˋMazdaˋElectrolux

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
        .img-list-box
          .img-item
            .img
              img(src="../../assets/img/reservation-img1.png", alt)
            .info
              .info-title 網拍
              p 1200元
          .img-item
            .img
              img(src="../../assets/img/reservation-img2.png", alt)
            .info
              .info-title 網拍
              p 1200元
          .img-item
            .img
              img(src="../../assets/img/reservation-img3.png", alt)
            .info
              .info-title 網拍
              p 1200元
          .img-item
            .img
              img(src="../../assets/img/reservation-img4.png", alt)
            .info
              .info-title 網拍
              p 1200元
      .white-bg.map-box
        .white-bg-head
          h2.title.
            
            職業服務地點
            
          p 高雄市前鎮區新光路61號 / 到府服務
          .map-iframe
            .map-cover
            iframe(src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.1671008805292!2d120.29955451496016!3d22.610234385163366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e037c25c5b457%3A0x1eae13f288f3b891!2zODA26auY6ZuE5biC5YmN6Y6u5Y2A5paw5YWJ6LevNjHomZ8!5e0!3m2!1szh-TW!2stw!4v1630720625488!5m2!1szh-TW!2stw", style="border:0;", allowfullscreen, loading="lazy")
      .white-bg.friends-box
        .white-bg-head
          h2.title 已結交朋友介紹
          p 目前好友數 261人
          ul.friends-list.d-flex.flex-wrap
            li
              a(href="javascript:;")
                img(src="../../assets/img/businessCard-img1.png", alt)
            li
              a(href="javascript:;")
                img(src="../../assets/img/businessCard-img2.png", alt)
            li
              a(href="javascript:;")
                img(src="../../assets/img/businessCard-img3.png", alt)
    //  end page-body 
</template>


<script>
  import BusinessCardItem from './BusinessCardItem.vue.js';
  export default {
    ...BusinessCardItem
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
   @import "BusinessCardItem.vue.styl";
</style>


