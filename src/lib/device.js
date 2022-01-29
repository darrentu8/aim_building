import {jgdata} from './Index'

/**
 * 与 webView 交互
 */

class Device {
  _doSendMessage (type, data = null) {
    if (typeof window.headers === 'undefined') {
      return
    }
    if (typeof window.headers.msgkey === 'undefined' ||
      window.headers.msgkey === '') {
      // console.log('dfdfsdf return',window.headers)
      return
    }
    let json = {}
    if (data != null && typeof data === 'object') {
      json = data
    }
    json.type = type
    json.msgkey = window.headers.msgkey;
    const param = JSON.stringify(json);
    // console.log(param);
    window.postMessage(param)
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
  console (json = null) {
    json = {'data': json};
    this._doSendMessage('console', json)
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
  goodsPost () {
    let json = {};
    if (typeof window.headers.shopid === 'undefined' ||
        window.headers.shopid === '') {
      return
    }
    const {selected, lens} = jgdata.getCartList();
    if (typeof selected === 'undefined' || selected === null) {
      return
    }

    json['shopid'] = window.headers.shopid // 商家
    json['puid'] = window.headers.shopid
    json['selected'] = selected
    json['lens'] = lens
    this._doSendMessage('goodsPost', json)
  }
  // 狀態欄樣子
  sysWindowStyle (json = null) {
    this._doSendMessage('syswindowstyle', json)
  }
}

const device = new Device()

export default device
