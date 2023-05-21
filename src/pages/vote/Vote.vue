<!-- 主页-->
<!--suppress JSUnresolvedVariable -->
<template>
  <div class="page-box">
    <BasePageBack ref="BasePageBack">
      <div slot="page-title">我要投票</div>
      <div slot="content">
        <div class="col-12 mb-4 mx-auto text-center"><img class="head-icon mb-4" src="../../assets/pic/vote-hand.svg" />
          <h6 class="my-0">推舉2022年度</h6>
          <div class="border-top my-1 mx-5"></div>
          <h5 class="my-0 mt-2">管委會委員</h5>
        </div>
        <div class="col-12 mb-4 mx-auto text-center px-5">
          <div class="info primary">
            <p>投票規則：此投票8選2</p>
            <div class="border-top my-2"></div>
            <p class="w">注意事項：投票後不能更改</p>
          </div>
        </div>
        <div class="col-12 mb-4 px-5">
          <div class="row">
            <div class="col-6 my-2"><button class="full-width btn btn-primary focus">A</button></div>
            <div class="col-6 my-2"><button class="full-width btn btn-primary">B</button></div>
            <div class="col-6 my-2"><button class="full-width btn btn-primary">C</button></div>
            <div class="col-6 my-2"><button class="full-width btn btn-primary">D</button></div>
            <div class="col-6 my-2"><button class="full-width btn btn-primary">E</button></div>
            <div class="col-6 my-2"><button class="full-width btn btn-primary">F</button></div>
            <div class="col-6 my-2"><button class="full-width btn btn-primary">G</button></div>
            <div class="col-6 my-2"><button class="full-width btn btn-primary">H</button></div>
          </div>
        </div>
        <div class="col-12 mb-4 mx-auto text-center pb-5">
          <div class="form-group"><label><b>請寫下投票的原因</b></label><textarea class="form-control theme-input" rows="5"
              placeholder="我投此選項，因為"></textarea></div>
          <div class="form-group"><input class="form-check-input" type="checkbox" /><label class="form-check-label"
              for=""><b>我要匿名投票</b></label></div>
        </div>
      </div>
    </BasePageBack><a class="btm-btn-primary" @click="toVoteData()"><b>我要提交投票結果</b></a>
  </div>
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


