
import {device} from '../../lib/Index'
import { mapState } from 'vuex'
import {getChineseWeek} from '../../lib/function';
export default {
  name: 'Index',
  props: {
  },
  data () {
    return {
      businesstime: [],
      shopinfo: {
        type: Object,
        default: {},
        required: true
      }
    }
  },
  computed: {
    exchangecards () {
      var data = this.data.itemFun;
      if (data !== undefined) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].parameter === 'exchangecards') {
            return data[i];
          }
        }
        return null;
      }
    },
    jobData: {
      get () {
        return JSON.parse(this.data.job);
      },
      set (value) {
        this.data.job = value;
      }
    },
    shopTimeView () {
      let timeData = [];
      let shopTime = this.data.shopTime;
      shopTime = JSON.parse(shopTime);
      if (shopTime !== null) {
        for (let i = 0; i < shopTime.length; i++) {
          const item = shopTime[i];
          if (item.state === 1) {
            if (item.time === '00:00-00:00') {
              timeData.push(
                '星期' + getChineseWeek(i) + ' ' + '全日'
              )
            } else {
              timeData.push(
                '星期' + getChineseWeek(i) + ' ' + item.time
              )
            }
          }
        }
      }
      return timeData;
    },
    ...mapState(['data'])
  },
  components: {
  },
  async mounted () {
    this.setShopTime(this.data)
  },
  methods: {
    openShop (shopid) {
      console.log('shopid', shopid);
      device._doSendMessage('openShop', {shopid: shopid});
    },
    scanQR () {
      console.log('window.headers.shopid', window.headers.shopid)
      device._doSendMessage('scanBusinessCard', {shopid: window.headers.shopid});
    },
    // 明細時間
    showTimeList () {
      let timeData = [];
      let shopTime = this.shopinfo.shopTime
      if (typeof shopTime === 'undefined') {
        return null
      }
      if (shopTime === null || shopTime === '') {
        return null
      }
      try {
        shopTime = JSON.parse(shopTime);
        if (shopTime !== null) {
          for (let i = 0; i < shopTime.length; i++) {
            const item = shopTime[i];
            if (item.state === 1) {
              if (item.time === '00:00-00:00') {
                timeData.push({
                  content: '星期' + getChineseWeek(i) + ' ' + '全日',
                  align: 'left'
                })
              } else {
                timeData.push({
                  content: '星期' + getChineseWeek(i) + ' ' + item.time,
                  align: 'left'
                })
              }
            }
          }
        }
      } catch (e) {
      }

      this.$createActionSheet({
        title: '營業時間',
        /* pickerStyle: true, */
        cancelTxt: '關閉',
        data: timeData
      }).show()
    },
    // 时间处理
    setShopTime (shopinfo = null) {
      if (shopinfo === null || typeof shopinfo === 'undefined') {
        return null
      }
      this.shopinfo = shopinfo;
      let shopTime = this.shopinfo.shopTime
      if (typeof shopTime === 'undefined') {
        return null
      }
      if (shopTime === null || shopTime === '') {
        return null
      }
      this.businesstime = []
      let now = new Date();
      let day = now.getDay();
      let nowtime = '';
        // console.log(day);
      try {
        shopTime = JSON.parse(shopTime)
        let bol = false;
        for (let n = 0; n < shopTime.length; n++) {
          const item = shopTime[n];
          if (n === day) {
            nowtime = item.time
          }
          if (item.state === 1) {
            bol = false
            for (let i = 0; i < this.businesstime.length; i++) {
              if (this.businesstime[i].time === item.time) {
                this.businesstime[i].week = this.businesstime[i].week + getChineseWeek(n)
                bol = true
                break
              }
            }
            if (bol === false) {
              this.businesstime.push({
                time: item.time,
                week: getChineseWeek(n)
              })
            }
          }
          if (this.businesstime.length > 1) {
            this.businesstime = [];
            this.businesstime.push({
              time: nowtime,
              week: getChineseWeek(day - 1)
            })
          }
        }
      } catch (e) {

      }
    },
    // 開啟聊天
    openChat () {
      device.openChat();
    }
  }
}
