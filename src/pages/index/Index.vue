// 主页
<!--suppress JSUnresolvedVariable -->
<template lang="pug">
  .index-box(:style="bgclass")
    header.header.page-header#header-box
      .d-flex.align-items-center
        .page-title {{data.shopName}} {{data.business}}店
        .ml-auto
          button.btn.btn-primary(type="button", @click="onclickMenu")
            img.menu-btn(src="../../assets/img/icon-menu.png")
    .sorollView
      cube-scroll(ref="scroll")
        .content-box
          .profile-box.text-center
            .img
              img(:src="data.logo", alt)
            h2.name {{data.shopName}}
            p.txt {{data.business}}
          .follow-info
            .follow-info-item
              span.num {{data.attention}}
              p 被關注人數
            .follow-info-item
              span.num {{data.orderQuantity}}
              p {{$Lang('index-orderQuantity','本月已預約人數test')}}
          .white-bg
            ul.link-box.d-flex
              li
                router-link(:to="{name: 'BusinessCard'}")
                  img(src="../../assets/img/businessCardItem-icon-user.png", alt)
                  p 交換名片
              li
                a(@click="openChat")
                  img(src="../../assets/img/businessCardItem-icon-chat.png", alt)
                  p 開啟聊天
              li
                router-link(:to="{name: 'Reservation'}")
                  img(src="../../assets/img/businessCardItem-icon-time.png", alt)
                  p 預約時間
              li
                a(v-if="!data.isCollect" @click="onCollect")
                  img(:src="$UIIcon('icon-collect','businessCardItem-icon-heart-none.png')", alt)
                  p {{$Lang('index-icon-collect','按讚關注')}}
                a(v-else @click="onCollect")
                  img(style="margin-left:8px;" :src="$UIIcon('icon-collect-select','businessCardItem-icon-heart.png')" , alt)
                  p {{$Lang('index-collect-select','已關注')}}
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
                    p(v-for="(vo, i) in shopTimeView" :key="i") {{vo.week}} {{vo.time}}
              li(v-for="job in jobData" :key="job.id")
                span.job-title {{job.title}}
                span {{job.content}}
              //- li
              //-   span.job-title 服務內容
              //-   span {{data.describe}}
          .white-bg.map-box
            .white-bg-head
              h2.title 職業服務地點
              p {{data.address}} / 到府服務
              .map-iframe
                .map-cover
                iframe(src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.1671008805292!2d120.29955451496016!3d22.610234385163366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e037c25c5b457%3A0x1eae13f288f3b891!2zODA26auY6ZuE5biC5YmN6Y6u5Y2A5paw5YWJ6LevNjHomZ8!5e0!3m2!1szh-TW!2stw!4v1630720625488!5m2!1szh-TW!2stw", style="border:0;", ref="iframe")
          .white-bg.service-box
            .white-bg-head
              h2.title 服務內容(價格)
              //- p {{data.business}}
            .service-list
              .service-item(v-for="(res) in data.reservationService" :key="res.key")
                router-link(:to="{name: 'StoreService', params:{ content: data.shopName }}" @click.native="setRes(res)")
                  .service-info
                    .service-txt
                      h3.service-title {{res.name}}
                      p {{res.info}}
                    .service-img
                      img(:src="res.image", alt)
                  .price(v-if="res.content[0].time[0].price != undefined") 時薪價格 {{res.content[0].time[0].price}} 元 / 剩餘銷售數量 {{res.copies}}
                  //- .price 剩餘銷售數量 {{res.copies}} / 已售出 {{res.sell}}
                  //- .service-info
                  //-   .service-txt
                  //-     h3.service-title {{res.name}}
                  //-     p {{res.info}}
                  //-   .service-img
                  //-     img(:src="res.image", alt)
                  //- .price 時薪 {{res.price}} 元
              //- .service-item
              //-   router-link(:to="{name: 'StoreService'}")
              //-     .service-info
              //-       .service-txt
              //-         h3.service-title 網拍
              //-         p 不怕鏡頭的商品攝影素人模特兒不限外型或經驗，兼職學生打工皆可
              //-       .service-img
              //-         img(src="../../assets/img/reservation-img2.png", alt)
              //-     .price 時薪 800 元
              //- .service-item
              //-   router-link(:to="{name: 'StoreService'}")
              //-     .service-info
              //-       .service-txt
              //-         h3.service-title 網拍
              //-         p 不怕鏡頭的商品攝影素人模特兒不限外型或經驗，兼職學生打工皆可
              //-       .service-img
              //-         img(src="../../assets/img/reservation-img3.png", alt)
              //-     .price 時薪 800 元
              //- .service-item
              //-   router-link(:to="{name: 'StoreService'}")
              //-     .service-info
              //-       .service-txt
              //-         h3.service-title 網拍
              //-         p 不怕鏡頭的商品攝影素人模特兒不限外型或經驗，兼職學生打工皆可
              //-       .service-img
              //-         img(src="../../assets/img/reservation-img4.png", alt)
              //-     .price 時薪 800 元
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


