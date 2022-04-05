/**
  debug
 */
import constant from './constant';
import {postData} from './netFetch';

export default class debug {
  constructor (lib) {
    this.jglib = lib;
    window.alert = this.overAlert;
    document.body.onselectstart = function () { return false; };
    try {
      // const Config = require('./debug.json');
      this.Config = require('@/lib/debug.json');
      if (typeof this.Config === 'undefined' || typeof this.Config.debug === 'undefined' ) {
        return;
      }
      window.debug = this.Config.debug;
      if (this.Config.debug) {
        this.debugData(); //Config debug
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
  getHeaders(){
    const token = typeof this.Config.token !== 'undefined' ? this.Config.token: "";
    const testshop = typeof this.Config.testshop !== 'undefined' ? this.Config.testshop: "";

    window.headers = {
      PixelRatio: '2.5',
      'app-type': 'RNAPP',
      appName: 'aimandofor',
      appParam: 'aimandofor',
      bufferData: 'uuu_bufferData190803',
      debug: false,
      height: '816',
      msgkey: '4kf62se5sbu7b04jevlnhf56n5',
      token: token, //  'q90okh412lv0b4p01o3pp4ghr6',
      'os-type': 'android',
      shopid: testshop, // 'uuu',
      template: 'salon',
      // userid: Config.testshop,
      verApp: 'test 1.0.86',
      width: '432',
      lang: 'zh-tw'
    };
  }
  // debug
  debugData () {
    const Config = this.Config;
    this.getHeaders();
    window.headers.shopid = Config.testshop;
    let url = `${constant.SERVER}/aimandofo/shopData/shopid/${Config.testshop}`;
    postData(url).then((data) => {
      // console.log(data)
      if (data) {
        this.jglib.setData(data.data);
      }
    })
  }
}
