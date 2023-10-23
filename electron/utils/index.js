const path = require('path')
const fs = require('fs-extra')
const { app } = require('electron')
const cfg = require('../config')

const appDataDir = path.resolve(app.getPath('appData'), cfg.app.name)
const appEjsDataDir = path.resolve(appDataDir, 'ejs')

/**
 * 初始化Ejs模板
 */
function initEjsTemplate() {
  try {
    fs.mkdirpSync(appEjsDataDir)
    const ejsFileNames = fs.readdirSync(appEjsDataDir)
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
}
