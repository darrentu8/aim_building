// 部落格 數據
<template lang="pug">
  .business-card-item-box.page-box
    //  end page-head 
    .page-body
      .white-bg.profile-box
        .profile-info.text-center
          .img
            img(:src="data.logo", alt)
          h2.name {{data.shopName}}
          p.txt {{data.business}}
        ul.link-box.d-flex
          li
            //- router-link(:to="{name: 'BusinessCard'}")
            a(@click="scanQR()")
              img(src="../../assets/img/businessCardItem-icon-user.png", alt)
              p 掃碼名片
          //- li
          //-   a(@click="openChat()")
          //-     img(src="../../assets/img/businessCardItem-icon-chat.png", alt)
          //-     p 開啟聊天
          //- li
          //-   router-link(:to="{name: 'Reservation'}")
          //-     img(src="../../assets/img/businessCardItem-icon-time.png", alt)
          //-     p 預約時間
          //- li
          //-   a(v-if="data.isCollect" @click="onCollect")
          //-     img(src="../../assets/img/businessCardItem-icon-heart-none.png", alt)
          //-     p 按讚關注
          //-   a(v-else @click="onCollect")
          //-     img(style="margin-left:8px;" src="../../assets/img/businessCardItem-icon-heart.png", alt)
          //-     p 已關注
        .white-bg-head
          h2.title 個人介紹
          p {{data.content}}

      .white-bg
        .white-bg-head
          h2.title 職業內容介紹
          //- p {{data.describe}}
        ul.job-info
          li
            span.job-title 簡介
            span {{data.describe}}
          li
            div(style="width:100%;display:flex;")
              .col-6(style="padding:0;") 服務時間
              .col-6.text-right(style="padding:0;")
                p(v-for="(vo, i) in shopTimeView" :key="i") {{vo}}
          //- li(v-for="vo in businesstime" @click="showTimeList()") 服務時間
          //-   span 星期{{vo.week}} {{vo.time}}
          li(v-for="job in jobData" :key="job.id")
            span.job-title {{job.title}}
            span {{job.content}}
      //-   .img-list-box
      //-     .img-item(v-for="(res,i) in data.reservationService" :key="res.key")
      //-       .img
      //-         img(:src="res.image", alt)
      //-       .info
      //-         .info-title {{res.name}}
      //-         p(v-if="res") {{res.content[0].time[0].price}} 元
      //-         p(v-else) 200 元
      //- .white-bg.map-box
      //-   .white-bg-head
      //-     h2.title.
            
      //-       職業服務地點
            
      //-     p {{data.address}} / 到府服務
      //-     .map-iframe
      //-       .map-cover
      //-       iframe(src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.1671008805292!2d120.29955451496016!3d22.610234385163366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e037c25c5b457%3A0x1eae13f288f3b891!2zODA26auY6ZuE5biC5YmN6Y6u5Y2A5paw5YWJ6LevNjHomZ8!5e0!3m2!1szh-TW!2stw!4v1630720625488!5m2!1szh-TW!2stw", style="border:0;", allowfullscreen, loading="lazy")
      .white-bg.friends-box
        .white-bg-head
          h2.title 已結交朋友介紹
          p 目前好友數 {{data.partnershop.length}} 人
          ul.friends-list.d-flex.flex-wrap
            li(v-for="(partner,i) in data.partnershop" :key="partner.key")
              //- a(:href="partner.url")
              a(href="javascript:;")
                img(:src="partner.logo", alt)
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


