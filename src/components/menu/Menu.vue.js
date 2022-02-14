
import {device} from '../../lib/Index'
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['data'])
  },
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
      funData: []
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
      const menuList = this.data.itemFun;
      rel.push({
        parameter: 'index',
        text: this.$Lang('index-menu-index', '回主頁')
      })
      rel.push({
        parameter: 'Reservation',
        text: '預約時間'
      })
      rel.push({
        parameter: 'BusinessCard',
        text: '查看個人名片'
      })
      const param = [
        'storefront',
        'reservation',
        'teamwork',
        'scan',
        'deposit',
        'storedvalue',
        'wealcard',
        'chat',
        'cook',
        'exchangecards',
        'menublogs',
        'menubrowse',
        'sharepicture',
        'viewblogs',
        'order',
        'facilities',
        'leavemessage',
        'paymoney'
      ]
      for (let n = 0; n < param.length; n++) {
        for (let i = 0; i < menuList.length; i++) {
          if (menuList[i].parameter === param[n]) {
            rel.push({
              parameter: menuList[i].parameter,
              text: menuList[i].text,
              icon: menuList[i].icon,
              islogin: menuList[i].islogin
            })
            break
          }
        }
      }
      // console.log('menuList', menuList)
      rel.push({
        parameter: '/',
        text: this.$Lang('index-menu-app-index', '回首頁')
      })

      this.showcoupon = this.data.coupon.length > 0 ||
                        this.data.mycoupon.length > 0
                        ;
      let bol = window.headers.userid === window.headers.shopid;
      if (!bol) {
        try {
          bol = this.data.agencyuserid === window.headers.userid;
        } catch (e) {
        }
      }
      // bol = true;
      if (bol) {
        rel.push({
          parameter: 'bgmanage',
          text: this.$Lang('index-menu-manage', '後臺管理')
        })
      }
      // console.log('rel', rel);
      rel.forEach(ele => {
        if (ele.parameter === 'reservation') {
          ele.title = '預約時間';
        }
      });
      this.funData = rel;
    },
    onClickMenuItem (item) {
      let page = null
      this.visibilityMenu = false
      // alert(item.parameter)
      switch (item.parameter) {
        case '/':
          device.closeView()
          break
        // 回首頁
        case 'index':
          this.$router.push({
            path: '/',
            query: {title: item.text}
          })
          break;
        case 'Reservation':
          this.$router.push({
            name: 'Reservation'
          })
          break;
        case 'BusinessCard':
          this.$router.push({
            name: 'BusinessCard'
          })
          break;
        // 預約
        case 'reservation':
          this.$router.push({
            name: 'Reservation'
          })
          break;
        // 換名片
        case 'exchangecards':
          this.$router.push({
            name: 'BusinessCard'
          })
          break;
        // 夥伴們
        case 'cook':
          // page = 'WorkInfo'
          device.openPage(item.parameter, item.text)
          break
        // 辦公室
        case 'storefront':
          // page = 'ShopInfo'
          device.openPage(item.parameter, item.text)
          break;
        // 找聊天
        case 'chat':
          device.openChat();
          break;
        // 商品
        case 'menubrowse' :
          // this.$router.push({
          //   path: 'MenuOnMonthItem',
          //   query: {title: item.text}
          // })
          device.openPage(item.parameter, item.text)
          break
        // 網購
        case 'menublogs':
          device.openPage(item.parameter, item.text)
          break
        // GO網誌
        case 'viewblogs':
          device.openPage(item.parameter, item.text)
          break
        // 合作夥伴
        case 'teamwork':
          device.openPage(item.parameter, item.text)
          break
        // 預約
        case 'scan':
          device.scanQR();
          break
        // 儲值
        case 'storedvalue':
          device.openPage(item.parameter, item.text)
          break
        // 福利券
        case 'wealcard':
          device.openPage(item.parameter, item.text)
          break
        // 寄存物
        case 'deposit':
          device.openPage(item.parameter, item.text)
          break
        // 支付
        case 'paymoney':
          device.openPage(item.parameter, item.text)
          break
        // 十步設施
        case 'facilities':
          device.openPage(item.parameter, item.text)
          break;
        // 訂單
        case 'order':
          device.openPage(item.parameter, item.text)
          break
        // 分享照片
        case 'sharepicture':
          device.openPage(item.parameter, item.text)
          break
        // 留言
        case 'leavemessage':
          device.openPage(item.parameter, item.text)
          break
        // 後臺管理
        case 'bgmanage':
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
    },
    // 打開福利
    openCoupon () {
      // alert('openCoupon')
      this.closeMenu();
      device.openPage('coupon', this.$Lang('index-menu-coupon', '檢拾優惠卷'))
    }

  }
}
