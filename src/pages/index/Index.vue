// 主页
<!--suppress JSUnresolvedVariable -->
<template lang="pug">
.index-box
  header.header.page-header#header-box(:style="bgclass")
    .mx-auto.text-center.mt-5
      img.logo(src="../../assets/pic/logo.svg")
    .logo-line.mt-4.pt-3.mx-5
    .logo-title.h5 恆順社區大樓
    .ml-auto
      //- button.btn.btn-primary(type="button", @click="onclickMenu")
        img.menu-btn(src="../../assets/img/icon-menu.png")
  .sorollView
    cube-scroll(ref="scroll")
      .col-12.parent.my-4
        button.div1.btn.btn-primary.theme-btn(@click="openChat()")
          img.btn-icon(src="../../assets/pic/sign.svg")
          span 投訴
        button.div2.btn.btn-primary.theme-btn(:primary="true",@click="to('Vote')")
          img.btn-icon(src="../../assets/pic/vote-hand.svg")
          span 我要投票
        button.div3.btn.btn-secondary.theme-btn(@click="openManager()")
          img.btn-icon(src="../../assets/pic/phone.svg")
          span 聯絡管理員
      .col-12.parent
        button.div4.btn.btn-secondary.theme-btn(@click="to('House')")
          img.btn-icon(src="../../assets/pic/coach.svg")
          span 住戶管理費用
        button.div5.btn.btn-primary.theme-btn(@click="to('Finance')")
          img.btn-icon(src="../../assets/pic/money.svg")
          span 大樓財務報告
        button.div6.btn.btn-primary.theme-btn(@click="to('Photo')")
          img.btn-icon(src="../../assets/pic/photo-mic.svg")
          span 照相錄影紀錄
  Menu(ref="menu")
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


