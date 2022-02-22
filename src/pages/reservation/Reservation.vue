
<template>
  <div class="professional-list-box">
    <BasePageBack  ref="BasePageBack" >
      <div slot="page-title">預約時間</div>
      <div slot="content">
        <ReservationItem v-if="data"/>
        <h4 class="text-center mt-5" v-else>無預約項目</h4>
      </div>
    </BasePageBack>
  </div>
</template>

<script>
  import Reservation from './Reservation.vue.js'
  export default {
    ...Reservation
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "Reservation.vue.styl";
</style>


