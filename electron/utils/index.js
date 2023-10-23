const path = require('path')
const fs = require('fs-extra')
const { app } = require('electron')
const cfg = require('../config')
const { snakeFormatHump } = require('./template')

const appDataDir = path.resolve(app.getPath('appData'), cfg.app.name)
const appEjsDataDir = path.resolve(appDataDir, 'ejs')

/**
 * 初始化Ejs模板
 */
function initEjsTemplate() {
  try {
    fs.mkdirpSync(appEjsDataDir)
    const ejsFileNames = fs.readdirSync(appEjsDataDir)
    // 开发环境复制替换ejs模板
    // 生产环境判断模板是否存在  存在则不进行复制覆盖
    if (cfg.env === 'development') {
      copyFile('api.ejs')
      copyFile('router.ejs')
      copyFile('list.ejs')
      copyFile('addOrEdit.ejs')
    } else {
      if (!ejsFileNames.includes('api.ejs')) {
        copyFile('api.ejs')
      }
      if (!ejsFileNames.includes('router.ejs')) {
        copyFile('router.ejs')
      }
      if (!ejsFileNames.includes('list.ejs')) {
        copyFile('list.ejs')
      }
      if (!ejsFileNames.includes('addOrEdit.ejs')) {
        copyFile('addOrEdit.ejs')
      }
    }
  } catch (error) {
    console.log(error)
  }
}

/**
 * 复制文件
 * @param {String} fileFullName
 */
function copyFile(fileFullName) {
  const apiEjsPath = path.resolve(__dirname, '../ejsTemplate', fileFullName)
  fs.copyFileSync(apiEjsPath, path.resolve(appEjsDataDir, fileFullName))
}

module.exports = {
  initEjsTemplate,
  snakeFormatHump,
}
