
import {device, jgdata} from '../../lib/Index'

export default {
  props: {
    /* data: {
      type: Array,
      default: [],
      required: true
    } */
  },
  data () {
    return {
      visibilityMenu: false,
      showcoupon: false,
      funData: [],
      goHome: '',
      goMain: ''
    }
  },
  methods: {
    openMenu () {
      this.funlist()
      this.visibilityMenu = true
    },
    closeMenu () {
      this.visibilityMenu = false
    },
    // 功能列表
    funlist () {
      let rel = []

      rel.push({
        parameter: 'index',
        text: this.$Lang('index-menu-index', '回主頁')
      })

      const shopdata = jgdata.getShopData();
      // let menu = shopdata['templateData']['menu'];

      // for (let i = 0; i < menu.length; i++) {
      //   if (menu[i].parameter === 'wealcard') {
      //     continue;
      //   }
      //   rel.push({
      //     parameter: menu[i].parameter,
      //     text: menu[i].text,
      //     icon: menu[i].icon,
      //     islogin: menu[i].islogin
      //   })
      // };

      // console.log(shopdata)
      this.showcoupon = shopdata.coupon.length > 0 ||
                        shopdata.mycoupon.length > 0
                        ;
      let bol = window.headers.userid === window.headers.shopid;
      if (!bol) {
        try {
          bol = shopdata.agencyuserid === window.headers.userid;
        } catch (e) {
        }
      }
      // bol = true;
      rel.push({
        parameter: '/',
        text: this.$Lang('index-menu-app-index', '回首頁')
      })
      if (bol) {
        rel.push({
          parameter: 'bgmanage',
          text: this.$Lang('index-menu-manage', '後臺管理')
        })
      }

      // this.openMenu();
      this.funData = rel;
      // 切靜態的回主頁與回首頁
      this.goMain = this.funData[0];
      this.goHome = this.funData[1];
     // return rel
    },

    // 打開福利
    openCoupon () {
      // alert('openCoupon')
      this.closeMenu();
      device.openPage('coupon', this.$Lang('index-menu-coupon', '檢拾優惠卷'))
    },

    onClickMenuItem (item) {
      let page = null
      this.visibilityMenu = false
      // alert(item.parameter)
      switch (item.parameter) {
        /* case 'cook':
          page = 'WorkInfo'
          break */
        case 'storefront':
          page = 'ShopInfo'
          break;
        case 'chat':
          device.openChat();
          break;
        case 'menubrowse' :
          this.$router.push({
            path: 'MenuOnMonthItem',
            // eslint-disable-next-line standard/object-curly-even-spacing
            query: {title: item.text}
          })
          break
        case '/':
          device.closeView()
          break
        case 'index':
          this.$router.push({
            path: '/',
            // eslint-disable-next-line standard/object-curly-even-spacing
            query: {title: item.text}
          })
          break;
        case 'deposit':
        case 'facilities':
        // eslint-disable-next-line no-duplicate-case
        // case 'sharepicture':
          // 十步設施
        // eslint-disable-next-line no-fallthrough
        case 'leavemessage':
          // 留言
        // eslint-disable-next-line no-fallthrough
        case 'order':
          // 訂單
        // eslint-disable-next-line no-fallthrough
        case 'bgmanage':
          // 後臺管理
          device.openPage(item.parameter, item.text)
          return;
        default:
          return
      }

      if (page === null) {
        return
      }
      this.$router.push({
        path: page,
          // eslint-disable-next-line standard/object-curly-even-spacing
        query: {title: item.text} // JSON.stringify(item)
      }
      )
    },
    getVerion () {
      const headers = window.headers;
      if (typeof headers === 'undefined' ||
        typeof headers.uiInfo === 'undefined' ||
        typeof headers.uiInfo.version === 'undefined') {
        return '0.0.0.0';
      }
      return headers.uiInfo.version
    }

  }
}
