
import {device} from '../../lib/Index'
import { mapState } from 'vuex'
export default {
  name: 'Index',
  props: {
  },
  data () {
    return {
      shopinfo: {
        type: Object,
        default: {},
        required: true
      }
    }
  },
  computed: {
    ...mapState(['data'])
  },
  components: {
  },
  methods: {
    // 開啟聊天
    openChat () {
      device.openChat();
    },
    // 點擊收藏
    onCollect () {
      device.collect(this.shopinfo.isCollect)
    }
  }
}
