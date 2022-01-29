
<template>
  <div class="professional-list-box">
    <BasePageBack  ref="BasePageBack" >
      <div slot="page-title">預約時間</div>
      <div slot="content">
        <ReservationItem />
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


