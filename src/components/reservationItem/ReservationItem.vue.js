import Datepicker from 'vuejs-datepicker';
import { zh } from 'vuejs-datepicker/dist/locale'
import moment from 'moment';
import Vue from 'vue';
import { Toast } from 'mint-ui';
import device from '../../lib/device';
import { mapState } from 'vuex';

export default {
  data () {
    return {
      from: new Date(),
      to: new Date(),
      disabledDates: {
        to: null,
        from: null
      },
      disabled: true,
      totalTime: 0,
      timeObj: '',
      totalPrice: 0,
      selectResIndex: 0,
      timeList: [],
      reservationList: [
        {title: '網拍', id: '1', price: 1200, link: require('@/assets/img/reservation-img1.png'), active: false},
        {title: '網拍', id: '1', price: 1200, link: require('@/assets/img/reservation-img2.png'), active: false},
        {title: '網拍', id: '1', price: 1200, link: require('@/assets/img/reservation-img3.png'), active: false},
        {title: '網拍', id: '1', price: 1200, link: require('@/assets/img/reservation-img4.png'), active: false}
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
    ...mapState(['data', 'res'])
  },
  mounted () {
    // this.data.reservationService.forEach((item) => {
    //   item.active = false;
    // })
    // this.$store.commit('setRes', this.data.reservationService);
  },
  methods: {
    // setRangeDate (SD, ED) {
    //   this.disabledDates.from = SD;
    //   this.disabledDates.to = ED;
    // },
    // setData (goods) {
    //   if (typeof goods.key === 'undefined') {
    //     return;
    //   }
    //   this.cartData = jglib.getCartList();// getLocalJsonData(constant.CARTDATA)
    //   this.remark = goods.selectRemark;
    //   this.value = goods.badge > 0 ? goods.badge : 1;
    //   this.goods = goods;
    //   // console.log(goods); // this.cartData, goods, 'setData',
    //   this.extend = {};
    //   try {
    //     this.extend = JSON.parse(goods.extend)
    //   } catch (e) {
    //   }
    //   this.extend = this.extend === null ? {} : this.extend;
    //   // 購物車屬性
    //   const { selected } = this.cartData;
    //   for (let i = 0; i < selected.length; i++) {
    //     if (selected[i].key === goods.key) {
    //       // 如果屬性改變 會有問題 200903
    //       this.extend.attribute = selected[i].attribute
    //     }
    //   }
    //   this.countprice();
    // },
    // async onAddCart () {
    //   let goods = this.goods
    //   goods.attribute = this.extend.attribute;
    //   // goods.extend = null;
    //   goods.selectRemark = this.remark;
    //   goods.selectPrice = this.price;
    //   let lens = this.cartData.lens || {maxPrice: 0, length: 0};
    //   // lens = {maxPrice: 0, length: 0};
    //   // console.log(lens,this.cartData.lens)
    //   let num = typeof lens[goods.key] !== 'undefined' ? lens[goods.key] : 0;
    //   // console.log(num)
    //   lens[goods.key] = this.value;
    //   const value = this.value - num;
    //   lens['maxPrice'] = lens['maxPrice'] + parseFloat(this.price) * value;
    //   lens['length'] = lens['length'] + value;
    //   // lens['length'] = this.value - num;
    //   let selected = this.cartData.selected || [];
    //   // selected = [];
    //   //  console.log('asdfsdf 111', this.cartData.selected)
    //   let bol = false;
    //   for (let i = 0; i < selected.length; i++) {
    //     if (selected[i].key === goods.key) {
    //       if (this.value === 0) {
    //         selected.splice(i, 1)
    //       } else {
    //         selected[i] = goods;
    //       }
    //       bol = true;
    //       break;
    //     }
    //   }
    //   if (!bol && this.value > 0) {
    //     selected.push(goods)
    //   }

    //   let cartItem = {
    //     selected: selected, // goods,
    //     lens: lens
    //   }
    //   // console.log('cartItem', cartItem)
    //   this.goods.badge = this.value;
    //   saveLocalJsonData(constant.CARTDATA, cartItem)
    //   this.$emit('succeedCart', cartItem)
    //   this.showAddcart = false;
    // },
    reservat () {
      let selectRes = 0;
      let selectGoods = [];
      let selectTime = [];
      let ResObj = this.data.reservationService;
      let lens = {};
      // 轉換日期顯示
      let selectDate = this.dateSelect;
      let SYY = selectDate.getFullYear();
      let SMM = selectDate.getMonth() + 1;
      let SDD = selectDate.getDate();
      let SDate = SYY + '-' + SMM + '-' + SDD;

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
          message: '請選擇服務項目!',
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
      console.log('params', params);
      device.goodsPost(params)
    },
    selectReservation (item, i) {
      this.data.reservationService.forEach((item) => {
        item.active = false;
      })
      this.selectResIndex = i;
      if (item.active) {
        Vue.set(item, 'active', false);
      } else {
        Vue.set(item, 'active', true);
      }
      let SD = new Date(this.data.reservationService[i].content[0].sdate);
      let ED = new Date(this.data.reservationService[i].content[0].edate);
      this.disabledDates.to = SD;
      this.disabledDates.from = ED;
      if (this.dateSelect > this.disabledDates.to) {
        this.dateSelect = this.disabledDates.to;
      }
      if (this.dateSelect < this.disabledDates.from) {
        this.dateSelect = this.disabledDates.to;
      }
    },
    selectTimes (item) {
      if (item.active) {
        Vue.set(item, 'active', false);
      } else {
        Vue.set(item, 'active', true);
      }
    },
    formateDate (date) {
      console.log(this.weekedShow)
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
    }
  }
}
