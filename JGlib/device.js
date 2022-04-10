/**
 * 与 webView 交互
 */

import {jgdata} from './Index'

class Device {

  constructor() {
    this.router = null;
  }

  _doSendMessage (type, data = null) {
    if (typeof window.headers === 'undefined') {
      return false
    }
    if (typeof window.headers.msgkey === 'undefined' ||
      window.headers.msgkey === '') {
      return false
    }
    let json = {}
    if (data != null && typeof data === 'object') {
      json = data
    }
    json.type = type
    /*if (typeof window.headers  !== 'undefined' ) {
      json.headers = window.headers;
      if (typeof window.headers.msgkey !== 'undefined' ||
        window.headers.msgkey === '') {
        json.msgkey  = window.headers.msgkey;
      }
    }*/
    json.msgkey  = window.headers.msgkey;
    json.headers = window.headers;
    const param = JSON.stringify(json);
    // console.log(param);
    window.postMessage(param);
    return true;
  }
  // 扫描二维码
  scanQR () {
    this._doSendMessage('scanQR')
  }
  // 关闭 離開
  closeView () {
    this._doSendMessage('closeView')
  }
  // 返回到主页
  index () {
    this._doSendMessage('index')
  }
  // 小程式主頁
  aplethome(data = null){
    if (window.debug) {
      if (data === null) {
        data={path: '/'}
      }
      this.router.push(data)
      return ;
    }
    this._doSendMessage('aplethome')
  }
  apletexit() {
    // 回首頁
    this._doSendMessage('apletexit')
  }
  // 打开相册
  getphoto (json = null) {
    this._doSendMessage('getphoto', json)
  }
  // 打开相机
  cameraPicture (json = null) {
    this._doSendMessage('cameraPicture', json)
  }
  // 先打开相机，没成功再开打照片
  picture (json = null) {
    this._doSendMessage('picture', json)
  }
  console () {//json = null
    let data = [];
    for(let i=0; i<arguments.length; i++){
      data.push(arguments[i])
    }
    //json = {'data': json};
    let json = {'data': data};
    this._doSendMessage('console', json)
    console.log(json);
  }
  // 連聯商家
  openChat (userid = null) {
    if (typeof window.headers.shopid === 'undefined' ||
      window.headers.shopid === '') {
      return
    }
    if (userid === null) {
      userid = window.headers.shopid
    }
    this._doSendMessage('chat',
      {shopid: userid})
  }
  // 付款
  payMoney () {
    if (typeof window.headers.shopid === 'undefined' ||
      window.headers.shopid === '') {
      return
    }
    this._doSendMessage('payMoney',
      {shopid: window.headers.shopid})
  }
  // 儲值
  storedValue () {
    if (typeof window.headers.shopid === 'undefined' ||
      window.headers.shopid === '') {
      return
    }
    this._doSendMessage('storedvalue',
      {shopid: window.headers.shopid})
  }
  // 提交商品
  orderInto (json = null) {
    this._doSendMessage('orderinto', json)
  }
  // 打開頁面
  openPage (type = '', title = '', data = null) {
    const json = {
      data: {
        title: title,
        type: type,
        data: data !== null ? data : {}
      }
    }
    this._doSendMessage('openpage', json)
  }
  // 刷新數據
  refresh () {
    if (typeof window.headers.shopid === 'undefined' ||
      window.headers.shopid === '') {
      return
    }
    this._doSendMessage('refresh',
      {shopid: window.headers.shopid})
  }
  // 收藏
  collect (isCollect = false) {
    let json = {};
    json.type = 'collectShop';
    json.isCollect = isCollect;
    this._doSendMessage('collectShop', json)
  }
  // 商品提交
  goodsPost (params = null) {
    let json = {};
    if (typeof window.headers.shopid === 'undefined' ||
        window.headers.shopid === '') {
      return
    }
    // 参数不为空时 直接提交
    if (params !== null && typeof params !== 'undefined') {
      this._doSendMessage('goodsPost', params);
      return;
    }
    const {selected, lens} = jgdata.getCartList();
    if (typeof selected === 'undefined' || selected === null) {
      return;
    }

    json['shopid'] = window.headers.shopid; // 商家
    json['puid'] = window.headers.shopid;
    json['selected'] = selected;
    json['lens'] = lens;
    this._doSendMessage('goodsPost', json);
  }
  // 狀態欄樣子
  sysWindowStyle (json = null) {
    this._doSendMessage('syswindowstyle', json)
  }
  // 导航
  navigation(route,param) {
    if (typeof window.isnavigation !== 'undefined' && window.isnavigation) {
      return true;
    }
    let params = '';
    if (typeof param === 'object') {
      for (let key in param) {
        if (params !== '') {
          params += '&'
        }
        params += key +'=' +param[key];
      }
    }
    const url = window.location.href;
    if (url.indexOf(route) > -1) {
      return false;
    }
    let json = {};
    json.url = window.headers.baseUri+'#/' + route+'?'+params;
    // json.url = url + route+'?'+params;
    json.url = encodeURI(json.url);
    if (window.debug) {
      window.location.href = json.url;
      return true;
    }
    window.isnavigation = true;
    this._doSendMessage('navigation', json);
    const timeID = setTimeout(()=>{
      window.isnavigation = null;
      timeID && clearTimeout(timeID);
    },3000);
    return true;
  }
  // 离开页面
  goback(){
    this.closeView()
  }
  routerPush (route,param) {
    return this.navigation(route,param);
  }
  _addPageList(name) {
    let bol = false;
    for (let i = 0; i<window.PageList.length ; i++) {
      if (window.PageList[i] === name) {
        bol = true;
        break;
      }
    }
    if (!bol) {
      window.PageList.push(name);
    }
  }
  setwindowHeader(to){
    let bol = typeof window.headers !== 'undefined' && window.headers !== null;
    if (bol) {
      if (window.debug === false)
         return bol;
    }
    if (typeof to.query.header !== 'undefined') {
      try {
        let headers = JSON.parse(to.query.header);
        window.headers = headers;
        window.debug = false;
        if (typeof window.headers.debug !== 'undefined') {
          window.debug = window.headers.debug;
          if (window.debug === true &&
             typeof window.jglib !== undefined &&
             typeof window.jglib.debug !== 'undefined') {
            window.jglib.debug.debugData(); // 刷新數據
          }
        }
        return true;
      } catch (e) {
      }
    }
    return bol;
  }
  // 監聽路由
  setRouter(router) {
    this.router = router;
    window.PageList = [];
    router.beforeEach(async (to, from, next) => {
      let pageCount = 0;
      if (this.setwindowHeader(to) === true) {
        pageCount = typeof window.headers.pageCount !== 'undefined' ? window.headers.pageCount : 0;
      }
      if (pageCount < 1) {
        // 打開的頁數大於3了
        this._addPageList(to.name);
        next();
        return true;
      }

      if (from.name === null) {
        this._addPageList(to.name);
        next();
        return true;
      }
      if (typeof window.debug === 'undefined' || window.debug === true) {
        this._addPageList(to.name);
        next();
        return true
      } else if (to.name === 'Index' && from.name !== null) {
        this.goback();
        next(false);
        return false
      } else {
        if (this.navigation(to.name, to.query) === false) {
        }
        next(false);
        window.Nav = from.name;
        window.TNav = from.name;
        return false
      }
    })
  }
  // 返回頁面
  backPage () {
    window.PageList.splice( window.PageList.length-1 , 1);
    if (window.PageList.length < 1 && !window.debug) {
      this.goback();
      return ;
    }
    if (this.router === null) {
      return ;
    }
    if (window.history.length <= 1) {
      this.router.push({path: '/'}).catch()
      return false
    } else {
      this.router.go(-1)
    }
  }
}

const device = new Device()

window.device = device;

export default device
