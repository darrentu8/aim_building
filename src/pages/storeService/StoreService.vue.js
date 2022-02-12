import BasePageBack from '../../components/basepageback/BasePageBack'
import StoreServiceItem from '../../components/storeServiceItem/StoreServiceItem.vue'
import AppBase from '../../lib/base/AppBase'
import { mapState } from 'vuex';

export default {
  name: 'StoreService',
  extends: AppBase,
  data () {
    return {
      // bgclass: {
      //   backgroundImage: 'url(' + require('@/assets/img/page-header-bg.png') + ')'
      // },
    };
  },
  // props: {
  //   data: {
  //     type: String
  //   }
  // },
  computed: {
    ...mapState(['data', 'res'])
  },
  components: {
    BasePageBack,
    StoreServiceItem
  },
  mounted () {
    // console.log('res', this.data.reservationService);
  },
  methods: {
    /* pageback () {
      alert('pageback')
    } */
  }
}
