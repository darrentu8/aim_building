'use strict'

const merge = require('webpack-merge')
const uconfig = require('../authorization')
const debug = require('../src/lib/debug.json')

const FileManagerPlugin = require('./zipup')
const packageConfig = require('../package.json')

const webpackprodConfig = require('./webpack.prod.conf')

const webpackupConfig = merge(webpackprodConfig, {

  plugins: [
    new FileManagerPlugin({
      onEnd: {
        /*mkdir: ['./dist/test'],*/
        /*copy: [
          { source: './dist/'+packageConfig.name+'.zip', destination: path.resolve('F:\\work\\AimanDofo\\Source\\aplet\\salon.zip') }
        ],*/
        delete: [
          // 删除之前已经存在的压缩包
          './dist/' + packageConfig.name + '.zip'
        ],
        archive: [
          {
            source: './dist',
            destination: './dist/' + packageConfig.name + '.zip',
            httpServer: uconfig.upserver,
            name: packageConfig.name,
            data: {
              param: packageConfig.name,
              testshop: debug.testshop,
              version: packageConfig.version,
              ...uconfig.data
            },
            testshop: debug.testshop,
            devID: uconfig.devID,
            keyID: uconfig.keyID,
            version: packageConfig.version,
            qrshow: false
          },
        ]
      }
    })
  ]
})

module.exports = webpackupConfig
