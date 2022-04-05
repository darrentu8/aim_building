/**
 * jg庫
 */

import {saveLocalJsonData, getDatefmt} from './function'
import constant from './constant';
import debug from './debug';
import uiLang from './uiLang'

class JGLib {
  constructor () {
    // this.shopData = null;
    this.onMessage = [];
    this.lang = null;
    this.window = null;
    this.uiLang = new uiLang();
    this.getLang = this.uiLang.getLang.bind(this.uiLang);
    this.getIcon = this.uiLang.getIcon.bind(this.uiLang);
    document.addEventListener('message', this.ListenerMessage.bind(this))
    this.debug = new debug(this);
  }
  // 設置信息
  setOnMessage (onMessage, name = '') {
    const crypto = require('crypto');
    const content = getDatefmt('yyyy-MM-dd HH:mm:ss')
    const id = name + crypto.createHash('md5').update(content).digest('hex')
    this.onMessage.push({
      name: name,
      onMessage: onMessage,
      id: id
    });
    return id;
  }
  // 刪除 onMessage對列
  unOnMessage (id) {
    for (let i = 0; i < this.onMessage.length; i++) {
      if (this.onMessage[i].id === id) {
        this.onMessage.splice(i, 1);
        return true
      }
    }
    return false;
  }
  setData(data,headers=null){
    if (headers !== null) {
      window.headers = headers;
      window.debug = false; // 不是调试模式
      if (typeof window.headers.debug !== 'undefined') {
        window.debug = window.headers.debug;
      }
    }
    saveLocalJsonData(constant.SHOPDATA, data)
    this.uiLang.setLangData(data);
    this.sendMessage({type: 'init'})
  }
  // 轉化給 用戶
  sendMessage (data) {
    if (typeof data === 'undefined' || typeof data.type === 'undefined') {
      return ;
    }
    let i = this.onMessage.length - 1;
    while (i > -1) {
      const item = this.onMessage[i];
      if (typeof item !== 'undefined') {
        if (item.name === '' || item.name === data.type) {
          item.onMessage(data);
          return;
        }
      }
      i--;
    }
  }
  // 接收信息
  ListenerMessage (msg) {
    let data = null;
    try {
      data = JSON.parse(msg.data)
    } catch (e) {
    }
    if (data === null) {
      return false;
    }

    switch (data.type) {
      case 'apletexit':{
        // aplet 離開頁面
        this.sendMessage({type: 'init'})
        window.Nav = null;
        break;
      }
      case 'initData': {
        // 初始值
        this.setData(data.data,data.headers)
        break;
      }
      default :
        this.sendMessage(data)
        break;
    }
  }
  getWindow () {
    return this.window;
  }
}

function getJGLib () {
  let lib = window.jglib;
  if (!lib) {
    lib = new JGLib();
  }
  window.jglib = lib;
  return lib;
}

const jglib = getJGLib();// new JGLib()

export default jglib
