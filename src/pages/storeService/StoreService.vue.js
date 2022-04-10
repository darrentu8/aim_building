import BasePageBack from '../../components/basepageback/BasePageBack'
import StoreServiceItem from '../../components/storeServiceItem/StoreServiceItem.vue'
import {AppBase, jgdata} from '../../lib/Index'
// import { mapState } from 'vuex';
export default {
  name: 'StoreService',
  extends: AppBase,
  data () {
    return {
      data: {},
      res: []
    };
  },
  /* computed: {
    ...mapState(['data', 'res'])
  }, */
  components: {
    BasePageBack,
    StoreServiceItem
  },
  methods: {
    initData () {
      this.$store.commit('setShopData', {});
      this.data = jgdata.getShopData();
      this.$store.commit('setShopData', this.data);
      if (typeof this.data.reservationService === 'undefined') {
        return;
      }
      const res = this.data.reservationService;
      let key = parseInt(this.$route.query.key || 0);
      for (let i = 0; i < res.length; i++) {
        if (res[i]['key'] === key) {
          this.res = res[i];
          this.$store.commit('setRes', res[i]);
          this.$store.commit('setResKey', key);
          break;
        }
      }
    }
  }
}
