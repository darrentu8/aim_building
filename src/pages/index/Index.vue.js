
import Menu from '../../components/menu/Menu'
import {jgdata, device, getChineseWeek, AppBase} from '../../lib/Index'
import BasePageBack from '../../components/basepageback/BasePageBack'
// import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
// import { mapState } from 'vuex'
// optional style for arrows & dots
// import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';

export default {
  name: 'Index',
  extends: AppBase,
  props: {
  },
  data () {
    return {
      data: {},
      /* timeData: [],
      businesstime: [], */
      res: [],
      bgclass: {
        backgroundImage: 'url(' + require('@/assets/img/reservation-bg.png') + ')'
      },
      /* shopinfo: {},
      pageData: [], */
      /* settings: {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        centerPadding: '60px',
        centerMode: true,
        responsive: [
          {
            breakpoint: 480,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '40px',
              slidesToShow: 1
            }
          }
        ]
      }, */
      isCollect: false  // 220305
    }
  },
  components: {
    BasePageBack,
    Menu
    /* VueSlickCarousel */
  },
  computed: {
    exchangecards () {
      const data = this.data.itemFun;
      if (data !== undefined) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].parameter === 'exchangecards') {
            return data[i];
          }
        }
        return null;
      }
    },
    chat () {
      const data = this.data.itemFun;
      if (data !== undefined) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].parameter === 'chat') {
            return data[i];
          }
        }
        return null;
      }
    },
    scan () {
      const data = this.data.itemFun;
      if (data !== undefined) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].parameter === 'scan') {
            return data[i];
          }
        }
        return null;
      }
    },
    jobData: {
      get () {
        if (typeof this.data.job === 'undefined') {
          return [];
        }
        return JSON.parse(this.data.job);
      },
      set (value) {
        this.data.job = value;
      }
    },
    shopTimeView () {
      let timeData = [];
      let shopTime = JSON.parse(this.data.shopTime);
      // console.log('shopTime', shopTime)
      let now = new Date();
      let day = now.getDay();
      if (shopTime !== null) {
        shopTime.forEach((item, n) => {
          // 顯示今明
          if (n === day || n === day - 1) {
            if (item.state === 1) {
              if (item.time === '00:00-00:00') {
                timeData.push({
                  time: '全日',
                  week: '星期' + getChineseWeek(n)
                })
              } else {
                timeData.push({
                  time: item.time,
                  week: '星期' + getChineseWeek(n)
                })
              }
            } else {
              timeData.push({
                time: '休假',
                week: '星期' + getChineseWeek(n)
              })
            }
          }
        })
      }
      return timeData;
    }
    // ...mapState(['isCollect'])  // 220305 去掉 添加了,數據狀態不知原因無法同步
  },
  // 添加 註冊 消息 210809
  async created () {
    if (this.data.shopid === null || this.data.shopid === undefined) {
      // 初始數據 220305
      this.initData();
    }
    this.$nextTick(() => {
      // console.log('in')
      window.onscroll = function () {
        let headerMain = document.getElementById('header-box');
        if (window.pageYOffset >= 30) {
          headerMain.classList.add('scroll-bg');
        } else {
          headerMain.classList.remove('scroll-bg');
        }
      }
    })
  },
  mounted () {
  },
  methods: {
    setRes (res, i) {
      this.$store.commit('setRes', res);
    },
    setResKey (res, i) {
      this.$store.commit('setResKey', res);
    },
    onclickMenu () {
      this.$refs.menu.openMenu();
    },
    // 開啟聊天
    openChat () {
      device.openChat();
    },
    // 點擊收藏
    onCollect () {
      device.collect(this.isCollect);
      // this.$store.commit('setIsCollect', this.isCollect = !this.isCollect);
    },
    // 初始數據或更新數據 220305
    initData () {
      this.$store.commit('setShopData', {});
     // this.data = jgdata.getShopInfo();
      this.data = jgdata.getShopData();
      // console.log(this.data);
      this.$store.commit('setShopData', this.data);
      this.$store.commit('setResKey', null);
      this.isCollect = this.data.isCollect;
      // 收藏狀態 更新 220305
      this.$store.commit('setIsCollect', this.isCollect);

      // 商家的 google地圖 GPS 坐標
      // this.data.mappoint;
      // gps 地圖示例
      /* mappoint={
        lat: "24.9713322"
        lng: "121.5326765"
      } */
      if (this.$refs.menu) {
        this.$refs.menu.funlist(); // 更新 menu
      }
    }
  }
}
