<template>
  <div class="menu-dialog">
    <div class="menu-mask"
         v-show="visibilityMenu"
         @click="visibilityMenu=false"/>
    <div class="menu" ref="menu" v-show="visibilityMenu">
      <div class="menu-content">
        <div @click="closeMenu" class="menu-close">
          <button type="button" class="btn btn-primary">
            <img src="../../assets/img/icon-close.png"/>
          </button>
        </div>
        <div class="menu-head">
          <div class="info">
            <div class="name">Alice lu 模特兒店</div>
            <div class="user-count d-flex">
              <p>被關注人數<b>102</b></p>
              <p>本月已預約人數<b>10</b></p>
            </div>
          </div>
        </div>
        <div class="menu-list">
          <!-- <div v-for="vo in funData"
               class="menu-list-item"
               @click="onClickMenuItem(vo)"
          >
            <li><button type="button" class="btn btn-primary">
              {{vo.text}}
            </button>
            </li>
          </div> -->
          <ul class="menu-list-item">
            <li>
              <a @click="onClickMenuItem(goMain)">
                {{goMain.text}}
              </a>
            </li>
            <li>
              <router-link :to="{name: 'Reservation'}">
                預約時間
              </router-link>
            </li>
            <li>
              <router-link :to="{name: 'BusinessCard'}">
                查看個人名片
              </router-link>
            </li>
            <li>
              <a href="#">
                職業介紹
              </a>
            </li>
            <li>
              <a href="#">
                服務內容
              </a>
            </li>
            <li>
              <a @click="onClickMenuItem(goHome)">
                {{goHome.text}}
              </a>
            </li>
          </ul>
        </div>

         
      </div>
    </div>
  </div>
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
