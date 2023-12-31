/**
 * electron 配置文件
 */

const path = require('path')
const packageJson = require('../../package.json')

module.exports = {
  prodLoadFile: path.join(__dirname, '../../', 'dist', 'index.html'),
  devLoadURL: 'http://localhost:9876',
  appIcon: path.join(__dirname, '../', 'assets', 'icon', 'icon.png'),
  icon: {
    win: path.join(__dirname, '../', 'assets', 'icon', 'icon.ico'),
    mac: path.join(__dirname, '../', 'assets', 'icon', 'icon.icns'),
    linux: path.join(__dirname, '../', 'assets', 'icon', 'icon.png'),
    iconNoExt: path.join(__dirname, '../', 'assets', 'icon', 'icon'),
    squirrel: 'http://admin.rocyuan.top/favicon.ico',
  },
  loadingGif: path.join(__dirname, '../', 'assets', 'install.gif'),
  app: {
    name: packageJson.name,
    version: packageJson.version,
    bundleId: 'top.rocyuan.codeGeneratorVAR',
    copyright: 'Copyright (C) 2023 RocYuan',
  },
}
