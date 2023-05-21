<!-- 主页-->
<!--suppress JSUnresolvedVariable -->
<template>
  <div class="page-box">
    <BasePageBack ref="BasePageBack">
      <div slot="page-title">投票</div>
      <div slot="content">
        <div class="col-12 mb-4 mx-auto text-center"><img class="head-icon mb-4" src="../../assets/pic/vote.svg" />
          <h6 class="my-0">投票進行中</h6>
          <div class="border-top my-1 mx-5"></div>
          <h5 class="my-0 mt-2">成立大樓管委會</h5><img class="mt-4 head-icon mb-4" src="../../assets/pic/qr.png" />
        </div>
        <div class="col-12 mb-4 mx-auto px-5">
          <p class="mb-2 title-line"><b>投票內容</b></p>
          <p class="mb-3"><b>你是否同意成立社區大樓管委會？你是否同意成立社區大樓管委會？你是否同意成立社區大樓管委會？你是否同意成立社區大樓管委會？</b></p>
          <ul class="data">
            <li><b>提案者：林大俠</b></li>
            <li><b>提案時間：2022.11.11</b></li>
            <li><b>投票時間：2022.11.11～2022.11.11</b></li>
            <li><b>目前投票人數：10人</b></li>
            <li><b>尚未投票人數：60人</b></li>
            <li><b>已投票人數：</b><a class="text-primary" href="#">點擊查看清單</a></li>
          </ul>
        </div>
        <div class="col-12 mb-4 px-5">
          <p class="mb-2 title-line"><b>我的意見</b></p>
          <div class="info primary">
            <p class="mb-1"><span>我不同意</span><small class="float-right pt-1">不具名</small></p>
            <p class="w">要多付錢，住戶沒意願要多付錢，住戶沒意願要多付錢，住戶沒意願要多付錢，住戶沒意願要多付錢，住戶沒意願要多付錢，住戶沒意願要多付錢，住戶沒意願要多付錢，住戶沒意願</p>
          </div>
        </div>
        <div class="col-12 mb-4 px-5">
          <p class="mb-2 title-line"><b>其他人的意見</b></p>
          <VueSlickCarousel v-bind="settings">
            <div v-for="(other, i) in others" :key="i">
              <div class="info secondary">
                <p class="mb-1"><span>{{ other.agree }}</span><small class="float-right pt-1">{{ other.name }}</small></p>
                <p class="w">{{ other.comment }}</p>
              </div>
            </div>
          </VueSlickCarousel>
        </div>
      </div>
    </BasePageBack>
  </div>
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


