
import {device, jglib} from '../Index'
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
    this.APPmessageID = jglib.setOnMessage(this.onAppMessage.bind(this));
    // 監聽 返回事件
    this.backID = jglib.setOnMessage((msg) => {
      if (typeof this.pageback !== 'undefined') {
        this.pageback();
        return;
      }
      this.$router.back()
    }, 'pageback');

    this.refreshID = jglib.setOnMessage(this.refresh.bind(this), 'initrefresh');
    if (this.mounted) {
      this.mounted();
    }
    if (this.initData) {
      this.initData();
    }
  },
  async created () {
    if (this.created) {
      this.created();
    }
  },
  beforeDestroy () {
    jglib.unOnMessage(this.backID)
    jglib.unOnMessage(this.refreshID)
    jglib.unOnMessage(this.APPmessageID)
    if (this.beforeDestroy) {
      this.beforeDestroy();
    }
  },
  methods: {
    initAppConfig () {
      let allConfig = {}
      let config = {}
      try {
        let cf = this.$options.name;
        cf = 'pages/' + cf.toLocaleLowerCase() + '/' +
          this.$options.name + '.json'
        // config = require(`../../${cf}`);
        // console.log(`@/${cf}`);
        config = require(`@/${cf}`);
        // console.log(config, `@/${cf}`);
      } catch (e) {
        return;
      }

      // console.log(require('@/../static/app.json'));
     // let cf = '../../static/app.json';
      //config = require(`../../${cf}`);
      // console.log(`@/${cf}`);
      try {
        allConfig = require('@/../static/app.json')
        //allConfig = require('../../../static/app.json');
      } catch (e) {
        console.log(e)
      }
      let pconfig = {}; // 'window':{}
      let dd={};
      if (typeof allConfig['window'] !== 'undefined') {
        dd = allConfig['window'];
      }
      for (let key in config['window']) {
        dd[key] = config['window'][key];
      }
      pconfig = {window:dd}
      // console.log(pconfig);
      /*const pconfig = {
        ...allConfig,
        ...config
      }*/
      if (typeof this.$route.query.title !== 'undefined') {
        pconfig.window.navigationBarTitleText = this.$route.query.title
      }
      pconfig.name = this.$options.name;
      this.pageConfig = pconfig;
      this.setPageConfig()
    },
    setPageConfig (param = '') {
      let name = param;
      if (name === '') {
        name = this.$options.name;
      }
      // console.log(name);
      name = name.toLowerCase();
      if (name === 'index') {
        let data = jglib.getWindow();
        if (data !== null) {
          for (let key in data) {
            this.pageConfig.window[key] = data[key]
          }
        }
      }
      device.sysWindowStyle(this.pageConfig);
    },
    refresh () {},
    onAppMessage (msg) {
      try {
        switch (msg.type.toLowerCase()) {
          case 'init': {
            this.setPageConfig();
            if (this.initData) {
              this.initData();
              return;
            }
            break
          }
          default:
            break;
        }
      } catch (e) {
      }

      if (this.onMessage) {
        this.onMessage(msg);
      }
    }
  }
}
