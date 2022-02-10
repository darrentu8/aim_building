 數據
<template lang="pug">
  .reservation-item-box.page-box
    //  end page-head 
    .page-body
      .calender-box
        datepicker(:inline="true", :language="zh", :value="new Date()", :disableddates="disabledDates", v-model="dateSelect")
      .reservation-body(:style="bgclass")
        .white-bg.reservation-box
          .reservation-box-head
            h2.title 選擇服務項目
            //- p 網拍、業配、外景拍攝、廣告
          .reservation-box-body.img-list-box
            .reservation-item.img-item(:class="{ 'active': reservation.active }" v-for="(reservation,i) in data.goods.menu" :key="reservation.key" @click="selectReservation(reservation,i)")
              .img
                img(:src="reservation.image", alt)
              .info
                .info-title {{reservation.name}}
                p {{reservation.price}}元
        //  end reservation-box 
        .white-bg.reservation-box
          .white-bg-head.reservation-box-head
            h2.title 目前可預約時段
            p 請選擇可預約時段
          .reservation-box-body
            ul.reservation-date
              li(:class="{ 'active': time.active }" type="button" v-for="(time,i) in timeList" @click="selectTimes(time,i)") {{time.time}}
        //  end reservation-box 
        .white-bg.reservation-box.price-box
          .reservation-box-head
            h2.title 總共預約費用
          .price-list
            .price-item
              span.num {{hourPrice}}
              p 時薪費用
            .price-item
              span.num {{totalTime}}
              p 預約時數
            .price-item
              span.num {{totalPrice}}
              p 合計金額
          .btn-box
            button.btn(@click="reservat()") 確定預約服務
        //  end reservation-box 
    //  end page-body 
</template>


<script>
  import ReservationItem from './ReservationItem.vue.js';
  export default {
    ...ReservationItem
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
   @import "ReservationItem.vue.styl";
</style>


