import BasePageBack from '../../components/basepageback/BasePageBack'
import StoreServiceItem from '../../components/storeServiceItem/StoreServiceItem.vue'
import AppBase from '../../lib/base/AppBase'

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
  props: {
    data: {
      type: String
    }
  },
  computed: {
    // goodData () {
    //   return JSON.parse(this.data);
    // }
  },
  components: {
    BasePageBack,
    StoreServiceItem
  },
  mounted () {
    console.log('data', this.data);
    console.log('goodData', this.goodData);
  },
  methods: {
    /* pageback () {
      alert('pageback')
    } */
  }
}
