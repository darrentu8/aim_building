
import {device, jglib} from '../../lib/Index'

export default {
  name: 'AppBase',
  data () {
    return {
      pageConfig: {}
    }
  },
  components: {},
  async mounted () {
    this.initAppConfig();
    // 監聽 返回事件
    this.backID = jglib.setOnMessage((msg) => {
      // device.console(msg);
      if (typeof this.pageback !== 'undefined') {
        this.pageback();
        return;
      }
      this.$router.back()
    }, 'pageback');

    this.refreshID = jglib.setOnMessage(this.refresh.bind(this), 'initrefresh');
  },
  async created () {

  },
  beforeDestroy () {
    // console.log('beforeDestroy')
    jglib.unOnMessage(this.backID)
    jglib.unOnMessage(this.refreshID)
  },
  methods: {
    initAppConfig () {
      let allConfig = {}

      let config = {}
      try {
        // console.log(this.$options, 'tesss', this.$options.name)
        let cf = this.$options.name;
        cf = 'pages/' + cf.toLocaleLowerCase() + '/' +
          this.$options.name + '.json'
        config = require(`../../${cf}`);
        /* cf = 'pages/' + cf.toLocaleLowerCase() + '/' +
          this.$options.name + '.json'
        config = require(`@${cf}`); */
        // console.log(config, 'test config')
      } catch (e) {
        // console.log(e)
        return;
      }

      try {
        allConfig = require('../../../static/app.json');
        // console.log(allConfig)
      } catch (e) {
      }
      const pconfig = {
        ...allConfig,
        ...config
      }
      // console.log(pconfig, 'test config pconfig')

      if (typeof this.$route.query.title !== 'undefined') {
        pconfig.window.navigationBarTitleText = this.$route.query.title
      }
      pconfig.name = this.$options.name;
     // device.sysWindowStyle(pconfig);
      this.pageConfig = pconfig;
      this.setPageConfig()
    },

    setPageConfig () {
      device.sysWindowStyle(this.pageConfig);
    },

    // 強制刷新
    refresh () {
      // this.$forceUpdate();
    }

  }
}
