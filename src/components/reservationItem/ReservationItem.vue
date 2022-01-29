 數據
<template>
  <div class="reservation-item-box page-box">
    <!-- end page-head -->
    <div class="page-body">
      <div class="calender-box">
        <datepicker :inline="true" :language="zh" :value="new Date()" :disabledDates="disabledDates" v-model="dateSelect"></datepicker>
      </div>
      <div class="reservation-body" :style="bgclass">
        <div class="white-bg reservation-box">
          <div class="reservation-box-head">
            <h2 class="title">選擇服務項目</h2>
            <p>網拍、業配、外景拍攝、廣告</p>
          </div>
          <div class="reservation-box-body img-list-box">
            <div class="reservation-item img-item">
              <div class="img">
                <img src="../../assets/img/reservation-img1.png" alt="">
              </div>
              <div class="info">
                <div class="info-title">網拍</div>
                <p>1200元</p>
              </div>
            </div>
            <div class="reservation-item img-item">
              <div class="img">
                <img src="../../assets/img/reservation-img2.png" alt="">
              </div>
              <div class="info">
                <div class="info-title">網拍</div>
                <p>1200元</p>
              </div>
            </div>
            <div class="reservation-item img-item">
              <div class="img">
                <img src="../../assets/img/reservation-img3.png" alt="">
              </div>
              <div class="info">
                <div class="info-title">網拍</div>
                <p>1200元</p>
              </div>
            </div>
            <div class="reservation-item img-item">
              <div class="img">
                <img src="../../assets/img/reservation-img4.png" alt="">
              </div>
              <div class="info">
                <div class="info-title">網拍</div>
                <p>1200元</p>
              </div>
            </div>
          </div>
        </div>
        <!-- end reservation-box -->
         <div class="white-bg reservation-box">
          <div class="white-bg-head reservation-box-head">
            <h2 class="title">目前可預約時段</h2>
            <p>請選擇可預約時段</p>
          </div>
          <div class="reservation-box-body">
            <ul class="reservation-date">
              <li class="active">08-09</li>
              <li>09-10</li>
              <li>10-11</li>
              <li>12-13</li>
              <li>13-14</li>
              <li>15-16</li>
              <li>16-17</li>
              <li>17-18</li>
              <li>18-19</li>
            </ul>
          </div>
        </div>
        <!-- end reservation-box -->
        <div class="white-bg reservation-box price-box">
          <div class="reservation-box-head">
            <h2 class="title">總共預約費用</h2>
          </div>
          <div class="price-list">
            <div class="price-item">
              <span class="num">800</span>
              <p>時薪費用</p>
            </div>
            <div class="price-item">
              <span class="num">2</span>
              <p>預約時數</p>
            </div>
            <div class="price-item">
              <span class="num">1,600</span>
              <p>合計金額</p>
            </div>
          </div>
          <div class="btn-box">
            <button class="btn">確定預約服務</button>
          </div>
        </div>
        <!-- end reservation-box -->
      </div>
    </div>
    <!-- end page-body -->
  </div>
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


