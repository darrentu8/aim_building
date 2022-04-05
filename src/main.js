/* eslint-disable import/first */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'

import router from './router'
import './assets/css/bootstrap.css'
import './assets/css/icons.css'
import {jglib, constant, device, moneyfmt} from './lib/Index';
device.setRouter(router);

Vue.filter('currency', moneyfmt);

// By default we import all the components.
// Only reserve the components on demand and remove the rest.
// Style is always required.
import {
  Button,
  ActionSheet,
  Scroll,
  Slide,
  Sticky,
  ScrollNav
  /* ImagePreview */
} from 'cube-ui'

Vue.use(Button);
Vue.use(ActionSheet);
Vue.use(Scroll);
Vue.use(Slide);
Vue.use(Sticky);
Vue.use(ScrollNav);
// Vue.use(ImagePreview);

import {Range,
  Badge,
  Toast,
  Field
} from 'mint-ui'
Vue.component(Range.name, Range);
Vue.component(Badge.name, Badge);
Vue.component(Field.name, Field);

function ToastErro (notice) {
  if (notice === '') {
    return
  }
  Toast({
    message: notice,
    iconClass: 'glyphicon glyphicon-remove'
  })
}
function ToastSucceed (notice) {
  if (notice === '') {
    notice = '操作成功！'
  }
  Toast({
    message: notice,
    iconClass: 'glyphicon glyphicon-ok'
  })
}
function GetLang (name, def = '') {
  return jglib.getLang(name, def);
}
/**
 * @return {string}
 */
function GetImage (name, userid = 'admin',
                  width = '200',
                  height = '200') {
  return `${constant.SERVER}/Aimandofo/getImage/filename/${name}/userid/${userid}/width/${width}/height/${height}`
}

/**
 * 获取自定义图标
 * @return {string}
 */
function GetUIIcon (name, def = '',
                    width = '100',
                    height = '100') {
  let lname = jglib.getIcon(name);
  if (lname === '') {
    return require(`@/assets/img/${def}`);
  }
  lname = GetImage(lname, 'admin', width, height);
  return lname;
}
// 错误提示
Vue.prototype.$erroNotice = ToastErro;
// 成功提示
Vue.prototype.$succeedNotice = ToastSucceed;
Vue.prototype.$Lang = GetLang;
Vue.prototype.$getImage = GetImage;
Vue.prototype.$UIIcon = GetUIIcon;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
