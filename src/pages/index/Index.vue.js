
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
      bgclass: {
        backgroundImage: 'url(' + require('@/assets/img/reservation-bg.png') + ')'
      },
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
    isbusinessinfoData: {
      get () {
        return this.data.isbusinessinfo.slice(5);
      },
      set (value) {
        this.data.isbusinessinfo = value;
      }
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
  methods: {
    setGood (good) {
      this.$store.commit('setGood', {
        shopName: this.data.shopName,
        name: good.name,
        business: this.data.business,
        price: good.price,
        image: good.image,
        info: good.info
      });
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
