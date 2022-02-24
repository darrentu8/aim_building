import BasePageBack from '../../components/basepageback/BasePageBack'
import ReservationItem from '../../components/reservationItem/ReservationItem.vue'
import AppBase from '../../lib/base/AppBase'
import { mapState } from 'vuex'

export default {
  name: 'Reservation',
  extends: AppBase,
  data () {
    return {
      bgclass: {
        // backgroundImage: 'url(' + require('@/assets/img/page-header-bg.png') + ')'
      },
      title: ''
    };
  },
  components: {
    BasePageBack,
    ReservationItem
  },
  computed: {
    res () {
      return this.data.reservationService;
    },
    ...mapState(['data'])
  },
  methods: {
    /* pageback () {
      alert('pageback')
    } */
  }
}
