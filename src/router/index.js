// eslint-disable-next-line vue/valid-v-else
import Vue from 'vue';
import Router from 'vue-router';
const Reservation = () => import('../pages/reservation/Reservation.vue');
const StoreService = () => import('../pages/storeService/StoreService.vue');
const BusinessCard = () => import('../pages/businessCard/BusinessCard.vue');
const Index = () => import('../pages/index/Index');
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
  ]
});
