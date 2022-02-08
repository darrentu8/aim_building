import Datepicker from 'vuejs-datepicker';
import { mapState } from 'vuex';
import { zh } from 'vuejs-datepicker/dist/locale'
import moment from 'moment';
export default {
  data () {
    return {
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
  computed: {
    ...mapState(['good'])
  },
  components: {
    Datepicker
  },
  methods: {
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
