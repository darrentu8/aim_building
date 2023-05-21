<template>
  <div class="menu-dialog">
    <div class="menu-mask" v-show="visibilityMenu" @click="visibilityMenu = false">
      <div class="menu" ref="menu" v-show="visibilityMenu">
        <div class="menu-content" v-if="data">
          <div class="menu-close" @click="closeMenu"><button class="btn btn-primary" type="button"><img
                src="../../assets/img/icon-close.png" /></button></div>
          <div class="menu-head">
            <div class="info">
              <div class="name" v-if="data.shopName &amp;&amp; data.business">{{ data.shopName }} {{ data.business }}
              </div>
              <div class="name" v-else> -</div>
              <div class="user-count d-flex">
                <p>{{ $Lang('index-attention', '被關注人數') }}<b v-if="data.attention"> {{ data.attention }}</b><b v-else>
                    0</b></p>
                <p>{{ $Lang('index-orderQuantity', '本月已預約人數') }}<b v-if="data.orderQuantity"> {{ data.orderQuantity
                }}</b><b v-else> 0</b></p>
              </div>
            </div>
          </div>
          <div class="menu-list" v-if="funData">
            <ul class="menu-list-item" v-for="(vo, i) in funData" :key="i">
              <li><a @click="onClickMenuItem(vo)">{{ vo.text }}</a></li>
            </ul>
          </div>
          <div class="menu-btm">
            <ul>
              <li>
                <p class="version">ver : {{ getVerion() }}</p>
              </li>
            </ul>
          </div>
          <!--.menu-btm(v-if="data.uiInfo.version")-->
          <!--  ul-->
          <!--    li-->
          <!--      p.version ver : {{data.uiInfo.version}}-->
          <!--.menu-btm(v-else)-->
          <!--  ul-->
          <!--    li-->
          <!--      p.version ver :-->
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
