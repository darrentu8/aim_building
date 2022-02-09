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
      hourPrice: 800,
      timeList: [
        {time: '08-09', value: '08-09', active: false},
        {time: '09-10', value: '09-10', active: false},
        {time: '10-11', value: '10-11', active: false},
        {time: '12-13', value: '12-13', active: false},
        {time: '13-14', value: '13-14', active: false},
        {time: '15-16', value: '15-16', active: false},
        {time: '16-17', value: '16-17', active: false},
        {time: '17-18', value: '17-18', active: false}
      ],
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
    totalPrice () {
      var totalTime = 0;
      var total = 0;
      this.timeList.forEach(ele => {
        if (ele.active === true) {
          totalTime += 1;
        }
      });
      this.reservationList.forEach(ele => {
        if (ele.active === true) {
          total += Number(ele.price + this.hourPrice * totalTime)
        }
      })
      return total;
    },
    totalTime () {
      var total = 0;
      this.timeList.forEach(ele => {
        if (ele.active === true) {
          total += 1
        }
      });
      return total;
    },
    ...mapState(['data'])
  },
  methods: {
    reservat () {
      if (this.totalPrice === 0) {
        Toast({
          message: '請選擇服務項目!',
          position: 'middle',
          duration: 5000
        });
        return false;
      } else {
        console.log(this.totalPrice);
        device.payMoney(this.totalPrice);
      }
    },
    selectReservation (item) {
      if (item.active) {
        Vue.set(item, 'active', false);
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
