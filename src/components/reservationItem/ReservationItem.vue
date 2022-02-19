 數據
<template lang="pug">
  .reservation-item-box.page-box
    //  end page-head 
    .page-body
      .calender-box
        datepicker(:inline="true", :language="zh", required, :value="new Date()", :disabled-dates="disabledDates", v-model="dateSelect")
      .reservation-body(:style="bgclass")
        .white-bg.reservation-box
          .reservation-box-head
            h2.title 選擇服務項目
            //- p 網拍、業配、外景拍攝、廣告
          .reservation-box-body.img-list-box
            .reservation-item.img-item(:class="{ 'active': res.active }" v-for="(res,i) in data.reservationService" :key="res.key" @click="selectReservation(res,i)")
              .img
                img(:src="res.image", alt)
              .info
                .info-title {{res.name}}
                .price 時薪 {{res.content[0].time[0].price}} 元
        //  end reservation-box 
        .white-bg.reservation-box
          .white-bg-head.reservation-box-head
            h2.title 目前可預約時段
            p 請選擇可預約時段
          .reservation-box-body
            ul.reservation-date
              li(:class="{ 'active': timeSlot.active }" type="button" v-for="(timeSlot,i) in data.reservationService[this.selectResIndex].content[0].time" @click="selectTimes(timeSlot,i)") {{timeSlot.time}}
        //  end reservation-box 
        .white-bg.reservation-box.price-box
          .reservation-box-head
            h2.title 總共預約費用
          .price-list
            .price-item
              span.num {{data.reservationService[this.selectResIndex].content[0].time[0].price}}
              p 時薪費用
            .price-item
              span.num {{totalBuyTime}}
              p 預約時段
            .price-item
              span.num {{totalBuyPrice}}
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


