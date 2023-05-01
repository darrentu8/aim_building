// 主页
<!--suppress JSUnresolvedVariable -->
<template lang="pug">
.page-box
  BasePageBack(ref="BasePageBack")
    div(slot="page-title") 電梯施工開會總結
    div(slot="content")
      .row.mb-4.mx-auto.text-center.select-date
        b 查詢從
        cube-input.theme-input.col-3.p-0.mx-2.btn(v-on:focus="showMinPicker('startTime')", v-model="startTime", placeholder="開始時間", :maxlength="30")
        b 至
        cube-input.theme-input.col-3.p-0.mx-2.btn(v-on:focus="showMinPicker('endTime')", v-model="endTime", placeholder="結束時間", :maxlength="30")
        b 的紀錄
        p.mt-2.text-primary 記錄由最新至最舊
      .col-12.mb-4
        .row.px-2
          .col-12.my-2
            b.ml-2.text-primary 第1次開會
            button.mb-4.btn-list.full-width.btn.btn-primary(@click="to('ReportPage')") 電梯施工全程紀錄
          .col-12.my-2
            b.ml-2.text-primary 第2次開會
            button.mb-4.btn-list.full-width.btn.btn-primary(@click="to('ReportPage')") 水塔清潔會議紀錄
          .col-12.my-2
            b.ml-2.text-primary 第3次開會
            button.mb-4.btn-list.full-width.btn.btn-primary(@click="to('ReportPage')") 大樓財政報告會議
          .col-12.my-2
            b.ml-2.text-primary 第4次開會
            button.mb-4.btn-list.full-width.btn.btn-primary.focus(@click="to('ReportPage')") 電梯施工開會紀錄
  //- Menu(ref="menu")
</template>
<script>
import ReportList from './ReportList.vue.js';
export default {
  ...ReportList
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "ReportList.vue.styl";
</style>


