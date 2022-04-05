import BasePageBack from '../../components/basepageback/BasePageBack'
import BusinessCardItem from '../../components/businessCardItem/BusinessCardItem.vue'
import {AppBase, jgdata} from '../../lib/Index'

export default {
  name: 'BusinessCard',
  extends: AppBase,
  data () {
    return {
      bgclass: {
        backgroundImage: 'url(' + require('@/assets/img/businessCard-bg.png') + ')'
      },
      title: ''
    };
  },
  components: {
    BasePageBack,
    BusinessCardItem
  },
  methods: {
    initData () {
      this.$store.commit('setShopData', {});
      this.data = jgdata.getShopData();
      this.$store.commit('setShopData', this.data);
    }
  }
}
