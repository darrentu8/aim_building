// 部落格
<template>
  <div class="professional-list-box" :style="bgclass">
    <BasePageBack  ref="BasePageBack" >
      <div slot="page-title">個人名片</div>
      <div slot="content">
        <BusinessCardItem />
      </div>
    </BasePageBack>
  </div>
</template>

<script>
  import BusinessCard from './BusinessCard.vue.js'
  export default {
    ...BusinessCard
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "BusinessCard.vue.styl";
</style>


