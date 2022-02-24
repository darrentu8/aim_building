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
          li(v-if="exchangecards")
            a(@click="scanQR()")
              img(:src="exchangecards.icon", alt)
              p {{exchangecards.text}}
        .white-bg-head
          h2.title 個人介紹
          p(v-if="data.content") {{data.content}}
          p(v-else) 無

      .white-bg
        .white-bg-head
          h2.title 職業內容介紹
        ul.job-info
          li
            span.job-title 簡介
            span(v-if="data.describe") {{data.describe}}
            p(v-else) 無
          li
            div(style="width:100%;display:flex;")
              .col-6(style="padding:0;") 所有服務時間
              .col-6.text-right(v-if="shopTimeView" style="padding:0;")
                p(v-for="(vo, i) in shopTimeView" :key="i") {{vo}}
              .col-6.text-right(v-else style="padding:0;")
                p 暫無資料
          li(v-if="jobData" v-for="job in jobData" :key="job.id")
            span.job-title {{job.title}}
            span {{job.content}}
          li(v-else)
            span.job-title 暫無資料
      .white-bg.friends-box
        .white-bg-head
          h2.title 已結交朋友介紹
          p(v-if="data.partnershop.length") 目前好友數 {{data.partnershop.length}} 人
          p(v-else) 目前好友數 0 人
          ul.friends-list.d-flex.flex-wrap(v-if="data.partnershop")
            li(v-for="(partner,i) in data.partnershop" :key="partner.key")
              a(@click="openShop(partner.shopid)")
                img(:src="partner.logo", alt)
          ul.friends-list.d-flex.flex-wrap(v-else)
            li 無資料
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


