/**
 * jg庫
 */

import {getLocalJsonData, saveLocalJsonData} from './function'
import constant from './constant';
import {postData} from './netFetch'
// import device from './device'
import net from './net'

// eslint-disable-next-line no-unused-vars
class JGData {
  constructor () {
    this.shopData = null;
  }
  // 獲取數據
  getShopData () {
    if (typeof window.headers === 'undefined' ||
      typeof window.headers.shopid === 'undefined' ||
      window.headers.shopid === '') {
      this.shopData = null;
      return null;
    }
    /* if (this.shopData !== null) {
      return this.shopData;
    } */
    try {
      this.shopData = getLocalJsonData(constant.SHOPDATA);
     // this.shopData = JSON.parse(data)
    } catch (e) {
    }
    return this.shopData;
  }
  // aiman 信息
  getShopInfo () {
    this.getShopData();
    if (this.shopData === null) {
      return {}
    }
    return {
      shopid: this.shopData.shopid,
      shopName: this.shopData.shopName,
      logo: this.shopData.logo,
      address: this.shopData.address,
      describ: this.shopData.describ,
      shopTime: this.shopData.shopTime,
      bgImage: this.shopData.bgImage,
      browseImage: this.shopData.browseImage,
      city: this.shopData.chr_city,
      isCollect: this.shopData.isCollect,
      phone: this.shopData.phone
    };
  }
  // 商品
  getGoods (callBack = null) {
    this.getShopData();
    if (this.shopData === null) {
      return {}
    }
    let rel = {
      goods: this.shopData.goods,
      goodsType: this.shopData.menutypeData
    };
    if (callBack) {
      callBack(rel);
      return true;
    }
    return rel;
  }
  // 功能
  getFunList () {
    this.shopData = null;
    this.getShopData();
    if (this.shopData === null) {
      return {}
    }
    return this.shopData.itemFun;
  }
  // blogs
  getBlogs (callBack = null) {
    this.getShopData();
    if (this.shopData === null) {
      return {}
    }
    if (callBack !== null) {
      return callBack(this.shopData.blog)
    }
    return this.shopData.blog
  }
  // work
  getWorkInfo () {
    this.getShopData();
    if (this.shopData === null) {
      return {}
    }
    // console.log('asdfasd', this.shopData.workinfo)
    return this.shopData.workinfo
  }
  // 購物車
  getCartList () {
    const cartData = getLocalJsonData(constant.CARTDATA);
    if (cartData !== null) {
      return cartData;
    }
    return {
      selected: [],
      lens: {maxPrice: 0, length: 0}
    }
  }
  // 清空購物車
  clearCart () {
    saveLocalJsonData(constant.CARTDATA, null)
  }
  // 获取共享照片
  async getsharePicture () {}
  // 获取数据
  async getDataServer (url, paramData = null) {
    let data = await this.saveDataServer(url, paramData);
    return data;
  }
  // 保存數據
  async saveDataServer (url, paramData = null) {
    if (!window.debug) {
      let data = await net(url, paramData).catch();
      return data;
    }
    if (typeof window.headers === 'undefined' ||
      typeof window.headers.shopid === 'undefined' ||
      window.headers.shopid === '') {
      return null;
    }
    let params = null;
    if (paramData !== null) {
      params = new URLSearchParams();
      for (let k in paramData) {
        params.append(k, paramData[k]);
      }
    }
    let data = await postData(url, params).catch();
    if (typeof data === 'undefined' || data === null) {
      return null;
    }
    if (typeof data.data.data === 'undefined') {
      if (typeof data.data !== 'undefined') {
        return data.data;
      }
    }
    return data.data.data;
  }
  // 获取头部参数
  getUserHeader(shopid) {
    let data = getLocalJsonData(constant.HEADERDATA,shopid);
    // console.log(data)
    window.device.console(data)
    if (data === null) {
      return ;
    }
    data.shopid = shopid;
    window.headers = data;
  }
}

const jgData = new JGData()

export default jgData
