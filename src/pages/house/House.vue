// 主页
<!--suppress JSUnresolvedVariable -->
<template lang="pug">
.page-box
  BasePageBack(ref="BasePageBack")
    div(slot="page-title") 住戶管理費用
    div(slot="content")
      .col-12.mb-4.mx-auto.text-center
        img.head-icon.mb-4(src="../../assets/pic/coach.svg")
      .row.mb-4.mx-auto.text-center.select-date
        b 查詢從
        cube-input.theme-input.col-3.p-0.mx-2.btn(v-on:focus="showMinPicker('startTime')", v-model="startTime", placeholder="開始時間", :maxlength="30")
        b 至
        cube-input.theme-input.col-3.p-0.mx-2.btn(v-on:focus="showMinPicker('endTime')", v-model="endTime", placeholder="結束時間", :maxlength="30")
        b 的紀錄
      .col-12.mb-4
        .row.px-2
          .col-4.my-2
            button.full-width.btn.btn-primary.btn-tool.focus(@click="to('Tables')") 住戶
          .col-4.my-2
            button.full-width.btn.btn-primary.btn-tool(@click="to('Tables')") 商戶
          .col-4.my-2
            button.full-width.btn.btn-primary.btn-tool(@click="to('Tables')") 未繳

  //- Menu(ref="menu")
</template>
<script>
import House from './House.vue.js';
export default {
  ...House
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "House.vue.styl";
</style>


