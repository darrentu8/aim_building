/**
 * uiLang
 */

import {saveLocalJsonData, mergeJson} from './function'
import constant from './constant';
import debug from './debug';

export default class uiLang {
  constructor () {
    this.lang = null;
    this.shopData = null;
  }
  setLangData(data) {
    this.shopData = data;
  }
  // 初始語言配置
  _initLang () {
    let flang = {};
    try {
      const files = require.context('@/lang', true, /\.json$/);
      // key是相对路径名
      files.keys().forEach(key => {
        const keyArr = key.split('/')
        keyArr.shift() // 移除.
        flang[keyArr.join('.').replace(/\.json$/g, '')] = files(key)
      })
    } catch (e) {
    }
    let langType = 'zh-tw';
    if (typeof window.headers !== 'undefined' &&
      typeof window.headers.lang !== 'undefined' &&
      window.headers.lang === '') {
      langType = window.headers.lang;
    }
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
      if (uiparam === null) {
        return;
      }
      uiparam = JSON.parse(uiparam);
      // 图标
      if (typeof uiparam.icon !== 'undefined') {
        this.icon = uiparam.icon;
      }
      // 狀態樣子
      if (typeof uiparam.window !== 'undefined') {
        this.window = uiparam.window;
      }
      if (typeof uiparam === 'undefined' ||
        typeof uiparam['lang'] === 'undefined' ||
        typeof uiparam['lang'][langType] === 'undefined') {
        return
      }
      uiparam = uiparam['lang'][langType];
      if (uiparam === null) {
        return;
      }
      this.lang = mergeJson(this.lang, uiparam);
    } catch (e) {
    }
  }
  // 獲取語言
  getLang (name, def = '') {
    if (this.icon === null || typeof this.icon === 'undefined') {
      this._initLang();
    }
    if (this.lang === null) {
      return def
    }
    if (typeof this.lang[name] === 'undefined') {
      return def
    }
    return this.lang[name] === '' ? def : this.lang[name];
  }
  getIcon (name, def = '') {
    if (this.icon === null || typeof this.icon === 'undefined') {
      this._initLang();
      if (this.icon === null) {
        return def
      }
    }
    if (typeof this.icon === 'undefined') {
      return def
    }
    if (typeof this.icon[name] === 'undefined') {
      return def
    }
    return this.icon[name] === '' ? def : this.icon[name];
  }
}
