import BasePageBack from '../../components/basepageback/BasePageBack'
import ReservationItem from '../../components/reservationItem/ReservationItem.vue'
import {AppBase, jgdata} from '../../lib/Index'
// eslint-disable-next-line no-unused-vars
import { mapState } from 'vuex'

export default {
  name: 'Reservation',
  extends: AppBase,
  data () {
    return {
      bgclass: {
        // backgroundImage: 'url(' + require('@/assets/img/page-header-bg.png') + ')'
      },
      title: '',
      res: []
    };
  },
  components: {
    BasePageBack,
    ReservationItem
  },
  computed: {
    /* res () {
      return this.data.reservationService;
    },
    ...mapState(['data']) */
  },
  methods: {
    initData () {
      this.$store.commit('setShopData', {});
      this.data = jgdata.getShopData();
      let key = parseInt(this.$route.query.key || 0);
      console.log('key', key)
      if (key) {
        this.data.reservationService.forEach((item, i) => {
          if (item.key === key) {
            item.active = true;
            this.$store.commit('setI', i);
          } else {
            item.active = false;
          }
        })
      } else {
        this.data.reservationService.forEach((item, i) => {
          if (i === 0) {
            item.active = true;
            this.$store.commit('setI', i);
          } else {
            item.active = false;
          }
        })
      }
      this.$store.commit('setShopData', this.data);
      this.$store.commit('setRes', this.res);
      this.res = this.data.reservationService;
      // console.log(this.res)
    }
  }
}
