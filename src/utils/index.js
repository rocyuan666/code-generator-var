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
    if (app.isPackaged) {
      if (ejsFileNames.includes('template.json')) {
        // 处理版本
        const appTemplateJson = fs.readJSONSync(
          path.resolve(__dirname, '../ejsTemplate', 'template.json')
        )
        const localTemplateJson = fs.readJSONSync(path.resolve(appEjsDataDir, 'template.json'))
        if (localTemplateJson.version !== appTemplateJson.version) {
          copyTemplateFile()
        }
      } else {
        copyTemplateFile()
      }
    } else {
      copyTemplateFile()
    }
  } catch (error) {
    console.log(error)
  }
}

/**
 * 复制模板文件
 */
function copyTemplateFile() {
  copyFile('template.json')
  copyFile('api.ejs')
  copyFile('router.ejs')
  copyFile('list.ejs')
  copyFile('addOrEdit.ejs')
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
