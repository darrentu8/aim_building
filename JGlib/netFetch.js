// 网络读取数据

import axios from 'axios'

const timeOut = 20000 // 读取超时时间

export function postFetch (url, params) {
  let header = window.headers;// axiosHeader
  let headers = null
  if (typeof (header) === 'undefined') {
    headers = {}
  } else {
    headers = {headers: header}
  }
  headers = {}
  if (params === null) {
    params = new URLSearchParams();
  }
  if (typeof (header) !== 'undefined') {
    if (typeof window.headers.token !== 'undefined') {
      params.append('token', window.headers.token);
    } else {
      params.append('token', window.headers.msgkey);
    }
    if (typeof header.userid !== 'undefined') {
      params.append('userid', header.userid);
    }
    if (typeof header.shopid !== 'undefined') {
      params.append('shopid', header.shopid);
    }
  }

  return axios.post(url, params, headers) // {headers: header}
}

export async function postData (url, params=null, ms = timeOut) {
  return new Promise(function (resolve, reject) {
    // eslint-disable-next-line prefer-promise-reject-errors
    const timeID = setTimeout(function () { reject(null) }, ms)
    postFetch(url, params).then((json) => { 
      timeID && clearTimeout(timeID)
      json = json.data
      if (json.erro) {
        resolve(null)
        return
      }
      if (json.data.code === '-1') {
        // 登入處理
        let json = {}
        json.type = 'login'
        json.msgkey = window.headers.msgkey;
        const param = JSON.stringify(json);
        // console.log(param);
        window.postMessage(param)
      }
      resolve(json)
    })
      .catch((error) => {
        console.log('error===', error, url)
        // eslint-disable-next-line prefer-promise-reject-errors
        resolve(null)
      })
  })
}
