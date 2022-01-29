import BasePageBack from '../../components/basepageback/BasePageBack'
import ReservationItem from '../../components/reservationItem/ReservationItem.vue'
import AppBase from '../../lib/base/AppBase'

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
  methods: {
    /* pageback () {
      alert('pageback')
    } */
  }
}
