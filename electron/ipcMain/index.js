const { ipcMain } = require('electron')
const { connectMysql, connectMysqlEnd, getTables, getFields } = require('../webapi/mysql')
const { getPath, getDirPath } = require('../webapi/generator')

function defineIpcMain() {
  // 数据库相关
  ipcMain.handle('connectMysql', connectMysql)
  ipcMain.handle('connectMysqlEnd', connectMysqlEnd)
  ipcMain.handle('getTables', getTables)
  ipcMain.handle('getFields', getFields)
  // 生成器相关
  ipcMain.handle('getDirPath', getDirPath)
  ipcMain.handle('getPath', getPath)
}

module.exports = {
  defineIpcMain,
}
