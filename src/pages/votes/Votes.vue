// 主页
<!--suppress JSUnresolvedVariable -->
<template lang="pug">
.page-box
  BasePageBack(ref="BasePageBack")
    div(slot="page-title") 投票
    div(slot="content")
      .col-12.mb-4.mx-auto.text-center
        img.head-icon.mb-4(src="../../assets/pic/vote.svg")
        h6.my-0 投票進行中
        .border-top.my-1.mx-5
        h5.my-0.mt-2 成立大樓管委會
        img.mt-4.head-icon.mb-4(src="../../assets/pic/qr.png")
      .col-12.mb-4.mx-auto.px-5
        p.mb-2.title-line
          b 投票內容
        p.mb-3
          b 你是否同意成立社區大樓管委會？你是否同意成立社區大樓管委會？你是否同意成立社區大樓管委會？你是否同意成立社區大樓管委會？
        ul
          li
            b 提案者：林大俠
          li
            b 提案時間：2022.11.11
          li
            b 投票時間：2022.11.11～2022.11.11
          li
            b 目前投票人數：10人
          li
            b 尚未投票人數：60人
          li
            b 已投票人數：
            a.text-primary(href='#') 點擊查看清單
      .col-12.mb-4.px-5
        p.mb-2.title-line
          b 我的意見
        .info.primary
          p.mb-1
            span 我不同意
            small.float-right.pt-1 不具名
          p.w 要多付錢，住戶沒意願要多付錢，住戶沒意願要多付錢，住戶沒意願要多付錢，住戶沒意願要多付錢，住戶沒意願要多付錢，住戶沒意願要多付錢，住戶沒意願要多付錢，住戶沒意願
      .col-12.mb-4.pl-5.pb-5.pr-0
        p.mb-2.title-line
          b 其他人的意見
        VueSlickCarousel(v-bind="settings")
          div(v-for="(other,i) in others", :key="i")
            .info.secondary
              p.mb-1
                span {{ other.agree }}
                small.float-right.pt-1 {{ other.name }}
              p.w {{ other.comment }}

  //- Menu(ref="menu")
</template>
<script>
import Votes from './Votes.vue.js';
export default {
  ...Votes
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "Votes.vue.styl";
</style>


