// 主页
<!--suppress JSUnresolvedVariable -->
<template lang="pug">
.page-box
  BasePageBack(ref="BasePageBack")
    div(slot="page-title") 電梯施工開會總結
    div(slot="content")
      .col-12.mb-4.mx-auto.px-5
        ul
          li
            b 記錄人：林大俠
          li
            b 紀錄時間：2022.11.11
          li
            b 參與人員：
            a.text-primary(href='#') 點擊查看清單
          li
            b 地點：大樓會議室
      .col-12.mb-4.mx-auto.px-5
        p.mb-2.title-line
          b 內容
        p.mb-3
          b 你是否同意成立社區大樓管委會？你是否同意成立社區大樓管委會？你是否同意成立社區大樓管委會？你是否同意成立社區大樓管委會？
      .col-12.mb-4.mx-auto.px-5
        p.mb-2.title-line
          b 結論
        p.mb-3
          b 你是否同意成立社區大樓管委會？你是否同意成立社區大樓管委會？你是否同意成立社區大樓管委會？你是否同意成立社區大樓管委會？
      .col-12.mb-4.mx-auto.px-5
        p.mb-2
          b 照片
        VueSlickCarousel(v-bind="settings")
          div.slider(v-for="(photo,i) in photoData", :key="photo.id")
            img(:src="photo.url", @click="handleImgsClick(photoData, i)")
      .col-12.mb-4.mx-auto.px-5
        p.mb-2
          b 影片
        VueSlickCarousel(v-bind="settings")
          div.slider(v-for="(video,i) in videoData", :key="video.id")
            img(:src="video.url", @click="handleImgsClick(videoData, i)")

  //- Menu(ref="menu")
</template>
<script>
import ReportPage from './ReportPage.vue.js';
export default {
  ...ReportPage
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "ReportPage.vue.styl";
</style>


