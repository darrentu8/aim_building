// 网络读取数据

import device from './device';
import jglib from './JGLib';

const timeOut = 40000 // 读取超时时间

export default function netRequest(url, param=null, ms = timeOut) {
  let params = {};
  if (param !== null) {
    for (let k in param) {
      params[k] = param[k];
    }
  }
  return new Promise(function (resolve, reject) {
    const timeID = setTimeout(function () { reject(null) }, ms);
    const msgID = jglib.setOnMessage((msg)=>{
      jglib.unOnMessage(msgID);
      timeID && clearTimeout(timeID);
      resolve(msg.data);
    },'getdata');
    let mjson = {};
    mjson.url = url;
    mjson.param = params;
    device._doSendMessage('getdata',mjson);
  })
};
