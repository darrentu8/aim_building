<template>
  <div class="index-box">
    <header class="header page-header" id="header-box" :style="bgclass">
      <div class="top-box">
        <button type="button" class="btn btn-primary mt-3" @click="onclickMenu">
          <img src="../../assets/pic/icon-menu.png" class="menu-btn" />
        </button>
      </div>
      <div class="mx-auto text-center mt-5"><img class="logo" src="../../assets/pic/logo.svg" /></div>
      <div class="logo-line mt-4 pt-3 mx-5"></div>
      <div class="logo-title h5">恆順社區大樓</div>
      <div class="ml-auto"></div>
    </header>
    <div class="sorollView">
      <cube-scroll ref="scroll">
        <div class="col-12 parent my-4"><button class="div1 btn btn-primary theme-btn" @click="openChat()"><img
              class="btn-icon" src="../../assets/pic/sign.svg" /><span>投訴</span></button><button
            class="div2 btn btn-primary theme-btn" :primary="true" @click="to('Vote')"><img class="btn-icon"
              src="../../assets/pic/vote-hand.svg" /><span>我要投票</span></button><button
            class="div3 btn btn-secondary theme-btn" @click="openManager()"><img class="btn-icon"
              src="../../assets/pic/phone.svg" /><span>聯絡管理員</span></button></div>
        <div class="col-12 parent"><button class="div4 btn btn-secondary theme-btn" @click="to('House')"><img
              class="btn-icon" src="../../assets/pic/coach.svg" /><span>住戶管理費用</span></button><button
            class="div5 btn btn-primary theme-btn" @click="to('Finance')"><img class="btn-icon"
              src="../../assets/pic/money.svg" /><span>大樓財務報告</span></button><button
            class="div6 btn btn-primary theme-btn" @click="to('Photo')"><img class="btn-icon"
              src="../../assets/pic/photo-mic.svg" /><span>照相錄影紀錄</span></button></div>
      </cube-scroll>
    </div>
    <Menu ref="menu"></Menu>
  </div>
</template>
<script>
import index from './Index.vue.js';
export default {
  ...index
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "Index.vue.styl";
</style>


