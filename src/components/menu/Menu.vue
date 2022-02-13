<template lang="pug">
.menu-dialog
  .menu-mask(v-show="visibilityMenu", @click="visibilityMenu=false")
    .menu(ref="menu", v-show="visibilityMenu")
      .menu-content
        .menu-close(@click="closeMenu")
          button.btn.btn-primary(type="button")
            img(src="../../assets/img/icon-close.png")
        .menu-head
          .info
            .name {{data.shopName}} {{data.business}}
            .user-count.d-flex
              p
                | 被關注人數
                b  {{data.attention}}
              p
                | 本月已預約人數
                b  {{data.orderQuantity}}
        .menu-list
          ul.menu-list-item(v-for="(vo, i) in funData" :key="i")
            li
              a(@click="onClickMenuItem(vo)") {{vo.text}}

          //- ul.menu-list-item
          //-   li
          //-     a(@click="onClickMenuItem(goMain)").
                
          //-       {{goMain.text}}
                
          //-   li
          //-     router-link(:to="{name: \'Reservation\'}") 預約時間
                
          //-   li
          //-     router-link(:to="{name: \'BusinessCard\'}") 查看個人名片
                
            //- li
            //-   a(href="#").
                
            //-     職業介紹
                
            //- li
            //-   a(href="#").
                
            //-     服務內容
                
            li
              a(@click="onClickMenuItem(goHome)").
                
                {{goHome.text}}
                
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
