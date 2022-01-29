// 部落格 數據
<template>
  <div class="business-card-item-box page-box">
    <!-- end page-head -->
    <div class="page-body">
      <div class="white-bg profile-box">
        <div class="profile-info text-center">
          <div class="img">
            <img src="../../assets/img/businessCardItem-proflie-defult.png" alt="">
          </div>
          <h2 class="name">Alice lu</h2>
          <p class="txt">模特兒</p>
        </div>
        <ul class="link-box d-flex">
          <li>
            <a href="javascript:;">
              <img src="../../assets/img/businessCardItem-icon-user.png" alt="">
              <p>交換名片</p>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <img src="../../assets/img/businessCardItem-icon-chat.png" alt="">
              <p>開啟聊天</p>
            </a>
          </li>
          <li>
            <router-link :to="{name: 'Reservation'}">
              <img src="../../assets/img/businessCardItem-icon-time.png" alt="">
              <p>預約時間</p>
            </router-link>
          </li>
          <li>
            <a href="javascript:;">
              <img src="../../assets/img/businessCardItem-icon-heart.png" alt="">
              <!-- 未關注 -->
              <!-- <img src="../../assets/img/businessCardItem-icon-heart-none.png" alt=""> -->
              <p>按讚關注</p>
            </a>
          </li>
        </ul>
        <div class="white-bg-head">
          <h2 class="title">個人介紹</h2>
          <p>
            是位台美混血全方位模特兒<br/>
            平面：LunaˋJP PomadeˋGo GymˋUber<br/>
            廣告：7-11ˋHTCˋMazdaˋElectrolux
          </p>
        </div>
      </div>
      <div class="white-bg">
        <div class="white-bg-head">
          <h2 class="title">職業內容介紹</h2>
          <p>模特兒</p>
        </div>
        <ul class="job-info">
          <li>
            <span class="job-title">服務時間</span>
            <span>08:00-19:00</span>
          </li>
          <li>
            <span class="job-title">職涯年齡</span>
            <span>三年</span>
          </li>
          <li>
            <span class="job-title">服務內容</span>
            <span>網拍、業配、外景拍攝、廣告</span>
          </li>
        </ul>
        <div class="img-list-box">
          <div class="img-item">
            <div class="img">
              <img src="../../assets/img/reservation-img1.png" alt="">
            </div>
            <div class="info">
              <div class="info-title">網拍</div>
              <p>1200元</p>
            </div>
          </div>
          <div class="img-item">
            <div class="img">
              <img src="../../assets/img/reservation-img2.png" alt="">
            </div>
            <div class="info">
              <div class="info-title">網拍</div>
              <p>1200元</p>
            </div>
          </div>
          <div class="img-item">
            <div class="img">
              <img src="../../assets/img/reservation-img3.png" alt="">
            </div>
            <div class="info">
              <div class="info-title">網拍</div>
              <p>1200元</p>
            </div>
          </div>
          <div class="img-item">
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
      <div class="white-bg map-box">
        <div class="white-bg-head">
          <h2 class="title">
            職業服務地點
          </h2>
          <p>高雄市前鎮區新光路61號 / 到府服務</p>
          <div class="map-iframe">
            <div class="map-cover"></div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.1671008805292!2d120.29955451496016!3d22.610234385163366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e037c25c5b457%3A0x1eae13f288f3b891!2zODA26auY6ZuE5biC5YmN6Y6u5Y2A5paw5YWJ6LevNjHomZ8!5e0!3m2!1szh-TW!2stw!4v1630720625488!5m2!1szh-TW!2stw" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
          </div>
        </div>
      </div>
      <div class="white-bg friends-box">
        <div class="white-bg-head">
          <h2 class="title">已結交朋友介紹</h2>
          <p>目前好友數 261人</p>
          <ul class="friends-list d-flex flex-wrap">
            <li>
              <a href="javascript:;">
                <img src="../../assets/img/businessCard-img1.png" alt="">
              </a>
            </li>
            <li>
              <a href="javascript:;">
                <img src="../../assets/img/businessCard-img2.png" alt="">
              </a>
            </li>
            <li>
              <a href="javascript:;">
                <img src="../../assets/img/businessCard-img3.png" alt="">
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- end page-body -->
  </div>
</template>


<script>
  import BusinessCardItem from './BusinessCardItem.vue.js';
  export default {
    ...BusinessCardItem
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
   @import "BusinessCardItem.vue.styl";
</style>


