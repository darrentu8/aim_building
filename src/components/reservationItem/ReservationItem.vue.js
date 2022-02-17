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
      disabledDates: {
        to: new Date(Date.now() - 8640000)
      },
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
      var totalTime = 0;
      var total = 0;
      var timeObj = this.data.reservationService[this.selectResIndex].content[0].time;
      var timePrice = this.data.reservationService[this.selectResIndex].content[0].time[0].price;
      timeObj.forEach(ele => {
        if (ele.active === true) {
          totalTime += 1;
        }
      });
      total += Number(timePrice * totalTime);
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
    this.data.reservationService.forEach((item) => {
      item.active = false;
    })
    this.$store.commit('setRes', this.data.reservationService);
  },
  methods: {
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
      var selectRes = 0;
      var selectGoods = [];
      var ResObj = this.data.reservationService;
      let lens = {};

      ResObj.forEach(ele => {
        if (ele.active === true) {
          let tmpData = {...ele};
          tmpData['key'] = ele.key; // 商品id,
          tmpData['menuname'] = ele.name; // 商品名稱,
          tmpData['price'] = '';// 原價格,
          tmpData['selectPrice'] = '';// 購買價格,沒有折扣跟原價一樣 ,
          let remark = '時間：選擇時間 明細時間段 ';
          tmpData['remark'] = remark; // 備註說明
          lens[ele.key] = 1; // 對應 key 商品數量

          selectRes += 1;
          selectGoods.push(tmpData);
          // selectGoods.push(ele);
        }
      });
      lens.length = selectRes;
      lens.maxPrice = this.totalPrice;
      if (this.totalPrice === 0 || selectRes === 0) {
        Toast({
          message: '請選擇服務項目!',
          position: 'middle',
          duration: 5000
        });
        return false;
      } else {
        let params = {};
        params['shopid'] = window.headers.shopid; // 商家
        params['puid'] = window.headers.shopid;
        params['selected'] = selectGoods;
        params['lens'] = lens;
        /* params['lens'] = {
          length: this.totalTime,
          maxPrice: this.totalPrice }; */
        console.log('params', params)
        device.goodsPost(params)
        // device._doSendMessage ('openshop', {shopid:window.headers.shopid})
      }
    },
    selectReservation (item, i) {
      this.data.reservationService.forEach((item) => {
        item.active = false;
      })
      this.selectResIndex = i;
      Vue.set(item, 'active', false);
      if (item.active) {
      } else {
        Vue.set(item, 'active', true);
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
