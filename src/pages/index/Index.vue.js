
// import BaseScroll from '../../components/basescroll/BaseScroll'
// import Goods from '../../components/good/Goods'
import Menu from '../../components/menu/Menu'
// import Bottom from '../../components/bottom/Bottom'
import {jglib, jgdata, device} from '../../lib/Index'
// import StyHeader from '../../components/topskyheader/TopSkyHeader'
import BasePageBack from '../../components/basepageback/BasePageBack'
import AppBase from '../../lib/base/AppBase'
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import {getChineseWeek} from '../../lib/function';
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';

export default {
  name: 'Index',
  extends: AppBase,
  props: {
  },
  data () {
    return {
      collect: false,
      data: {},
      timeData: [],
      businesstime: [],
      res: [],
      bgclass: {
        backgroundImage: 'url(' + require('@/assets/img/reservation-bg.png') + ')'
      },
      shopinfo: {},
      pageData: [],
      settings: {
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
      }
    }
  },
  components: {
    BasePageBack,
    Menu,
    VueSlickCarousel
  },
  computed: {
    exchangecards () {
      var data = this.data.itemFun;
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
      var data = this.data.itemFun;
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
      var data = this.data.itemFun;
      if (data !== undefined) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].parameter === 'scan') {
            return data[i];
          }
        }
        return null;
      }
    },
    ckeckCollect () {
      return this.collect;
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
      console.log('shopTime', shopTime)
      let now = new Date();
      let day = now.getDay();
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
      console.log('timeData', timeData)
      return timeData;
    }
  },
  // 添加 註冊 消息 210809
  async created () {
    jglib.setOnMessage(this.onMessage.bind(this));
    if (this.data.shopid === null || this.data.shopid === undefined) {
      this.data = jgdata.getShopData();
      console.log(this.data)
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
    onclickMenu () {
      // this.$refs.menu.funlist()
      this.$refs.menu.openMenu();
    },
    // 開啟聊天
    openChat () {
      device.openChat();
    },
    // 點擊收藏
    onCollect () {
      device.collect(this.collect);
      this.collect = !this.collect;
    },
    // 接收消息 數據 210809
    async onMessage (msg) {
      try {
        switch (msg.type.toLowerCase()) {
          case 'init': {
            // 這句要添加 不要刪除掉
            this.setPageConfig();
            // 初始數據 數據更新
            this.$store.commit('setShopData', {});
            this.data = jgdata.getShopInfo();
            this.$store.commit('setShopData', this.data);
            // console.log('ShopData', this.data);
            // eslint-disable-next-line no-unused-vars
            let itemfun = this.data['itemFun'];
            // let templateData = data['templateData']; // 些模板的數據
            // // console.log(templateData);
            // // 當前主頁數據
            // this.pageData = templateData['page']; // 主機的數據
            // // console.log(this.pageData);
            // // 使用例子
            // if (typeof this.pageData.browseImage !== 'undefined') {
            //   this.items = this.pageData.browseImage;
            // }
            this.$refs.menu.funlist(); // 更新 menu

            break;
          }
          default:
            break;
        }
        return false;
      } catch (e) {
        // alert("erro")
      }
    }
  }
}
