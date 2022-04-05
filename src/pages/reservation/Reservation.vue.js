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
      this.$store.commit('setShopData', this.data);
      this.res = this.data.reservationService;
      this.$store.commit('setRes', this.res);
      // console.log(this.res)
    }
  }
}
