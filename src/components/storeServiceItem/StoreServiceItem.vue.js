import Datepicker from 'vuejs-datepicker';
import { zh } from 'vuejs-datepicker/dist/locale'
import moment from 'moment';
import { mapState } from 'vuex';

export default {
  data () {
    return {
      resTemp: {
        content: [{
          time: [
            {
              price: '200',
              time: '11-12'
            }
          ]
        }],
        copies: 5,
        image: 'http://aimandofor.abc1235.pw/Aimandofo/getImage/userid/0963545095/filename/dabdb2da1bfa91e.jpeg/width/200/height/200',
        info: '123',
        key: 2644,
        name: '拍攝',
        sell: 0
      },
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
  created () {
  },
  computed: {
    ...mapState(['data', 'res'])
  },
  components: {
    Datepicker
  },
  mounted () {
  },
  methods: {
    formateDate (date) {
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
