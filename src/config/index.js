/**
 * electron 配置文件
 */

const path = require('path')
const packageJson = require('../../package.json')

module.exports = {
  devLoad: 'http://localhost:9674',
  prodLoad: path.join(__dirname, '../../web/index.html'),
  appIcon: path.join(__dirname, '../assets/icon/icon.png'),
  buildIcon: {
    win: path.join(__dirname, '../assets/icon/icon.ico'),
    mac: path.join(__dirname, '../assets/icon/icon.icns'),
    linux: path.join(__dirname, '../assets/icon/icon.png'),
    iconNoExt: path.join(__dirname, '../assets/icon/icon'),
    squirrel: 'https://rocyuan666.gitee.io/favicon.ico',
  },
  // squirrel打包loading动画
  loadingGif: path.join(__dirname, '../assets/install.gif'),
  app: {
    name: packageJson.name,
    version: packageJson.version,
    bundleId: 'top.rocyuan.codegeneratorvar',
    copyright: 'Copyright (C) 2023 RocYuan',
  },
}
