// 主页
<!--suppress JSUnresolvedVariable -->
<template lang="pug">
.page-box
  BasePageBack(ref="BasePageBack")
    div(slot="page-title") 支出
    div(slot="content")
      .col-12.mb-4.mx-auto.text-center
        table.table.table-primary.table-bordered.round
          thead
            tr
              th 名目
              th 內容
              th 對象
              th 金額
              th 備註
          tbody
            tr
              td 保全
              td 6月份管理費
              td 頂尖
              td 30000
              td
            tr
              td
              td
              td
              td
              td
            tr
              td
              td
              td
              td
              td
            tr
              td
              td
              td
              td
              td
            tr
              td
              td
              td
              td
              td
            tr
              td
              td
              td
              td
              td
            tr
              td
              td
              td
              td
              td
            tr
              td
              td
              td
              td
              td
            tr
              td
              td
              td
              td
              td
            tr
              td
              td
              td
              td
              td
            tr
              td
              td
              td
              td
              td
            tr
              td
              td
              td
              td
              td
            tr
              td
              td
              td
              td
              td
            tr
              td
              td
              td
              td
              td
            tr
              td
              td
              td
              td
              td
  .btm-btn-primary
    a.float-left.btn.text-white(href="#")
      img.icon-size(src="../../assets/pic/back.png")
      span 定存
    a.float-right.btn.text-white(href="#")
      span 收入
      img.icon-size(src="../../assets/pic/next.png")

  //- Menu(ref="menu")
</template>
<script>
import Tables from './Tables.vue.js';
export default {
  ...Tables
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "Tables.vue.styl";
</style>


