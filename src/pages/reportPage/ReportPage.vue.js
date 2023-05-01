import Menu from "../../components/menu/Menu";
import { jgdata, device, AppBase } from "../../lib/Index";
import BasePageBack from "../../components/basepageback/BasePageBack";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
// import { mapState } from 'vuex'
// optional style for arrows & dots
// import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';

export default {
  name: "Index",
  extends: AppBase,
  props: {},
  data() {
    return {
      data: {},
      settings: {
        dots: true,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        centerMode: true,
        centerPadding: "20px",
        autoplay: false,
        autoplaySpeed: 2000,
        pauseOnDotsHover: true,
        pauseOnFocus: true,
        pauseOnHover: true
      },
      photoData: [
        {
          id: 1,
          type: "img",
          url: "src/assets/img/03.jpg"
        },
        {
          id: 2,
          type: "img",
          url: "src/assets/img/01.jpg"
        },
        {
          id: 3,
          type: "img",
          url: "src/assets/img/03.jpg"
        }
      ],
      videoData: [
        {
          id: 1,
          type: "video",
          url: "src/assets/img/02.jpg"
        },
        {
          id: 2,
          type: "video",
          url: "src/assets/img/01.jpg"
        },
        {
          id: 3,
          type: "video",
          url: "src/assets/img/03.jpg"
        }
      ],
      initialIndex: ""
    };
  },
  components: {
    BasePageBack,
    VueSlickCarousel,
    Menu
  },
  computed: {},
  // 添加 註冊 消息 210809
  async created() {
    if (this.data.shopid === null || this.data.shopid === undefined) {
      // 初始數據 220305
      this.initData();
    }
    this.$nextTick(() => {
      // console.log('in')
      window.onscroll = function() {
        let headerMain = document.getElementById("header-box");
        if (window.pageYOffset >= 30) {
          headerMain.classList.add("scroll-bg");
        } else {
          headerMain.classList.remove("scroll-bg");
        }
      };
    });
  },
  mounted() {},
  methods: {
    handleImgsClick(Datas, index) {
      this.initialIndex = index;
      let data = [];
      Datas.forEach(e => {
        if (e.url) {
          data.push(e.url);
        }
      });
      const params = {
        $props: {
          imgs: data,
          initialIndex: "initialIndex", // 响应式数据的key名
          loop: false
        },
        $events: {
          change: i => {
            // 必须更新 initialIndex
            this.initialIndex = i;
          }
        }
      };
      this.$createImagePreview({ ...params }).show();
    },
    openPhoto() {
      device.getphoto();
    },
    toVoteData() {
      setTimeout(() => {
        this.$router.push(
          {
            name: "Vote"
          },
          "1000"
        );
      });
    },
    // 初始數據或更新數據 220305
    initData() {
      this.$store.commit("setShopData", {});
      // this.data = jgdata.getShopInfo();
      this.data = jgdata.getShopData();
      // console.log(this.data);
      this.$store.commit("setShopData", this.data);
      this.$store.commit("setResKey", null);

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
};
