/**
 * 公共function
 * @param index
 * @returns {string|*}
 */
// 星期
export function getChineseWeek (index) {
  switch (index) {
    case 0:
      return '一'
    case 1:
      return '二'
    case 2:
      return '三'
    case 3:
      return '四'
    case 4:
      return '五'
    case 5:
      return '六'
    case 6:
      return '日'
    default:
      return index
  }
}

// 保存本地數據
export function saveLocalData (name = '', data = '') {
  if (typeof window.headers === 'undefined' ||
    typeof window.headers.shopid === 'undefined' ||
    window.headers.shopid === '') {
    return false;
  }
  name = name + '_' + window.headers.shopid;
  localStorage.setItem(name, data);
  return true;
}

// 獲取本地數據
export function getLocalData (name) {
  if (typeof window.headers === 'undefined' ||
    typeof window.headers.shopid === 'undefined' ||
    window.headers.shopid === '') {
    return null;
  }
  name = name + '_' + window.headers.shopid;
  return localStorage.getItem(name);
}

export function saveLocalJsonData (name, data) {
  return saveLocalData(name, JSON.stringify(data))
}

export function getLocalJsonData (name) {
  const data = getLocalData(name)
  return JSON.parse(data);
}
// 時間格式化
export function getDatefmt (fmt, sdate = null) {
  let myDate = new Date();
  if (sdate !== null) {
    myDate = new Date(sdate);
  }
  const o = {
    'M+': myDate.getMonth() + 1, // 月份
    'd+': myDate.getDate(), // 日
    'H+': myDate.getHours(), // 小时
    'm+': myDate.getMinutes(), // 分
    's+': myDate.getSeconds(), // 秒
    'q+': Math.floor((myDate.getMonth() + 3) / 3), // 季度
    'S': myDate.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (myDate.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (let k in o) { if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))); }
  return fmt;
}

// json格式化
export function formatJSON (txt, compress, isJson = true) {
  const indentChar = '    ';
  let data = null;
  if (isJson === false) {
    if (/^\s*$/.test(txt)) {
      // console.log('数据为空,无法格式化! ');
      return ''
    }

    try {
      // eslint-disable-next-line no-eval
      data = eval('(' + txt + ')')
    } catch (e) {
      // console.log('数据源语法错误,格式化失败! 错误信息: ' + e.description, 'err');
      return ''
    }
  } else {
    data = txt;
  }
  let draw = [];
  // eslint-disable-next-line no-unused-vars
  let last = false;
  // eslint-disable-next-line no-unused-vars
  let This = this;
  let line = compress ? '' : '\n';
  // eslint-disable-next-line no-unused-vars
  let nodeCount = 0;
  // eslint-disable-next-line no-unused-vars
  let maxDepth = 0;

  let notify = function (name, value, isLast, indent, formObj) {
    let i
    nodeCount++ /* 节点计数 */
    let tab = ''
    for (i = 0, tab = ''; i < indent; i++) {
      tab += indentChar
    } /* 缩进HTML */
    tab = compress ? '' : tab /* 压缩模式忽略缩进 */
    maxDepth = ++indent /* 缩进递增并记录 */
    if (value && value.constructor === Array) {
      /* 处理数组 */
      draw.push(
        tab + (formObj ? '"' + name + '":' : '') + '[' + line
      ) /* 缩进'[' 然后换行 */
      for (i = 0; i < value.length; i++) {
        notify(i, value[i], i === value.length - 1, indent, false)
      }
      draw.push(
        tab + ']' + (isLast ? line : ',' + line)
      ) /* 缩进']'换行,若非尾元素则添加逗号 */
    } else if (value && typeof value === 'object') {
      let key
      /* 处理对象 */
      draw.push(
        tab + (formObj ? '"' + name + '":' : '') + '{' + line
      ) /* 缩进'{' 然后换行 */
      let len = 0
      i = 0
      for (key in value) {
        len++
      }
      for (key in value) {
        notify(key, value[key], ++i === len, indent, true)
      }
      draw.push(
        tab + '}' + (isLast ? line : ',' + line)
      ) /* 缩进'}'换行,若非尾元素则添加逗号 */
    } else {
      if (typeof value === 'string') value = '"' + value + '"'
      draw.push(
        tab +
        (formObj ? '"' + name + '":' : '') +
        value +
        (isLast ? '' : ',') +
        line
      )
    }
  }
  // let isLast = true, indent = 0
  // notify('', data, isLast, indent, false)
  notify('', data, true, 0, false)
  return draw.join('')
}
// 合並 json
export function mergeJson (target) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i];
    for (let prop in source) {
      if (source.hasOwnProperty(prop)) {
        let value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }
  return target;
}
