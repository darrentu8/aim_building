
<template>
  <div class="professional-list-box">
    <BasePageBack  ref="BasePageBack" >
      <div slot="page-title">{{$Lang('res-time','預約時間')}}</div>
      <div slot="content">
        <ReservationItem ref="rItem" v-if="res.length > 0" />
        <h4 v-else class="text-center mt-5" >{{$Lang('no-res','無預約項目')}}</h4>
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


