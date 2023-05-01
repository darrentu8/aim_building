// 主页
<!--suppress JSUnresolvedVariable -->
<template lang="pug">
.page-box
  BasePageBack(ref="BasePageBack")
    div(slot="page-title") 住戶管理費用
    div(slot="content")
      .col-12.mb-4.mx-auto.text-center
        img.head-icon.mb-1(src="../../assets/pic/photo-mic.svg")
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
            button.mb-4.btn-list.full-width.btn.btn-primary(@click="to('ReportList')") 電梯施工全程紀錄
          .col-12.my-2
            button.mb-4.btn-list.full-width.btn.btn-primary(@click="to('ReportList')") 水塔清潔會議紀錄
          .col-12.my-2
            button.mb-4.btn-list.full-width.btn.btn-primary(@click="to('ReportList')") 大樓財政報告會議
          .col-12.my-2
            button.mb-4.btn-list.full-width.btn.btn-primary.focus(@click="to('ReportList')") 電梯施工開會紀錄

  .btm-div
    button.btn.btn-primary.theme-btn.inline.float-left(@click="scan()")
      span 我要攝影
      img.ml-2.icon-size(src="../../assets/pic/camera.svg")
    button.btn.btn-primary.theme-btn.inline.float-left
      span 我要錄音
      img.ml-2.icon-size(src="../../assets/pic/mic.svg")
  //- Menu(ref="menu")
</template>
<script>
import Photo from './Photo.vue.js';
export default {
  ...Photo
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "Photo.vue.styl";
</style>


