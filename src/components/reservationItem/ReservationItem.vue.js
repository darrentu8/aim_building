import Datepicker from 'vuejs-datepicker';
import { zh } from 'vuejs-datepicker/dist/locale'
import moment from 'moment';
import Vue from 'vue';
import { Toast } from 'mint-ui';
import device from '../../lib/device';
import { mapState } from 'vuex';

export default {
  data () {
    return {
      totalTime: 0,
      timeObj: '',
      totalPrice: 0,
      selectResIndex: 0,
      timeList: [],
      reservationList: [
        {title: '網拍', id: '1', price: 1200, link: require('@/assets/img/reservation-img1.png'), active: false},
        {title: '網拍', id: '1', price: 1200, link: require('@/assets/img/reservation-img2.png'), active: false},
        {title: '網拍', id: '1', price: 1200, link: require('@/assets/img/reservation-img3.png'), active: false},
        {title: '網拍', id: '1', price: 1200, link: require('@/assets/img/reservation-img4.png'), active: false}
      ],
      selectTime: [],
      zh: zh,
      disabledDates: {
        to: new Date(Date.now() - 8640000)
      },
      dateSelect: new Date(),
      weekedShow: '',
      bgclass: {
        backgroundImage: 'url(' + require('@/assets/img/reservation-bg.png') + ')'
      }
    };
  },
  components: {
    Datepicker
  },
  computed: {
    totalBuyPrice () {
      this.totalPrice = 0;
      var totalTime = 0;
      var total = 0;
      var timeObj = this.data.reservationService[this.selectResIndex].content[0].time;
      var timePrice = this.data.reservationService[this.selectResIndex].content[0].time[0].price;
      timeObj.forEach(ele => {
        if (ele.active === true) {
          totalTime += 1;
        }
      });
      total += Number(timePrice * totalTime);
      this.totalPrice = total;
      return total;
    },
    totalBuyTime () {
      var totalTime = 0;
      var timeObj = this.data.reservationService[this.selectResIndex].content[0].time;
      timeObj.forEach(ele => {
        if (ele.active === true) {
          totalTime += 1
        }
      });
      this.totalTime = totalTime;
      return totalTime;
    },
    ...mapState(['data', 'res'])
  },
  mounted () {
    this.data.reservationService.forEach((item) => {
      item.active = false;
    })
    this.$store.commit('setRes', this.data.reservationService);
  },
  methods: {
    reservat () {
      var selectRes = 0;
      var ResObj = this.data.reservationService;
      ResObj.forEach(ele => {
        if (ele.active === true) {
          selectRes += 1
        }
      });
      if (this.totalPrice === 0 || selectRes === 0) {
        Toast({
          message: '請選擇服務項目!',
          position: 'middle',
          duration: 5000
        });
        return false;
      } else {
        // console.log(this.totalPrice);
        // device.payMoney(this.totalPrice);
        let params = {};
        params['shopid'] = window.headers.shopid; // 商家
        params['puid'] = window.headers.shopid;
        params['selected'] = this.data.reservationService[this.selectResIndex].name;
        params['lens'] = {
          length: this.totalTime,
          maxPrice: this.totalPrice };
        console.log('params', params)
        device.goodsPost(params)
      }
    },
    selectReservation (item, i) {
      this.data.reservationService.forEach((item) => {
        item.active = false;
      })
      this.selectResIndex = i;
      Vue.set(item, 'active', false);
      if (item.active) {
      } else {
        Vue.set(item, 'active', true);
      }
    },
    selectTimes (item) {
      if (item.active) {
        Vue.set(item, 'active', false);
      } else {
        Vue.set(item, 'active', true);
      }
    },
    formateDate (date) {
      console.log(this.weekedShow)
      return moment(date).format('YYYY / MM / DD');
    },
    formateWeek (date) {
      const weeksObj = {
        1: '一',
        2: '二',
        3: '三',
        4: '四',
        5: '五',
        6: '六',
        7: '日'
      };
      let weekNumber = moment(date).isoWeekday();
      return weeksObj[weekNumber];
    }
  }
}
