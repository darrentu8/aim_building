import BasePageBack from '../../components/basepageback/BasePageBack'
import StoreServiceItem from '../../components/storeServiceItem/StoreServiceItem.vue'
import AppBase from '../../lib/base/AppBase'

export default {
  name: 'Reservation',
  extends: AppBase,
  data () {
    return {
      // bgclass: {
      //   backgroundImage: 'url(' + require('@/assets/img/page-header-bg.png') + ')'
      // },
      title: ''
    };
  },
  components: {
    BasePageBack,
    StoreServiceItem
  },
  methods: {
    /* pageback () {
      alert('pageback')
    } */
  }
}
