 數據
<template lang="pug">
  .reservation-item-box.page-box
    //  end page-head
    .page-body
      .reservation-body(:style="bgclass")
        .white-bg.reservation-box
          .reservation-box-head
            h2.title {{$Lang('res-choice1','1.選擇服務項目')}}
            //- p 網拍、業配、外景拍攝、廣告
          .reservation-box-body.img-list-box
            .reservation-item.img-item(:class="{ 'active': res.active }" v-for="(res,i) in data.reservationService" :key="res.key" @click="selectReservation(i),checkDate(i)")
              .img
                img(:src="res.image", alt)
              .info
                .info-title {{res.name}}
                .price {{$Lang('res-rate','時薪')}} {{res.content[0].time[0].price}} {{$Lang('res-currency','元')}}
        .white-bg.reservation-box
          .white-bg-head.reservation-box-head
            h2.title.mt-3 {{$Lang('res-choice2','2.選擇服務日期')}}
            .calender-box(v-if="!disabled")
              datepicker(:disabled="disabled" :inline="true", :language="zh", required, :value="new Date()", :disabled-dates="disabledDates", v-model="dateSelect",@selected="selectDate")
            p.mt-5.text-center(v-else) 目前無日期可預約，請選擇其他服務項目
        //  end reservation-box
        .white-bg.reservation-box
          .white-bg-head.reservation-box-head
            h2.title {{$Lang('res-available','3.目前可預約時段')}}
            p {{$Lang('res-available-choice','請選擇可預約時段')}}
          .reservation-box-body
            ul.reservation-date
              li(:class="{ 'active': timeSlot.active }" :style="{backgroundColor:timeSlot.number<1 ? '#0000008f' :''}" type="button" v-for="(timeSlot,i) in data.reservationService[this.selectResIndex].content[0].time" @click="selectTimes(timeSlot,i)") {{timeSlot.time}} / {{timeSlot.price}} {{$Lang('res-currency','元')}}
        //  end reservation-box
        .white-bg.reservation-box.price-box
          .reservation-box-head
            h2.title {{$Lang('res-subtotal','總共預約費用')}}
          .price-list
            //- .price-item
            //-   span.num {{data.reservationService[this.selectResIndex].content[0].time[0].price}}
            //-   p 時薪費用
            .price-item
              span.num {{totalBuyTime}}
              p {{$Lang('res-total-slot','預約時段')}}
            .price-item
              span.num {{totalBuyPrice}}
              p {{$Lang('res-totals','合計金額')}}
          .btn-box
            button.btn(@click="reservat()") {{$Lang('res-total-submit','確定預約服務')}}
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


