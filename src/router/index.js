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
      component: Index,
      meta: {
        keepAlive: true // 需要缓存
      }
    },
    {
      path: '/Reservation',
      name: 'Reservation',
      component: Reservation,
      meta: {
        keepAlive: true // 需要缓存
      }
    },
    {
      path: '/StoreService',
      name: 'StoreService',
      component: StoreService,
      meta: {
        keepAlive: true // 需要缓存
      }
    },
    {
      path: '/BusinessCard',
      name: 'BusinessCard',
      component: BusinessCard,
      meta: {
        keepAlive: true // 需要缓存
      }
    }
  ],
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});
