/**
 * jg庫
 */

import {saveLocalJsonData, getDatefmt, mergeJson} from './function'
import constant from './constant';
import {postData} from './netFetch';

class JGLib {
  constructor () {
    this.shopData = null;
    this.onMessage = [];
    this.lang = null;
    document.addEventListener('message', this.ListenerMessage.bind(this))
    // alert
    window.alert = this.overAlert;
    document.body.onselectstart = function () { return false; };
    try {
      // const Config = require('./debug.json');
      const Config = require('@/lib/debug.json');
      // console.log(Config,'debug')
      if (Config.debug) {
        this.testHeaders(Config); // debug
      }
    } catch (e) {
    }
  }
  overAlert (txt, fun) {
    let shield = document.createElement('DIV');
    shield.id = 'shield';
    shield.style.position = 'absolute';
    shield.style.left = '0px';
    shield.style.top = '0px';
    shield.style.width = '100%';
    shield.style.height = '100%';
    shield.style.background = '#333';
    shield.style.textAlign = 'center';
    shield.style.zIndex = '19901000';
    shield.style.filter = 'alpha(opacity=.5)';
    shield.style.opacity = '.5';
    let alertFram = document.createElement('DIV');
    alertFram.id = 'alertFram';
    alertFram.style.position = 'absolute';
    alertFram.style.left = '10%';
    alertFram.style.top = '35%';
    alertFram.style.width = '80%';
    alertFram.style.background = '#fff'; // "#ccc";
    alertFram.style.overflow = 'hidden';
    alertFram.style.textAlign = 'center';
    alertFram.style.borderRadius = '5px';
    alertFram.style.zIndex = '19901024';
    window.tFun = fun;
    // console.log(window.tFun, 'asdfasdf')
    let strHtml = '<ul style="list-style:none;margin:0px;' +
      'padding:0px;background:#FFFFFF;width:100%">\n';
    strHtml += ' <li style="background:#FFFFFF;font-size:15px;' +
      'text-align:left;height:30px;margin:10px;padding:10px' +
      'line-height:30px;' +
      'border-bottom: 1px solid #EBEBEB;">' +
      '提 示</li>\n';
    strHtml += ' <li style="padding:10px;background:#fff;' +
      'text-align:left;font-size:18px;margin-left:30px' +
      'border-bottom: 1px solid #EBEBEB;">' + txt + '</li>\n';
    strHtml += ' <li style="background:#FFFFFF;' +
      'text-align:right;font-size:14px;height:45px;' +
      'line-height:45px;">' +
      '<span onclick="{' +
      '        document.body.removeChild(alertFram);\n' +
      '        document.body.removeChild(shield);\n' +
      '        if (tFun) {\n' +
      '          tFun();\n' +
      '        }}" ' +
      'style="width: 50%;cursor: pointer;' +
      'background:#6776ff;color: #fff;' +
      'margin-right: 40px;margin:20px;padding: 5px">確 定</span></li>\n';
    strHtml += '</ul>\n';
    alertFram.innerHTML = strHtml;
    document.body.appendChild(alertFram);
    document.body.appendChild(shield);

    alertFram.focus();
  }
  // debug
  testHeaders (Config) {
    window.headers = {
      PixelRatio: '2.5',
      'app-type': 'RNAPP',
      appName: 'aimandofor',
      appParam: 'aimandofor',
      bufferData: 'uuu_bufferData190803',
      debug: false,
      height: '816',
     // msgkey: '4fnsnidj90a8k0bu15v7r6dk14',
    //  msgkey: 'l3gkahj9aea32hvjmrv91prqm2',
      msgkey: '4kf62se5sbu7b04jevlnhf56n5',
      'os-type': 'android',
      shopid: Config.testshop, // 'uuu',
      template: 'profession',
     // userid: Config.testshop,
      verApp: '1.0.86',
      width: '432',
      lang: 'zh-tw'
    }
    window.headers.shopid = Config.testshop;
    let url = constant.SERVER + '/aimandofo/shopData/shopid/' + Config.testshop
    // console.log(url);
    postData(url, null).then((data) => {
      if (data) {
        this.shopData = data.data;
        saveLocalJsonData(constant.SHOPDATA, data.data)
        // console.log(data.data)
        this.lang = null;
        this.sendMessage({type: 'init'})
        // this._initLang();
      }
    })
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
    })
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
  // 轉化給 用戶
  sendMessage (data) {
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
    /* this.onMessage.map((item) => {
      if (item.name === '' || item.name === data.type) {
        item.onMessage(data)
      }
    }) */
  }
  // 接收信息
  ListenerMessage (msg) {
    // device.console(msg)
    let data = null;
    try {
      data = JSON.parse(msg.data)
    } catch (e) {
      // alert("erro")
    }
    if (data === null) {
      return false;
    }
    switch (data.type) {
      case 'initData': {
        // device.console(data)
        // alert('asdf');
          // 初始值
        window.headers = data.headers;
        this.shopData = data.data;
        saveLocalJsonData(constant.SHOPDATA, data.data)
        this.lang = null;
        this.sendMessage({type: 'init'})
        break;
      }
      default :
        this.sendMessage(data)
        break;
    }
  }
  // 初始語言配置
  _initLang () {
    let flang = {};
    try {
      // this.lang = require('@/lang/lang.json');
      const files = require.context('@/lang', true, /\.json$/);
      // key是相对路径名
      files.keys().forEach(key => {
        const keyArr = key.split('/')
        keyArr.shift() // 移除.
        flang[keyArr.join('.').replace(/\.json$/g, '')] = files(key)
      })
    } catch (e) {
      // console.log(e)
    }
    // console.log(flang)
    let langType = 'zh-tw';
    if (typeof window.headers !== 'undefined' &&
      typeof window.headers.lang !== 'undefined' &&
      window.headers.lang === '') {
      langType = window.headers.lang;
    }
    // alert(langType)
    // 服務器定義語言
    if (typeof flang[langType] !== 'undefined') {
      this.lang = flang[langType]
    } else {
      const alang = ['zh-tw', 'zh-cn', 'en'];
      for (let i = 0; i < alang.length; i++) {
        if (typeof flang[alang[i]] !== 'undefined') {
          langType = alang[i];
          this.lang = flang[langType];
          break;
        }
      }
    }

    if (this.shopData === null) {
      return;
    }
    const data = this.shopData;
    if (typeof data === 'undefined' ||
      typeof data.funstordata === 'undefined' ||
      typeof data.funstordata.json_uiparam === 'undefined') {
      return
    }
    let uiparam = {};
    uiparam = data.funstordata.json_uiparam;
    try {
      uiparam = JSON.parse(uiparam);
      // console.log(uiparam, 'lang');
      if (typeof uiparam === 'undefined' ||
        typeof uiparam['lang'] === 'undefined' ||
        typeof uiparam['lang'][langType] === 'undefined') {
        return
      }
      uiparam = uiparam['lang'][langType];
      if (uiparam === null) {
        return;
      }
      // console.log(uiparam, 'ddd')
      this.lang = mergeJson(this.lang, uiparam);
    } catch (e) {

    }
    // console.log(this.lang)
  }
  // 獲取語言
  getLang (name, def = '') {
    if (this.lang === null) {
      this._initLang();
    }
    if (this.lang === null) {
      return def
    }
    //  console.log(this.lang,'ddddd',name)
    if (typeof this.lang[name] === 'undefined') {
      return def
    }

    return this.lang[name] === '' ? def : this.lang[name];
  }
}

function getJGLib () {
  let lib = window.jglib;
  if (!lib) {
    // console.log('new jglib')
    lib = new JGLib();
  }
  window.jglib = lib;
  return lib;
}

const jglib = getJGLib();// new JGLib()

export default jglib
