
const path = require('path')
const chalk = require('chalk')

const _parseUrl = (surl, opt)=> {
  opt = opt || {};
  const Url = require('url');
  //console.log(surl,'asdf');
  const url = Url.parse(surl);
  const ssl = url.protocol === 'https:'
  opt.host = opt.host || opt.hostname || ((ssl || url.protocol === 'http:') ? url.hostname : 'localhost');
  opt.port = opt.port || (url.port || (ssl ? 443 : 80));
  opt.path = opt.path || (url.pathname + (url.search ? url.search : ''));
  opt.method = opt.method || 'GET';
  opt.agent = opt.agent || false;
  return opt;
}
/**
 * 对象枚举元素遍历，若merge为true则进行_.assign(obj, callback)，若为false则回调元素的key value index
 * @param  {Object}   obj      源对象
 * @param  {Function|Object} callback 回调函数|目标对象
 * @param  {Boolean}   merge    是否为对象赋值模式
 * @name map
 * @function
 */
const _map = (obj, callback, merge)=> {
  let index = 0
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (merge) {
        callback[key] = obj[key];
      } else if (callback(key, obj[key], index++)) {
        break;
      }
    }
  }
}

function getDatefmt(fmt) {
  const myDate = new Date()
  const o = {
    'M+': myDate.getMonth() + 1, //月份
    'd+': myDate.getDate(), //日
    'H+': myDate.getHours(), //小时
    'm+': myDate.getMinutes(), //分
    's+': myDate.getSeconds(), //秒
    'q+': Math.floor((myDate.getMonth() + 3) / 3), //季度
    'S': myDate.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (myDate.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

function upServer(command){
  const fs = require('fs')
  const filePath = command.destination
  //console.log(command,'test')
  //const boundaryKey = 'np'+new Date().getTime();
  let options = {
    // hostname: '192.168.0.115',//http://192.168.0.115/aimandofo/upapptoserver
    port: 80,
    path: '/aimandofo/upapptoserver',
    method: 'POST',
    headers: {
      // 'Accept': '*!/!*',
      // 'Accept-Encoding': 'gzip, deflate',
      // 'Connection': 'keep-alive',
      // 'Content-Type': 'multipart/form-data; boundary=----' + boundaryKey,
      // 'Host':'127.0.0.1:5000',
      // 'Origin':'http://127.0.0.1:5000',
      // 'Referer':'http://127.0.0.1:5000/',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'
    }
  }

  let opt = options || {};
  let data = command.data || {};// {param:'testl'};
  const endl = '\r\n';
  const boundary = '-----jg' + Math.random()
  const collect = []
  data.devid = command.devID;
  const crypto = require('crypto');
  data.time = getDatefmt("yyyy-MM-dd HH:mm:ss") ; //  new Date().getTime();
  // console.log(data.time)
  const content = command.devID+command.keyID+data.time;
  data.sgin = crypto.createHash('md5').update(content).digest('hex')
  // console.log(data);
  _map(data, function(key, value) {
    collect.push('--' + boundary + endl);
    collect.push('Content-Disposition: form-data; name="' + key + '"' + endl);
    collect.push(endl);
    collect.push(value + endl);
  });


  collect.push('--' + boundary + endl);
  collect.push('Content-Disposition: form-data; name="' + ("file")
    + '"; filename="' + "test.zip"+ '"'
    + endl
    +'Content-Type: multipart/form-data\r\n\r\n'
  );
  collect.push(endl);

  let length = 0
  collect.forEach(function(ele) {
    if (typeof ele === 'string') {
      length += Buffer.byteLength(ele)
    } else {
      length += ele.length;
    }
  });



  let endSend = endl + '--' + boundary + '--' + endl;

  length = length + fs.statSync(filePath).size
    +Buffer.byteLength(endSend)
  ;
  opt.method = opt.method || 'POST';
  const underscore = require('underscore');
  opt.headers = underscore.extend({
    'Content-Type': 'multipart/form-data; boundary=' + boundary,
    'Content-Length': length
  }, opt.headers || {});
  opt = _parseUrl(command.httpServer, opt);
  const http = opt.protocol === 'https:' ? require('https') : require('http')
  const req = http.request(opt, function (res) {
    const status = res.statusCode
    let body = ''
    res.on('data', function (chunk) {
      body += chunk
    })
      .on('end', function () {
        if (status >= 200 && status < 300 || status === 304) {
          // callback(null, body)
          console.log('上傳成功')
          //console.log(body)
          let rel = null
          try {
            rel = JSON.parse(body);
          } catch (e) {

          }
          if (rel === null) {
            return;
          }
          if (rel.erro) {
            console.log('上傳出錯了',body)
          }

          let debug = rel.data.debug;
          // console.log(debug);
            /*{
            "version":command.version,//板本号
            "uitype" : '1', //类型
            "server" : rel.data.http,
            "site"   : rel.data.filename,    // 地址
            "template" :command.name+"_dev",   // 模板名称
            "id" :0,
            "shopid": command.testshop,
            "debug" : true
          };*/

          const url = JSON.stringify(debug);
          // console.log(url,'qr')
          if (command.qrshow === true ) {
            const qrcode = require('qrcode-terminal');
            qrcode.generate(url,{small:false});
          }


          const qr = require('qr-image')
          const temp_qrcode = qr.image(url, {
            //设置容错率,L(低), M（中，默认）, Q（高）, H（最高）.
            ec_level: 'Q'
          })
          temp_qrcode.pipe(require('fs').createWriteStream('./dist/'+command.name+'.png').on('finish', function() {

            const qpath = path.resolve(__dirname, '../dist/'+command.name+'.png')
           // require('fs').open(qpath);
            console.log(chalk.bgYellow('二維碼已生成'),
              chalk.yellow(qpath))
          }))

        } else {
          console.log(chalk.bgRed("上傳失敗！"))
          // callback(status)
        }
      })
      .on('error', function (err) {
        // callback(err.message || err)
        console.log("上傳失敗！",err.message || err)
      })
  })
  collect.forEach(function(d) {
    req.write(d);
  });


  const fileStream = fs.readFileSync(filePath);
  //console.log(fileStream);
  req.write(fileStream);

  req.write(endSend);

  req.end();

}

module.exports = upServer;
