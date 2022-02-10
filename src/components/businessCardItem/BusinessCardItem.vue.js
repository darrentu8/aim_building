
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
    isbusinessinfoData: {
      get () {
        return this.data.isbusinessinfo.slice(5);
      },
      set (value) {
        this.data.isbusinessinfo = value;
      }
    },
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
      device.collect(this.data.isCollect);
    }
  }
}
