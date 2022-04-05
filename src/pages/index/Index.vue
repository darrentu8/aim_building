// 主页
<!--suppress JSUnresolvedVariable -->
<template lang="pug">
  .index-box(:style="bgclass")
    header.header.page-header#header-box
      .d-flex.align-items-center
        .page-title(v-if="data.shopName") {{data.shopName}} {{data.business}}
        .page-title(v-else) -
        .ml-auto
          button.btn.btn-primary(type="button", @click="onclickMenu")
            img.menu-btn(src="../../assets/img/icon-menu.png")
    .sorollView
      cube-scroll(ref="scroll")
        .content-box
          .profile-box.text-center
            .img
              img(:src="data.logo", alt)
            h2.name(v-if="data.shopName") {{data.shopName}}
            h2.name(v-else) -
            p.txt(v-if="data.business") {{data.business}}
            p.txt(v-else) -
          .follow-info
            .follow-info-item
              span.num(v-if="data.attention") {{data.attention}}
              span.num(v-else)  0
              p  {{$Lang('index-attention','被關注人數')}}
            .follow-info-item
              span.num(v-if="data.orderQuantity") {{data.orderQuantity}}
              span.num(v-else)  0
              p {{$Lang('index-orderQuantity','本月已預約人數')}}
          .white-bg
            ul.link-box.d-flex
              li(v-if="exchangecards")
                router-link(:to="{name: 'BusinessCard'}")
                  img(:src="exchangecards.icon", alt)
                  p {{exchangecards.text}}

              li(v-if="chat")
                a(@click="openChat")
                  img(:src="chat.icon", alt)
                  p {{chat.text}}

              li(v-if="scan")
                router-link(:to="{name: 'Reservation'}")
                  img(:src="scan.icon", alt)
                  p {{scan.text}}

              //- li
              //-   router-link(:to="{name: 'BusinessCard'}")
              //-     img(src="../../assets/img/businessCardItem-icon-user.png", alt)
              //-     p 交換名片
              //- li
              //-   a(@click="openChat")
              //-     img(src="../../assets/img/businessCardItem-icon-chat.png", alt)
              //-     p 開啟聊天
              //- li
              //-   router-link(:to="{name: 'Reservation'}")
              //-     img(src="../../assets/img/businessCardItem-icon-time.png", alt)
              //-     p 預約時間
              li
                a(v-if="isCollect === false" @click="onCollect")
                  img(:src="$UIIcon('icon-collect','businessCardItem-icon-heart-none.png')", alt)
                  p {{$Lang('index-icon-collect','按讚關注')}}
                a(v-if="isCollect === true" @click="onCollect")
                  img(style="margin-left:8px;" :src="$UIIcon('icon-collect-select','businessCardItem-icon-heart.png')" , alt)
                  p {{$Lang('index-collect-select','已關注')}}
          .white-bg
            .white-bg-head
              h2.title {{$Lang('index-title-job','職業內容介紹')}}
              //- p {{data.describe}}
            ul.job-info
              li
                span.job-title {{$Lang('bcard-brief','簡介')}}
                span {{data.describe}}
              li
                div(style="width:100%;display:flex;")
                  .col-6(style="padding:0;") {{$Lang('bcard-times','服務時間')}}
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
              h2.title {{$Lang('index-title-locat','職業服務地點')}}
              p {{data.address}} / {{$Lang('index-title-service-way','到府服務')}}
              .map-iframe
                .map-cover
                  iframe( loading="lazy" :src="'https://www.google.com/maps/embed/v1/place?key=AIzaSyAOl7nkGhwOn0xQk3_6HuFY86gHgOlthDM&q='+ data.address +'&zoom=17'", style="border:0;", ref="iframe")
          .white-bg.service-box
            .white-bg-head
              h2.title {{$Lang('index-title-goods','服務內容(價格)')}}
              //- p {{data.business}}
            .service-list
              .service-item(v-for="(res) in data.reservationService" :key="res.key")
                router-link(:to="{name: 'StoreService', query:{ content: data.shopName,key:res.key }}" @click.native="setRes(res)")
                  .service-info
                    .service-txt
                      h3.service-title {{res.name}}
                      p {{res.info}}
                    .service-img
                      img(:src="res.image", alt)
                  .price(v-if="res.content[0].time[0].price != undefined") {{$Lang('index-time-price','時薪費用')}} {{res.content[0].time[0].price}} {{$Lang('res-currency','元')}} / {{$Lang('res-time-num','可預約數量')}} {{res.copies}}
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


