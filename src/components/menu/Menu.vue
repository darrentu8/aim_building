<template lang="pug">
.menu-dialog
  .menu-mask(v-show="visibilityMenu", @click="visibilityMenu=false")
    .menu(ref="menu", v-show="visibilityMenu")
      .menu-content(v-if="data")
        .menu-close(@click="closeMenu")
          button.btn.btn-primary(type="button")
            img(src="../../assets/img/icon-close.png")
        .menu-head
          .info
            .name(v-if="data.shopName && data.business") {{data.shopName}} {{data.business}}
            .name(v-else)  -
            .user-count.d-flex
              p
                | 被關注人數
                b(v-if="data.attention")  {{data.attention}}
                b(v-else)  0
              p
                | 本月已預約人數
                b(v-if="data.orderQuantity")  {{data.orderQuantity}}
                b(v-else)  0
        .menu-listt(v-if="funData")
          ul.menu-list-item(v-for="(vo, i) in funData" :key="i")
            li
              a(@click="onClickMenuItem(vo)") {{vo.text}}
        .menu-btm(v-if="data.uiInfo.version")
          ul
            li
              p.version ver : {{data.uiInfo.version}}
</template>

<script>
  import menu from './Menu.vue.js';
  export default {
    ...menu
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "Menu.vue.styl"
</style>
