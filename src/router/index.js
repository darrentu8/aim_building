// eslint-disable-next-line vue/valid-v-else
import Vue from 'vue';
import Router from 'vue-router';
import Index from '../pages/index/Index';
import Reservation from '../pages/reservation/Reservation.vue';
import StoreService from '../pages/storeService/StoreService.vue';
import BusinessCard from '../pages/businessCard/BusinessCard.vue';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Reservation',
      name: 'Reservation',
      component: Reservation
    },
    {
      path: '/StoreService',
      name: 'StoreService',
      component: StoreService
    },
    {
      path: '/BusinessCard',
      name: 'BusinessCard',
      component: BusinessCard
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return {
        savedPosition,
        behavior: 'smooth'
      };
    } else {
      return {
        x: 0,
        y: 0,
        behavior: 'smooth'
      };
    }
  }
});
