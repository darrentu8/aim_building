# salon 范例

## Build Setup

``` bash
# 安裝依赖包
npm install

# 運行開發調試 localhost:8080
  npm run start

# 打包編譯不上傳
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# 打包上傳到服務器
npm run bulid-upload

```

##配置說明
```
原來配置 str/config.json 廢废弃

現使用分成兩個文件
  src/authorization.json

  {
    "devID": "xxxx",
    "keyID": "xxxx",
    "upserver": "http://aimandofor.abc1235.pw",
    "data": {
      "sendid": "註冊的手機號，增加推送功能"
    }
  }

  str/lib/debug.json

  {
    "debug": false ,
    "testshop": "Hait666"
  }
```
###頁面配置
```
1、全局配置
   路徑src/static/app.json
2、頁面配置
路徑:放在各頁面下， 命名規則： 路由名+.json
{
	"window": {
        "barStyle": "dark",  // 手機狀態欄樣子 light 、dark 、default
        "navigationBarBackgroundColor": "rgba(0,0,0,0.3)",// head 背景色
        "navigationBarTitleText": "部落格", // head 標題
         "navigationBarTextStyle": "white", // head 標題 字體顏色
        "barVisible":true  // 是否使用內定的 head  true 為使用 flase 或沒定義則不使用
    }
}
```
### 多語言標簽定義
```
在src/lang目錄裏增加 語言庫 en.json 、zh-tw.json、zh-cn.json
1、zh-tw.json格式如下,其他庫也格式也一樣：
{
  "index-topskyheader-cart": "購物車",
  "index-topskyheader-collect":"收藏",
  "index-topskyheader-record":"發型記錄",
  "index-topskyheader-week":"星期"
}
2、如何使用
{{$Lang('index-topskyheader-cart','購物車')}}

```
###修改記錄
```
  調整代碼
  修改lib庫
  頁面配置
  增加多語言庫
```
