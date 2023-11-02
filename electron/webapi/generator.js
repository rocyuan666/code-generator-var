const { app, dialog, shell } = require('electron')
const fs = require('fs-extra')
const path = require('path')
const cfg = require('../config')
const ejs = require('ejs')
const { snakeFormatHump } = require('../utils')

/**
 * 获取 应用程序目录
 * @param {*} event
 * @param {String} name
 * @param {Boolean} addAppDir
 *
 * home 用户的 home 文件夹（主目录）
 * appData 每个用户的应用程序数据目录，默认情况下指向：
 *    %APPDATA% Windows 中
 *    $XDG_CONFIG_HOME or ~/.config Linux 中
 *    ~/Library/Application Support macOS 中
 * userData 储存你应用程序配置文件的文件夹，默认是 appData 文件夹附加应用的名称 按照习惯用户存储的数据文件应该写在此目录，同时不建议在这写大文件，因为某些环境会备份此目录到云端存储。
 * sessionData 此目录存储由 Session 生成的数据，例如 localStorage，cookies，磁盘缓存，下载的字典，网络 状态，开发者工具文件等。 默认为 userData 目录。 Chromium 可能在此处写入非常大的磁盘缓存，因此，如果您的应用不依赖于浏览器存储（如 localStorage 或 cookie）来保存用户数据，建议将此目录设置为其他位置，以避免污染 userData 目录。
 * temp 临时文件夹
 * exe当前的可执行文件
 * module The libchromiumcontent 库
 * desktop 当前用户的桌面文件夹
 * documents 用户文档目录的路径
 * downloads 用户下载目录的路径
 * music 用户音乐目录的路径
 * pictures 用户图片目录的路径
 * videos 用户视频目录的路径
 * recent 用户最近文件的目录 (仅限 Windows)。
 * logs应用程序的日志文件夹
 * crashDumps 崩溃转储文件存储的目录。
 */
function getPath(event, name, addAppDir = false) {
  if (addAppDir) {
    return path.resolve(app.getPath(name), cfg.app.name)
  } else {
    return app.getPath(name)
  }
}

/**
 * 获取模板模板路径
 * @param {*} event
 * @param {"api.ejs" | "router.ejs" | "list.ejs" | "addOrEdit.ejs"} name
 * @returns
 */
function getEjsTemplateFilePath(event, name) {
  const appDataDir = path.resolve(app.getPath('appData'), cfg.app.name)
  const appEjsDataDir = path.resolve(appDataDir, 'ejs')
  return path.resolve(appEjsDataDir, name)
}

/**
 * 文件资源管理器打开目录
 * @param event
 * @param path
 */
function openExplorer(event, path) {
  shell.openPath(path)
}

/**
 * 选择目录路径
 */
function getDirPath() {
  return new Promise((resolve, reject) => {
    dialog
      .showOpenDialog({
        title: '请选择目录',
        properties: ['openDirectory'],
      })
      .then((result) => {
        if (result.canceled) {
          reject('取消选择')
        } else {
          resolve(result.filePaths)
        }
      })
      .catch((err) => {
        reject('失败' + err)
      })
  })
}

/**
 * 选择Ejs文件路径
 */
function getEjsFilePath(event) {
  return new Promise((resolve, reject) => {
    dialog
      .showOpenDialog({
        title: '请选择Ejs文件',
        filters: [{ name: 'Ejs', extensions: ['ejs'] }],
        properties: ['openFile'],
      })
      .then((result) => {
        if (result.canceled) {
          reject('取消选择')
        } else {
          resolve(result.filePaths)
        }
      })
      .catch((err) => {
        reject('失败' + err)
      })
  })
}

/**
 * 选择文件路径
 */
function getFilePath(event) {
  return new Promise((resolve, reject) => {
    dialog
      .showOpenDialog({
        title: '请选择文件',
        properties: ['openFile'],
      })
      .then((result) => {
        if (result.canceled) {
          reject('取消选择')
        } else {
          resolve(result.filePaths)
        }
      })
      .catch((err) => {
        reject('失败' + err)
      })
  })
}

/**
 * 生成代码
 * @param event
 * @param tableNameList
 * @param genJsonData
 * @returns {Promise<unknown>}
 */
function genCode(event, tableNameList = [], genJsonData = {}) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    /** @type {Array} */
    const selectTableNameList = JSON.parse(tableNameList)
    /** @type {Object} */
    const genConfig = JSON.parse(genJsonData).genConfig
    /** @type {Object} */
    const tableFieldConfig = JSON.parse(genJsonData).tableFieldConfig

    /**
     * 渲染ejs
     * @param ejsPath
     * @param outPath
     * @param ejsContentData
     */
    function renderEjsFile(ejsPath, outPath, ejsContentData) {
      return new Promise((resolve, reject) => {
        ejs.renderFile(ejsPath, ejsContentData, (err, str) => {
          if (err) return reject(err)
          fs.outputFileSync(
            path.resolve(genConfig.outPutDir, genConfig.projectName, 'vue', outPath),
            str
          )
          resolve('输出成功')
        })
      })
    }

    try {
      for (const tableName of selectTableNameList) {
        // 子表配置
        if (tableFieldConfig[tableName].subTable) {
          const subTableName = tableFieldConfig[tableName].subTable
          tableFieldConfig[tableName]['subTableFieldConfig'] = tableFieldConfig[subTableName]
          tableFieldConfig[tableName]['_sub'] = tableFieldConfig[tableName]['subTableFieldConfig']
        }
        await renderEjsFile(genConfig.apiEjsFilePath, `api/${snakeFormatHump(tableName)}.js`, {
          ...tableFieldConfig[tableName],
          fn: { snakeFormatHump },
          selectTableName: selectTableNameList,
          all: tableFieldConfig,
        })
        await renderEjsFile(genConfig.routerEjsFilePath, 'router/genRouters.js', {
          ...tableFieldConfig[tableName],
          fn: { snakeFormatHump },
          selectTableName: selectTableNameList,
          all: tableFieldConfig,
        })
        await renderEjsFile(
          genConfig.listEjsFilePath,
          `views/${snakeFormatHump(tableName)}/index.vue`,
          {
            ...tableFieldConfig[tableName],
            fn: { snakeFormatHump },
            selectTableName: selectTableNameList,
            all: tableFieldConfig,
          }
        )
        await renderEjsFile(
          genConfig.addEditEjsFilePath,
          `views/${snakeFormatHump(tableName)}/addOrEdit.vue`,
          {
            ...tableFieldConfig[tableName],
            fn: { snakeFormatHump },
            selectTableName: selectTableNameList,
            all: tableFieldConfig,
          }
        )
      }
      resolve({ selectTableNameList, genConfig, tableFieldConfig })
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  getPath,
  getDirPath,
  getFilePath,
  getEjsFilePath,
  genCode,
  getEjsTemplateFilePath,
  openExplorer,
}
