import Menu from "../../components/menu/Menu";
import { jgdata, AppBase } from "../../lib/Index";
import BasePageBack from "../../components/basepageback/BasePageBack";
// import VueSlickCarousel from 'vue-slick-carousel';
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// import { mapState } from 'vuex'
// optional style for arrows & dots
// import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';

export default {
  name: "Index",
  extends: AppBase,
  props: {},
  data() {
    return {
      data: {}
    };
  },
  components: {
    BasePageBack,
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
    toVoteData() {
      setTimeout(() => {
        this.$router.push(
          {
            name: "Votes"
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
