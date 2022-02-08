import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
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
    setGood (state, val) {
      state.good = val;
    }
  },
  getters: {},
  actions: {
  }
});
