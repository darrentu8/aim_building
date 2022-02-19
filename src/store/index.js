import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: {},
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
    setShopData (state, val) {
      state.data = val;
    },
    setRes (state, val) {
      state.res = val;
    }
  },
  getters: {},
  actions: {
  }
});
