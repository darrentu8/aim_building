/**
 * 图档设置参数处理
 */

// 获取设定值
export function getSettingParam (setting, param, paramID = '') {
  if (typeof setting === 'undefined') {
    return null;
  }
  const data = setting[param]
  if (typeof data === 'undefined') {
    return null;
  }
  if (paramID === '') {
    return data;
  }
  let rItem = null;
  data.map((item) => {
    if (item.id === paramID) {
      rItem = item
    }
  })

  return rItem;
}
// 获取设定项名称
export function getSettingItemName (setting, param, paramID, defName = '') {
  const data = getSettingParam(setting, param, paramID);
  if (data === null) {
    return defName;
  }
  return data.name;
}
// 拍照設置參數 200618
export function getSettingPicParam (setting, param, paramid, Index = -1) {
  let width = 800
  let height = 800
  let imgCofig = {
    width: width,
    height: height,
    compressImageMaxWidth: width,
    compressImageMaxHeight: height,
    settingID: 0,
    settingParam: '',
    settingParamID: '',
    pictureInfo: '' // 打開操作提示
  }
  const data = getSettingParam(setting, param);
  // console.log(data,'main');
  if (data === null) {
    return imgCofig;
  }

  imgCofig.settingID = setting.id
  imgCofig.settingParam = param
  imgCofig.uptime = typeof setting.uptime === 'undefined' ? '' : setting.uptime
  data.map((item) => {
    if (item.id === paramid) {
      imgCofig.width = parseInt(item.width)
      imgCofig.height = parseInt(item.height)
      imgCofig.settingParamID = item.id
      // 是否提示
      imgCofig.pictureInfo = typeof item.content === 'undefined' ? '' : item.content

      if (Index > -1 && typeof item.images !== 'undefined') {
        // 商品的再设置 大小
        if (item.images.length > Index) {
          if (typeof item.images[Index].w !== 'undefined') {
            imgCofig.width = parseInt(item.images[Index].w)
          }
          if (typeof item.images[Index].w !== 'undefined') {
            imgCofig.height = parseInt(item.images[Index].h)
          }
        }
      }
    }
  })
  return imgCofig;
}
