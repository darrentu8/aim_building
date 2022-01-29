
import {device} from '../../lib/Index'
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
