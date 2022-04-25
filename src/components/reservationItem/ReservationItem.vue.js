import Datepicker from 'vuejs-datepicker';
import { zh } from 'vuejs-datepicker/dist/locale'
import moment from 'moment';
import Vue from 'vue';
import { Toast } from 'mint-ui';
import { mapState } from 'vuex';
import {constant, device, jgdata, moneyfmt} from '../../lib/Index'

export default {
  data () {
    return {
      from: new Date(),
      to: new Date(),
      disabledDates: {
        to: new Date((new Date()).valueOf() - 1000 * 3600 * 24),
        from: null,
        days: []
      },
      disabled: false,
      totalTime: 0,
      timeObj: '',
      totalPrice: 0,
      selectResIndex: 0,
      timeList: [],
      reservationList: [
        /* {title: '網拍', id: '1', price: 1200, link: require('@/assets/img/reservation-img1.png'), active: false},
        {title: '網拍', id: '1', price: 1200, link: require('@/assets/img/reservation-img2.png'), active: false},
        {title: '網拍', id: '1', price: 1200, link: require('@/assets/img/reservation-img3.png'), active: false},
        {title: '網拍', id: '1', price: 1200, link: require('@/assets/img/reservation-img4.png'), active: false} */
      ],
      selectTime: [],
      zh: zh,
      dateSelect: new Date(),
      weekedShow: '',
      bgclass: {
        backgroundImage: 'url(' + require('@/assets/img/reservation-bg.png') + ')'
      }
    };
  },
  components: {
    Datepicker
  },
  computed: {
    totalBuyPrice () {
      this.totalPrice = 0;
      var total = 0;
      var timeObj = this.data.reservationService[this.selectResIndex].content[0].time;
      timeObj.forEach(ele => {
        if (ele.active === true) {
          total += ele.price;
        }
      });
      this.totalPrice = total;
      return total;
    },
    totalBuyTime () {
      var totalTime = 0;
      var timeObj = this.data.reservationService[this.selectResIndex].content[0].time;
      timeObj.forEach(ele => {
        if (ele.active === true) {
          totalTime += 1
        }
      });
      this.totalTime = totalTime;
      return totalTime;
    },
    ...mapState(['data', 'res', 'selectKey', 'selectI'])
  },
  created () {
    this.selectReservation(this.selectI);
    this.checkDate(this.selectI);
  },
  methods: {
    selectReservation (i) {
      this.data.reservationService.forEach((ele, i1) => {
        if (i1 === i) {
          ele.active = true;
          this.$store.commit('setI', i);
        } else {
          ele.active = false;
        }
      })
    },
    selectTimes (item) {
      // 增加 日期預約已滿 判別 220416
      if (this.dateSelect === null) {
        return;
      }
      if (item.number < 1) {
        let msg = moment(this.dateSelect).format('YYYY-MM-DD');
        msg = `日期：${msg} \n 時段：${item.time}/${moneyfmt(item.price)} \n 預約已滿！`;
        Toast({
          message: msg,
          position: 'middle',
          duration: 5000
        });
        return false;
      }
      if (item.active) {
        Vue.set(item, 'active', false);
      } else {
        Vue.set(item, 'active', true);
      }
    },
    checkDate (index) {
      this.selectReservation(index || 0);
      const i = this.selectResIndex = parseInt(index || 0);
      let SD = new Date(this.data.reservationService[i].content[0].sdate);
      let ED = new Date(this.data.reservationService[i].content[0].edate);
      let WK = this.data.reservationService[i].content[0].week;
      const weeks = [1, 2, 3, 4, 5, 6, 7];
      if (SD === undefined || ED === undefined) {
        return
      }
      this.disabledDates.to = SD;
      let today = new Date();
      // 結束日小於今天
      if (ED < today) {
        this.dateSelect = null;
        this.disabled = true;
        return
      }
      let WKN = WK.split('').map(Number);
      let result = [];
      result = weeks.filter(function (e) {
        return WKN.indexOf(e) < 0;
      });
      result.forEach((ele, i) => {
        if (ele === 7) {
          result[i] = 0;
        }
      });
      this.disabledDates.days = result;
      this.disabledDates.to = new Date(today.setDate(today.getDate() - 1));
      this.disabledDates.from = ED;
      this.dateSelect = null;
      this.disabled = false;
    },
    reservat () {
      let selectRes = 0;
      let selectGoods = [];
      let selectTime = [];
      let ResObj = this.data.reservationService;
      let lens = {};
      if (this.dateSelect === null) {
        Toast({
          message: '請選擇日期!',
          position: 'middle',
          duration: 5000
        });
        return false;
      }
      // 轉換日期顯示
      /* let selectDate = this.dateSelect;
      let SYY = selectDate.getFullYear();
      let SMM = selectDate.getMonth() + 1;
      let SDD = selectDate.getDate();
      let SDate = SYY + '-' + SMM + '-' + SDD; */
      // 時間格式統一 用 YYYY-MM-DD 格式  如: 2022-04-28
      let SDate = moment(this.dateSelect).format('YYYY-MM-DD');

      let selectItem = null;
      // console.log(ResObj);
      for (let index in ResObj) {
        let ele = ResObj[index];
        if (ele.active === true) {
          selectItem = ele;
          break;
        }
      }
      // console.log(selectItem);
      if (selectItem === null) {
        Toast({
          message: '請選擇服務項目!',
          position: 'middle',
          duration: 5000
        });
        return false;
      }
      if (!selectItem.copies) {
        Toast({
          message: '此項目已無數量可預約!',
          position: 'middle',
          duration: 5000
        });
        return false;
      }
      // 時段
      let orderTime = []; // 预约時段
      let price = 0;
      selectItem.content[0].time.forEach((ele2) => {
        if (ele2.active === true) {
          selectTime.push(ele2.time);
          orderTime.push(ele2);
          price += ele2.price;
        }
      });

      let remark = `時間：${SDate} / 時段：${selectTime}`;
      let item = {
        key: selectItem.key, // 商品id,
        name: selectItem.name, // 商品名稱,
        price: price, // 原價格,
        selectPrice: price, // 購買價格,沒有折扣跟原價一樣 ,
        selectRemark: remark, // 備註說明
        orderTime: {
          time: orderTime,
          date: SDate
        }
      };

      selectGoods.push(item);
      lens[selectItem.key] = 1; // 對應 key 商品數量
      selectRes += 1;

      /* ResObj.forEach((ele) => {
        ele.content[0].time.forEach((ele2) => {
          if (ele.active === true) {
            if (ele2.active === true) {
              selectTime.push(ele2.time)
              orderTime.push(ele2);
            }
          }
        })
      });
      console.log('ResObj', ResObj, orderTime);
      ResObj.forEach(ele => {
        if (ele.active === true) {
          let remark = '時間：' + SDate + ' / ' + '時段：' + selectTime;
          let item = {
            key: ele.key, // 商品id,
            name: ele.name, // 商品名稱,
            price: ele.content[0].time[0].price, // 原價格,
            selectPrice: ele.content[0].time[0].price, // 購買價格,沒有折扣跟原價一樣 ,
            selectRemark: remark, // 備註說明
            orderTime: []
          };

          item.orderTime.push(ele.content[0].time[0]);

          selectGoods.push(item);
          lens[ele.key] = 1; // 對應 key 商品數量
          selectRes += 1;
          // selectGoods.push(ele);
        }
      }); */

      lens.length = selectTime.length;
      lens.maxPrice = this.totalPrice;
      if (this.totalPrice === 0 || selectRes === 0) {
        Toast({
          message: '請選擇可預約時段!',
          position: 'middle',
          duration: 5000
        });
        return false;
      }

      let params = {};
      params['shopid'] = window.headers.shopid; // 商家
      params['puid'] = window.headers.shopid;
      params['selected'] = selectGoods;
      params['lens'] = lens;
      // console.log('params', params);
      device.goodsPost(params)
    },
    formateDate (date) {
      // console.log(this.weekedShow)
      return moment(date).format('YYYY / MM / DD');
    },
    formateWeek (date) {
      const weeksObj = {
        1: '一',
        2: '二',
        3: '三',
        4: '四',
        5: '五',
        6: '六',
        7: '日'
      };
      let weekNumber = moment(date).isoWeekday();
      return weeksObj[weekNumber];
    },
    // 增加選擇日期，讀取預約數量是否可用 220416
    selectDate (date) {
      date = moment(date).format('YYYY-MM-DD');
      const url = `${constant.SERVER}/aimandofo/getreservationdata`;
      let param = {};
      param.date = date;
      jgdata.getDataServer(url, param).then((data) => {
        // 更新一下日期 可用數量
        let resData = this.data.reservationService;
        for (let i = 0; i < resData.length; i++) {
          resData[i].content = [];
          for (let n = 0; n < data.length; n++) {
            if (resData[i].key === data[n].key) {
              resData[i].content.push(data[n])
            }
          }
        }
        this.data.reservationService = resData;
      }).catch(e => {
        // 獲取數據錯誤
      })
    }
  }
}
