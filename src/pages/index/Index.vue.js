
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
      data: {},
      timeData: [],
      businesstime: [],
      res: {},
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
    jobData: {
      get () {
        return JSON.parse(this.data.job);
      },
      set (value) {
        this.data.job = value;
      }
    },
    shopTimeView () {
      let timeData = [];
      let shopTime = this.data.shopTime;
      shopTime = JSON.parse(shopTime);
      for (let i = 0; i < shopTime.length; i++) {
        const item = shopTime[i];
        if (item.state === 1) {
          timeData.push(
            '星期' + getChineseWeek(i) + ' ' + item.time
          )
        }
      }
      return timeData;
    }
  },
  // 添加 註冊 消息 210809
  async created () {
    jglib.setOnMessage(this.onMessage.bind(this));
    if (this.data.shopid == null || this.data.shopid === undefined) {
      this.data = jgdata.getShopData();
    }
    this.$nextTick(() => {
      console.log('in')
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
  async mounted () {
    this.setShopTime(this.data)
  },
  methods: {
    // 明細時間
    showTimeList () {
      let timeData = [];
      let shopTime = this.data.shopTime
      if (typeof shopTime === 'undefined') {
        return null
      }
      if (shopTime === null || shopTime === '') {
        return null
      }
      try {
        shopTime = JSON.parse(shopTime);
        for (let i = 0; i < shopTime.length; i++) {
          const item = shopTime[i];
          if (item.state === 1) {
            timeData.push({
              content: '星期' + getChineseWeek(i) + ' ' + item.time,
              align: 'left'
            })
            this.timeData.push(
              '星期' + getChineseWeek(i) + ' ' + item.time
            )
          }
        }
      } catch (e) {
      }
      this.$createActionSheet({
        title: '營業時間',
        /* pickerStyle: true, */
        cancelTxt: '關閉',
        data: timeData
      }).show()
    },
    // 时间处理
    setShopTime (data = null) {
      if (data === null || typeof data === 'undefined') {
        return null
      }
      let shopTime = this.data.shopTime
      if (typeof shopTime === 'undefined') {
        return null
      }
      if (shopTime === null || shopTime === '') {
        return null
      }
      this.businesstime = []
      let now = new Date();
      let day = now.getDay();
      let nowtime = '';
        // console.log(day);
      try {
        shopTime = JSON.parse(shopTime)
        let bol = false;
        for (let n = 0; n < shopTime.length; n++) {
          const item = shopTime[n];
          if (n === day) {
            nowtime = item.time
          }
          if (item.state === 1) {
            bol = false
            for (let i = 0; i < this.businesstime.length; i++) {
              if (this.businesstime[i].time === item.time) {
                this.businesstime[i].week = this.businesstime[i].week + getChineseWeek(n)
                bol = true
                break
              }
            }
            if (bol === false) {
              this.businesstime.push({
                time: item.time,
                week: getChineseWeek(n)
              })
            }
          }
          if (this.businesstime.length > 1) {
            this.businesstime = [];
            this.businesstime.push({
              time: nowtime,
              week: getChineseWeek(day)
            })
          }
        }
      } catch (e) {

      }
    },
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
      device.collect(this.data.isCollect);
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
            console.log('ShopData', this.data);
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
