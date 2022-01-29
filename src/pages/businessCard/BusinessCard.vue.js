import BasePageBack from '../../components/basepageback/BasePageBack'
import BusinessCardItem from '../../components/businessCardItem/BusinessCardItem.vue'
import AppBase from '../../lib/base/AppBase'

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
    /* pageback () {
      alert('pageback')
    } */
  }
}
