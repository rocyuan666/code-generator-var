const { ipcMain } = require('electron')
const { connectMysql, connectMysqlEnd, getTables, getFields } = require('../webapi/mysql')
const {
  getAppName,
  getAppVersion,
  getPath,
  getDirPath,
  getFilePath,
  getEjsFilePath,
  genCode,
  getEjsTemplateFilePath,
  openExplorer,
} = require('../webapi/generator')

function defineIpcMain() {
  ipcMain.handle('getAppName', getAppName)
  ipcMain.handle('getAppVersion', getAppVersion)
  // 数据库相关
  ipcMain.handle('connectMysql', connectMysql)
  ipcMain.handle('connectMysqlEnd', connectMysqlEnd)
  ipcMain.handle('getTables', getTables)
  ipcMain.handle('getFields', getFields)
  // 生成器相关
  ipcMain.handle('getDirPath', getDirPath)
  ipcMain.handle('getPath', getPath)
  ipcMain.handle('getFilePath', getFilePath)
  ipcMain.handle('getEjsFilePath', getEjsFilePath)
  ipcMain.handle('getEjsTemplateFilePath', getEjsTemplateFilePath)
  ipcMain.handle('genCode', genCode)
  ipcMain.handle('openExplorer', openExplorer)
}

module.exports = {
  defineIpcMain,
}
