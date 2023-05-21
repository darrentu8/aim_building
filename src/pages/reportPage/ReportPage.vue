<!-- 主页-->
<!--suppress JSUnresolvedVariable -->
<template>
  <div class="page-box">
    <BasePageBack ref="BasePageBack">
      <div slot="page-title">電梯施工開會總結</div>
      <div slot="content">
        <div class="col-12 mb-4 mx-auto px-5">
          <ul class="data">
            <li><b>記錄人：林大俠</b></li>
            <li><b>紀錄時間：2022.11.11</b></li>
            <li><b>參與人員：</b><a class="text-primary" href="#">點擊查看清單</a></li>
            <li><b>地點：大樓會議室</b></li>
          </ul>
        </div>
        <div class="col-12 mb-4 mx-auto px-5">
          <p class="mb-2 title-line"><b>內容</b></p>
          <p class="mb-3"><b>你是否同意成立社區大樓管委會？你是否同意成立社區大樓管委會？你是否同意成立社區大樓管委會？你是否同意成立社區大樓管委會？</b></p>
        </div>
        <div class="col-12 mb-4 mx-auto px-5">
          <p class="mb-2 title-line"><b>結論</b></p>
          <p class="mb-3"><b>你是否同意成立社區大樓管委會？你是否同意成立社區大樓管委會？你是否同意成立社區大樓管委會？你是否同意成立社區大樓管委會？</b></p>
        </div>
        <div class="col-12 mb-4 mx-auto px-5">
          <p class="mb-2"><b>照片</b></p>
          <VueSlickCarousel v-bind="settings">
            <div class="slider" v-for="(photo, i) in photoData" :key="photo.id"><img :src="photo.url"
                @click="handleImgsClick(photoData, i)" /></div>
          </VueSlickCarousel>
        </div>
        <div class="col-12 mb-4 mx-auto px-5">
          <p class="mb-2"><b>影片</b></p>
          <VueSlickCarousel v-bind="settings">
            <div class="slider" v-for="(video, i) in videoData" :key="video.id"><img :src="video.url"
                @click="handleImgsClick(videoData, i)" /></div>
          </VueSlickCarousel>
        </div>
      </div>
    </BasePageBack>
  </div>
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


