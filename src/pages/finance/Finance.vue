// 主页
<!--suppress JSUnresolvedVariable -->
<template lang="pug">
.page-box
  BasePageBack(ref="BasePageBack")
    div(slot="page-title") 大樓財務報告
    div(slot="content")
      .col-12.mb-4.mx-auto.text-center
        img.head-icon.mb-4(src="../../assets/pic/money.svg")
      .row.mb-4.mx-auto.text-center.select-date
        b 查詢從
        cube-input.theme-input.col-3.p-0.mx-2.btn(v-on:focus="showMinPicker('startTime')", v-model="startTime", placeholder="開始時間", :maxlength="30")
        b 至
        cube-input.theme-input.col-3.p-0.mx-2.btn(v-on:focus="showMinPicker('endTime')", v-model="endTime", placeholder="結束時間", :maxlength="30")
        b 的紀錄
      .col-12.mb-4
        .row.px-2
          .col-4.my-2
            button.full-width.btn.btn-primary.btn-tool.focus(@click="to('Tables')") 支出
          .col-4.my-2
            button.full-width.btn.btn-primary.btn-tool(@click="to('Tables')") 收入
          .col-4.my-2
            button.full-width.btn.btn-primary.btn-tool(@click="to('Tables')") 結餘
          .col-4.my-2
            button.full-width.btn.btn-primary.btn-tool(@click="to('Tables')") 預算
          .col-4.my-2
            button.full-width.btn.btn-primary.btn-tool(@click="to('Tables')") 超出預算
          .col-4.my-2
            button.full-width.btn.btn-primary.btn-tool(@click="to('Tables')") 欠款
          .col-4.my-2
            button.full-width.btn.btn-primary.btn-tool(@click="to('Tables')") 活存
          .col-4.my-2
            button.full-width.btn.btn-primary.btn-tool(@click="to('Tables')") 定存

  //- Menu(ref="menu")
</template>
<script>
import Finance from './Finance.vue.js';
export default {
  ...Finance
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "Finance.vue.styl";
</style>


