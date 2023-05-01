import Menu from "../../components/menu/Menu";
import { jgdata, AppBase } from "../../lib/Index";
import BasePageBack from "../../components/basepageback/BasePageBack";
import { DatePicker } from "cube-ui";
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
      // 开始时间
      startTime: "",
      // 结束时间
      endTime: "",
      // 时间标识
      timeIdentifying: ""
    };
  },
  components: {
    BasePageBack,
    DatePicker,
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
    to(val) {
      this.$router.push(
        {
          name: val
        },
        "1000"
      );
    },
    // 监听出发选择时间
    showMinPicker(time) {
      if (!this.minPicker) {
        this.minPicker = this.$createDatePicker({
          title: "選擇時間",
          confirmTxt: "確認",
          visible: true,
          // 最小时间
          min: new Date(2000, 0, 1),
          // 最大时间
          max: new Date(2099, 12, 1),
          // 当前时间
          value: new Date(),
          // 显示的格式
          format: {
            year: "YYYY",
            month: "MM",
            date: "DD"
          },
          // 显示多少列
          columnCount: 3,
          // 选择时间确定后
          onSelect: this.selectHandler,
          // 选择时间取消后
          onCancel: this.cancelHandler
        });
      }
      // 选择时间标识
      this.timeIdentifying = time;
      // 显示
      this.minPicker.show();
    },
    // 选择时间确定后 三个参数是不同的时间格式，可能根据自己需求定
    selectHandler(selectedTime, selectedText, formatedTime) {
      let time = "";
      for (let index = 0; index < selectedText.length; index++) {
        if (index === selectedText.length - 1) {
          time += selectedText[index];
        } else {
          time += selectedText[index] + "-";
        }
      }
      console.log("开始修改");
      if (this.timeIdentifying === "startTime") {
        console.log("修改startTime");
        this.startTime = time;
      } else if (this.timeIdentifying === "endTime") {
        console.log("修改endTime");
        this.endTime = time;
      }
      console.log("结束修改");
    },
    // 取消事件
    cancelHandler() {
      // 清空选择好的时间
      this.startTime = "";
      this.endTime = "";
    },
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
