<template>
  <div class="menu-dialog">
    <div class="menu-mask" v-show="visibilityMenu" @click="visibilityMenu = false" />
    <div class="menu" ref="menu" v-show="visibilityMenu">
      <div class="menu-content">
        <!-- <div @click="closeMenu" class="menu-close">
          <button type="button" class="btn btn-primary">
            <img src="../../assets/img/icon-close.png"/>
          </button>
        </div> -->
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
          <ul class="menu-list-item" v-if="funData">
            <li v-for="(vo, i) in funData" :key="i">
              <a @click="onClickMenuItem(vo)">
                {{ vo.text }}
              </a>
            </li>
            <!-- <ul class="menu-list-item">
            <li>
              <a @click="onClickMenuItem(goMain)">
                {{goMain.text}}
              </a>
            </li>
            <li>
              <router-link :to="{name: 'About'}">
                門市
              </router-link>
            </li>
            <li>
              <a href="#">
                使用心得
              </a>
            </li>
            <li>
              <a href="#">
                部落格
              </a>
            </li>
            <li>
              <a href="#">
                後台管理
              </a>
            </li>
            <li>
              <a href="#">
                我的訂單
              </a>
            </li>
            <li>
              <router-link :to="{name: 'MyCommit'}">
                我的評論
              </router-link>
            </li>

            <li>
              <router-link :to="{name: 'BrowseRecord'}">
                瀏覽紀錄
              </router-link>
            </li>
            <li>
              <a @click="onClickMenuItem(goHome)">
                {{goHome.text}}
              </a>
            </li> -->
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
