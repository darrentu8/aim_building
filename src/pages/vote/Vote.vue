// 主页
<!--suppress JSUnresolvedVariable -->
<template lang="pug">
.page-box
  BasePageBack(ref="BasePageBack")
    div(slot="page-title") 我要投票
    div(slot="content")
      .col-12.mb-4.mx-auto.text-center
        img.head-icon.mb-4(src="../../assets/pic/vote-hand.svg")
        h6.my-0 推舉2022年度
        .border-top.my-1.mx-5
        h5.my-0.mt-2 管委會委員
      .col-12.mb-4.mx-auto.text-center.px-5
        .info.primary
          p 投票規則：此投票8選2
          .border-top.my-2
          p.w 注意事項：投票後不能更改
      .col-12.mb-4.px-5
        .row
          .col-6.my-2
            button.full-width.btn.btn-primary.focus A
          .col-6.my-2
            button.full-width.btn.btn-primary B
          .col-6.my-2
            button.full-width.btn.btn-primary C
          .col-6.my-2
            button.full-width.btn.btn-primary D
          .col-6.my-2
            button.full-width.btn.btn-primary E
          .col-6.my-2
            button.full-width.btn.btn-primary F
          .col-6.my-2
            button.full-width.btn.btn-primary G
          .col-6.my-2
            button.full-width.btn.btn-primary H
      .col-12.mb-4.mx-auto.text-center.pb-5
        .form-group
          label
            b 請寫下投票的原因
          textarea.form-control.theme-input(rows="5",placeholder="我投此選項，因為")
        .form-group
          input.form-check-input(type="checkbox")
          label.form-check-label(for="")
            b 我要匿名投票
  a.btm-btn-primary(@click="toVoteData()")
    b 我要提交投票結果

  //- Menu(ref="menu")
</template>
<script>
import Vote from './Vote.vue.js';
export default {
  ...Vote
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "Vote.vue.styl";
</style>


