import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollect: false,
    data: {},
    res: [],
    good: {
      shopName: '',
      name: '',
      price: '',
      business: '',
      image: '',
      info: ''
    }
  },
  mutations: {
    setIsCollect (state, val) {
      state.isCollect = val;
    },
    setShopData (state, val) {
      state.data = val;
    },
    setRes (state, val) {
      state.res = [];
      state.res.push(val);
    },
    sameRes (state, val) {
      state.res = val;
    }
  },
  getters: {},
  actions: {
  }
});
